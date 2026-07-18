export function cleanMarkdownFromText(text) {
  if (!text) return text;
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/^[-•]\s+/gm, '')
    .replace(/^• /gm, '')
    .replace(/__/g, '')
    .replace(/`/g, '')
    .replace(/~/g, '')
    .replace(/#+\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();
}
