import React from "react";

const NewsCard = ({ category, title, website, link }) => {
    return (
        <div className="news-card">
            <span className="category">{category} - {website}</span>
            <p>{title}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
    );
};

export default NewsCard;



