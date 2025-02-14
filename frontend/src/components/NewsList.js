import React from "react";
import NewsCard from "./NewsCard";
import techImage from "../assets/tech-news.jpg";
import campusImage from "../assets/campus.jpg";
import educationImage from "../assets/education.jpg";

const trendingNews = [
    { category: "Technology", title: "New AI Breakthrough", image: techImage },
    { category: "Campus", title: "New Library Opening", image: campusImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Education", title: "Future of Learning", image: educationImage },
    { category: "Education", title: "Future of Learning", image: educationImage }
];

const weeklyNews = [
    { category: "Research", title: "New Grant Opportunities" },
    { category: "Events", title: "Student Achievement Awards" },
    { category: "Academic", title: "Course Registration Deadlines" },
    { category: "Science", title: "Quantum Computing Advances" },
    { category: "Business", title: "Stock Market Insights" },
    { category: "Business", title: "Stock Market Insights" },
    { category: "Business", title: "Stock Market Insights" },
    { category: "Business", title: "Stock Market Insights" },
    { category: "Business", title: "Stock Market Insights" },
    { category: "Business", title: "Stock Market Insights" },
    { category: "Business", title: "Stock Market Insights" }
];

const monthlyNews = [
    { category: "Law", title: "New Laws for Education" },
    { category: "Social Sciences", title: "New Study on Student Psychology" },
    { category: "Health", title: "Mental Well-being in College" },
    { category: "Finance", title: "Student Loan Updates" },
    { category: "Sports", title: "Upcoming College Tournaments" },
    { category: "Sports", title: "Upcoming College Tournaments" },
    { category: "Sports", title: "Upcoming College Tournaments" },
    { category: "Sports", title: "Upcoming College Tournaments" },
    { category: "Sports", title: "Upcoming College Tournaments" },
    { category: "Sports", title: "Upcoming College Tournaments" },
    { category: "Sports", title: "Upcoming College Tournaments" }
];

const rightSideNews = [
    { category: "Exclusive", title: "Interview with College Dean" },
    { category: "Updates", title: "New Scholarship Program Announced" },
    { category: "Insights", title: "Top Skills for College Graduates" },
    { category: "Opportunities", title: "Internships at Top Companies" },
    { category: "Opinion", title: "How Students Can Influence Policy" },
    { category: "Global", title: "Latest Trends in Education" },
    { category: "Campus", title: "New Hostel Rules Announced" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" },
    { category: "Funding", title: "Government Funds for Research" }
];

const NewsList = () => {
    return (
        <section className="news-section">
            
            <div className="news-layout">
                {/* Left Side - Three Scrollable Sections */}
                <div className="news-left">
                    <div className="news-category trending">
                        <h3>Trending News</h3>
                        <div className="news-container">
                            {trendingNews.map((news, index) => (
                                <NewsCard key={index} {...news} />
                            ))}
                        </div>
                    </div>

                    <div className="news-category weekly">
                        <h3>Weekly News</h3>
                        <div className="news-container">
                            {weeklyNews.map((news, index) => (
                                <NewsCard key={index} {...news} />
                            ))}
                        </div>
                    </div>

                    <div className="news-category monthly">
                        <h3>Monthly News</h3>
                        <div className="news-container">
                            {monthlyNews.map((news, index) => (
                                <NewsCard key={index} {...news} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Taller Scrollable Section Matching Left Height */}
                <div className="news-right">
                    <h3>Featured News</h3>
                    <div className="news-right-container">
                        {rightSideNews.map((news, index) => (
                            <NewsCard key={index} {...news} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsList;
