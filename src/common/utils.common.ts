/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
import StorageKeyEnum from '../enum/storage-key.enum';

export function throwContextError(businessContext: string): void {
  throw new Error(
    `use${businessContext}Context deve ser utilizando dentro do ${businessContext}Provider`,
  );
}

export function syncGetStorage(
  params: {
    storageKey: StorageKeyEnum;
    initialValue: any;
    setCallback: (value: any) => void;
  }[],
): void {
  const items: { [key: string]: any } = {};
  const setters: {
    setCallback: (value: any) => void;
    storageKey: string;
  }[] = [];

  params.forEach(({ storageKey, initialValue, setCallback }) => {
    items[storageKey] = initialValue;
    setters.push({ setCallback, storageKey });
  });

  chrome.storage.sync.get(items, result => {
    setters.forEach(({ setCallback, storageKey }) => {
      setCallback(result[storageKey]);
    });
  });
}

export function setStorage(
  params: {
    storageKey: StorageKeyEnum;
    value: any;
  }[],
  callback?: () => void,
): void {
  chrome.storage.sync.set(
    params.reduce(
      (acc, { storageKey, value }) => {
        acc[storageKey] = value;
        return acc;
      },
      {} as { [key: string]: any },
    ),
    callback,
  );
}

// Função para converter hex para RGB
function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  return rgbToHex(r, g, b);
}

export function generateGradient(startColor: string, endColor: string, steps: number): string[] {
  const colors: string[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;
    colors.push(interpolateColor(startColor, endColor, factor));
  }
  return colors;
}
