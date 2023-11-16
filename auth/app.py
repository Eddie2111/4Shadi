from fastapi import *
from lib.mysql import __test__, cursor
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from config.CorsOrigins import origins

# from lib.env_test import __test__
import secrets
from fastapi import HTTPException
from datatype.UserModel import UserModel_Signup, UserModel_Login, UserModel_Remove

# Models
from model.register_user import RegisterUser
from model.authenticate_user import AuthenticateUser

# Controllers
from controller.GetAll import GetAllUsers
from controller.RemoveOneUser import RemoveAUser

app = FastAPI()

# initating cors  → Cross Origin Resource Sharing, allows the server to accept requests from only the specified origins as in our nextjs app
# this is a security feature, origin sources are provided in config/CorsOrigins.py
# no need to change anything here unless you know what you are doing

@app.on_event("startup")
async def startup():
    __test__(); # turning the database on

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

#D07.10.23> Huntick
# Dictionary to store user tokens
user_tokens = {
    "admin": set(),
    "employee": set(),
    "user": set(),
}

# Function to generate a unique token for a user type
def generate_unique_token(user_type):
    # Generate a random token (16 characters long)
    token = secrets.token_hex(8)
    return token

# @app.post("/register/{user_type}", response_model=dict)
# async def register(user_type: str):
#     if user_type in user_types:
#         # Generate a unique token for the user type
#         token = generate_unique_token(user_type)

#         # Store the token for the user type (you can save it in a database)
#         user_tokens[user_type].add(token)

#         # Construct the response explicitly as JSON
#         response_data = {"message": f"Hello {user_type}", "token": token}
#         return JSONResponse(content=response_data)
#     else:
#         raise HTTPException(status_code=400, detail="Invalid user type")

#D07.10.23<
@app.get("/")
async def root():
    return {"message": "Hello World"}

# login/admin
# login/employee
# login/user
@app.post("/login/{user_type}")
async def login(user_type: str, data: UserModel_Login, response: Response):
    if user_type in user_types:
        userdata = {
            "email": data.email,
            "password": data.password,
            "user_type": user_type
        }
        # authenticate user from here
        resulting_in = AuthenticateUser(userdata)
        print(resulting_in,'this?')
        if resulting_in["status"] == 1:
            response.set_cookie(
                key="user_token",
                value=resulting_in["token"],
                httponly=True,
                samesite="strict",
                secure=True,
                max_age=36000,
                expires=36000,
            )
            return {
                "message": f"Hello {user_type}",
                "id": data.email,
                "result": resulting_in
            }
        else: return {"message": "Error authenticating user"}
    else: return {"message": "Invalid user type"}

# !register/employee
# register/user
@app.post("/register/{user_type}")
async def register(user_type: str, data: UserModel_Signup):
    if user_type in user_types:
        userdata = {
            "serial": data.serial,
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "user_type": user_type
        }
        # add to auth database from here
        resulting_in = RegisterUser(userdata)
        print(resulting_in)
        if resulting_in:
            return {
                "message": f"Hello {user_type}",
                "id": data.serial,
                "name": data.name,
                "email": data.email,
            }
        else: return {"message": "Error registering user"}
    else: return {"message": "Invalid user type"}

# logout
@app.post("/logout")
async def logout():
    return {"message": "Hello logout"}

# getone/employee
# getone/user
@app.get("/getone/{user_type}")
async def getone(user_type: str):
    if user_type in user_types:
        return {"message": f"Hello {user_type}"}
    else: return {"message": "Invalid user type"}

# getall/employee
# getall/user
@app.get("/getall/{user_type}")
async def getall(user_type: str):
    if user_type in user_types:
        userdata = await GetAllUsers()
        return {
            "status": "200",
            "data": userdata,
            "user_type": user_type
        }
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
async def delete(user_type: str, data: UserModel_Remove):
    if user_type == 'admin':
        result = RemoveAUser(data.id)
        return result




# install all required dependencies for fastapi:
## pip install "fastapi[all]"
## pip install "uvicorn[standard]"

# uvicorn app:app --reload --port 3400