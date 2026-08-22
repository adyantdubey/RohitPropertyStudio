/* Build-time artboards. Rendered headlessly to generate /public/brand images,
   then this route is removed before shipping. */
import "./brandkit.css";
import { AmbientBackdrop } from "../components/AmbientBackdrop";

export const metadata = { robots: { index: false, follow: false } };

function Cover({ id, w, h, scale }: { id: string; w: number; h: number; scale: number }) {
  return (
    <div className="board" id={id} style={{ width: w, height: h }}>
      <div className="board__grid" />
      <div className="board__glow" />
      <div className="board__towers" aria-hidden="true">
        <span className="tower tower--a" />
        <span className="tower tower--b" />
        <span className="tower tower--c" />
        <span className="tower tower--d" />
      </div>
      <div className="board__inner" style={{ fontSize: `${scale}px` }}>
        <div className="board__top">
          <span className="board__mark">RK</span>
          <span className="board__brand">Rohitt Kumar Singh<em>Real Estate Academy</em></span>
        </div>
        <div className="board__mid">
          <span className="board__eyebrow">Foundational visual course</span>
          <h1 className="board__title">Basics of<br />Real Estate</h1>
          <p className="board__lede">Learn the language of property before you sell, advise or invest.</p>
        </div>
        <div className="board__foot">
          <span>49-slide visual training deck</span>
          <span>Hundred Yards Realtor Pvt Ltd · Bengaluru</span>
        </div>
      </div>
    </div>
  );
}

export default function BrandKitPage() {
  return (
    <main className="brandkit">
      <Cover id="cover" w={1600} h={900} scale={16} />
      <Cover id="og" w={1200} h={630} scale={12.6} />
      <div className="board" id="poster" style={{ width: 1600, height: 900 }}>
        <AmbientBackdrop />
      </div>
    </main>
  );
}
