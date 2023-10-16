from fastapi import FastAPI
# from lib.mysql import __test__
from fastapi.middleware.cors import CORSMiddleware
from datatypes.UserModel import UserModel_Register
from config.CorsOrigins import origins
from lib.py_mongo import init_db
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
async def register(data:UserModel_Register):
    return {
        "message": "Hello register",
        "data": data
    }

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