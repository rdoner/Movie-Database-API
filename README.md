# Movie Database API

This API was built using MongoDB, NodeJS and ExpressJS to interact with a movie database. It has CRUD operation and some more advanced routes including an index of genres and a list of years sorted by how many movies were produced in that year. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to install NodeJS, the Postman API development environment, and MongoDB

### Set Up

Download latest versions of:
  NodeJS from https://nodejs.org/en/
  MongoDB from https://www.mongodb.com/download-center?jmp=nav#community
  Postman from https://www.getpostman.com/

#### Parse CSV to JSON (parsed file already located at data/parsedData.json)
In your command line, navigate to Movie-Database-API/data
Run command below. Parsed file will be saved to the same directory.
```
npm run dataParser.js
```

#### Import database into mLab
Go to https://mlab.com/home. Create a new database, a new collection, and a new user within that collection. Go to the tools tab and under import JSON, copy the command below similar to this:
```
mongoimport -h ds143678.mlab.com:43678 -d moviedatabase -c <collection> -u <user> -p <password> --file <input file>
```
Navigate to where MongoDB is installed and go to directory /mongodb/bin
Paste the above command and fill in <collection>, <user>, <password>, and the path for the parsedData.json file that was made.
Run the command and will populate the mLab database.
  
#### Connect to mLab database
Open the config/db.js file. Go to mLab, copy the url under "To connect using a driver via the standard MongoDB URI (what's this?):"
Paste into the db.js file and replace <dbuser> and <dbpassword> with your info.
```
module.exports = {
  url : 'mongodb://<dbuser>:<dbpassword>@ds143678.mlab.com:43678/moviedatabase'
};
```

#### Start local server
Navigate to root project directory in command line and run the following command.
```
npm run dev
```
If successful, it will log We are live on 8000. 

## Testing

In Postman, send requests to localhost:8000. 

Available requests: 
  Create: Post request to localhost:8000/movies
      enter form data under x-www-form-urlencoded. Available keys: title, id, year, genres
  Read: Get request to localhost:8000/movies/id
  Update: Put request to localhost:8000/movies/id
  Destroy: Delete request to localhost:8000/movies/id
  
  Find all movies, ordered by year: Get request to localhost:8000/movies
  List years by order of years with the most movies: Get request to localhost:8000/year
  Index of genres: Get request to localhost:8000/genres
  Endpoint for a particular genre that includes a listing of the genre’s movies: Get request to localhost:8000/genremovies

## Built With

* [Node](https://nodejs.org/en/) - Server framework
* [Express](https://expressjs.com/) - Web Framework for Node
* [MongoDB](https://www.mongodb.com/) - Database program
* [mLab](https://mlab.com/) - Database hosting service

## Author
Ryan Doner
