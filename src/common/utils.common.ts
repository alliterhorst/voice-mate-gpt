import { StorageKeyEnum } from '../enum/storage-key.enum';

export function throwContextError(businessContext: string): void {
  throw new Error(
    `use${businessContext}Context deve ser utilizando dentro do ${businessContext}Provider`
  );
}

export function syncGetStorage(
  params: {
    storageKey: StorageKeyEnum;
    initialValue: any;
    setCallback: (value: any) => void;
  }[]
) {
  let items: { [key: string]: any } = {};
  const setters: {
    setCallback: (value: any) => void;
    storageKey: string;
  }[] = [];

  params.forEach(({ storageKey, initialValue, setCallback }) => {
    items[storageKey] = initialValue;
    setters.push({ setCallback, storageKey });
  });

  chrome.storage.sync.get(items, (items) => {
    setters.forEach(({ setCallback: setCallback, storageKey }) => {
      setCallback(items[storageKey]);
    });
  });
}

export function setStorage(
  params: {
    storageKey: StorageKeyEnum;
    value: any;
  }[],
  callback?: () => void
) {
  chrome.storage.sync.set(
    params.reduce((acc, { storageKey, value }) => {
      acc[storageKey] = value;
      return acc;
    }, {} as { [key: string]: any }),
    callback
  );
}
