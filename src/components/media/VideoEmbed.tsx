interface VideoEmbedProps {
  title: string;
  src: string;
}

export const VideoEmbed = ({ title, src }: VideoEmbedProps) => (
  <div className="aspect-video overflow-hidden rounded-xl border border-border/40">
    <iframe
      title={title}
      src={src}
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default VideoEmbed;
