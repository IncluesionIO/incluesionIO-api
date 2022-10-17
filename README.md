# The home of the Incluesion API devs

Please do not commit code to the main branch. Create pull requests and have them reviewed before merging to main.

## Setting up the development environment

### Requirements to run the project
- Docker
- NodeJS
- SendGrid (for emailing)

Ensure you have NodeJS installed. (Recommended is v16.17.0) https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi
After pulling the code from the repository
1. Run ```npm install``` on the directory that the package.json is located in so that all packages are downloaded.
2. Set up a .env file. Read about creating it [here](https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj) 
3. Set up ```PORT = desiredport #```. NOTE: IT IS IMPORTANT TO USE **PORT** AS THE VARIABLE NAME. NOTE 2: DOCKER WILL LOOK FOR PORT 3000, SO WE RECOMMEND USING THAT. IF YOU WILL USE SOME OTHER PORT, MAKE SURE TO UPDATE THE docker-compose.yml
4. Get the MongoDB URI from MongoDB Atlas and add it as ```DBURI``` to your .env file. ~~Ensure to add your IP to the accepted IP's in the Network Access tab.~~ Add the password of the DB to the ```<password>``` section of the URL.
5. Create a JWT Secret and store it in the .env file under the name ```JWTSECRET```.
6. Get your SendGrid API key and add it to the .env file as ```SENDGRIDAPIKEY```
7. Run ```docker-compose up --build``` on the terminal. The server will be available in port 13000 from your local machine.


## Route files

- api-doc.route.js - Handles /api-doc/ route, which hosts SwaggerUI
- admin.js - handles all /admin/ routes
- api.js - handles all /api/ routes
- assessment.js - handles all /assessment/ routes

### API Documentation
API documentation is hosted on SwaggerUI when the server is running, using path /api-docs/

## Scripts
- npm start: starts the server on the local machine
- npm test: starts the server, but runs the test suite, then closes
