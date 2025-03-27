// import React from "react";

// const NewsCard = ({ category, title, website, link, image_url }) => {
//     return (
//         <div className="news-card">
//             {image_url && <img src={image_url} alt={title} className="news-image" />}
//             <span className="category">{category} - {website}</span>
//             <p>{title}</p>
//             <a href={link} target="_blank" rel="noopener noreferrer">Read More</a>
//             <button className="summary-button">Summary</button> {/* Added Summary Button */}
//         </div>
//     );
// };

// export default NewsCard;

import React, { useState } from "react";
import "./SummaryModal.css"; // Make sure to create this CSS file

const NewsCard = ({ category, title, website, content, link, image_url, summaryData }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const toggleSummary = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };

  return (
    <div className="news-card">
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

      {/* Summary Modal */}
      {isSummaryOpen && (
        <div className="summary-modal">
          <div className="summary-content">
            <h2>Summary</h2>
            <p>{content || "No summary available for this article."}</p>
            <button onClick={toggleSummary} className="summary-close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
