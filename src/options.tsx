import React from 'react';
import { createRoot } from 'react-dom/client';

function Options(): JSX.Element {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
