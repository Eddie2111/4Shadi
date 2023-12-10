# <span style="color: darkred">4Shadi</span>

# 1. Client

- Stack: <span style="color: yellow">**React, TypeScript, NextJS, TailwindCSS**</span>
- Frontend Application
- Has all the page of User Interface
- Has communcation with the services through API
- Has all the features of the application
- Has all the pages of the application
  <br>

Run Command (Windows):

```powershell
npm run dev
```

Fix Lint:

```powershell
npm run lint
```

## 2. Blogs

- Stack: <span style="color: yellow">**Flask, AWS, MySQL**</span>
- Relationship based therapy blogs and tips
- Online law support
- Instant security on meetup [frontend]-> `avoid this`
- Report a problem
  <br>

Run Command (Windows):

```powershell
python -m flask --app app run --port=3700 --reload
```

Fix Lint:

```powershell
python -m autopep8 --in-place --aggressive --aggressive app.py
```

Test command:

```powershell
python -m flake8 app.py
```

## 3.Profile

- Stack: <span style="color: yellow">**FastAPI, MySQL,MongoDB , Motor, Beanie** </span>
- Signup and profile registration
- login and logout token generation and expiration
- token check and authentication
- get data for profile
  <br>

Run Command (Windows):

```powershell
python -m uvicorn app:app --reload --port 3500
```

Fix Lint:

```powershell
python -m autopep8 --in-place --aggressive --aggressive app.py
```

Test command:

```powershell
python -m flake8 app.py
```

## 4.SearchEngine

- Stack: <span style="color: yellow">**NodeJS, MySQL**</span>
- Profile sorting based on tags (educational qualification, heights, age, location, Married/Divorced)
- Profile suggestion based on tags (location, age, likes/preferences)
- Boost Profile matching upon search depending on payment status
- Search history
- Favourite lists
  <br>

Run Command (Windows):

```powershell
npm run dev
```

Fix Lint:

```powershell
npm run lint
```

## 5.Payment

- service done, no need to progress

## 6.OCR

- Stack: <span style="color: yellow">**Python, Tesseract, OpenCV**</span>
- Optical Character Recognition
- Extract information from NID
  <br>
  Run command (Windows):

```powershell
python -u main.py
```

## 7.Govt_mock

- Stack: <span style="color: yellow">**Python, Flask, MySQL**</span>
- Mock server for government services
- NID verification

Run Command (Windows):

```powershell
python -m uvicorn app:app --reload --port 4100
```

Fix Lint:

```powershell
python -m autopep8 --in-place --aggressive --aggressive app.py
```

Test command:

```powershell
python -m flake8 app.py
```

## 8. Authentication

- Stack: <span style="color: yellow">**FastAPI, MySQL, AWS** </span>
- Signup and profile registration
- login and logout token generation and expiration
- token check and authentication
- get data for profile
  <br>
  with docker

```powershell
docker-compose up --build
```

without docker (Windows)

```powershell
python -m uvicorn app:app --reload --port 5600
```

Fix Lint:

```powershell
python -m autopep8 --in-place --aggressive --aggressive app.py
```

Test command:

```powershell
python -m flake8 app.py
```

# Target Features

Total:34 <br>
Done: 25 <br>
In progress: 04 <br>
Not started: 05<br>

Profile:

- can create their profile and see their profile <span style="color: green"> Done </span>
- user has to send a request <span style="color: green"> Done </span>
- upload their images <span style="color: green"> Done </span>
- information restriction <span style="color: green"> Done </span>
- user can see other profiles <span style="color: green"> Done </span>

Profile Verification:

- NID upload for both male/female <span style="color: green"> Done </span>
- Information extraction from NID using OCR <span style="color: green"> Done </span>
- Account approval upon NID Verification <span style="color: green"> Done </span>
- Marriage/Divorce Certificate for Male users <span style="color: green"> Done </span>
- Divorce certificate form Female users <span style="color: green"> Done </span>

Search System:

- Profile sorting based on tags (educational qualification, heights, age, location, Married/Divorced) <span style="color: green"> Done </span>
- Customized profile searching <span style="color: green"> Done </span>
- Profile suggestion based on tags (location, age, likes/preferences) <span style="color: green"> Done </span>
- Boost Profile matching upon search depending on payment status<span style="color: orange"> Not started </span>
- Favourite lists <span style="color: lightgreen"> In progress</span>

Blogs and other features:

- relationship based therapy blogs and tips <span style="color: green"> Done </span>
- online law support <span style="color: green"> Done </span>
- instant security on meetup <span style="color: orange"> Not started </span>
- report a problem <span style="color: green"> Done </span>

Optical Character Recognition:

- Extract information from NID <span style="color: green"> Done </span>
- Extract information from Marriage/Divorce Certificate <span style="color: lightgreen"> In progress</span>
- Extract information from Driving License <span style="color: orange"> Not started </span>

Payment service:

- SSLCommerz integration <span style="color: green"> Done </span>
- encrypted form submission
- payment history<span style="color: lightgreen"> In progress</span>
- profile boosting and third party advertisements<span style="color: orange"> Not started </span>
- advertisement removal upon payment<span style="color: orange"> Not started </span>

Authentication:

- Signup and profile registration <span style="color: green"> Done </span>
- login and logout token generation and expiration <span style="color: green"> Done </span>
- token check and authentication <span style="color: green"> Done </span>
- get data for profile <span style="color: green"> Done </span>
  Revisions:

- Complete check of searching.<span style="color: green"> Done </span>
- Implement payment frontend form.<span style="color: green"> Done </span>
- ToC, Privacy Policy, About, Support pages.<span style="color: lightgreen"> In progress</span>

# Error Handling

- All data get api not working in government mock server<span style="color: lightgreen"> In progress</span>
- Need to remove detils from government mock server<span style="color: green"> Done </span>
- Need to add more data in government mock server for testing <span style="color: green"> Done </span>
