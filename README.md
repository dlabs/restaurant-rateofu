# Restaurant at the end of the universe

Frontend clients for guests and staff.

## Running locally (with Docker)

The easiest way to start the application would be to run
```sh
docker-compose up
```

This will start both frontend apps and the backend api and will put them behind a proxy.  
When the application is started this way, it's enough to go to [localhost/](http://localhost/) for the guest app, and [localhost/staff](http://localhost/staff) for the staff app.  
Additionally the following staff roles would be inserted in the database, when the app is started with Docker:
| id | username | role   |
|----|----------|--------|
| 1  | alice    | chef   |
| 2  | bob      | barman |
| 3  | jack     | waiter |
| 4  | root     | waiter |

Apart from the staff records, the menu items listed in the assignment would be inserted as well.

## Running locally

Running both apps is simply if you have `make` and `python3` installed:

### Guest app

`make guest`

will start simple Python HTTP server on port 8081, therefore guest application should be available at `http://localhost:8081`.

### Staff app

`make staff`

will start simple Python HTTP server on port 8082, therefore guest application should be available at `http://localhost:8082`.

## Working with custom server

In order to connect frontend clients to a custom server, modify `guest-app/index.html` and `staff-app/index.html` files.

Find a line starting with `const BASE_URL = "..."` , replace the value with your custom server base URL, and you should be ready to go.

Also make sure you have generated a virtual environment at the root folder and activate it
```sh
# Generate virtual environment
python -m venv .venv

# Acitvate it
source .venv/bin/activate
```

Once the virtual environment has been activated you can install the dependencies
```sh
pip install -r requirements.txt
```

### Server app

`make server`

will start HTTP server on port 8083

NOTE: Starting the server this way, won't have any records in the database. From the root of the project, you will need to run:
```sh
# Activate virtual environment
source .venv/bin/activate

cd server

# Run script to insert records
python -m src.cmd.insert_records
```

## Testing

- Unit tests

```sh
make test
```

- End-to-End tests  

```sh
# Start the test server
make server-test

# Run the end-to-end tests
make test-e2e
```

## About the project
The server was built on top of Python and FastAPI using Sqlite as the primary DB.
Sqlite was chosen as the current number of users / staff isn't that big and on theory as long as the size stays less then six figures, Sqlite could handle it, in fact it might even outperform other databases.
The folder structure regarding the backend api is using the following rules:
- */src/cmd/*: Used for scripts that could be executed directly (e.g. start dev server, insert records in db, etc.)
- */src/http/*: Used for initiating the **app** object, needed by ASGI server and has a subfolder for all related routes
- */src/models/*: Used for all database models and some related functionality such as the db engine, a function to create a db session
- */src/modules/*: Used for the business logic of the app, it's composed in the following way:
    - */src/modules/<module_name>/repository.py*: Used for database manipulation related functionality
    - */src/modules/<module_name>/service.py*: Used for any functionality not related to the database


## Further development
- [X] Replace in-memory mock db with Sqlite
- [X] Containerization
- [X] TailwindCSS instead of Bootstrap/Jquery
- [X] Reverse-proxy integration
- [ ] Improve UI/UX
- [ ] Add feature to reserve a table and to mark a table as reserved
- [ ] Production ready HTTP server for the backend (e.g. [Gunicorn](https://gunicorn.org))
- [ ] SSL integration
- [ ] Replace local environment with cloud (e.g. AWS)
- [ ] Stress testing
- [ ] Configure and fine-tune load-balancer
- [ ] Refactor unit tests (some are quite big, should be simplified)