from flask import  jsonify
import requests
import psycopg2
import time  


def fetch_and_recommend_jobs():
    def fetch_jobs_in_india(query):
        url = "https://jsearch.p.rapidapi.com/search"
        querystring = {
            "query": query,
            "location": "India",
            "num_pages": "1"
        }
        headers = {
            "X-RapidAPI-Key": "f563fcb93cmsh301bd229d947d6cp1ee8a8jsn3fe44358d017",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()

    def insert_jobs_to_db(job_data):
        conn = psycopg2.connect(
            dbname="mlDatabase",
            user="postgres",
            password="1234pradeep",
            host="localhost",
            port="5432"
        )
        cur = conn.cursor()

        for job in job_data.get("data", []):
            title = job.get("job_title", "Not available")
            company = job.get("employer_name", "Not available")
            location = job.get("job_city", "Not available")
            description = job.get("job_description", "Not available")
            tags = ", ".join(job.get("job_tags", [])) if job.get("job_tags") else "Not available"
            url = job.get("job_apply_link", "Not available")

            # ✅ Check if a job with the same title already exists
            cur.execute("SELECT 1 FROM job_listings WHERE title = %s", (title,))
            if cur.fetchone():
                continue  # Skip this job if title already exists

            # Insert only if title is unique
            cur.execute("""
                INSERT INTO job_listings (title, company, location, description, tags, url)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (title, company, location, description, tags, url))

        conn.commit()
        cur.close()
        conn.close()
        print("✅ Job data inserted successfully!")

    # ✅ Add queries for various fields
    job_fields = [
        "software engineer India",
        "data analyst India",
        "medical officer India",
        "nurse India",
        "pharmacist",
        "government jobs India",
        "civil services India",
        "banking sector India",
        "defence jobs India",
        "teaching jobs India",
        "research assistant India",
        "law officer India",
        "environmental science India"
    ]

    # 🔁 Fetch and insert data for each field
    for field in job_fields:
        print(f"📡 Fetching jobs for: {field}")
        data = fetch_jobs_in_india(field)
        insert_jobs_to_db(data)
        time.sleep(2)  # 🕒 Sleep for 2 seconds to avoid API rate limits

    