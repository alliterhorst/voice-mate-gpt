import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';

function Popup(): JSX.Element {
  const colorInputRef = useRef(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    navigator.clipboard.writeText(e.target.value);
  };

  return (
    <div>
      <p>Hello World</p>
      <input ref={colorInputRef} type="color" onChange={handleColorChange} />
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
