# The home of the Incluesion API devs

Please do not commit code to the main branch. Create pull requests and have them reviewed before merging to main.

## Setting up the development environment

Ensure you have NodeJS installed. (Recommended is v16.17.0) https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi
After pulling the code from the repository
1. Run ```npm install``` so that all packages are downloaded.
2. Set up a .env file. Read about creating it [here](https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj) 
3. Set up ```PORT = desiredport #```. NOTE: IT IS IMPORTANT TO USE **PORT** AS THE VARIABLE NAME
4. Get the MongoDB URI from MongoDB Atlas and add it as ```URIDB``` to your .env file. Ensure to add your IP to the accepted IP's in the Network Access tab. Add the password of the DB to the ```<password>``` section of the URL.
5. Run ```npm start``` on the terminal.


## Route files

admin.js - handles all /admin/ routes
api.js - handles all /api/ routes