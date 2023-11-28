async def StoreFile(image:dict,serial) -> None:
    splitFileName = image.filename.split(".")
    file_extension = splitFileName[len(splitFileName)-1]
    file_path = f"images/{serial}.{file_extension}"
    with open(file_path, "wb") as buffer:
        buffer.write(image.read())

###
'''
def StoreFile(file:dict,serial:str) -> None:
    """
    Stores file in images folder with random name
    @params: file: dict -> file object
    @params: serial: str -> serial number of file
    @return: None
    """
    with open("images/"+serial, "wb") as f:
        f.write(file.file.read())
    return None
'''