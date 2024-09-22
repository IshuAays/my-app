import os
from flask import Flask, jsonify, request, render_template_string
import pymysql
from flask_cors import CORS
from werkzeug.utils import secure_filename
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from PyPDF2 import PdfReader
import google.generativeai as genai
import subprocess
import string
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)
# @cross_origin(origin='*');


# Database configuration
DB_HOST = 'sql12.freesqldatabase.com'
DB_USER = 'sql12732194'
DB_PASSWORD = '4ViuWQYNeB'
DB_NAME = 'sql12732194'
DB_PORT = 3306

genai.configure(api_key='AIzaSyDpNCG4qzI2NP11iz7aMBFgF0EVF1D9qp8')

def get_data_from_db(query):
    connection = pymysql.connect(host=DB_HOST,
                                user=DB_USER,
                                password=DB_PASSWORD,
                                database=DB_NAME,
                                port=DB_PORT)
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            return result
    finally:
        connection.close()


# Pre-process text (convert to lowercase, remove punctuation and stopwords)
def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
 
    # Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))
 
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    text = " ".join([word for word in text.split() if word not in stop_words])
 
    return text

@app.route('/')
def home():
    # Get data from the database
    data = get_data_from_db("SELECT * FROM myData1")  # Replace 'Data' with your actual table name

    # Render data as an HTML table
    html_table = "<table border='1'><tr><th>User ID</th><th>User Name</th><th>Email</th><th>Emp ID</th><th>Designation</th><th>Contact</th><th>Sick Leave</th><th>Earned Leave</th><th>Image</th></tr>"
    for row in data:
        html_table += f"<tr><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td><td>{row[5]}</td><td>{row[6]}</td><td>{row[7]}</td><td>{row[9]}</td></tr>"
    html_table += "</table>"

    return render_template_string('''
    <html>
    <head><title>Employee Data</title></head>
    <body>
        <h1>Employee Data</h1>
        {{ table|safe }}
    </body>
    </html>
    ''', table=html_table)


