import pickle
import os
def spam_detector(text):
    # Define path to .pkl files relative to this script
    MODEL_PATH = "C:\\Users\\Pradeep Kumar\\Desktop\\ML-Based-New-Portal\\backend\\Spamdet\\news_classifier_model.pkl"
    VECTORIZER_PATH = "C:\\Users\\Pradeep Kumar\\Desktop\\ML-Based-New-Portal\\backend\\Spamdet\\tfidf_vectorizer.pkl"

    # Load model
    with open(MODEL_PATH, "rb") as model_file:
        model = pickle.load(model_file)

    # Load vectorizer
    with open(VECTORIZER_PATH, "rb") as vec_file:
        vectorizer = pickle.load(vec_file)

    # Test prediction
    sample_text = [text]
    sample_vector = vectorizer.transform(sample_text)
    prediction = model.predict(sample_vector)

    return ( "Fake" if prediction[0] == 1 else "Real")
