import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

async function mountApp() {
  // 개발 모드에서만 실행
  if(process.env.NODE_ENV === "development") {
    const { worker } = require("./mock/browser"); // mock 브라우저에서 worker를 가져옴
    await worker.start(); // mock 서버 시작
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// worker.start()를 비동기적으로 호출하기 위해 render와 하나의 함수로 묶음
mountApp();