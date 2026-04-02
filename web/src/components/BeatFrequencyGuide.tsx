/**
 * Popular-science framing of binaural beat bands — not clinical guidance.
 */
export function BeatFrequencyGuide() {
  return (
    <div className="my-6 mb-8 rounded-[14px] border border-[rgba(200,140,255,0.22)] bg-[rgba(20,5,40,0.55)] px-[1.35rem] py-5 backdrop-blur-[10px]">
      <h3 className="mb-3 mt-0 text-[1.1rem] font-bold text-[#f0d8ff]">
        What different beat rates are often explored for
      </h3>
      <div className="overflow-x-auto rounded-[10px] border border-white/10">
        <table className="w-full border-collapse text-left text-[0.8rem] leading-[1.45]">
          <thead>
            <tr>
              <th className="whitespace-nowrap bg-black/35 px-[0.65rem] py-[0.55rem] font-semibold text-[#ffc8f8]">
                Beat range (Hz)
              </th>
              <th className="whitespace-nowrap bg-black/35 px-[0.65rem] py-[0.55rem] font-semibold text-[#ffc8f8]">
                Common label
              </th>
              <th className="whitespace-nowrap bg-black/35 px-[0.65rem] py-[0.55rem] font-semibold text-[#ffc8f8]">
                What listeners sometimes try it for
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="whitespace-nowrap border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top tabular-nums text-[#b8e8ff]">
                ~1–4
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Delta
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Very slow pulse; some use it for deep rest or winding toward sleep.
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top tabular-nums text-[#b8e8ff]">
                ~4–8
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Theta
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Meditation, hypnagogic drift, creativity prompts—often described as
                “inward” or dream-adjacent.
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top tabular-nums text-[#b8e8ff]">
                ~8–12
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Alpha
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Calm alertness, light relaxation, or “easeful focus” in wellness apps.
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top tabular-nums text-[#b8e8ff]">
                ~12–30
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Beta
              </td>
              <td className="border-b border-white/[0.07] px-[0.65rem] py-[0.55rem] align-top">
                Faster pulsing; sometimes pitched for concentration or feeling “switched
                on.”
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-[0.65rem] py-[0.55rem] align-top tabular-nums text-[#b8e8ff]">
                ~30+
              </td>
              <td className="px-[0.65rem] py-[0.55rem] align-top">
                Gamma (loose)
              </td>
              <td className="px-[0.65rem] py-[0.55rem] align-top">
                Heightened Perception
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-0 mt-4 text-[0.8rem] leading-[1.5] opacity-88">
        Your presets mostly use <strong>4–6 Hz</strong> (theta / alpha–theta) plus{" "}
        <strong>10 Hz</strong> (alpha) and one <strong>18 → 4 Hz</strong> sweep across
        beta into theta.
      </p>
    </div>
  );
}
