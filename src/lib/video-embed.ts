export type VideoSource = { kind: "iframe" | "file"; src: string } | null;

export function toVideoSource(raw: string): VideoSource {
  const url = raw.trim();
  if (!url) return null;
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return { kind: "file", src: url };
  const ig = url.match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)/i);
  if (ig) return { kind: "iframe", src: `https://www.instagram.com/${ig[1] === "reels" ? "reel" : ig[1]}/${ig[2]}/embed/` };
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const tt = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/i);
  if (tt) return { kind: "iframe", src: `https://www.tiktok.com/embed/v2/${tt[1]}` };
  return { kind: "iframe", src: url };
}
