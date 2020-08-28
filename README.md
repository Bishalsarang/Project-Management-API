## Project Management API

### Configuration

- Copy env.example file into new file .env

- Configure the environment variables as per your database

- You can set the default credentials in the .env file which is the credentials of admin

- Migrate the database with
  `yarn migrate`

- Seed the database with default user credentials using
  The default credentials is admin admin
  `yarn seed`

- Run the server
  `yarn start`

# Schema

- User has many projects and Project has many user => Many to Many

- User can be member of multiple Project and every member is a user => One to many

- Project can have multiple members and each member belongs to a project => One to many

- User can be tagged multiple and every tagged user belongs to User => One to many

- Task can have multiple tags and every tag belongs to task => One to many

- Project can have multiple task and Task belongs to a project => One to many

- User can have multiple task and task can be tagged to multiple users => Many to Many

- Task has multiple comments and comment belong to a task => One to Many

### Projects Routes

### Auth

- POST api/auth/login
- POST api/auth/register
-

#### Users

- GET api/users
- GET api/users/:id
- UPDATE api/users/:id
- DELETE api/users/:id
-

#### Projects

- POST api/projects
- GET api/projects
- GET api/projects/:id
- UPDATE api/projects/:id
- DELETE api/projects/:id
- GET api/projects/:id/tasks
- GET api/projects/:id/users
-

#### Tasks

- POST api/tasks
- GET api/tasks
- GET api/tasks/:id
- UPDATE api/tasks/:id
- DELETE api/tasks/:id

#### Comments

- POST api/comments
- GET api/comments
- GET api/comments/:id
- UPDATE api/comments/:id
- DELETE api/comments/:id

## TO DOS

- [x] Create database schema

- [x] Data migration and seeding

- [x] User registration allowed only by admin user

- [x] User login for admin and non admin user

- [x] Complete auth routes

- [x] Add relationships between table

- [x] Complete user routes (CRUD)

- [x] Complete project routes (CRUD)

- [x] While admin creates a project he/she add a project manager to the project i.e on update : members table and project table and only user with project_manager role can be assigned

- [x] Remove code duplication in CRUD

- [x] Sanitize and validate data before inserting into database

- [ ] Write Database test

- [ ] Write API test

- [ ] Write Integration Test

- [ ] Add JSdoc

- [x] Build Frontend

- [x] Arrange imports
