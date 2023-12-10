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

RouteDelete = APIRouter()


#delete a data from 'MockDB_Govt' table with "id" as query parameter
@RouteDelete.delete("/data/{id}")
async def delete_one_data(id: int):
    try:
        cursor.execute("DELETE FROM `MockDB_Govt` WHERE `id` = %s", (id,))
        return {
            "message": "delete success",
            "data": {},
            "status":200
        }
    except Exception as e:
        print(e)
        return {
            "message": "delete failed",
            "data": {},
            "status":500
        }
        
        
        
        