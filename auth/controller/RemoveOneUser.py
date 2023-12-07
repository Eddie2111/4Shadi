from lib.mysql import cursor
###
"""
@component: RemoveAUser
@description: Removes a particular user
@props: id
"""
def RemoveAUser(id):
    try:
        query:str = str("DELETE FROM Users WHERE serial =") +"'"+ str(id) + "'" + ";"
        # print(query)
        cursor.execute(query)
        return {
            "message": "User removed successfully",
            "id": id,
            "status": 200
        }
    except Exception as e:
        print(e)
        return {
            "message": "Error removing user",
            "error": e,
            "status": 500
        }