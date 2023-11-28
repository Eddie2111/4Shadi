from lib.mysql import cursor
###
"""
@component: GetAllUsers, Converting_Arrays_to_dict
@description: Get all the users from the database, Convert arrays to dictionary
@props: Data[serial,name,email,password,user_type]

"""

async def GetAllUsers():
    allUserData = cursor.execute("SELECT * FROM Users")
    alluserDataset = cursor.fetchall()
    alluserDataset = Converting_Arrays_to_dict(alluserDataset)
    return {
        "message": "Hello getall",
        "data": alluserDataset
    }

def Converting_Arrays_to_dict(data):
    dataset = []
    for i in data:
        dataset.append({
            "serial": i[0],
            "name": i[1],
            "email": i[2],
            "password": i[3],
            "user_type": i[4]
        })
    return dataset