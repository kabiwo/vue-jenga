export const VjDownFile = (data: unknown, fileName: string, type?: string) => {
  const link = document.createElement("a");
  const blob = new Blob([data as BlobPart], type ? { type } : undefined);
  link.style.display = "none";
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const VjBlobToUrl = (data: unknown, type?: string) => {
  const blob = new Blob([data as BlobPart], type ? { type } : undefined);
  const url = URL.createObjectURL(blob);
  return url;
};

export const VjBlobToStr = (blob: Blob, encode?: string): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (e) => {
      throw e;
    };
    reader.readAsText(blob, encode || "utf-8");
  });
};