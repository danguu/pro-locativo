export interface MapProps {
  title: string;
  iframeSrc: string;
  address: string;
}

export const Map = ({ title, iframeSrc, address }: MapProps) => (
  <section className="container-responsive page-section" aria-labelledby="map-heading">
    <div className="section-heading">
      <p className="section-heading__subtitle">Ubicación</p>
      <h2 id="map-heading" className="section-heading__title">
        {title}
      </h2>
      <p className="section-heading__description">{address}</p>
    </div>
    <div className="overflow-hidden rounded-3xl border border-border/70">
      <iframe
        src={iframeSrc}
        title={title}
        aria-label={`Mapa de ${address}`}
        loading="lazy"
        className="h-[420px] w-full"
        allowFullScreen
      />
    </div>
  </section>
);

export default Map;
