import threading
import asyncio
from lib.mysql import cursor
import jsonwebtoken

###
"""
@component: AuthenticateUser
@description: User authentication
@props: data
"""

def AuthenticateUser(data):
    try:
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
    except Exception as e:
        print(e)
        return {
            "status": False,
            "token": None
        }
