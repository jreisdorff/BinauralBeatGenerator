import { CodeBlock } from "../components/CodeBlock";
import { DocLink } from "../components/DocLink";

export function ReferencePage() {
  return (
    <>
      <h1>Reference — commands & paths</h1>
      <p>
        Monorepo root contains the Node corpus tools; <code>web/</code> hosts the Next.js
        public site; <code>technical-walkthrough/</code> hosts this Vite app.
      </p>

      <h2>Corpus & audio generation (repo root)</h2>
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
      <CodeBlock
        title="Copy generated WAV/SVG into Next public/"
        children={`cd web
npm run copy-assets`}
      />

      <h2>Documentation files (relative to repo root)</h2>
      <p>
        Click to open a rendered preview (bundled at build time; math and tables
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

      <h2>This walkthrough</h2>
      <CodeBlock
        title="Development server"
        children={`cd technical-walkthrough
npm install
npm run dev`}
      />
      <CodeBlock
        title="Production build"
        children={`npm run build
npm run preview`}
      />
    </>
  );
}
