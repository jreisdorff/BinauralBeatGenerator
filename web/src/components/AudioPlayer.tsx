import { useCallback, useEffect, useRef, useState } from "react";
import { GITHUB_REPO_URL } from "@/constants/repo";
import type { TrackMeta } from "../constants/tracks";
import { cn } from "@/lib/cn";

type Props = {
  track: TrackMeta;
  variant?: "ancient" | "binaural" | "acoustics";
};

const shell = {
  ancient:
    "max-w-[420px] border border-[rgba(212,175,55,0.45)] bg-[rgba(26,35,126,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
  binaural:
    "max-w-[min(100%,480px)] border border-[rgba(255,120,200,0.4)] bg-[rgba(60,20,80,0.45)] shadow-[0_0_24px_rgba(255,0,180,0.15)]",
  acoustics:
    "max-w-[420px] border border-[rgba(140,160,180,0.35)] bg-[rgba(55,71,90,0.5)]",
};

const listenerTone = {
  ancient: "text-[rgba(244,228,188,0.9)]",
  binaural: "text-[rgba(255,235,255,0.92)]",
  acoustics: "text-[rgba(200,215,230,0.95)]",
};

const seekAccent = {
  ancient: "accent-[#d4af37]",
  binaural: "accent-[#ff6ec7]",
  acoustics: "accent-[#8fa8c2]",
};

export function AudioPlayer({ track, variant = "ancient" }: Props) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setError(true));
    else el.pause();
  }, []);

  useEffect(() => {
    setError(false);
    setProgress(0);
    setCurrentTime(0);
  }, [track.file]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      setCurrentTime(el.currentTime);
      if (el.duration) setProgress(el.currentTime / el.duration);
    };
    const onMeta = () => setDuration(el.duration || 0);
    const onErr = () => setError(true);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("error", onErr);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("error", onErr);
    };
  }, [track.file]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = ref.current;
    if (!el || !el.duration) return;
    const t = Number(e.target.value) * el.duration;
    el.currentTime = t;
    setProgress(Number(e.target.value));
  };

  const fmt = (s: number) => {
    if (!Number.isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "rounded-xl px-[1.1rem] py-4 backdrop-blur-[8px]",
        shell[variant],
      )}
    >
      <audio ref={ref} src={track.file} preload="metadata" />
      <div className="mb-2 flex items-center gap-3">
        <button
          type="button"
          className="h-11 w-11 shrink-0 rounded-full border-0 bg-white/15 text-[0.85rem] text-white hover:bg-white/[0.28]"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="min-w-0 flex-1">
          <div className="text-[0.95rem] font-semibold">{track.title}</div>
          {track.subtitle ? (
            <div className="mt-[0.15rem] text-[0.78rem] opacity-85">
              {track.subtitle}
            </div>
          ) : null}
        </div>
        <span className="shrink-0 tabular-nums text-[0.72rem] opacity-75">
          {fmt(currentTime)} / {fmt(duration)}
        </span>
      </div>
      <input
        type="range"
        className={cn("w-full", seekAccent[variant])}
        min={0}
        max={1}
        step={0.001}
        value={progress}
        onChange={seek}
        aria-label="Seek"
      />
      {track.listenerNote ? (
        <p
          className={cn(
            "mb-0 mt-[0.65rem] text-[0.76rem] leading-[1.5] opacity-88",
            listenerTone[variant],
          )}
        >
          {track.listenerNote}
        </p>
      ) : null}
      {error ? (
        <p className="mb-0 mt-2 text-[0.75rem] text-[#ffb4b4] opacity-90">
          File missing — run <code className="text-[0.7rem]">npm run copy-assets</code>{" "}
          in <code className="text-[0.7rem]">web/</code> after generating WAVs in the{" "}
          <a
            href={GITHUB_REPO_URL}
            className="underline underline-offset-2 hover:opacity-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
