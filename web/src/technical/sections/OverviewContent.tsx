import Link from "next/link";
import { GITHUB_REPO_URL } from "@/constants/repo";
import { BlockMath, InlineMath } from "@/technical/components/Tex";
import { CodeBlock } from "@/technical/components/CodeBlock";

export function OverviewContent() {
  return (
    <>
      <h1>Overview</h1>
      <p>
        This document parallels the public <strong>SoundWorld</strong> scroll site: one route
        per section, monospace typography, and explicit formulas plus code. It is a
        companion for readers who want the same topics in a linear, technical layout.
      </p>

      <div className="note">
        Rendering uses KaTeX for mathematics. If a formula fails to parse, the source
        string is still visible in the DOM tree for debugging.
      </div>

      <h2>Signal conventions</h2>
      <p>
        Continuous-time sinusoids are written{" "}
        <InlineMath tex="s(t)=A\cos(\omega t+\varphi)" /> throughout. Sampled audio uses
        discrete buffers at rate <InlineMath tex="f_s" /> (Hz).
      </p>
      <BlockMath tex="s(t) = A \cos(2\pi f t + \varphi)" />

      <h2>Section map</h2>
      <table className="simple">
        <thead>
          <tr>
            <th>Route</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link href="/technical/ancient">/technical/ancient</Link>
            </td>
            <td>Corpus tuning, modulation as graph (philology context)</td>
          </tr>
          <tr>
            <td>
              <Link href="/technical/binaural">/technical/binaural</Link>
            </td>
            <td>Beat frequency, stereo phase</td>
          </tr>
          <tr>
            <td>
              <Link href="/technical/calm">/technical/calm</Link>
            </td>
            <td>Web Audio synthesis, convolution sketch</td>
          </tr>
          <tr>
            <td>
              <Link href="/technical/acoustics">/technical/acoustics</Link>
            </td>
            <td>Room modes, Chladni plate ansatz</td>
          </tr>
          <tr>
            <td>
              <Link href="/technical/pyramids">/technical/pyramids</Link>
            </td>
            <td>Claims vs measurable acoustics; ultrasonic levitation scale</td>
          </tr>
          <tr>
            <td>
              <Link href="/technical/reference">/technical/reference</Link>
            </td>
            <td>Repository commands and paths</td>
          </tr>
        </tbody>
      </table>

      <p>
        After cloning{" "}
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
          github.com/jreisdorff/BinauralBeatGenerator
        </a>
        :
      </p>
      <CodeBlock
        title="Run the public site (development)"
        children={`cd web
npm install
npm run dev
# open http://localhost:5173/technical`}
      />
    </>
  );
}
