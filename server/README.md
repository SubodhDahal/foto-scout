
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

## Foto Upload

In this Foto Upload API, user can view their uploaded fotos, add new fotos and delete their own desire fotos.

### Add New Foto
User can upload the foto.

- **URL**

    `/upload`

- **Method**

    `POST`

- **Body parameters**

    - `image`: Brows and select foto

 **Success Response**

      {
          "success": "true",
          "message": "Image upload successfully"
      }
### List of Fotos
User can view fotos list.

- **URL**

    `/upload`

- **Method**

    `GET`

 **Success Response**

      {
          Display uploaded images list.
      }
 ### **Delete Foto**
User can delete foto by foto id.

- **URL**

    `/upload/foto_id

- **Method**

    `DELETE`

  **Success Response**

      {
          "success": "true",
          "message": "Image successfully deleted"
      }
