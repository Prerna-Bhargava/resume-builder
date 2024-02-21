import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ResumeProvider } from './context/ResumeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ResumeProvider>
      <App />
    </ResumeProvider>

);
reportWebVitals();
