import random

# returns randomly selected small letter
def smallCharacters(): return chr(random.choice([i for i in range(65, 90)]))

# returns randomly selected capital letter
def capitalCharacters(): return chr(random.choice([i for i in range(97,122)]))

# returns randomly selected number
def numbers(): return chr(random.choice([i for i in range(48, 57)]))

# returns randomly generated string of length 32
def stringGenerator():
    generatedString = ''
    for _ in range(32):
        generatedString += random.choice([smallCharacters(), capitalCharacters(), numbers()])
    return generatedString

# returns randomly generated string of numbers of given length
def numberGenerator(numberLength:int)->str:
    generatedNumber = ''
    for _ in range(32):
        generatedNumber += random.choice([numbers()])
    return generatedNumber
