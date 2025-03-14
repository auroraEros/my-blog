export function truncateText(srt, length) {
  if (srt.length < length) return srt;
  return srt.slice(0, length) + "...";
}
