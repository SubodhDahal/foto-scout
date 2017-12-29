
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

      {
         "access_token": "JWT"
      }

Use `access_token` in authorization header to access protected routes.

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

### Query photos by location
Get the photos that are within certain range of the location

- **URL**

    `/images/search`

- **Method**

    `GET`

- **Query parameters**

    - `latitude`: The geographical latitude coordinate
    - `latitude`: The geographical latitude coordinate
    - `radius`: The radius range(in km) to search
    
 **Success Response**(sample)
  
    {
        "status": "success",
        "images": [
            {
                "_id": "5a469b3c27435203c926b44a",
                "path": "api/uploads/xmas-2928142_1280.jpg",
                "originalname": "xmas-2928142_1280.jpg",
                "description": "test",
                "userId": 1,
                "location": {
                    "coordinates": [
                        54.3285731,
                        10.1267113
                    ],
                    "type": "Point"
                },
                "__v": 0
            }
        ]
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
