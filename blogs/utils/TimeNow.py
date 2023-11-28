import datetime

def TimeNow()-> str:
    now:str = str(datetime.datetime.now())
    return now[0:-15]
