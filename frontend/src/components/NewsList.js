import React from "react";
import NewsCard from "./NewsCard";
import techImage from "../assets/tech-news.jpg";
import campusImage from "../assets/campus.jpg";
import educationImage from "../assets/education.jpg";

const newsData = [
    { category: "Technology", title: "New AI Breakthrough", image: techImage },
    { category: "Campus", title: "New Library Opening", image: campusImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Research", title: "New Grant Opportunities" },
    { category: "Events", title: "Student Achievement Awards" },
    { category: "Academic", title: "Course Registration Deadlines" },
    { category: "Law", title: "New Laws for Education" },
    { category: "Science", title: "Quantum Computing Advances" },
    { category: "Social Sciences", title: "New Study on Student Psychology" },
    { category: "Business", title: "Stock Market Insights" }
];

const NewsList = () => {
    return (
        <section className="news-section">
            <h2>Latest News</h2>
            <div className="news-container">
                {newsData.map((news, index) => (
                    <NewsCard key={index} {...news} />
                ))}
            </div>
        </section>
    );
};

export default NewsList;
