import threading
import asyncio
from lib.mysql import cursor
import jsonwebtoken

def AuthenticateUser(data):
    query = cursor.execute(
        "SELECT * FROM Users WHERE email = %s AND password = %s",
        (data["email"], data["password"])
    )
    query_data = cursor.fetchone()
    token = jsonwebtoken.encode( { 'email': data["email"], 'serial': query_data[0] }, "secret", algorithm="HS256")
    return {
        "status": query,
        "token": token
    }
