import requests
from bs4 import BeautifulSoup
import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tag import pos_tag
from collections import defaultdict
from News_class import catg
# Download NLTK resources if not available
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')


from News_class import catg as categories
class TextScraperClassifier:
    def __init__(self, categories):
        self.categories = categories
        self.stop_words = set(stopwords.words('english'))
    
    def clean_text(self, html):
        soup = BeautifulSoup(html, "html.parser")

        # Remove script and style tags
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()

        # Extract main content
        paragraphs = soup.find_all("p")  # Fetch paragraphs instead of body text
        text = " ".join(p.get_text() for p in paragraphs if len(p.get_text().split()) > 5)  # Ignore small lines
        return text.strip() if text else ""


    def scrape_text_from_url(self, url):
        try:
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(url, headers=headers, timeout=100)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                return soup.get_text(separator="\n", strip=True)  # Extracts visible text
        except requests.exceptions.RequestException as e:
            print(f"Error fetching the webpage: {e}")
        return None
    def filter_text(self, text):
        text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove numbers and special characters
        line_list = text.split("\n")
        
        main_line  = [line.lower() for line in line_list if len(line.split())>5]
        unique_lines = []
        for line in main_line:
            if line not in unique_lines:
                unique_lines.append(line)
        text = "\n".join(unique_lines)
        words = word_tokenize(text.lower())  # Convert to lowercase for better matching
        words = [word for word in words if word not in self.stop_words and len(word) >= 4]
        filtered_words = [word for word, pos in pos_tag(words) if pos not in ['CC', 'DT', 'IN', 'TO', 'PRP', 'PRP$', 'MD']]
        return ' '.join(filtered_words)

    def classify_text(self, text):
        category_scores = defaultdict(int)
        for category, keywords in self.categories.items():
            for keyword in keywords:
                if keyword in text:
                    # print([category,keyword])
                    category_scores[category] += 1

        # Force classify as "Politics" if no match
        return max(category_scores, key=category_scores.get)
    
    def process_url(self, url):
        scraped_text = self.scrape_text_from_url(url)
        if scraped_text:
            filtered_text = self.filter_text(scraped_text)
            category = self.classify_text(filtered_text)
            return {"filtered_text": filtered_text, "category": category}
        return None


