# Install movie-testclient

React CLIENT for gastromatic movie test

## Setup Without Docker
```
npm ci
npm run start
```

Test running client by accessing `http://localhost:3000/`

## Setup with Docker

Docker and docker-compose need to be installed. To start the services run

```
docker-compose build
docker-compose up
```

Test running client by accessing `http://localhost:3000/`

For testing on a different device run
```
docker-compose build
docker-compose run --service-ports -e REACT_APP_SERVER_IP=[ipAddressServer] movieclient
```
Test running client by accessing `http://[ipAddressClient]:3000/`
