from beanie import PydanticObjectId
from fastapi import FastAPI
# from lib.mysql import __test__
from fastapi.middleware.cors import CORSMiddleware
from datatypes.UserModel import UserModel_Register, UserModel_GetOne
from config.CorsOrigins import origins
from schema.ProfileSchema import Profile
from lib.py_mongo import init_db
from pydantic import *
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
            # "data": data,
            "status":500
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
@app.get("/user/{id}", response_model=Profile)
async def get_book(id: PydanticObjectId):
    #book = await Profile.get(id)
    print(id)
    return {
        "message": "Hello getone",
        # "id": data,
        "status": 200
    }

# getall/employee
# getall/user
@app.get("/getall/{user_type}")
async def getall(user_type: str):
    if user_type in user_types:
        return {"message": f"Hello {user_type}"}
    else: return {"message": "Invalid user type"}

# update/employee
# update/user
@app.put("/update/{user_type}")
async def update(user_type: str):
    if user_type in user_types:
        return {"message": f"Hello {user_type}"}
    else: return {"message": "Invalid user type"}

# delete/employee
# delete/user
@app.delete("/delete/{user_type}")
async def delete(user_type: str):
    if user_type in user_types:
        return {"message": f"Hello {user_type}"}
    else: return {"message": "Invalid user type"}


# install all required dependencies for fastapi:
## pip install "fastapi[all]"
## pip install "uvicorn[standard]"

# uvicorn app:app --reload --port 3500