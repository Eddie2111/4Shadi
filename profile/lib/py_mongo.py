from beanie import init_beanie
import motor.motor_asyncio
from dotenv import load_dotenv, dotenv_values
import os
from schema.ProfileSchema import Profile

config   = dotenv_values(".env")
# config["DB_HOST"][0]

async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        str(config["DB_URL"])
    )
# https://medium.com/@gurramakhileshwar333/get-your-beanies-a-beginners-guide-to-beanie-mongodb-odm-for-python-b715c3f59a92
    await init_beanie(database=client.db_name, document_models=[Profile])
