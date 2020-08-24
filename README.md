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

## TODOS

- [x] Create database schema
- [x] Data migration and seeding
- [x] User registration allowed only by admin user
- [x] User login for admin and non admin user
- [x] Complete auth routes
- [ ] Sanitize and validate data before inserting into database
