## mysql connection here
from dotenv import load_dotenv, dotenv_values
import MySQLdb
import os

load_dotenv()
# config   = dotenv_values(".env")

connection =  MySQLdb.connect(
        host     = os.environ.get("HOST"),
        user     = os.environ.get("USERNAMER"),
        passwd   = os.environ.get("PASSWORD"),
        db       = os.environ.get("DATABASE"),
        autocommit = True,
        ssl_mode = "VERIFY_IDENTITY",
        ssl      = {
          "ca": "etc/ssl/cacert.pem"
        }
    )
cursor = connection.cursor()

def __test__():
  if connection: print("Database Connection successful"); return True
  else: print("Database Connection unsuccessful"); return False
