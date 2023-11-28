#in this project we will read text from image using pytesseract and save it in a text file

#first we will import the required libraries
from PIL import Image as img
import pytesseract
import os
import re

def read_text(img_location):  #read the image

    myconfig = r"--psm 6 --oem 3" #config for pytesseract
    text = pytesseract.image_to_string(img.open(img_location), config=myconfig)
    #print(text)
    #extract name, date of birth, id No form the text
    name = re.findall(r"Name: (.*)", text)
    dob = re.findall(r"Date of Birth: (.*)", text)
    id_no = re.findall(r"ID NO: (.*)", text)
    if len(id_no) == 0:
        id_no = re.findall(r"ID No: (.*)", text)
    if len(id_no) == 0:
        id_no = re.findall(r"IDNo. (.*)", text)
    if len(id_no) == 0:
        id_no = re.findall(r"ID NO: (.*)", text)
    if len(id_no) == 0:
        id_no = re.findall(r"IDNO: (.*)", text)
    if len(id_no) == 0:
        id_no = re.findall(r"1D  (.*)", text)
    if len(id_no) == 0:
        id_no = re.findall(r"ID NO (.*)", text)
    return name, dob, id_no


def extract_name(name):
    try:
        name = re.sub('[^a-zA-Z]+', ' ', name[0])
        return name
    except:
        return "Name not found"    

def extract_dob(dob):
    try:
        dob = dob[0][0:11]
        return dob
    except:
        return "DOB not found"

def extract_id(id_no):
    try:
        id_no = filter(str.isdigit, id_no[0])
        id_no = "".join(id_no)
        return id_no
    except:
        return "ID not found"
    
name, dob, id_no = read_text("i:/470/cse-470-project-main/ocr/img/2.jpg")
print("Name: ", extract_name(name))
print("DOB: ", extract_dob(dob))
print("ID: ", extract_id(id_no))



        
        