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
  - Project can have multiple task and Task belongs to a project => One to many
  - User can have multiple task and task can be tagged to multiple users => Many to Many
  - Task has multiple comments and comment belong to a task => One to Many

## Routes

[x] POST api/auth/login
[X] POST api/auth/register | This route needs the role to be 'admin'
[X] GET api/users | This route needs the role to be 'admin'
[X] GET api/users:id | This route needs the role to be 'admin'
[X] PUT api/users:id | This route needs the role to be 'admin'
[X] DELETE api/users:id | This route needs the role to be 'admin'
[X] UPDATE api/users:id | This route needs the role to be 'admin'

## Reminder

- Update schema for members by adding is_manager field and for tags by adding is_assigned field
- Update schema for user by adding is_deleted column

## TODOS

- [x] Create database schema
- [x] Data migration and seeding
- [x] User registration allowed only by admin user
- [x] User login for admin and non admin user
- [x] Complete auth routes
- [x] Add relationships between table
- [ ] Sanitize and validate data before inserting into database
- [ ] Write Database test
- [ ] Write API test
- [ ] Write Integration Test
- [ ] Add JSdoc
- [ ] Build Frontend
- [ ] Arrange imports
