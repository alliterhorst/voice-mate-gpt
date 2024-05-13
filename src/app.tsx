import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => (
  <div>
    <h1>Voice Mate GPT - Test Page</h1>
  </div>
);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
