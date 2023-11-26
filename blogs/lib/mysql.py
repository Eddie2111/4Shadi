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
    CREATE TABLE IF NOT EXISTS `blogs` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `content` text NOT NULL,
        `author` varchar(32) NOT NULL,
        `created_at` varchar(16) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    """

def __test__():
    cursor.execute(create_tabel_query)
    if connection: print("Database Connection successful"); return True
    else: print("Database Connection unsuccessful"); return False
