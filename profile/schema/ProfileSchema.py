from beanie import Document, Indexed
from pydantic import BaseModel, Field
from typing import Optional

class Profile(Document):
    serial: Indexed(str, unique=True)
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
    # optionals
    profileImage: str = Field(default='')
    images: list = Field(default=[])

    class Profile:
        name = "profile"
    # if problem
    """
    class Profile:
        name = "Profile"
    """

class MockProfile(Document):
    serial: Indexed(str, unique=True)
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