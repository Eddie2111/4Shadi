from beanie import Document, Indexed

class Issues(Document):
    serial: Indexed(str, unique=True)
    title: str
    description: str
    status: str
    issued_user: str
    issuer_name: str
    issued_date: str
    resolved_date: str
