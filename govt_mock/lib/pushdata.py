import requests 
import random
import string
url = "http://127.0.0.1:4100/post/data"

try:
    for i in range(100):
        birth = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10))
        nid = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10))

        marrage = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10))
        
        payload = {
            "birth_certificate": str(birth),
            "nid_number": str(nid),
            "marriage_certificate": marrage
        }
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, json=payload)
        print(response.text)

    print('done')
except Exception as e:
    print(e)
    print('error')