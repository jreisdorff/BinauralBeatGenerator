# Primary-context philology: Old Babylonian tuning corpus (*Iraq* / related)

This project grounds implementation in the cuneiform **music-theory** tradition published and debated in **Cambridge *Iraq*** and closely linked editions—not in modern “432 Hz” mysticism. **A = 432 Hz** is only a **reference anchor** for code; it is **not** attested on any Mesopotamian tablet.

## 1. Core tablets and articles (Cambridge *Iraq*)

### UET VI/3 899 — Old Babylonian tuning fragment

- **Publication:** Sam Mirelman & Theo J. H. Krispijn, “The Old Babylonian Tuning Text UET VI/3 899,” *Iraq* **71** (2009), 43–52.
- **Provenance:** Excavated 2007 at Tell Ṭāban (Syria); joins the small corpus of **Old Babylonian** instructions for the **sammu** (stringed instrument).
- **Philological contribution (central to this repo):** The text **confirms and refines** the **modulation-cycle** reconstruction built on **UET VII 74**. It is best read as a **modulation / retuning** composition, not a one-off “how to tune” note.
- **Terminology revision:** Earlier literature often read a key name with **GABA.RI**; Mirelman & Krispijn argue for **nīš tuḫri(m)** (“rise of the tuḫri”), affecting how we label the **sixth** heptachord name in software and docs. This repo uses **nīš tuḫri** and avoids the obsolete **nīš GABA.RI** label in user-facing strings.

### UET VII 74 — principal Old Babylonian modulation text

- **Edition tradition:** O. R. Gurney’s publication of the Ur tablet (commonly cited as **U. 7/80**), later **UET VII 74**; fundamental for the **seven-mode cycle**, **dichord diagnoses**, and **tightening / loosening** sections.
- **Interpretive label:** Following Mirelman & Krispijn (and others), the genre is **modulation**: the musician **tests string-pairs (dichords)**; certain pairs sound **“unclear”** in a given mode; **adjusting** tension moves the instrument to the **next** named tuning. **Išartum** functions as a **turning point** in the cycle (where tightening vs. loosening rhetoric pivots in the reconstructed layout).

### BM 65217 + 66616 — “Sippar(?)” music tablet

- **Publication:** Anne Draffkorn Kilmer, “A Music Tablet from Sippar(?): BM 65217 + 66616,” *Iraq* **46**, no. 2 (1984)—confirm page span from Cambridge Core or your PDF.
- **Role in the corpus:** Part of the **first-millennium** (and broader) **systematic** description of **intervals** between **nine strings**, complementing lexical / mathematical tablets (e.g. CBS 10996, CBS 1766) often cited together in secondary literature. Kilmer’s *Iraq* piece situates BM 65217 + 66616 in the **coherent Babylonian theory** of **fourteen named dichords** and the **heptatonic** structure implied by fifth/fourth vs. third/sixth groupings.

## 2. What the tablets license in code

| Concept | Philological basis | Implementation note |
|--------|---------------------|----------------------|
| **Nine strings** | Tuning and lexical tradition (lyre/harp **sammu** family) | Indices **1–9** in code; strings **8–9** as **octaves** of **1–2** per UET VII 74 line of interpretation (widely repeated in secondary literature). |
| **Seven distinct steps / modes** | UET VII 74 + duplicates / parallels (incl. UET VI/3 899) | Seven named **tunings**; rotation of the same diatonic set is the usual **modern acoustic** reconstruction. |
| **Dichord diagnosis** | Modulation texts | Encoded as **`src/tuning/modulationUet74.ts`**: string-pairs treated as hosting the **tritone** (“unclear” interval) in each mode, with **tighten/loosen** steps per **Crickmore 2008** Figs 5–6 (tabulating **UET VII 74**). Spot-check against Gurney / Mirelman & Krispijn when you have PDFs. |
| **Interval vocabulary** | BM 65217 + 66616; CBS 10996 tradition | **`src/tuning/cbs10996Pairs.ts`**: fourteen string-pairs (**primary** vs **secondary**) from **Crickmore Fig. 2** (Kilmer’s CBS 10996 reading). |
| **Absolute pitch (Hz)** | *Not in corpus* | Any frequency is **modern convention**; this project uses **A₄ = 432 Hz** only as a **reference** for ratio playback. |

## 3. Secondary source for encoded modulation steps (UET VII 74)

- **Leon Crickmore**, “New Light on the Babylonian Tonal System,” *Proceedings of ICONEA* **2008** (full citation in PDF; mirrored text e.g. [musicircle.net ICONEA 2008 paper](https://musicircle.net/wp-content/uploads/2018/08/Crickmore-Iconea20081.pdf)).
- **Figures 5–6** tabulate the **tightening** and **loosening** cycles: for each heptachord, the **tritone dichord** (string numbers) and which strings to **tighten** (Fig. 5) or **loosen** (Fig. 6). Crickmore cites **R. J. Dumbrill** for elucidation of the tablet’s logic.
- **Closure:** After seven tightenings, the cycle returns to **išartum** **transposed up a semitone**; the loosening path returns from **qablītum** to **išartum** **down a semitone**. The code represents these as optional `semitoneTranspose: ±1` on those edges only.
- Crickmore’s printed labels still show **nīš GABA.RI** in figures; this repo normalizes to **nīš tuḫri** (Mirelman & Krispijn).

## 4. Local copies of PDFs

Institutional PDFs may block automated download. Add papers locally under `references/` (optional):

- Mirelman & Krispijn 2009: SOAS Research Online record **30430** (eprint PDF when accessible).
- Kilmer 1984: Cambridge Core article PDF for *Iraq* 46(2).

## 5. Optional next philological step

Line-by-line alignment of `modulationUet74.ts` with **Gurney’s transliteration** of **UET VII 74** and **Mirelman & Krispijn (*Iraq* 71)** remains useful when editions are at hand. The **fourteen string-pairs** in `cbs10996Pairs.ts` follow **Crickmore Fig. 2** (after Kilmer’s reading of **CBS 10996**).
