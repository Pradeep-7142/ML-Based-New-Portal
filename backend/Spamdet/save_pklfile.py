import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords

# Download stopwords if not already present
nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

# Clean text function
def clean_text(text):
    text = re.sub(r'\W', ' ', text)  # Remove non-word characters
    text = text.lower()
    text = " ".join([word for word in text.split() if word not in stop_words])
    return text

# Load partial fake data for memory efficiency
total_rows = sum(1 for _ in open("Fake.csv")) - 1
df_fake = pd.read_csv("Fake.csv", nrows=int(0.5 * total_rows))
df_true = pd.read_csv("True.csv")

# Assign labels
df_fake["label"] = 1  # Fake
df_true["label"] = 0  # True

# Combine and shuffle data
df = pd.concat([df_fake, df_true], axis=0).sample(frac=1, random_state=42).reset_index(drop=True)

# Apply text cleaning
df["clean_text"] = df["text"].astype(str).apply(clean_text)

# TF-IDF vectorization without .toarray()
vectorizer = TfidfVectorizer(max_features=10000, min_df=5, max_df=0.7)
X = vectorizer.fit_transform(df["clean_text"])
y = df["label"]

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train logistic regression model
model = LogisticRegression(solver='liblinear')
model.fit(X_train, y_train)

# Save vectorizer and model as .pkl files
with open("tfidf_vectorizer.pkl", "wb") as vec_file:
    pickle.dump(vectorizer, vec_file)

with open("news_classifier_model.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model saved! Accuracy: {accuracy * 100:.2f}%")
