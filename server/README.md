
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
 - Photo Management
 
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

      [{
         "access": "auth",
         "token" :"JWT",
         "_id" : "_id"
      }]

Use `token` in header with key `x-auth` to access protected routes.

## Photo management

In this photo management API, user can view their uploaded photos, add new photos and delete their own desire photos.

### Add New Photo
User can upload the photo.

- **URL**

    `/upload`

- **Method**

    `POST`

- **Body parameters**

    - `image`: Browse and select photo

 **Success Response**

      {
          "success": "true",
          "message": "Image upload successfully"
      }
### List of Photos
User can view photos list.

- **URL**

    `/upload`

- **Method**

    `GET`

 **Success Response**

    {
        "success": "true",
        "message": "Display uploaded images list."
    }

### **Delete Photo**
User can delete photo by photo id.

- **URL**

    `/upload/:photo_id`

- **Method**

    `DELETE`

 - **Success Response**

        {
            "success": "true",
            "message": "Image successfully deleted"
        }
