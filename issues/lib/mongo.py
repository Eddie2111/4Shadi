from beanie import init_beanie
import motor.motor_asyncio
from dotenv import load_dotenv, dotenv_values
import os
from schema.IssueSchema import Issues

config   = dotenv_values(".env")

async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        str(config["DB_URL"])
    )
    await init_beanie(database=client.Issues, document_models=[Issues])

# credit: https://medium.com/@gurramakhileshwar333/get-your-beanies-a-beginners-guide-to-beanie-mongodb-odm-for-python-b715c3f59a92
