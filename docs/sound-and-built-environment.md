# Sound and “cities built with sound”

**lost civilizations shaped stone with resonance**, **whole cities were “built with sound”**, and **specific Hz levitate blocks**. This note states **what physics allows** and **what archaeology sometimes measures**.

## 1. What people usually mean

| Claim | Closer to… |
|--------|------------|
| “They tuned temples to a cosmic note” | **Archaeoacoustics**: some sites show **measurable** echoes, focus of sound, or resonances that may have mattered ritually.|
| “Sound lifted megaton blocks” | Maybe |
| “The city was designed around sound” | Sometimes **true in a modern sense**: **urban acoustics** (highways, facades, concert halls, quiet zones).|

So: **real** connections between **built space and sound** are about **reflection, absorption, resonance, and human perception**

## 2. How sound actually “works” on buildings

### Reflection and materials

Hard, smooth surfaces **reflect** most energy; porous or heavy limp materials **absorb** or **transmit**. Shape steers reflections (domes, niches, parabolic whispering walls).

### Room modes (standing waves)

In an enclosed volume, certain **frequencies** fit as **standing waves** between walls. Those are **room modes** (resonances). They depend on **geometry** and **speed of sound** in air (roughly **343 m/s** at ~20 °C, varying with temperature and humidity).

A rectangular box is the textbook model: each triple of integers \((n_x,n_y,n_z)\) labels a mode; its frequency is

\[
f = \frac{c}{2}\sqrt{\left(\frac{n_x}{L_x}\right)^2 + \left(\frac{n_y}{L_y}\right)^2 + \left(\frac{n_z}{L_z}\right)^2}
\]

with lengths \(L_x,L_y,L_z\) in metres. That is why **room dimensions “tune”** which bass notes boom or cancel—studio designers and concert halls care about this.

### Plates and “Chladni” patterns

On a **stiff plate** driven at a resonance, **sand or powder** collects on **nodal lines** (places with little motion). The resulting **Chladni figures** are real physics (vibration + friction), popular demos, and sometimes over-interpreted as “sacred geometry” of lost tech.

### Cymatics

**Cymatics** is the study of **visible patterns** from vibration (liquids, plates, grains). Again: **legitimate visualization** of wave phenomena; **not** evidence that ancient builders used cymatics to **cut or lift** stone without tools.

## 3. Archaeoacoustics (selected, cautious)

Researchers have measured **clap echoes**, **reverberation**, and **transmission** at some prehistoric and historic sites (e.g. certain **chambers**, **caves**, **theaters**). **intentional ritual design** What *is* settled is that humans notice dramatic acoustics and often **reuse** them culturally.

## 4. What this repository’s code does

The scripts:

1. **`roomModes`** — Lists low **rectangular room modes** so you can see how **geometry picks frequencies** (related to real studio/acoustics work, not to levitation).
2. **`chladniApprox`** — Draws a **crude 2D nodal pattern** for a simply supported square plate mode \((n,m)\). Good for **intuition**.

Use them to **explore** “how could a *space* or *plate* respond to tones?”

## 5. Further reading (mainstream)

- Room acoustics and modes: classic texts on **architectural acoustics** (e.g. Sabine, later ISO/EBU practice for studios).
- Archaeoacoustics: search for peer-reviewed papers on **specific sites**; treat single-source viral claims skeptically.
- Chladni / vibration: undergraduate **mechanics / acoustics** texts.

---

*This project’s Babylonian tuning work (`docs/philology-iraq-sources.md`) concerns **string theory***
