import React from "react";

const NewsCard = ({ category, title, image }) => {
    return (
        <div className="news-card">
            {image && <img src={image} alt={title} />}
            <span className="category">{category}</span>
            <p>{title}</p>
        </div>
    );
};

export default NewsCard;
