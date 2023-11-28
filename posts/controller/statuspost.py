from datetime import datetime

from fastapi import Request, UploadFile, Form
from lib.Mongo_Conn import connect_mongo
from functions.tokenDecrypt import getTokenInfo

from bson.objectid import ObjectId

def user_status_post(
    request: Request,
    file: UploadFile,
    post: str = Form(...),
    feeling: str = Form(...),
    #location: str = Form(...),
    #tag: str = Form(...),
    ):
    # save the file
    file_path = f"images/{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    tokenData = getTokenInfo(str(request.cookies['token']))
    print(tokenData['id'])
    serial = str(ObjectId())
    db_dataset = {
        "serial": serial,
        "userId": tokenData['id'],
        "post": post,
        "date": str(datetime.now()),
        "feeling": feeling,
        "location": "",
        "tag": "",
        'file': file.filename,
    }
    collection = connect_mongo()
    collection.insert_one(db_dataset)
    return {
        'data':'texts uploaded successfully',
        'file': 'file provided?',
    }
