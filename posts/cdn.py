import os
import threading
from datetime import datetime

from flask import Flask, request, send_file
from flask_cors import CORS

from functions.randomGenerator import stringGenerator
from functions.StoreFiles import StoreFile

app = Flask(__name__)
CORS(app, resources={r"/*":
                     {"origins": "*",
                      "methods": ["GET", "POST"],
                      "allow_headers": ["Content-Type", "Authorization"]}
                })

@app.route("/")
def hello_world():
    data = { "name": "John Doe" }
    return data

# post request with formdata including name and image
"""
@params: image: file
@return: success: dict -> {serial: str, type: str, name:str}
"""
@app.route("/upload", methods=["POST"])
async def upload()-> dict:
    image = request.files.get('file')
    serial = stringGenerator()
    # get file name from the query of the url
    name = stringGenerator() + image.content_type.split("/")[1]
    name = name.split(".")
    print(name)
    file_path = "images/"+serial+"."+image.content_type.split("/")[1]
    with open(file_path, "wb") as buffer:
        buffer.write(image.read())
    return {
        "serial": serial,
        "file_id": serial+"."+name[len(name)-1],
        "type": name[len(name)-1],
        "name": name[0],
        "size": os.path.getsize(file_path),
        "path": file_path,
        "url": "http://localhost:3800/get?image="+serial+'.'+image.content_type.split("/")[1],
        "date": str(datetime.now())
    }
# post request with json data with name
@app.route("/get", methods=["POST"])
def get()-> dict:
    try:
        #image = request.json.get("image")
        # get the image name from the query of the url
        image = request.args.get("image")
        try:
            _image = open(f"images/{image}", "rb")
            return send_file(_image, mimetype="image/jpeg")
        except Exception as e:
            return 'no image'
    except Exception as e:
        return e
@app.route('/get_any', methods=["GET"])
def get_any():
    try:
        image = request.args.get("image")
        print(image)
        try:
            _image = open(f"images/{image}", "rb")
            return send_file(_image, mimetype="image/jpeg")
        except Exception as e:
            return 'no image'
    except Exception as e:
        return e


# python -m flask run --app cdn run --port=3700 --reload
# python -m flask --app cdn run --port=3700 --reload