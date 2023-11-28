from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from lib.mysql import cursor, __test__
from utils.TimeNow import TimeNow

app = Flask(__name__)
CORS(app)
__test__()
# Define the allowed origins for CORS (replace with your specific needs)
# Example: Allow requests from all origins
app.config['CORS_ORIGINS'] = '*'
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

#get methods 

@app.route('/', methods=['GET']) #get all the data from 'blogs' table
def get_data():
    cursor.execute("SELECT * FROM `blogs`")
    data = cursor.fetchall()
    return jsonify(data), 200


@app.route('/get_one', methods=['GET']) # Get the data with spacific'id' from the query parameters of'blogs' table
def get_one_data():
    blog_id = request.args.get('id', type=int)
    if not blog_id:
        return jsonify({"error": "Missing 'id' parameter"}), 400
    
    try:
        cursor.execute("SELECT * FROM `blogs` WHERE `id` = %s", (blog_id,))
        data = cursor.fetchone()
    except Exception as e:
        return jsonify({
            "error": "An error occurred while processing the request",
            "message": e
        }), 500
    return jsonify(data), 200    
  
@app.route('/lawsupport', methods=['GET'])  #get all the data from 'lawsupport' table
def get_lawsupport():
    cursor.execute("SELECT * FROM `lawsupport`")
    data = cursor.fetchall()
    return jsonify(data), 200

@app.route('/lawsupport/get_one', methods=['GET']) # Get the data with spacific'id' from the query parameters of'lawsupport' table
def get_one_lawsupport():
    law_id = request.args.get('id', type=int)
    if not law_id:
        return jsonify({"error": "Missing 'id' parameter"}), 400
    
    try:
        cursor.execute("SELECT * FROM `lawsupport` WHERE `id` = %s", (law_id,))
        data = cursor.fetchone()
    except Exception as e:
        return jsonify({
            "error": "An error occurred while processing the request",
            "message": e
        }), 500
    return jsonify(data), 200


#post methods
@app.route('/', methods=['POST']) #post data to 'blogs' table
def post_data():
    try:
        data = request.get_json()
        dateTime = TimeNow()
        cursor.execute(
            "INSERT INTO `blogs` (`title`, `content`, `author`, `created_at`) VALUES (%s, %s, %s, %s)",
            (data["title"], data["content"], data["author"], dateTime)
        )
        return jsonify(data), 201
        
    except Exception as e:
        return jsonify({
            "error": "Invalid JSON data",
            "message": e
        }), 400
        


@app.route('/lawsupport', methods=['POST']) #post data to 'lawsupport' table
def post_lawsupport():
    try:
        data = request.get_json()
        cursor.execute(
            "INSERT INTO `lawsupport` (`title`, `details`, `created_at`, `status`) VALUES (%s, %s, %s, %s)",
            (data["title"], data["details"], data["created_at"], data["status"])
        )
        return jsonify(data), 201
        
    except Exception as e:
        return jsonify({
            "error": "Invalid JSON data",
            "message": e
        }), 400
 

#delete methods 
@app.route('/blog', methods=['DELETE']) #delete data spacific'id' from the query parameters of'blogs' table
def delete_data():
    blog_id = request.args.get('id', type=int)
    if not blog_id:
        return jsonify({"error": "Missing 'id' parameter"}), 400
    try:
        cursor.execute("DELETE FROM `blogs` WHERE `id` = %s", (blog_id,))
        return jsonify({"message": "Blog deleted successfully"}), 200
    except Exception as e:
        return jsonify({
            "error": "An error occurred while processing the request",
            "message": e
        }), 500
        
@app.route('/lawsupport', methods=['DELETE']) #delete data spacific'id' from the query parameters of'lawsupport' table
def delete_lawsupport():
    law_id = request.args.get('id', type=int)
    if not law_id:
        return jsonify({"error": "Missing 'id' parameter"}), 400
    try:
        cursor.execute("DELETE FROM `lawsupport` WHERE `id` = %s", (law_id,))
        return jsonify({"message": "Law support deleted successfully"}), 200
    except Exception as e:
        return jsonify({
            "error": "An error occurred while processing the request",
            "message": e
        }), 500
        

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