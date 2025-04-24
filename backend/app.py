from flask_cors import CORS
from database import connect_db
from scrapping import start_scraper  # DO NOT REMOVE 
from jobs import fetch_and_recommend_jobs  # DO NOT REMOVE 
from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import sql
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# DO NOT REMOVE 
start_scraper()
# # with app.app_context():  
# #     fetch_and_recommend_jobs()



@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    conn = connect_db()
    cur = conn.cursor()
    
    try:
        cur.execute(
            sql.SQL("""
                INSERT INTO users (
                    name, email, password, profession, college, 
                    year_of_study, branch, skills, interests
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """),
            (
                data.get('name'),
                data.get('email'),
                data.get('password'),
                data.get('profession'),
                data.get('college'),
                data.get('year_of_study'),
                data.get('branch'),
                data.get('skills'),
                data.get('interests')
            )
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({'success': True, 'userId': user_id}), 201
    except psycopg2.IntegrityError:
        return jsonify({'success': False, 'error': 'Email already exists'}), 400
    finally:
        cur.close()
        conn.close()



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    conn = connect_db()
    cur = conn.cursor()
    
    cur.execute(
        sql.SQL("""
            SELECT id, name, email, profession, skills, interests 
            FROM users 
            WHERE email = %s AND password = %s
        """),
        (email, password)
    )
    user = cur.fetchone()
    cur.close()
    conn.close()
    
    if user:
        return jsonify({
            'success': True,
            'user': {
                'id': user[0],
                'name': user[1],
                'email': user[2],
                'profession': user[3],
                'skills': user[4],
                'interests': user[5]
            }
        }), 200
    else:
        return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    
# To Show all the news  
@app.route("/news", methods=["GET"])
def get_news():
    category = request.args.get("category") 
    conn = connect_db()
    
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cur = conn.cursor()

    
    if category and category.strip():  
        cur.execute(
            "SELECT category, title, ntag, website, content, link, image_url FROM news WHERE category = %s ORDER BY timestamp DESC LIMIT 20",
            (category,)
        )
    else:
        
        cur.execute(
            "SELECT category, title, ntag, website, content, link, image_url FROM news ORDER BY timestamp DESC LIMIT 20"
        )

    news_data = cur.fetchall()
    cur.close()
    conn.close()

    
    news_list = [
        {
            "category": row[0],
            "title": row[1],
            "ntag":row[2],
            "website": row[3],
            "content": row[4],
            "link": row[5],
            "image_url": row[6]
        }
        for row in news_data
    ]
    
    return jsonify(news_list), 200

# To show all the jobs available
@app.route("/all-jobs")
def get_all_jobs():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, title, company, location, description, tags, url 
        FROM job_listings
    """)
    all_jobs = cur.fetchall()
    cur.close()
    conn.close()

    formatted = [
        {
            "title": job[1],
            "company": job[2],
            "location": job[3],
            "description": job[4],
            "tags": job[5],
            "url": job[6]
        }
        for job in all_jobs
    ]
    return jsonify(formatted)


# To get the recommedable jobs
def get_job_recommendations(user_id):
    conn = connect_db()
    cur = conn.cursor()
    
    # Get user data
    cur.execute("SELECT skills, interests FROM users WHERE id = %s", (user_id,))
    user_data = cur.fetchone()
    if not user_data:
        return []
    
    skills = user_data[0] or ''
    interests = user_data[1] or ''
    user_text = f"{skills} {interests}"
    
    # Get user preferences
    cur.execute("SELECT favorite_tags FROM user_preferences WHERE user_id = %s", (user_id,))
    pref_data = cur.fetchone()
    if pref_data and pref_data[0]:
        user_text += f" {pref_data[0]}"
    
    # Get all jobs
    cur.execute("SELECT id, title, company, description, tags FROM job_listings")
    jobs = cur.fetchall()
    
    if not jobs:
        return []
    
    # Prepare data for TF-IDF
    job_texts = [f"{job[1]} {job[2]} {job[3]} {job[4]}" for job in jobs]
    all_texts = [user_text] + job_texts
    
    # Vectorize text
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(all_texts)
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    sim_scores = list(enumerate(cosine_sim[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get top 5 jobs
    top_indices = [i[0] for i in sim_scores[:5]]
    recommended_jobs = [jobs[i] for i in top_indices]
    
    # Format response
    result = []
    for job in recommended_jobs:
        result.append({
            'id': job[0],
            'title': job[1],
            'company': job[2],
            'description': job[3],
            'tags': job[4]
        })
    
    cur.close()
    conn.close()
    return result

@app.route('/recommendations/<int:user_id>', methods=['GET'])
def recommendations(user_id):
    recommended_jobs = get_job_recommendations(user_id)
    return jsonify({'jobs': recommended_jobs})


if __name__ == '__main__':
    app.run(debug=True,host="localhost", port=5000,use_reloader=False)

