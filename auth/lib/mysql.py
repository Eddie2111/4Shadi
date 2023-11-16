## mysql connection here
from dotenv import load_dotenv, dotenv_values
import MySQLdb
import os

# load_dotenv()
config   = dotenv_values(".env")
# config["DB_HOST"][0]

connection =  MySQLdb.connect(
        host     = str(config["DB_HOST"]), # os.environ.get("HOST"),
        user     = str(config["DB_USERNAME"]), # os.environ.get("USERNAMER"),
        passwd   = str(config["DB_PASSWORD"]), # os.environ.get("PASSWORD"),
        db       = str(config["DB_NAME"]), # os.environ.get("DATABASE"),
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
