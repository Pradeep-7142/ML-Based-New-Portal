import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/SummaryModal.css"; 
import "../styles/NewsCard.css"

const NewsCard = ({ category, title, ntag, website, content, link, image_url }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const toggleSummary = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };

  return (
    <>
      <div className="news-card">
        <li>Tagged As- {ntag}</li>
        {image_url && <img src={image_url} alt={title} className="news-image" />}
        <span className="category">
          {category} - {website}
        </span>
        <p>{title}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
        
        <button className="summary-button" onClick={toggleSummary}>
          Summary
        </button>
      </div>

      {/* Summary Modal rendered outside */}
      {isSummaryOpen &&
        ReactDOM.createPortal(
          <div className="summary-modal" onClick={toggleSummary}>
            <div className="summary-content" onClick={(e) => e.stopPropagation()}>
              <h2>Summary</h2>
              <p>{content || "No summary available for this article."}</p>
              <button onClick={toggleSummary} className="summary-close-btn">
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default NewsCard;
