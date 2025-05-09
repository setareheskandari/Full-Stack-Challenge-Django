
# Finimize Dev Challenge
A full-stack savings projection web application built with Django (backend) and React with Chakra UI (frontend).
## Installation & Deployment
> **Note**: Make sure you have installed `python3`.
### Backend (Django) Setup
Clone the project:
```bash
  git clone https://github.com/setareheskandari/Full-Stack-Challenge-Django.git
```
Go to the project directory:
```bash
  cd Full-Stack-Challenge-Django
```
Install `pipenv` (if not already installed):
```bash
brew install pipenv
```
Create a new virtual environment:
```bash
pipenv --python 3
```
Install the dependencies (if you havn't already):
```bash
pipenv install
```
Activate the virtual environment:
```bash
pipenv shell
```
Run the Django server:
```bash
python3 manage.py runserver
```
The server will be available at http://localhost:8000.
### Frontend (React) Setup
Open another terminal window at the root of this repo and install `yarn` (if not already installed):
```
brew install yarn
```
Go to the client directory:
```bash
cd client
```
Install the dependencies (if you haven't already):
```bash
  # Using yarn
  yarn install
```
Run the dev server:
```bash
yarn start
```
The webapp should now be running at http://localhost:5173 .
## Demo
![In action](client/src/assets/demo.gif)
-
> **Note**: Even though Django is installed in your Pipenv venv, VS Code may not pick it up until you point the editor at that interpreter:
- Open the Command Palette (⇧⌘P on Mac) and type “Python: Select Interpreter” and hit Enter.
- Look for the entry that lives under your Pipenv venv path and Select it. 