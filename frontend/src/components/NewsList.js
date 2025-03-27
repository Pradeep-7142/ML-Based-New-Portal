import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Categories from "./Categories"; // Using existing categories only!

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
                        <h3>Trending News</h3>
                        <div className="news-container">
                            {filteredNews.map((item, index) => (
                                <NewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    <div className="news-category weekly">
                        <h3>Weekly News</h3>
                        <div className="news-container">
                            {filteredNews.map((item, index) => (
                                <NewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    <div className="news-category monthly">
                        <h3>Monthly News</h3>
                        <div className="news-container">
                            {filteredNews.map((item, index) => (
                                <NewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="news-right">
                    <h3>Featured News</h3>
                    <div className="news-right-container">
                        {filteredNews.map((item, index) => (
                            <NewsCard key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsList;

