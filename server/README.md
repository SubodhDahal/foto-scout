

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

 - **Success Response**

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

### Delete Photo
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

### List of Categories

- **URL**

    `/ImageCategory`

- **Method**

    `GET`

 - **Success Response**

    List of categories like:

     [
        {
          "_id" : ObjectId("5a46c90ed81b8c29dce671a4"),
          "categoryName" : "test1",
          "__v" : 0
        },
      {
          "_id" : ObjectId("5a46c916d81b8c29dce671a5"),
          "categoryName" : "demo",
          "__v" : 0
       }
     ]

### **Delete Image Category**

- **URL**

   `/ImageCategory/:categoryId`

- **Method**

    `DELETE`

 - **Success Response**

     {
         "success": "true",
         "message": "Category successfully deleted"
     }

### **Update Category**

- **URL**

   `/ImageCategory/:categoryId`

- **Method**

   `PUT`

-  **Parameters**

   `categoryName`: Then name of the category

  - **Success Response**

      {
          "success": "true",
          "message": "Category Updated successfully"
      }