# Function to read resume file and extract text
def read_resume_text(resume_path):
    reader = PdfReader(resume_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

# Function to calculate ATS score based on cosine similarity
def calculate_ats_score(job_desc, resume_path):
    resume_text = read_resume_text(resume_path)
    # Preprocess both job description and resume text
    job_desc_clean = preprocess_text(job_desc)
    resume_text_clean = preprocess_text(resume_text)
    print(job_desc_clean,resume_text_clean)
    corpus = [job_desc_clean, resume_text_clean]
    # vectorizer = TfidfVectorizer()
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(corpus)
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    score = cosine_sim[0][0] * 100
    print(score)
    return score


@app.route('/upload', methods=['POST'])

def upload_files():
    print("Starting")
    if 'resumes' not in request.files or 'jobDesc' not in request.form:
        return jsonify({'error': 'Missing job description or resumes'}), 400

    job_desc = request.form['jobDesc']
    resumes = request.files.getlist('resumes')
    qualified_candidates = []

    print("got the data")

    for resume in resumes:
        resume_name = secure_filename(resume.filename)
        resume_path = os.path.join(app.config['UPLOAD_FOLDER'], resume_name)
        resume.save(resume_path)

            # Calculate ATS score using cosine similarity
        score = calculate_ats_score(job_desc, resume_path)
        # score = 70;

            # Append resume if score is greater than 60
        if score > 40:
            score = round(score,2)
            qualified_candidates.append({'name': resume_name, 'score': score})
        

    return jsonify({'qualifiedCandidates': qualified_candidates}) 


@app.route('/api/getLeaveData', methods=['GET'])
def get_leave_data():
    user_id = request.args.get('userId')  # Get the userId from query params

    # Query to get specific user data
    query = f"SELECT * FROM myData1 WHERE userId = {user_id}"  # Replace 'Data' with your actual table name
    data = get_data_from_db(query)

    if not data:
        return jsonify({'error': 'User not found'}), 404

    user_data = data[0]
    user_info = {
        'userId': int(user_data[0]),
        'userName': str(user_data[1]),
        'userMail': str(user_data[2]),
        'empId': str(user_data[3]),
        'Designation': str(user_data[4]),
        'Contact': str(user_data[5]),
        'sickLeave': int(user_data[6]),
        'earnedLeave': int(user_data[7]),
    }

    return jsonify(user_info)

@app.route('/api/check-login', methods=['POST'])
def check_login():
    data = request.json
    email = data.get('userMail')
    password = data.get('password')

    query = f"SELECT * FROM myData1 WHERE userMail = '{email}' AND password = '{password}'"  # Adjust table and columns as needed
    user_data = get_data_from_db(query)

    if not user_data:
        return jsonify({'exists': False, 'error': 'Invalid login details'}), 401

    user = user_data[0]
    user_info = {
        'exists': True,
        'user': {
            'userId': int(user[0]),
            'userName': str(user[1]),
            'userMail': str(user[2]),
            'empId': str(user[3]),
            'Designation': str(user[4]),
            'Contact': str(user[5]),
            'sickLeave': int(user[6]),
            'earnedLeave': int(user[7]),
            'image': str(user[9])
        }
    }

    return jsonify(user_info)

    

@app.route('/api/employees', methods=['GET'])
def get_employees():
    query = "SELECT userName, Designation, empId, userMail, Contact, image FROM myData1"  # Added 'image' to the query
    data = get_data_from_db(query)

    employees = [{'userName': row[0], 'Designation': row[1], 'empId': row[2], 'userMail': row[3], 'Contact': row[4], 'image': row[5]} for row in data]  # Include 'image' in the response

    return jsonify({
        'employees': employees,
        'totalEmployees': len(employees)
    })


# Configure upload folder for resumes
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def ensure_folder_exists(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        print(f"Folder created: {folder_path}")
    else:
        print(f"Folder already exists: {folder_path}")

# Ensure the uploads folder exists
ensure_folder_exists(UPLOAD_FOLDER)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



# LaTeX CV Template
def generate_latex_cv(data):
    latex_code = r'''
    \documentclass{article}
    \begin{document}
    \title{Curriculum Vitae}
    \author{''' + data.get('userName', '') + r'''}
    \maketitle
    \section*{Profile}
    ''' + data.get('profile', '') + r'''
    \section*{Skills}
    ''' + '\n'.join([f'\\textbf{{{skill["skill"]}}} - {skill["experience"]}' for skill in data.get('skills', [])]) + r'''
    \section*{Work Experience}
    ''' + '\n'.join([f'\\textbf{{{work["title"]}}} at {work["organization"]} - {work["timestamp"]}\\newline{work["description"]}\\newlineTechnologies: {", ".join([tech["tech"] for tech in work.get("technologies", [])])}\\newlineAchievements: {", ".join([ach["achievement"] for ach in work.get("achievements", [])])}' for work in data.get('workExperience', [])]) + r'''
    \section*{Internships}
    ''' + '\n'.join([f'\\textbf{{{internship["title"]}}} at {internship["organization"]} - {internship["timestamp"]}\\newline{internship["description"]}\\newlineTechnologies: {", ".join([tech["tech"] for tech in internship.get("technologies", [])])}\\newlineAchievements: {", ".join([ach["achievement"] for ach in internship.get("achievements", [])])}' for internship in data.get('internships', [])]) + r'''
    \section*{Projects}
    ''' + '\n'.join([f'\\textbf{{{project["title"]}}} at {project["organization"]} - {project["timestamp"]}\\newline{project["description"]}\\newlineTechnologies: {", ".join([tech["tech"] for tech in project.get("technologies", [])])}\\newlineAchievements: {", ".join([ach["achievement"] for ach in project.get("achievements", [])])}' for project in data.get('projects', [])]) + r'''
    \end{document}
    '''
    return latex_code

@app.route('/api/generate-job-description', methods=['POST'])
def generate_job_description():
    data = request.json
    designation = data.get('designation')
    experience = data.get('experience')
    techstack = data.get('techstack')
    preferred_location = data.get('preferred_location')

    # Use Generative AI to generate job description
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = (
            f"Write a job description for company AAYS for {designation} profile "
            f"for {experience} years experience with tech stack {techstack} "
            f"and Preferred Location {preferred_location}. Company mail is hr@aaysinsight.com. "
            "Don't include ** for bold. Don't summarize anything at the end."
        )
        response = model.generate_content(prompt)
        return jsonify({'jobDescription': response.text})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    



# Endpoint to generate CV
@app.route('/api/generate-cv', methods=['POST'])
def generate_cv():
    data = request.json
    latex_code = generate_latex_cv(data)
    
    cv_folder = os.path.join(UPLOAD_FOLDER, 'cvs')
    os.makedirs(cv_folder, exist_ok=True)

    tex_file_path = os.path.join(cv_folder, "temp_cv.tex")
    try:
        with open(tex_file_path, 'w') as f:
            f.write(latex_code)
    except Exception as e:
        print(f"Error saving LaTeX file: {str(e)}")
        return jsonify({'error': f"Error saving LaTeX file: {str(e)}"}), 500

    try:
        subprocess.run(['pdflatex', '-output-directory', cv_folder, tex_file_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error compiling LaTeX to PDF: {str(e)}")
        return jsonify({'error': f"Error compiling LaTeX to PDF: {str(e)}"}), 500

    pdf_file_path = os.path.join(cv_folder, "temp_cv.pdf")
    html_file_path = os.path.join(cv_folder, "temp_cv.html")
    try:
        subprocess.run(['pdf2htmlEX', pdf_file_path, html_file_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error converting PDF to HTML: {str(e)}")
        return jsonify({'error': f"Error converting PDF to HTML: {str(e)}"}), 500

    with open(html_file_path, 'r') as f:
        html_content = f.read()

    return jsonify({'cv_html': html_content})

# Endpoint for user CV download
@app.route('/api/download-cv/<filename>', methods=['GET'])
def download_cv(filename):
    file_path = os.path.join(UPLOAD_FOLDER, 'cvs', filename)
    if os.path.isfile(file_path):
        return app.send_static_file(file_path)
    return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app.run(port=3001, debug=True)
