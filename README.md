## Project Management API

### Configuration

- Copy env.example file into new file .env
- Configure the environment variables as per your database
- You can set the default credentials in the .env file which is the credentials of admin
- Migrate the database with
  `yarn migrate`
- Seed the database with default user credentials using
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

## Routes

### Login and register routes

[x] POST api/auth/login
[X] POST api/auth/register | This route needs the role to be 'admin'

### Users Routes

[X] GET api/users | This route needs the role to be 'admin'
[X] GET api/users/:id | This route needs the role to be 'admin'
[X] PUT api/users/:id | This route needs the role to be 'admin'
[X] DELETE api/users.:id | This route needs the role to be 'admin'
[X] UPDATE api/users:id | This route needs the role to be 'admin'

### Projects Routes

[X] POST api/projects | This route needs the role to be 'admin'
[X] GET api/projects | This route needs the role to be 'admin'
[X] GET api/projects/:id | This route needs the role to be 'admin'
[X] UPDATE api/projects/:id | This route needs the role to be 'admin'
[X] DELETE api/projects/:id | This route needs the role to be 'admin'

## Reminder

- Update schema for members by adding is_manager field and for tags by adding is_assigned field
- Update schema for user by adding is_deleted column

## TO DOS

- [x] Create database schema
- [x] Data migration and seeding
- [x] User registration allowed only by admin user
- [x] User login for admin and non admin user
- [x] Complete auth routes
- [x] Add relationships between table
- [x] Complete user routes (CRUD)
- [x] Complete project routes (CRUD)
- [ ] While admin creates a project he/she add a project manager to the project i.e on update : members table and project table and only user with project_manager role can be assigned
- [ ] List User by roles
- [ ] Remove code duplication in CRUD
- [ ] Sanitize and validate data before inserting into database
- [ ] Write Database test
- [ ] Write API test
- [ ] Write Integration Test
- [ ] Add JSdoc
- [ ] Build Frontend
- [ ] Arrange imports

## Requirements

### Admin

- [x] Admin Can perform all CRUD for Projects, Users, Tasks
- [x] Can View all the Projects, Users, Tasks

### Project Manager

- [x] Cannot add new project, delete project
- [x] Can View all the projects, even the ones s/he is not assigned to but cannot view the tasks of the projects they’re not assigned to
- [x] Can perform Updates for assigned Projects only
- [ ]
