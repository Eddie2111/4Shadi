from beanie import Document
from pydantic import BaseModel
from typing import Optional

class Profile(Document):
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

    class Profile:
        name = "profile"
    # if problem
    """
    class Profile:
        name = "Profile"
    """
