from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from typing import List

class Comment(BaseModel):
    userId: str
    userName: str
    userProfileLink: str
    commentBody: str
    date: datetime

class StatusPost(BaseModel):
    serial: str
    userId: str
    post: str
    date: datetime
    ## optional fields
    mood: Optional[str] = None
    likes: Optional[str] = None
    comments: Optional[List[Comment]] = []
    feeling: Optional[str] = None
    location: Optional[str] = None
    tag: Optional[str] = None

class Cookie(BaseModel):
    token: str
