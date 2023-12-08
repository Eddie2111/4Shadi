from fastapi import *
from lib.mysql import __test__, cursor
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from config.CorsOrigins import origins

# from lib.env_test import __test__
import secrets
from fastapi import HTTPException

app = FastAPI()

# initating cors  → Cross Origin Resource Sharing, allows the server to accept requests from only the specified origins as in our nextjs app
# this is a security feature, origin sources are provided in config/CorsOrigins.py
# no need to change anything here unless you know what you are doing

@app.on_event("startup")
async def startup():
    __test__(); # turning the database on

###################################################################################################
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET","POST","PUT","DELETE","PATCH"],
    allow_headers=["Authorization", "Content-Type"],
)
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response
###################################################################################################

from routes.post_router import RoutePost
from routes.get_router import RouteGet

# example hit link: localhost:4100/post
# hit with post request with a raw json body like this:
# {
#     "serial": "r9y34u89",
#     "birth_certificate": "r9y34u89",
#     "nid_number": "r9y34u89",
#     "marriage_certificate": "r9y34u89"
# }
app.include_router(
    RoutePost,
    prefix="/post",
    tags=["test"],
    responses={404: {"description": "Not found"}},
)
# example hit link: localhost:4100/get/r9y34u89
app.include_router(
    RouteGet,
    prefix="/get",
    tags=["get"],
    responses={404: {"description": "Not found"}},
)


# install all required dependencies for fastapi:
## pip install "fastapi[all]"
## pip install "uvicorn[standard]"

#! start command: uvicorn app:app --reload --port 4100