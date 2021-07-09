# Caffeinated

#### Caffeinated is a website to unite all of the avid coffee drinkers. Share your most inspiring coffee creations and learn some new tips from others who like to stay caffeinated! Don't worry tea drinkers, in an upcoming version there will be a category dedicated just for you!

#### Technologies Used:
- Express version 4.17.1
- MongoDB: version 3.4.0
- Mongoose: version 5.12.14
- Bcrypt: version 3.0.7
- Passport: version 0.4.1

#### File Structures:
1. Models and routes for users, posts, and reviews are located in the app folder.
2. cURL scripts have been included for authentication, posts, and reviews
3. The library folder contains middleware files
4. The test folder contains examples for using Chai to test (work in progress)
3. The endpoints for authentication, posts, and reviews are shown below.

<br>

#### Authentication:
| Action | Method | Path |
| ----------- | ----------- | ----------- |
| Sign-Up | POST | /sign-up
| Sign-In | POST  | /sign-in
| Change-Password |  PATCH | /change-password
| Sign-Out | DELETE | /delete

<br>

#### Posts (Token Required) :
| Routes | Method | Path |
| ----------- | ----------- | ----------- |
| Create | POST | /posts
| Index-User | GET | /posts/user
| Index-All | GET | /posts
| Show | GET | /posts/:id
| Update | PATCH | /posts/:id
| Delete | DELETE | /posts/:id

<br>

#### Reviews (Token Required) :
| Routes | Method | Path |
| ----------- | ----------- | ----------- |
| Create | POST | /reviews
| Update | PATCH | /reviews/:reviewId
| Delete | DELETE | /reviews/review:reviewId

<br>

### Important Links:
- [Front End Repo](https://github.com/faithfitts/Caffeinated)
- [Back End Repo](https://github.com/faithfitts/caffeinated_backend)
- [Deployed API](https://caffeinated-ff.herokuapp.com/)
- [Deployed App](https://faithfitts.github.io/Caffeinated)

<br>

**Entity Relationship Diagram**
![ERD](https://i.imgur.com/gASUdpy.png)
