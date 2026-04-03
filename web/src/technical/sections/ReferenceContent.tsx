import { GITHUB_REPO_URL } from "@/constants/repo";
import { CodeBlock } from "@/technical/components/CodeBlock";
import { DocLink } from "@/technical/components/DocLink";

export function ReferenceContent() {
  return (
    <>
      <h1>Reference — commands & paths</h1>
      <p>
        <strong>Clone</strong>{" "}
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
          github.com/jreisdorff/BinauralBeatGenerator
        </a>
        . The monorepo root contains the Node corpus tools; <code>web/</code> hosts the
        Next.js public site and this technical walkthrough at <code>/technical</code>.
      </p>

      <h2>Corpus & audio generation (repo root)</h2>
      <p>
        Run from the repository root after checkout (
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        ).
      </p>
      <CodeBlock
        title="Shell"
        children={`npm start
npm run midi:tightening
npm run audio:binaural
npm run audio:beat
npm run audio:preset:all
npm run acoustics:demo`}
      />

      <h2>Web assets</h2>
      <p>
        In the same checkout, from <code>web/</code> (
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
          repo
        </a>
        ):
      </p>
      <CodeBlock
        title="Copy generated WAV/SVG into Next public/"
        children={`cd web
npm run copy-assets`}
      />

      <h2>Documentation files (relative to repo root)</h2>
      <p>
        Paths are under the{" "}
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
          cloned repository
        </a>
        . Click to open a rendered preview (bundled at build time; math and tables
        formatted):
      </p>
      <ul>
        <li>
          <DocLink slug="philology-iraq-sources" />
        </li>
        <li>
          <DocLink slug="sound-and-built-environment" />
        </li>
        <li>
          <DocLink slug="pyramids-sound-and-claims" />
        </li>
      </ul>

      <h2>Technical walkthrough</h2>
      <p>
        Served by the same Next app as the scroll experience. In{" "}
        <code>web/</code> inside{" "}
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
          the GitHub checkout
        </a>
        :
      </p>
      <CodeBlock
        title="Development server"
        children={`cd web
npm install
npm run dev
# e.g. http://localhost:5173/technical`}
      />
      <p>Production build (static export) from <code>web/</code>:</p>
      <CodeBlock
        title="Production static export"
        children={`cd web
npm run build`}
      />
    </>
  );
}
