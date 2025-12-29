import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../index.css';


const tables = document.getElementsByClassName("row flex");

if (tables.length > 0) {
  const rootContainer = document.createElement("div");
  rootContainer.id = "my-extension-root";
  
  tables[0].prepend(rootContainer);

  ReactDOM.createRoot(rootContainer).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("ターゲット要素が見つかりません。");
}


const flashDiv = document.createElement("div");
flashDiv.id = "flash-effect";
document.body.appendChild(flashDiv);