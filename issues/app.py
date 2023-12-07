from fastapi import FastAPI, Form

from fastapi.middleware.cors import CORSMiddleware
from config.CorsOrigins import origins

from lib.mongo import init_db
from lib.response import ResponseStruct

from utils.IDGenerator import UUID
from utils.TimeNow import TimeNow

from schema.IssueSchema import Issues

###
"""
@component : start_db, add_security_headers, root, (1.0)read_item, (1.1)read_item, (2.0)store_item, (2.1)store_item
@description : initializes the database, adds security headers, serves as an endpoint, (1.0)retrieves all items, (1.1)retrieves a single item,
             (2.0)inserts a new item using from provided data, (2.1)inserts a new item using formed data 
@params : void, (request,call_next), void, void, str, data, str
@return : coroutine(must be awaited for the initialization to complete), HTTP response, (retrieved data,response with a status code), (1,2)response with a status code 

"""

app = FastAPI()

# initating cors  → Cross Origin Resource Sharing, allows the server to accept requests from only the specified origins as in our nextjs app
# this is a security feature, origin sources are provided in config/CorsOrigins.py
# no need to change anything here unless you know what you are doing
@app.on_event("startup")
async def start_db():
    await init_db()
    pass
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

@app.get("/")
async def root():
    return ResponseStruct(200, "/","issues service reached","GET")

@app.get("/issues/getall")
async def read_item():
    try:
        data = await Issues.find_all().to_list(100)
        return ResponseStruct(200, "/getall","GET",data)
    except Exception as e:
        print(e)
        return ResponseStruct(500, "/getall","GET","error occured")

@app.get("/issues/get/{id}")
async def read_item(id: str):
    try:
        data = await Issues.get(Issues.serial == str(id))
        print(id)
        return ResponseStruct(200, "/get/{id}","GET",data)
    except Exception as e:
        print(e)
        return ResponseStruct(500, "/get/{id}","GET","error occured")
###############################
"""
@params: data -> {
    serial: Indexed(str, unique=True)
    title: str
    description: str
    status: str
    issued_user: str
    issuer_name: str
    issued_date: str
    resolved_date: str
}
"""
@app.post("/issues/create")
async def store_item(data: Issues):
    try:
        await data.insert()
        return ResponseStruct(200, "/create","POST","success")
    except Exception as e:
        print(e)
        return ResponseStruct(500, "/create","POST","error occured")

# post with formdata
@app.post("/issues/create/formdata")
async def store_item(
    title: str = Form(...),
    description: str = Form(...),
    issued_user: str = Form(...),
    issuer_name: str = Form(...),
):
    try:
        print(title, description, issued_user, issuer_name)
        creatingDataTemplate = Issues(
            serial=UUID(),
            title=title,
            description=description,
            issued_user=issued_user,
            issuer_name=issuer_name,
            status="pending",
            issued_date=TimeNow(),
            resolved_date=TimeNow()
        )
        await creatingDataTemplate.insert()
        return ResponseStruct(200, "/create/formdata","POST","success")
    except Exception as e:
        print(e)
        return ResponseStruct(500, "/create/formdata","POST","error occured")

# uvicorn app:app --reload --port 3800