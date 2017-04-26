# auth-passport
### basic crud api with jwt passport authentication
**Route** | **HTTP** | **Description**
----------|----------|----------------
/api/signup | POST | Sign up with new user info
/api/signin | POST | Sign in while get an access token based on credentials
/api/users | GET | Get all the users (admin only)
/api/users/:id | GET | Get a single user (admin and users only)
/api/users | POST | Create a user (admin only)
/api/users/:id | DELETE | Delete a user (admin only)
/api/users/:id | PUT | Update a user with new info (admin and respective user only)