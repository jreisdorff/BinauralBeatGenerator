import { useCallback, useEffect, useRef, useState } from "react";
import type { TrackMeta } from "../constants/tracks";
import "./AudioPlayer.css";

type Props = {
  track: TrackMeta;
  variant?: "ancient" | "binaural" | "acoustics";
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
    <div className={`audio-player audio-player--${variant}`}>
      <audio ref={ref} src={track.file} preload="metadata" />
      <div className="audio-player__head">
        <button
          type="button"
          className="audio-player__play"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="audio-player__meta">
          <div className="audio-player__title">{track.title}</div>
          {track.subtitle ? (
            <div className="audio-player__sub">{track.subtitle}</div>
          ) : null}
        </div>
        <span className="audio-player__time">
          {fmt(currentTime)} / {fmt(duration)}
        </span>
      </div>
      <input
        type="range"
        className="audio-player__seek"
        min={0}
        max={1}
        step={0.001}
        value={progress}
        onChange={seek}
        aria-label="Seek"
      />
      {track.listenerNote ? (
        <p className="audio-player__listener">{track.listenerNote}</p>
      ) : null}
      {error ? (
        <p className="audio-player__err">
          File missing — run <code>npm run copy-assets</code> in <code>web/</code>{" "}
          after generating WAVs in the repo.
        </p>
      ) : null}
    </div>
  );
}
