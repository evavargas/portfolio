export async function probeResumeFile(href: string, available: boolean) {
  if (!available) {
    return false;
  }

  try {
    const head = await fetch(href, { method: "HEAD", cache: "no-store" });
    if (head.ok) {
      return true;
    }

    if (head.status === 405 || head.status === 501) {
      const ranged = await fetch(href, {
        method: "GET",
        cache: "no-store",
        headers: { Range: "bytes=0-0" },
      });
      return ranged.ok || ranged.status === 206;
    }

    return false;
  } catch {
    return false;
  }
}

export function triggerBrowserDownload(href: string, fileName: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
