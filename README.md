# Base MERN Structure

This is a sasic structure for a MERN project, with basic user registration and login

## Getting Statted
Becasuse we are working with Server and Client, you will need to run `npm install` twice as follow

```
$ npm i
```

and

```
npm run client-install
```

This will take care of all npm installation on both location.

In order for the application to run, NodeJS and MongoDB must be installed on your machine and make sure that MongoDB is running.

## MongoDB Setup

Open the file `config/default.js` and edit the lines `40` and `41` with the appropriate values related to your localMongoDB installation.

## Start Server

After all the configuration is all set, open terminal and run:

```
npm run dev
```  

The web server will be available on

```
http://localhost:3000
```

and the API URL will be available on 

```
http://localhost:5000/api
```
