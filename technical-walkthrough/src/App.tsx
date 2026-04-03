import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DocLayout } from "./layouts/DocLayout";
import { HomePage } from "./pages/HomePage";
import { HeroPage } from "./pages/HeroPage";
import { AncientPage } from "./pages/AncientPage";
import { BinauralPage } from "./pages/BinauralPage";
import { CalmPage } from "./pages/CalmPage";
import { AcousticsPage } from "./pages/AcousticsPage";
import { PyramidsPage } from "./pages/PyramidsPage";
import { ReferencePage } from "./pages/ReferencePage";
import { DocRawPage } from "./pages/DocRawPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocLayout />}>
          <Route index element={<HomePage />} />
          <Route path="hero" element={<HeroPage />} />
          <Route path="ancient" element={<AncientPage />} />
          <Route path="binaural" element={<BinauralPage />} />
          <Route path="calm" element={<CalmPage />} />
          <Route path="acoustics" element={<AcousticsPage />} />
          <Route path="pyramids" element={<PyramidsPage />} />
          <Route path="reference" element={<ReferencePage />} />
          <Route path="docs/:slug" element={<DocRawPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
