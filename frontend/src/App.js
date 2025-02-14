import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import NewsList from "./components/NewsList";
import Footer from "./components/Footer";
import "./styles.css"; // ✅ Import global styles

const App = () => {
    return (
        <div>
            <Header />
            <Categories />
            <NewsList />
            <Footer />
        </div>
    );
};

export default App;
