# A simple task list built with AdonisJS

## Getting Started

Clone the project repository by running the command below if you use SSH

```
git clone git@github.com:ammezie/adonis-tasks.git
```

If you use https, use this instead

```
git clone https://github.com/ammezie/adonis-tasks.git
```

## Setup

Run the command below to install dependencies

```
npm install
```

Duplicate `.env.example` and rename it `.env`

### Migrations

Setup your database and enter the following in `.env`

```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=adonis-tasks
DB_USER=root
DB_PASSWORD=
```

Run the following command to run migration.

```
adonis migration:run
```

Finally, start the application:

```
adonis serve --dev
```

and visit http://127.0.0.1:3333/ to see the application in action.
