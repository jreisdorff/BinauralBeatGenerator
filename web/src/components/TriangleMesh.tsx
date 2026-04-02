const triGridBg = {
  backgroundImage: `
    linear-gradient(30deg, rgba(255, 255, 255, 0.03) 12%, transparent 12.5%),
    linear-gradient(150deg, rgba(255, 255, 255, 0.025) 12%, transparent 12.5%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
  backgroundSize: "80px 80px, 80px 80px, 40px 40px",
} as const;

export function TriangleMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70"
      aria-hidden
    >
      <div
        className="animate-tri-drift absolute left-[5%] top-[8%] h-0 w-0 border-solid blur-[0.5px] motion-reduce:animate-none"
        style={{
          borderWidth: "0 120px 200px 120px",
          borderColor:
            "transparent transparent rgba(100, 120, 145, 0.22) transparent",
          animationDelay: "0s",
        }}
      />
      <div
        className="animate-tri-drift absolute right-[8%] top-[40%] h-0 w-0 border-solid blur-[0.5px] motion-reduce:animate-none"
        style={{
          borderWidth: "160px 90px 0 90px",
          borderColor: "rgba(80, 95, 118, 0.2) transparent transparent transparent",
          animationDelay: "-7s",
        }}
      />
      <div
        className="animate-tri-drift absolute bottom-[15%] left-[20%] h-0 w-0 border-solid blur-[0.5px] motion-reduce:animate-none"
        style={{
          borderWidth: "0 100px 170px 100px",
          borderColor:
            "transparent transparent rgba(70, 88, 110, 0.18) transparent",
          animationDelay: "-14s",
        }}
      />
      <div
        className="animate-tri-drift absolute right-[25%] top-[20%] h-0 w-0 border-solid blur-[0.5px] motion-reduce:animate-none"
        style={{
          borderWidth: "0 70px 120px 70px",
          borderColor:
            "transparent transparent rgba(120, 135, 155, 0.15) transparent",
          animationDelay: "-3s",
        }}
      />
      <div
        className="animate-tri-drift absolute bottom-[35%] right-[12%] h-0 w-0 border-solid blur-[0.5px] motion-reduce:animate-none"
        style={{
          borderWidth: "130px 75px 0 75px",
          borderColor: "rgba(90, 105, 125, 0.16) transparent transparent transparent",
          animationDelay: "-20s",
        }}
      />
      <div
        className="animate-tri-drift-grid absolute -inset-[20%] opacity-60 motion-reduce:animate-none"
        style={triGridBg}
      />
    </div>
  );
}
