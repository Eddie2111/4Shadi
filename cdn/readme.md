# profile system using fastapi: python

## Start the server

uvicorn app:app --reload --port 3500

### features

- status upload and update mongoDB
- image upload and update mongoDB
- video upload and update mongoDB
- getter
- post creation

### done

- data types
- get and post methods
- cors set up
- mongoDB integration : create, read
- singleton connection: Mongo, Kafka
- file handling route
- file handling and data handling route endpoint
- rate limiting added with redis

### required

- id based post pull
- kafka setup
- file splitting