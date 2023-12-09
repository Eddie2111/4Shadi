from fastapi import APIRouter

#################################################
""""" Data type for post request """""
from pydantic import BaseModel
from typing import Optional
class PostDataModel(BaseModel):
    serial: str
    birth_certificate: str
    nid_number: str
    marriage_certificate: str
#################################################

RouteGet = APIRouter()

# routeGet instance her
# it will recieve a link with the query parameter of serial
# it will print the "serial" that was sent in the query

@RouteGet.get("/{serial}")
async def root(serial:str):
    print('RouteGet recieved',serial)
    return {
        "message": "get success",
        "method": "GET",
        "route": "/index"
    }


    