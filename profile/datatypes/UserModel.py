from pydantic import BaseModel, Field
from typing import Optional
# creating a data type for fastapi to recieve post request

class UserModel_Register(BaseModel):
    serial: str
    name: str
    email: str
    nid_number: str
    birth_cert: str
    marriage_cert: str
    age: int
    phone_number: str
    height: str
    location: str
    preferences: str
    gender: str
    lookingFor: str

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

class UpdateProfileModel(BaseModel):
    serial: str = Field(default=None)
    name: str = Field(default=None)
    email: str = Field(default=None)
    nid_number: str = Field(default=None)
    birth_cert: str = Field(default=None)
    marriage_cert: str = Field(default=None)
    age: int = Field(default=None)
    phone_number: str = Field(default=None)
    height: str = Field(default=None)
    location: str = Field(default=None)
    preferences: str = Field(default=None)
    gender: str = Field(default=None)
    lookingFor: str = Field(default=None)
    profileImage: str = Field(default=None)
    images: list = Field(default=None)