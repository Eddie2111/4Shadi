from beanie import PydanticObjectId
from fastapi import FastAPI, Request
# from lib.mysql import __test__
from fastapi.middleware.cors import CORSMiddleware
from datatypes.UserModel import UserModel_Register, UserModel_GetOne, UpdateProfileModel
from config.CorsOrigins import origins
from schema.ProfileSchema import Profile, MockProfile
from lib.py_mongo import init_db
from pydantic import *
import jsonwebtoken
from typing import Optional
app = FastAPI()

# initating cors  → Cross Origin Resource Sharing, allows the server to accept requests from only the specified origins as in our nextjs app
# this is a security feature, origin sources are provided in config/CorsOrigins.py
# no need to change anything here unless you know what you are doing
@app.on_event("startup")
async def start_db():
    await init_db()
###################################################################################################
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET","POST","PUT","DELETE","PATCH"],
    allow_headers=["Authorization", "Content-Type"],
)
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response
###################################################################################################

user_types:list = ["admin", "employee", "user"]

@app.get("/")
async def root():
    return {"message": "Hello World"}

# register/employee
# register/user
@app.post("/profile")
async def register(data:Profile):
    data_dict = data.dict()
    print("Received data:", data_dict)
    try:
        await data.insert()
        return {
            "message": "Hello register",
            # "data": data,
            "status":200
        }
    except Exception as e:
        print(e)
        return {
            "message": "register failed",
            "data": e,
            "status":200
        }

# getone/employee
# getone/user
@app.post("/getone/{Id}", response_model=Profile)
async def getone(Id: PydanticObjectId):
    print(Id)
    return {
        "message": "Hello getone",
        # "id": data,
        "status": 200
    }


# getall is only used by admin and gets all the users from the database
@app.get("/getall")
async def getall():
    try:
        datalog = await Profile.find_all().to_list()
        return {
            "message": "Hello World",
            "user": datalog
        }
    except Exception as e:
        return {
            "message": "Error",
            "error": str(e)
        }

# update/employee
# update/user
@app.post("/update")
async def update(
    data: UpdateProfileModel,
):
    try:
        print('update recieved')
        datalog = await Profile.find_one(Profile.serial == str(data.serial))
        # update with new data
        datalog.name = data.name or datalog.name
        datalog.email = data.email or datalog.email
        datalog.nid_number = data.nid_number or datalog.nid_number
        datalog.birth_cert = data.birth_cert or datalog.birth_cert
        datalog.marriage_cert = data.marriage_cert or datalog.marriage_cert
        datalog.age = data.age or datalog.age
        datalog.phone_number = data.phone_number or datalog.phone_number
        datalog.height = data.height or datalog.height
        datalog.location = data.location or datalog.location
        datalog.preferences = data.preferences or datalog.preferences
        datalog.gender = data.gender or datalog.gender
        datalog.lookingFor = data.lookingFor or datalog.lookingFor
        datalog.profileImage = data.profileImage or datalog.profileImage
        datalog.images = data.images or datalog.images
        # save to database
        await datalog.replace()
        return {
            "message": "updated successfully",
            "status":200
        }
    except Exception as e:
        print(e)
        return {
            "message": "update failed",
            "status":500
        }

# update/user
@app.post("/updateimages")
async def update(
    data: UpdateProfileModel,
):
    try:
        print('update recieved')
        datalog = await Profile.find_one(Profile.serial == str(data.serial))
        datalog.profileImage = data.profileImage or datalog.profileImage
        datalog.images = data.images or datalog.images
        # save to database
        await datalog.replace()
        return {
            "message": "updated successfully",
            "status":200
        }
    except Exception as e:
        print(e)
        return {
            "message": "update failed",
            "status":500
        }


# delete/employee
# delete/user
@app.delete("/delete/{user_type}")
async def delete(user_type: str):
    if user_type in user_types:
        return {"message": f"Hello {user_type}"}
    else: return {"message": "Invalid user type"}

from schema.ProfileSchema import Profile

@app.get("/profile/getone")
async def getone(request: Request):
    try:
        # print(request.cookies['user_token'])
        user_Data = jsonwebtoken.decode(request.cookies['user_token'], "secret", algorithms=["HS256"])
        print(user_Data['serial'])
        datalog = await Profile.find_one(Profile.serial == str(user_Data['serial']))
        # print(datalog)
        return {
            "message": "Hello World",
            "user": datalog
        }
    except Exception as e:
        return {
            "message": "Error",
            "error": str(e)
        }

@app.post("/profile/getone")
# use UserModel_GetOne data type to get only one field of the sent json
async def getone(data: UserModel_GetOne):
    try:
        print(data.id)
        datalog = await Profile.find_one(Profile.serial == data.id)
        return {
            "message": "Hello World",
            "user": datalog
        }
    except Exception as e:
        return {
            "message": "Error",
            "error": str(e)
        }





# install all required dependencies for fastapi:
## pip install "fastapi[all]"
## pip install "uvicorn[standard]"

# uvicorn app:app --reload --port 3500