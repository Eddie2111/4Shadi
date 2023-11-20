import os
import MySQLdb
from dotenv import load_dotenv, dotenv_values

# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

# Read database configurations from .env file
db_config = dotenv_values(dotenv_path)

# Establish a connection to MySQL
conn = MySQLdb.connect(
    host=db_config['DB_HOST'],
    user=db_config['DB_USER'],
    password=db_config['DB_PASSWORD'],
)

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create a new database
database_name = db_config['DB_NAME']
cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database_name};")

# Switch to the newly created database
cursor.execute(f"USE {database_name};")

# Create a table with the specified columns
cursor.execute("""
    CREATE TABLE IF NOT EXISTS your_table_name (
        id VARCHAR(255) UNIQUE,
        title VARCHAR(128),
        description VARCHAR(1024),
        author VARCHAR(32),
        PRIMARY KEY (id)
    );
""")

# Commit the changes and close the connection
conn.commit()
conn.close()

print(f"Database '{database_name}' and table 'your_table_name' created successfully.")
