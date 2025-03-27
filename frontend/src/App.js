import React from "react";
import Header from "./components/Header";
import NewsList from "./components/NewsList";
import Footer from "./components/Footer";
import "./styles.css"; // ✅ Import global styles

const App = () => {
    return (
        <div>
            <Header />
            <NewsList />
            <Footer />
        </div>
    );
};

export default App;

