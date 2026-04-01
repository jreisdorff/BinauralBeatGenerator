import "./BeatFrequencyGuide.css";

/**
 * Popular-science framing of binaural beat bands — not clinical guidance.
 */
export function BeatFrequencyGuide() {
  return (
    <div className="beat-guide">
      <h3 className="beat-guide__title">What different beat rates are often explored for</h3>
      <div className="beat-guide__table-wrap">
        <table className="beat-guide__table">
          <thead>
            <tr>
              <th>Beat range (Hz)</th>
              <th>Common label</th>
              <th>What listeners sometimes try it for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>~1–4</td>
              <td>Delta</td>
              <td>
                Very slow pulse; some use it for deep rest or winding toward sleep.
              </td>
            </tr>
            <tr>
              <td>~4–8</td>
              <td>Theta</td>
              <td>
                Meditation, hypnagogic drift, creativity prompts—often described as
                “inward” or dream-adjacent.
              </td>
            </tr>
            <tr>
              <td>~8–12</td>
              <td>Alpha</td>
              <td>
                Calm alertness, light relaxation, or “easeful focus” in wellness apps.
              </td>
            </tr>
            <tr>
              <td>~12–30</td>
              <td>Beta</td>
              <td>
                Faster pulsing; sometimes pitched for concentration or feeling “switched on.”
              </td>
            </tr>
            <tr>
              <td>~30+</td>
              <td>Gamma (loose)</td>
              <td>
                 Heightened Perception
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="beat-guide__foot">
        Your presets mostly use <strong>4–6 Hz</strong> (theta / alpha–theta) plus{" "}
        <strong>10 Hz</strong> (alpha) and one <strong>18 → 4 Hz</strong> sweep across beta
        into theta.
      </p>
    </div>
  );
}
