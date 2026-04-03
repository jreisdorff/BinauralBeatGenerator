import { BlockMath, InlineMath } from "../components/Tex";
import { CodeBlock } from "../components/CodeBlock";
import { DocLink } from "../components/DocLink";

export function AncientPage() {
  return (
    <>
      <h1>Ancient tuning — philology vs Hz tables</h1>
      <p>
        The corpus describes named heptachords and string-pair operations on a nine-string
        <em> sammu</em>. The web demo encodes that logic as a <strong>graph</strong> of
        states (heptachord labels) and transitions (tighten/loosen moves), not as a
        modern fixed-frequency scale.
      </p>

      <h2>Interval as a ratio (generic)</h2>
      <p>
        If two pitches have periods <InlineMath tex="T_1,T_2" />, the frequency ratio is
      </p>
      <BlockMath tex="\frac{f_2}{f_1} = \frac{T_1}{T_2}" />

      <h2>Equal-temperament semitone (contrast only)</h2>
      <p>
        Twelve-tone equal temperament defines a semitone factor
      </p>
      <BlockMath tex="r_{12} = 2^{1/12}" />
      <p>
        so <InlineMath tex="k" /> steps span <InlineMath tex="2^{k/12}" />. This is a
        modern convention; cuneiform sources do not specify Hz.
      </p>

      <h2>Graph adjacency (schematic)</h2>
      <p>
        Let <InlineMath tex="G=(V,E)" /> where vertices <InlineMath tex="V" /> are named
        states and edges <InlineMath tex="E" /> are admissible moves. A tightening tour is
        a path <InlineMath tex="v_0,v_1,\ldots,v_n" /> with edges{" "}
        <InlineMath tex="(v_i,v_{i+1})\in E" />.
      </p>

      <CodeBlock
        title="Adjacency list sketch (TypeScript)"
        children={`type NodeId = string;

type Graph = Map<NodeId, Set<NodeId>>;

export function hasEdge(g: Graph, a: NodeId, b: NodeId): boolean {
  return g.get(a)?.has(b) ?? false;
}

export function neighbors(g: Graph, a: NodeId): NodeId[] {
  return [...(g.get(a) ?? [])];
}`}
      />

      <div className="note">
        See repository <DocLink slug="philology-iraq-sources" /> for tablet citations and
        scholarly references; this walkthrough only fixes notation.
      </div>
    </>
  );
}
