from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

# Define the allowed origins for CORS (replace with your specific needs)
# Example: Allow requests from a frontend running on localhost:3000
app.config['CORS_ORIGINS'] = ['http://localhost:3000']

# Specify the directory to store uploaded files
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Helper function to check allowed file extensions


def allowed_file(filename):
    allowed_extensions = {'txt', 'pdf', 'jpg', 'jpeg', 'png'}
    return '.' in filename and filename.rsplit(
        '.', 1)[1].lower() in allowed_extensions

# Example GET request
@app.route('/', methods=['GET'])
def get_data():
    data = {"message": "This is a GET request response."}
    return jsonify(data), 200

# Example POST request with JSON data
@app.route('/', methods=['POST'])
def post_data():
    try:
        data = request.get_json()
        return jsonify(data), 201
    except Exception as e:
        return jsonify({
            "error": "Invalid JSON data",
            "message": e
        }), 400

# Example POST request with form data
@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        # Check if the POST request has the 'file' and 'description' fields
        if 'file' not in request.files or 'description' not in request.form:
            return jsonify(
                {"error": "File and description fields are required"}), 400

        file = request.files['file']
        description = request.form['description']

        # Check if the file is allowed and has a filename
        if file and allowed_file(file.filename):
            # Securely save the uploaded file
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # You can store the description and filename in a database or
            # perform other actions here

            return jsonify(
                {
                    "message": "File uploaded successfully",
                    "description": description, "filename": filename
                }
            ), 201
        else:
            return jsonify({"error": "Invalid file or file type"}), 400
    except Exception as e:
        return jsonify(
            {
                "error": "An error occurred while processing the request",
                "message": e
            }
        ), 500


##############################################
# TODO: Implement the following endpoints
'''
Blog:
- create a post endpoint: blogs/post
- create a connection to local mysql database, (please try to use class component)
- test on posting the data
- store the data
- try to make it asynchronous (optional) 
- can you implement threads? (optional)
'''
##############################################
# !Imp: Please do test the code before pushing:
# - Run command: python -m flask --app app run --port=3700 --reload
# - Fix Lint: python -m autopep8 --in-place --aggressive --aggressive app.py
# - Test command: python -m flake8 app.py