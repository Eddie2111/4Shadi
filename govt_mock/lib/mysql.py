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
create_tabel_query = """
    CREATE TABLE IF NOT EXISTS `MockDB_Govt` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `birth_certificate` varchar(48) NOT NULL UNIQUE,
        `nid_number` varchar(32) NOT NULL UNIQUE,
        `marriage_certificate` varchar(32) NOT NULL UNIQUE,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
"""

def __test__():
    "" """ This function is for testing the database connection "" """
    "" """ On First run, please remove line number 36, or comment it out "" """
    # cursor.execute(create_tabel_query)
    if connection: print("Database Connection successful"); return True
    else: print("Database Connection unsuccessful"); return False
