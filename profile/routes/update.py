from fastapi import APIRouter
from datatypes.UserModel import UpdateProfileModel
from schema.ProfileSchema import Profile
from controller.updatingProfile import updatingProfile
update = APIRouter()

@update.get("/")
async def root():
    return {
        "message": "Hello World",
        "method": "GET",
        "route": "/index"
    }

@update.post("/")
async def updating(
    data: UpdateProfileModel,
):
    try:
        print('update recieved')
        response = await updatingProfile(data)
        return response
    except Exception as e:
        print(e)
        return {
            "message": "update failed",
            "status":500
        }