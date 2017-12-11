# Authentication with JSONWEBTOKEN
This is a NodeJS API that supports username and password authentication with jsonwebtoken.

## Available APIs
### User Regisrtration API

### POST/register
You can do a POST to http://localhost:3000/register to create a new user.

The body must have:

- firstname: The first name
- lastname: The last name
- email: The email
- passcode: The passcode

It returns the following:
        
  {
  
      "success": "true",  
      "message": "Registration is successful"
      
  }

### POST/login
You can do a POST to http://localhost:3000/login to login 

The body must have:

- email: The email
- passcode: The passcode

It returns the following

{

    "access_token": "JWT"
    
}

use "access_token" in authorization header to access protected routes.

## Running it
To run the server run the following commands
1. npm install
2. node app.js
