from pydantic import BaseModel, Field

# creating a data type for fastapi to recieve post request

class UserModel_Register(BaseModel):
    serial: str
    name: str
    email: str
    nid_number: str
    birth_cert: str
    marriage_cert: str
    age: str
    phone_number: str
    height: str
    location: str
    preferences: str

class UserModel_Signup(BaseModel):
    serial: str
    name: str
    email: str
    password: str

class UserModel_Login(BaseModel):
    email: str
    password: str

class UserModel_GetOne(BaseModel):
    id: str
