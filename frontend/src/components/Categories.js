import React, { useState, useEffect } from "react";
import "../styles/Categories.css";

const Categories = ({ onCategorySelect }) => {
    const categories = [
        "engineering", "medical & health sciences", "economics", "arts & humanities", "science", "politics",
        "management", "exam/results", "sports", "upsc/government jobs", "commerce & finance", "History",
        "Music", "Psychology", "Health", "Environment", "Astronomy", "AI & ML"
    ];

    return (
        <div className="categories-container">
            <nav className="categories">
                {/* Passing null to fetch all news when 'All' is clicked */}
                <button className="category-btn" onClick={() => onCategorySelect("")}>
                    All
                </button>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="category-btn"
                        onClick={() => onCategorySelect(category)} // Pass category correctly
                    >
                        {category}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Categories;


