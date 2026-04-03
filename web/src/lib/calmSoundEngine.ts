/**
 * Browser Web Audio: soft noise + optional low sine drones for relaxation listening.
 * Not medical treatment — see CalmSoundPad disclaimer in UI.
 */

export type CalmPreset = "pink" | "brown" | "drone" | "layer";

export type CalmSoundEngine = {
  readonly isRunning: () => boolean;
  start: (preset: CalmPreset) => Promise<void>;
  stop: () => void;
  /** 0–1 linear slider → perceived level */
  setLevel: (linear: number) => void;
  dispose: () => void;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** Map UI 0–1 to gain (roughly perceptual). */
function linearToMasterGain(linear: number) {
  const x = clamp01(linear);
  if (x <= 0.0001) return 0.0001;
  return 0.0001 + x * x * 0.45;
}

function makeNoiseBuffer(ctx: AudioContext, seconds = 3) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buffer;
}

export function createCalmSoundEngine(): CalmSoundEngine {
  let audioContext: AudioContext | null = null;
  let master: GainNode | null = null;
  let levelLinear = 0.55;
  const cleaners: Array<() => void> = [];
  let running = false;
  /** Browser `setTimeout` id (number); avoids Node `Timeout` typing clash in Next.js). */
  let stopTimer: number | null = null;

  const ensure = () => {
    if (!audioContext) {
      audioContext = new AudioContext();
      master = audioContext.createGain();
      master.gain.value = 0.0001;
      master.connect(audioContext.destination);
    }
    return { ctx: audioContext, out: master! };
  };

  const clearGraph = () => {
    while (cleaners.length) {
      const fn = cleaners.pop();
      try {
        fn?.();
      } catch {
        /* ignore */
      }
    }
  };

  const fadeMasterTo = async (ctx: AudioContext, target: number, sec: number) => {
    const g = master?.gain;
    if (!g) return;
    const now = ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(Math.max(g.value, 0.0001), now);
    g.exponentialRampToValueAtTime(Math.max(target, 0.0001), now + sec);
  };

  const buildNoiseBranch = (
    ctx: AudioContext,
    dest: AudioNode,
    preset: "pink" | "brown" | "layer",
  ) => {
    const buf = makeNoiseBuffer(ctx);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const lp1 = ctx.createBiquadFilter();
    lp1.type = "lowpass";
    lp1.frequency.value = preset === "brown" ? 650 : 1400;
    lp1.Q.value = 0.7;

    const lp2 = ctx.createBiquadFilter();
    lp2.type = "lowpass";
    lp2.frequency.value = preset === "brown" ? 220 : 520;
    lp2.Q.value = 0.7;

    const g = ctx.createGain();
    const noiseGain =
      preset === "brown" ? 0.22 : preset === "layer" ? 0.09 : 0.16;
    g.gain.value = noiseGain;

    src.connect(lp1);
    lp1.connect(lp2);
    lp2.connect(g);
    g.connect(dest);

    src.start();
    cleaners.push(() => {
      try {
        src.stop();
      } catch {
        /* already stopped */
      }
      src.disconnect();
      lp1.disconnect();
      lp2.disconnect();
      g.disconnect();
    });
  };

  const buildDroneBranch = (ctx: AudioContext, dest: AudioNode, quiet: boolean) => {
    const freqs = [110, 164.8138, 220];
    const per = (quiet ? 0.018 : 0.028) / freqs.length;
    for (let i = 0; i < freqs.length; i++) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freqs[i]!;
      o.detune.value = (i - 1) * 3.5;

      const g = ctx.createGain();
      g.gain.value = per;

      o.connect(g);
      g.connect(dest);
      o.start();
      cleaners.push(() => {
        try {
          o.stop();
        } catch {
          /* */
        }
        o.disconnect();
        g.disconnect();
      });
    }
  };

  return {
    isRunning: () => running,

    async start(preset: CalmPreset) {
      const { ctx, out } = ensure();
      if (ctx.state === "suspended") await ctx.resume();

      if (stopTimer !== null) {
        clearTimeout(stopTimer);
        stopTimer = null;
      }
      clearGraph();
      running = true;

      if (preset === "pink") buildNoiseBranch(ctx, out, "pink");
      else if (preset === "brown") buildNoiseBranch(ctx, out, "brown");
      else if (preset === "drone") buildDroneBranch(ctx, out, false);
      else {
        buildNoiseBranch(ctx, out, "layer");
        buildDroneBranch(ctx, out, true);
      }

      const target = linearToMasterGain(levelLinear);
      await fadeMasterTo(ctx, target, 0.6);
    },

    stop() {
      if (stopTimer !== null) {
        clearTimeout(stopTimer);
        stopTimer = null;
        clearGraph();
        running = false;
        if (master) master.gain.value = 0.0001;
        return;
      }
      const ctx = audioContext;
      if (!ctx || !running) {
        clearGraph();
        running = false;
        return;
      }
      const g = master?.gain;
      if (g) {
        const now = ctx.currentTime;
        g.cancelScheduledValues(now);
        g.setValueAtTime(Math.max(g.value, 0.0001), now);
        g.exponentialRampToValueAtTime(0.0001, now + 0.45);
      }
      stopTimer = window.setTimeout(() => {
        stopTimer = null;
        clearGraph();
        running = false;
        if (master) master.gain.value = 0.0001;
      }, 500);
    },

    setLevel(linear: number) {
      levelLinear = clamp01(linear);
      const ctx = audioContext;
      if (!ctx || !master || !running) return;
      const g = master.gain;
      const now = ctx.currentTime;
      const v = linearToMasterGain(levelLinear);
      g.cancelScheduledValues(now);
      g.setValueAtTime(Math.max(g.value, 0.0001), now);
      g.exponentialRampToValueAtTime(Math.max(v, 0.0001), now + 0.08);
    },

    dispose() {
      if (stopTimer !== null) {
        clearTimeout(stopTimer);
        stopTimer = null;
      }
      clearGraph();
      running = false;
      master?.disconnect();
      master = null;
      void audioContext?.close();
      audioContext = null;
    },
  };
}
