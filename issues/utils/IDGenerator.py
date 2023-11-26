import random

alpha: list = [i for i in range(65,121)]
number: list = [i for i in range(1,10)]

def UUID() -> str:
    global alpha, number
    hash_value:str = ''
    for i in range(16):
        hash_value = hash_value+chr(random.choice(alpha))
        hash_value = hash_value+str(random.choice(number))
    return str(hash_value)
