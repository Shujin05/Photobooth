import { toPng } from "html-to-image";

export async function exportStrip(
  element: HTMLElement,
  filename = "photo-strip.png"
) {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  });

  const link = document.createElement("a");

  link.download = filename;
  link.href = dataUrl;

  link.click();
}