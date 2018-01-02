


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

      [
          {
              "access": "auth",
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTRiYjU5NzM2OGYzZjFkZWNjZmNiZTciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTE0OTExMTI3fQ.empAZxbb5njgn8zCIsx2W0xAUm58Axluy6RurpBCNrg",
              "_id": "5a4bb597368f3f1deccfcbe9"
          }
      ]

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

### User Profile
View user profile

- **URL**

    `/user/me`

- **Method**

    `GET`

- **Success Response**

      {
          "_id": "id",
          "firstname": "firstname",
          "lastname": "lastname",
          "email": "email",
          "user_profile": [
              {
                  "_id": "id",
                  "profile_pic": "profile picture",
                  "about_me": "about me"
              }
          ]
      }

### Edit User Profile
Editing user profile

- **URL**

    `/user/me/edit`

- **Method**

    `POST`
    
- **Body parameters**

     Use returned token value in headers key 'x-auth' for authentication

    - `firstname`: The First Name
    - `lastname`: The Last Name
    - `about_me`: Description of the User

- **Success Response**

      {
          "_id": "id",
          "firstname": "updated firstname",
          "lastname": "updated lastname",
          "email": "authorised user email",
          "user_profile": [
              {
                  "_id": "id",
                  "profile_pic": "profile picture",
                  "about_me": "updated about me"
              }
          ]
      }

### Logging out
Log out the user

- **URL**

    `/user/me/logout`

- **Method**

    `DELETE`

- **Success Response**

      {
        "success": "true",
        "message": "Bye bye user"
      }


### Logging out
Log out the user

- **URL**

    `/user/me/logout`

- **Method**

    `DELETE`

- **Success Response**

      {
        "success": "true",
        "message": "Bye bye user"
      }

## Photo management

In this photo management API, user can view their uploaded photos, add new photos and delete their own desire photos.

### Add New Image
User can upload new image.

- **URL**

    `/upload`

- **Method**

    `POST`

- **Body parameters**

    - `image`: browse and select image
    -   `description`: description of image
    -  `latitude` :  location latitude of uploaded image
    -  `longitude`: location longitude of uploaded image
    -  `imageCategory`:  category of image

 - **Success Response**

		   {
	          "success": "true",
	          "message": "Image Uploaded Successfully"
            }

### **Update an Image**
Update only image description and image category.
- **URL**

   `/upload/(imageId)`

- **Method**

   `PUT`

-  **Parameters**

   `description`: description of image
   `imageCategoryId`: category of image

  - **Success Response**

	      {
	          "success": "true",
	          "message": "Image Updated Successfully"
            }

### **Uploaded Images List**

- **URL**

   `/upload

- **Method**

   `Get`

  - **Success Response**
Gives list of image:

	      {
	       "_id" : ObjectId("5a4830dbc5d528179826034c"),
	        "path" : "api\\uploads\\profile.JPG",
		    "originalname" : "profile.JPG",
		    "description" : "this is test",
		    "userId" : 1,
		    "imageCategoryId" : "4",
			    "location" : {
		        "type" : "Point",
		        "coordinates" : [
			            55,
			            50
								]
							 },
				    "__v" : 0
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

### Delete Image
Delete an image by id.

- **URL**

    `/upload/(imageId)`

- **Method**

    `DELETE`

 - **Success Response**

	     {
         "success": "true",
         "message": "Image successfully deleted"
          }

### Get an Image by Id

- **URL**

    `/upload/(imageId)`

- **Method**

    `Get`

 - **Success Response**

	       {
	       "_id" : ObjectId("5a4830dbc5d528179826034c"),
	        "path" : "api\\uploads\\profile.JPG",
		    "originalname" : "profile.JPG",
		    "description" : "this is test",
		    "userId" : 1,
		    "imageCategoryId" : "4",
			    "location" : {
		        "type" : "Point",
		        "coordinates" : [
			            55,
			            50
								]
							 },
				    "__v" : 0
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

   `/ImageCategory/(categoryId`)

- **Method**

    `DELETE`

 - **Success Response**

	     {
	         "success": "true",
	         "message": "Category successfully deleted"
          }

### **Update Category**

- **URL**

   `/ImageCategory/(categoryId)`

- **Method**

   `PUT`

-  **Parameters**

   `categoryName`: Then name of the category

  - **Success Response**

	      {
	          "success": "true",
	          "message": "Category Updated successfully"
            }
