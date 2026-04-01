/**
 * midi-writer-js ships types under build/types/ but package.json "exports"
 * does not expose them to TypeScript module resolution.
 */
declare module "midi-writer-js" {
  const MidiWriter: any;
  export default MidiWriter;
}
