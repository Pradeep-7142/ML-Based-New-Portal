import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Categories from "./Categories"; // Using existing categories only!
import AllJobs from "./AllJobs";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/news")
            .then((response) => response.json())
            .then((data) => {
                setNews(data);
                setFilteredNews(data); // Show all news initially
            })
            .catch((error) => console.error("Error fetching news:", error));
    }, []);

    const handleCategorySelect = (category) => {
        if (category === "") {
            setFilteredNews(news); // Show all news if no category is selected
        } else {
            setFilteredNews(news.filter((item) => item.category === category));
        }
    };

    return (
        <section className="news-section">
            {/* ✅ Using existing categories component—NO extra ribbons */}
            <Categories onCategorySelect={handleCategorySelect} />
            <div className="news-layout">
                <div className="news-left">
                    <div className="news-category trending">
                        <div class="marquee-container">
                            <div class="marquee-content">Trending News</div>
                        </div>
                        <div className="news-container">
                            {filteredNews.slice(0, 12).map((item, index) => (
                                <NewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                    <div className="news-category weekly">
                        <div class="marquee-container">
                            <div class="marquee-content">Weekly News</div>
                        </div>
                        <div className="news-container">
                            {filteredNews.slice(12, 24).map((item, index) => (
                                <NewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    <div className="news-category monthly">
                        <div class="marquee-container">
                            <div class="marquee-content">Monthly News</div>
                        </div>
                        <div className="news-container">
                            {filteredNews.slice(24, 40).map((item, index) => (
                                <NewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="news-right">
                    <h3>Available-Jobs</h3>
                    <div className="news-right-container">
                        <AllJobs />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsList;

