from fastapi import APIRouter
from lib.mysql import cursor
#################################################
""""" Data type for post request """""
from pydantic import BaseModel
from typing import Optional
class PostDataModel(BaseModel):
    birth_certificate: str
    nid_number: str
    marriage_certificate: str
#################################################

RoutePost = APIRouter()

@RoutePost.get("/")
async def root():
    return {
        "message": "get success",
        "method": "GET",
        "route": "/index"
    }

@RoutePost.post("/data")
async def updating(
    data: PostDataModel,
):
    try:
        print('RoutePost recieved')
        print(data)
        cursor.execute(
            "INSERT INTO `MockDB_Govt` (`birth_certificate`, `nid_number`, `marriage_certificate`) VALUES (%s, %s, %s)",
            (

                data.birth_certificate,
                data.nid_number,
                data.marriage_certificate
            )
        )  
        
        return {
            "message": "post success",
            "data": data,
            "status":200
        }
    except Exception as e:
        print(e)
        return {
            "message": "post failed",
            "data": {},
            "status":500
        }

######
"""
example of a insert query:
cursor.execute(
            "INSERT INTO `lawsupport` (`title`, `details`, `created_at`, `status`) VALUES (%s, %s, %s, %s)",
            (
                data["title"],
                data["details"],
                data["created_at"],
                data["status"]
            )
        )
"""
# TODO: recieve the data here
        # you may create a seperate function to handle the data
        # and return the data to the client after storing it in the database
        # return a boolean value to the client as true if found in database or false if not found
        # cross check the posted data to ensure data safety and query execution safety by
        # checking if it's a string or not, setting maximum limits of the string or stuff like that.
        