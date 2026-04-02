import { ImageResponse } from "next/og";

/** Required when `output: "export"` — bake OG image at build time. */
export const dynamic = "force-static";

export const alt =
  "SoundWorld — Old Babylonian tuning, binaural beats, room acoustics, and pyramids & sound";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background: "linear-gradient(152deg, #0f0842 0%, #2d1b4e 28%, #2d0a3d 55%, #0c0c0f 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 200, 120, 0.45) 0%, rgba(212, 175, 55, 0.12) 45%, transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(155, 246, 255, 0.12) 0%, transparent 65%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 12, zIndex: 1 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(244, 228, 188, 0.75)",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Interactive tour
          </div>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#f4e4bc",
              textShadow: "0 4px 28px rgba(212, 175, 55, 0.45)",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            SoundWorld
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: "rgba(232, 220, 255, 0.95)",
              maxWidth: 920,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Old Babylonian string cycles · binaural presets & beat guide · room modes &
            Chladni-style plates · pyramids & sound (evidence vs claims)
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["Headphones for binaural", "Philology-first tuning doc", "WAV players in-page"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(212, 175, 55, 0.45)",
                    background: "rgba(0, 0, 0, 0.35)",
                    color: "rgba(244, 228, 188, 0.92)",
                    fontSize: 20,
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 56,
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            height: 100,
            opacity: 0.55,
          }}
        >
          {[0.35, 0.55, 0.85, 1, 0.7, 0.5, 0.9, 0.4, 0.65, 0.8, 0.45, 0.95].map((h, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: `${Math.round(h * 100)}%`,
                borderRadius: 6,
                background: "linear-gradient(180deg, #ff9ecd 0%, #9bf6ff 100%)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
