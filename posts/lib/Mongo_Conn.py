import pymongo

class SingletonMongoDB:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls.client = pymongo.MongoClient('mongodb://localhost:5500/')
            cls.db = cls.client['chat']
            cls.collection = cls.db['Posts']
        return cls._instance

def connect_mongo():
    return SingletonMongoDB().collection