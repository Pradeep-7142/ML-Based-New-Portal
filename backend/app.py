from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from database import connect_db
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# 🔹 User Signup API
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    conn = connect_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()

    # Check if email already exists
    cur.execute("SELECT * FROM users WHERE email = %s", (data["email"],))
    if cur.fetchone():
        return jsonify({"error": "Email already registered"}), 400

    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")

    # Insert user data
    cur.execute("""
        INSERT INTO users (name, email, password, profession, college, year_of_study, branch)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (data["name"], data["email"], hashed_password, data["profession"], data["college"], data["year_of_study"], data["branch"]))

    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({"message": "Signup successful!"}), 201

# 🔹 User Login API
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = connect_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE email = %s", (data["email"],))
    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user or not check_password_hash(user[0], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401
    
    return jsonify({"message": "Login successful"}), 200

if __name__ == "__main__":
    app.run(debug=True)
