# Server-app

## Local dev setup using VS Code
If you are using VS Code and you have "Remote Development" extension installed you can just click button on the right bottom corner "Open in container"

```bash
# create db, run migrations and seed file
$ rails db:setup

# run app server
$ rails s -b 0.0.0.0 -p 8080
```

## Local dev setup using docker-compose
go to docker-compose.yml and change "Dockerfile.dev" to "Dockerfile"
```bash
$ cd server-app
$ docker-compose up -d

# setup the db
$ docker exec -it server-app-server-app-1 bash
$ rails db:setup
```
