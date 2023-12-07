import jsonwebtoken
import os
from dotenv import load_dotenv

#
"""
    This function returns a system generated secret key
    @param -> none: void
    @return -> {string}
"""
def get_secret_key()->str:  # provided
    load_dotenv()
    return os.getenv("SECRET")
#
"""
    This function takes a token and returns a dictionary of the information
    @param -> token: {string}
    @return -> {dict} -> {id: str, iat: int, exp: int}
"""

def getTokenInfo(token:str)->dict:  # required
    target_string: str = token
    constant = jsonwebtoken.decode(target_string, 'F8943HF8943HYG89F43H9G08HT9843YH85R4H98', algorithms=["HS256"])
    return constant;
