from typing import Union
from pydantic import BaseModel

class IssueProps(BaseModel):
    serial: str
    title: str
    description: str
    status: str
    issued_user: str
    issuer_name: str
    issued_date: str
    resolved_date: str