from fastapi import APIRouter
from lib.mysql import cursor

#################################################
""""" Data type for post request """""
from pydantic import BaseModel
from typing import Optional
class PostDataModel(BaseModel):
    id: int
    birth_certificate: str
    nid_number: str
    marriage_certificate: str
#################################################

RouteGet = APIRouter()

# routeGet instance her
# it will recieve a link with the query parameter of serial
# it will print the "serial" that was sent in the query

@RouteGet.get("/{id}")
async def root(id: int):
    print('RouteGet recieved',id)
    data = cursor.execute("SELECT * FROM `MockDB_Govt` WHERE `id` = %s", (id,))
    data = cursor.fetchone()
    print(data)
    return {
        "message": "get success",
        "method": "GET",
        "route": "/index"
    }

""" @RouteGet.get("/")
async def root():
    return {
        "message": "get success e",
        "method": "GET",
        "route": "/"
    }
    
     """
#converting the data to dictionary
def convert_to_dict(data):
    dataset = []
    for i in data:
        dataset.append({
            "id": i[0],
            "birth_certificate": i[1],
            "nid_number": i[2],
            "marriage_certificate": i[3]
        })
    return dataset
#a get method that get all the data from 'MockDB_Govt' table
@RouteGet.get("/data") # this one is not working properly 
async def get_data():
    try:
        alldata  = cursor.execute("SELECT * FROM `MockDB_Govt`")
        allData = cursor.fetchall()
        alldata = convert_to_dict(allData)
        print(alldata)
        return {
            "message": "get success",
            "data": allData,
            "status":200
        }
    except Exception as e:
        print(e)
        return {
            "message": "get failed",
            "data": {},
            "status":500
        }