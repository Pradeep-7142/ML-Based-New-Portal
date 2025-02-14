import React from "react";
import "./Categories.css"; // Keep styles in a separate file

const Categories = () => {
    const categories = [
        "Engineering", "Medicine", "Business", "Arts", "Science", "Technology",
        "Law", "Education", "Sports", "Politics", "Finance", "History",
        "Music", "Psychology", "Health", "Environment", "Astronomy", "AI & ML"
    ];

    return (
        <div className="categories-container">
            <nav className="categories">
                {categories.map((category, index) => (
                    <button key={index} className="category-btn">{category}</button>
                ))}
            </nav>
        </div>
    );
};

export default Categories;
