# FotoScout API
API for the FotoScout system

## Build Setup

``` bash
# install dependencies
npm install

# run the node server
node app.js
```

## Available APIs

 - User Registration

## User Registration

This is a NodeJS API that supports username and password authentication with JSON Web Tokens.

### Register user
Register a new user

- **URL**
    
    `/register`

- **Method**

    `POST`
    
- **Body parameters**

    - `firstname`: The first name
    - `lastname`: The last name
    - `email`: The email
    - `passcode`: The passcode

- **Success Response**
        
      {
          "success": "true",  
          "message": "Registration is successful"      
      }

### Login user
Login a user into the system

- **URL**
    
    `/login`

- **Method**

    `POST`
    
- **Body parameters**

    - `email`: The email
    - `passcode`: The passcode

- **Success Response**

      {
         "access_token": "JWT"    
      }

Use `access_token` in authorization header to access protected routes.
