## connecting kafka at localhost:9200
# Path: profile\lib\Kafka_Conn.py

from kafka import KafkaProducer, KafkaConsumer
from kafka.errors import KafkaError
from json import dumps, loads
from bson.objectid import ObjectId
import pprint

class SingletonKafka:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls.producer = KafkaProducer(bootstrap_servers=['localhost:9092'], value_serializer=lambda x: dumps(x).encode('utf-8'))
            cls.consumer = KafkaConsumer(bootstrap_servers=['localhost:9092'], auto_offset_reset='earliest', value_deserializer=lambda x: loads(x.decode('utf-8')))
            cls.consumer.subscribe(['status'])
        return cls._instance

    def get_producer(self):
        return self.producer

    def get_consumer(self):
        return self.consumer

def connect_kafka_producer():
    return SingletonKafka().get_producer()
