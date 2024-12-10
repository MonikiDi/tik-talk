export function  normalizationText(text: string) {
  return text.replace(/\n+/g, '\n') === '\n' ? '' : text
}
