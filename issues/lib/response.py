def ResponseStruct(status:int, route:str, method:str, data) -> dict:
    return {
        "status": status,
        "route": route,
        "method": method,
        "data": data
    }