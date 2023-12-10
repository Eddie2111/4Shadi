from fastapi import APIRouter
# from datatype.UserModel import UserModel_Signup

router = APIRouter()

@router.get("/")
async def root():
    return {
        "message": "Hello World",
        "method": "GET",
        "route": "/index"
    }

@router.post("/")
async def root(data: {"name":str}
               # UserModel_Signup
               ):
    print(data)
    return {
        "data": "data",
        "method": "POST",
        "route": "/index"
    }