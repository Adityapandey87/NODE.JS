# MT1-LABEXAM - Online Food Ordering Web Application

## Requirements
- Node.js and npm
- Postman (for API testing)
- Git (for GitHub submission)

## Installation
Open the terminal in this project folder and run:

```bash
npm install
```

## Part A: HTTP + FS server (port 3000)
```bash
node httpServer.js
```
Open:
- http://localhost:3000/
- http://localhost:3000/foods
- http://localhost:3000/about
- http://localhost:3000/menu

POST endpoint: `http://localhost:3000/add-food`

## Part B: Express REST API (port 4000)
Open a second terminal in this same folder and run:

```bash
node expressApp.js
```

Test these endpoints in Postman:
- GET `http://localhost:4000/foods`
- GET `http://localhost:4000/foods/1`
- POST `http://localhost:4000/foods`
- PUT `http://localhost:4000/foods/1`
- DELETE `http://localhost:4000/foods/1`

For POST and PUT, choose Body > raw > JSON and use a JSON object with:
```json
{
  "id": 4,
  "foodName": "Cold Coffee",
  "category": "Beverage",
  "price": 120,
  "availability": true
}
```

For PUT `/foods/1`, the route ID is used as the ID of the updated record, so the body may contain any ID; all other fields are required.

## GitHub submission
Create a GitHub repository named `MT1-LABEXAM`, then run:
```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/MT1-LABEXAM.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username. Add screenshots to the `screenshots` folder and commit them:
```bash
git add screenshots
git commit -m "Add practical exam screenshots"
git push
```
