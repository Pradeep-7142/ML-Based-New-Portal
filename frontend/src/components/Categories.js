
import React from "react";
import "./Categories.css"; // No changes to styles

const Categories = ({ onCategorySelect }) => {
    const categories = [
        "Engineering", "Medicine", "Business", "Arts", "Science", "Technology",
        "Law", "Education", "Sports", "Politics", "Finance", "History",
        "Music", "Psychology", "Health", "Environment", "Astronomy", "AI & ML"
    ];

    return (
        <div className="categories-container">
            <nav className="categories">
                <button className="category-btn" onClick={() => onCategorySelect("")}>
                    All
                </button>
                {categories.map((category, index) => (
                    <button key={index} className="category-btn" onClick={() => onCategorySelect(category)}>
                        {category}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Categories;

