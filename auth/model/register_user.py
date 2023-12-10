import threading
import asyncio
from lib.mysql import cursor

###
""" 
@component: RegisterUser
@description: User Registration
@props: data
"""

def RegisterUser(data):
    try:
        threaded_query = threading.Thread(
            target=cursor.execute,
            args=(
                """
                INSERT INTO Users
                (serial, name, email, password, user_type)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    data["serial"],
                    data["name"],
                    data["email"],
                    data["password"],
                    data["user_type"]
                )
            ))
        # print(query)
        threaded_query.start()
        return True
    except Exception as e:
        print(e)
        return False
