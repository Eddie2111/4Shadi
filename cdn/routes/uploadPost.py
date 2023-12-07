import threading
import requests
from datetime import datetime
from typing import Optional  # Import Optional
from fastapi import APIRouter, Depends, Request, UploadFile, Form, File
from fastapi_limiter.depends import RateLimiter
from lib.Mongo_Conn import connect_mongo
from controller.statuspost import user_status_post
from functions.tokenDecrypt import getTokenInfo
from bson.objectid import ObjectId

app = APIRouter()

@app.get("/testing/post")
async def root()->dict:
    return {
        "message": "Hello World",
        "method": "GET",
        "route": "/index"
    }

@app.post("/testing/post", dependencies=[Depends(RateLimiter(times=1, seconds=5))])
async def root(
    request: Request,
    file: UploadFile = File(None),
    post: str = Form(...),
    feeling: str = Form(...),
):
    threading.Thread(target=await PostedDataPush(file, post, feeling, request)) # stores file in the cdn
    return {
        "message": "post created successfully",
        "method": "POST",
        "route": "/index"
    }

#############################################################################################
async def PostedDataPush(file:dict, post:str, feeling:str, request:dict)->dict:
    """
    @required : upload the file to CDN
    """
    # send the file to localhost:3700/upload
    try:
        if file:
            response = await postFile(file,file.filename)
        else:
            response = {
                "file_id": ""
            }
        tokenData = getTokenInfo(str(request.cookies['token']))
        serial = str(ObjectId())
        print(response)
        db_dataset = {
            "serial": serial,
            "userId": tokenData['id'],
            "post": post,
            "date": str(datetime.now()),
            "feeling": feeling,
            "location": "",
            "tag": "",
            'file': response['file_id'],
        }
        collection = connect_mongo()
        collection.insert_one(db_dataset)
        return db_dataset
    except Exception as e:
        print(e)
        return e
#############################################################################################
async def postFile(file: UploadFile, filename:str) -> dict:
    """
    @required : upload the file to CDN
    """
    # send the file to localhost:3700/upload
    try:
        filesName = filename
        file_content = await file.read()
        response = requests.post('http://localhost:3700/upload?name='+filesName, files={'file': file_content} )
        return response.json()
    except Exception as e:
        return {
            "message": "error",
            "error": str(e)
        }
#############################################################################################