import requests
import schedule
import time
from datetime import datetime, timedelta
from database import connect_db
from classifier import TextScraperClassifier  # Import the class
from News_class import catg as categories  # Import categories
scraper = TextScraperClassifier(categories) # instance
import summarize
from Spam_Detector import spam_detector

NEWS_API_KEY = "pub_706477834058cf274564c45148f9b306b1b55"
NEWS_API_URL = "https://newsdata.io/api/1/news"

NEWS_SOURCES = [
    {"category": "Education"},
    {"category": "Jobs"},
    {"category": "Engineering"},
    {"category": "Medical"},
    {"category": "Science"},
    {"category": "Technology"}
]

def fetch_news():
    try:
        conn = connect_db()
        cur = conn.cursor()
        
        for source in NEWS_SOURCES:
            try:
                params = {
                    "apikey": NEWS_API_KEY,
                    "category": source["category"],
                    "country": "IN",
                    "language": "en"
                }
                response = requests.get(NEWS_API_URL, params=params)
                
                if response.status_code != 200:
                    print(f"Failed to fetch news for category {source['category']}")
                    continue
                
                data = response.json()
                
                for article in data.get("results", []):
                    title = article.get("title", "Unknown Title")
                    link = article.get("link", "")
                    result=scraper.process_url(link)
                    summary=summarize.summarize_text(result['filtered_text'])
                    ntag=spam_detector(result['filtered_text'])
                    content = summary['detected_context']
                    source_name = article.get("source_id", "Unknown Source")
                    image_url = article.get("image_url", None)  # Fetch image URL
                    
                    if title and content:
                        cur.execute("""
                            INSERT INTO news (website, category, title, ntag, link, content, image_url)
                            VALUES (%s, %s, %s, %s, %s, %s, %s)
                            ON CONFLICT (title) DO NOTHING;
                        """, (source_name, result['category'], title, ntag, link, content, image_url))
            
            except Exception as e:
                print(f"Error fetching news for category {source['category']}: {e}")
        
        conn.commit()
        cur.close()
        conn.close()
        print("News data updated.")
    
    except Exception as e:
        print(f"Database connection error: {e}")

def delete_old_news():
    try:
        conn = connect_db()
        cur = conn.cursor()
        one_month_ago = datetime.now() - timedelta(days=30)
        cur.execute("DELETE FROM news WHERE timestamp < %s;", (one_month_ago,))
        conn.commit()
        cur.close()
        conn.close()
        print("Old news deleted.")
    
    except Exception as e:
        print(f"Error deleting old news: {e}")

def run_scheduler():
    print("Scheduler started...")
    schedule.every().day.at("15:24").do(fetch_news)
    schedule.every().day.at("06:30").do(delete_old_news)
    
    while True:
        schedule.run_pending()
        time.sleep(60)

def start_scraper():
    import threading
    scraper_thread = threading.Thread(target=run_scheduler, daemon=True)
    scraper_thread.start()

