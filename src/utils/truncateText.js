export function truncateText(text) {
  if (text.length > 15) {
    const truncatedText = text.substr(0, 15);
    return truncatedText + "...";
  }
  return text;
}
