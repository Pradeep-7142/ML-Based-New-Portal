import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Use createRoot instead of render
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct way in React 18
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


