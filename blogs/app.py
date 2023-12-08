from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from lib.mysql import cursor, __test__
from utils.TimeNow import TimeNow

###
"""
@component : 1. allowed_file, 2. get_data, 3. get_one_data, 4. get_lawsupport, 5. get_one_lawsupport, 6. post_data, 7. post_lawsupport, 8. delete_data,
             9. delete_lawsupport, 10. update_data, 11. update_lawsupport, 12. upload_file 
@description : upload file, fetches data, retrieves a single blog entry, Retrieves data from 'lawsupport' table, Retrieves a single entry, Inserts new data, 
             Inserts new data in 'lawsupport' table, Deletes a blog entry,Deletes law support entry, Updates the title and content, Updates a law support entry, 
             Handles POSTS
@params : filename, void, request, cursor, (5-12) request
@return : boolean val, fetched data, (3,4) JSON data and status code, (5-12) JSON(data/message)and status code,

"""

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

# get methods


@app.route('/', methods=['GET'])  # get all the data from 'blogs' table
def get_data():
    cursor.execute("SELECT * FROM `blogs`")
    data = cursor.fetchall()
    return jsonify(data), 200


# Get the data with spacific'id' from the query parameters of'blogs' table
@app.route('/get_one', methods=['GET'])
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


# get all the data from 'lawsupport' table
@app.route('/lawsupport', methods=['GET'])
def get_lawsupport():
    cursor.execute("SELECT * FROM `lawsupport`")
    data = cursor.fetchall()
    return jsonify(data), 200


# Get the data with spacific'id' from the query parameters of'lawsupport' table
@app.route('/lawsupport/get_one', methods=['GET'])
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


# post methods
@app.route('/', methods=['POST'])  # post data to 'blogs' table
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

###########################
"""
@params: data -> {
    "title": "string",
    "details": "string",
    "created_at": "string",
    "status": "string"
}
"""
@app.route('/lawsupport', methods=['POST'])  # post data to 'lawsupport' table
def post_lawsupport():
    try:
        data = request.get_json()
        cursor.execute(
            "INSERT INTO `lawsupport` (`title`, `details`, `created_at`, `status`) VALUES (%s, %s, %s, %s)",
            (data["title"],
             data["details"],
                data["created_at"],
                data["status"]))
        return jsonify(data), 201

    except Exception as e:
        return jsonify({
            "error": "Invalid JSON data",
            "message": e
        }), 400


# delete methods
# delete data spacific'id' from the query parameters of'blogs' table
@app.route('/blog/delete', methods=['GET'])
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


# delete data spacific'id' from the query parameters of'lawsupport' table
@app.route('/lawsupport', methods=['DELETE'])
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

# update methods


# update data spacific'id' from the query parameters of'lawsupport' table
@app.route('/blog/update', methods=['POST'])
def update_data():
    blog_id = request.get_json()['id']
    title = request.get_json()['title']
    content = request.get_json()['content']
    try:
        cursor.execute(
            "UPDATE `blogs` SET `title` = %s, `content` = %s WHERE `id` = %s",
            (title,
             content,
             blog_id))
        return jsonify({"message": "Blog updated successfully"}), 200
    except Exception as e:
        return jsonify({
            "error": "An error occurred while processing the request",
            "message": e
        }), 500


# update data spacific'id' from the query parameters of'lawsupport' table
@app.route('/lawsupport', methods=['PUT'])
def update_lawsupport():
    law_id = request.args.get('id', type=int)
    if not law_id:
        return jsonify({"error": "Missing 'id' parameter"}), 400
    try:
        data = request.get_json()
        cursor.execute(
            "UPDATE `lawsupport` SET `title` = %s, `details` = %s, `created_at` = %s, `status` = %s WHERE `id` = %s",
            (data["title"],
             data["details"],
                data["created_at"],
                data["status"],
                law_id))
        return jsonify({"message": "Law support updated successfully"}), 200
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
# !Imp: Please do test the code before pushing:
# - Run command: python -m flask --app app run --port=3700 --reload
# - Fix Lint: python -m autopep8 --in-place --aggressive --aggressive app.py
# - Test command: python -m flake8 app.py
