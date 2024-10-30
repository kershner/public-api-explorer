export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => console.log('Copied to clipboard'),
      (err) => console.error('Failed to copy text: ', err)
    );
  } else {
    console.warn('Clipboard API not supported');
  }
}