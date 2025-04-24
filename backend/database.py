import psycopg2
from config import DATABASE_CONFIG

def connect_db():
    try:
        conn = psycopg2.connect(**DATABASE_CONFIG)
        return conn
    except Exception as e:
        print("Database connection error:", e)
        return None

def create_users_table():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users  (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                profession VARCHAR(100),
                college VARCHAR(200),
                year_of_study INT,
                branch VARCHAR(100),
                skills TEXT,
                interests TEXT
            );
        """)
        conn.commit()
        cur.close()
        conn.close()


def create_table():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS news  (
                id SERIAL PRIMARY KEY,
                website VARCHAR(255),
                category VARCHAR(100),
                title TEXT UNIQUE,
                ntag TEXT,
                link TEXT,
                content TEXT,
                image_url TEXT,  -- Added image_url column
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        conn.commit()
        cur.close()
        conn.close()

# new
def create_job_table():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE if not exists job_listings  (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) ,
            company VARCHAR(100),
            location VARCHAR(100),
            description TEXT,
            tags VARCHAR(200),
            url VARCHAR(300)
        );
        """)
        conn.commit()
        cur.close()
        conn.close()

def create_prefrence_table():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE if not exists user_preferences  (
            id SERIAL PRIMARY KEY,
            user_id INT,
            clicked_jobs TEXT,
            favorite_tags VARCHAR(200)
        );
        """)
        conn.commit()
        cur.close()
        conn.close()
# Run this once to ensure the table exists
create_users_table()
create_table()
create_prefrence_table()
create_job_table()