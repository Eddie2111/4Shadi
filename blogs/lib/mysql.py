
from dotenv import load_dotenv, dotenv_values
import MySQLdb
import os

# Load environment variables from .env file
load_dotenv()

# Get database configuration from environment variables
db_config = dotenv_values(".env")

# Connect to MySQL database
conn = MySQLdb.connect(
    host=db_config["DB_HOST"],
    user=db_config["DB_USER"],
    passwd=db_config["DB_PASSWORD"],
    db=db_config["DB_NAME"]
)

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create the blogs table
create_table_query = """
CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(128),
    description VARCHAR(1024),
    author VARCHAR(32)
)
"""

cursor.execute(create_table_query)

# Commit the changes and close the connection
conn.commit()
conn.close()
