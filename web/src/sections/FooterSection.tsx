import { motion } from "framer-motion";
import "./sections.css";

export function FooterSection() {
  return (
    <footer className="section section--footer" id="more">
      <div className="section__inner">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title section__title--small">CLI & docs</h2>
          <ul className="footer-list">
            <li>
              <code>npm start</code> — corpus summary in the Node project root
            </li>
            <li>
              <code>npm run midi:tightening</code> ·{" "}
              <code>npm run audio:binaural</code> · <code>npm run audio:beat</code>
            </li>
            <li>
              <code>npm run audio:preset:all</code> ·{" "}
              <code>npm run acoustics:demo</code>
            </li>
            <li>
              Read <code>docs/philology-iraq-sources.md</code> and{" "}
              <code>docs/sound-and-built-environment.md</code>
            </li>
          </ul>
          <p className="footer-copy">
            This page is a front-end shell; audio files live in{" "}
            <code>web/public/audio</code> after <code>npm run copy-assets</code>.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
