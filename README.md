## TODO 🚧

- Add all shift fields
  - Date
  - Start / end time
  - Event responsible (& info)
  - Balance
  - People needed

- User register to shift (worker, SA)
- Profile page
  - Edit profile page
- roles / permission system

## How to run 🚀

Backend API:

```
$ cd server/
$ yarn dev-ts
```

Web server:

```
$ cd frontend/
$ yarn dev
```

Install latest version of Docker

Postgres:

```
docker-compose up db
```

Redis:

```
docker-compose up redis
```

If you want to directly edit the Postgres db:

```
docker-compose up pgadmin
```

Accessible on: http://localhost:5433

- Email: postgres@pgadmin.com
- Password: postgres
