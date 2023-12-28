import swaggerAutogen from 'swagger-autogen';


const doc = {
    info: {
      version: '1.0.0',            // by default: '1.0.0'
      title: 'Food Services Auth',              // by default: 'REST API'
      description: 'Authentication microservice.'         // by default: ''
    },
    servers: [
      {
        url: 'http://localhost:3000',              // by default: 'http://localhost:3000'
        description: ''       // by default: ''
      },
      // { ... }
    ],
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],

    definitions: {
        UserCreate: {
            firstName: "Jhon",
            lastName: "Doe",
            age: 42,
            userName: "JohnDoe123",
            password: "@Pas$wrd123!"
        },
        UserUpdate: {
            firstName: "Jhon",
            lastName: "Doe",
            age: 42,
            userName: "JohnDoe123"
        },
        User: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            age: 42,
            userName: "JohnDoe123"
        },
        Users: [
            {$ref: "#/definitions/User"}
        ],
        Login: {
            "userName": "JohnDoe123",
            "password": "@Pas$wrd123!"
        },
        Token: {
            "token": "eyJhbGciOiJIUzI1NiIkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLzZXJuYW1lMSIsInBhc3N3b3JkIjoiJDJiJDE1JGVHZ3B0ZS5ycFBtazZPRlEvY3lDRWVNWkowOE9DQVY4VXh5SE9vdlAvaWR5aVRpTzN5YnB1In0sImDY5MCwiZXhwIjoxNzAzNzk0MjkwfQ.Zgd-nGQKBuuia8miCrX0UKFvWQPsz-CPqE"
        }

    }
    // tags: [                   // by default: empty Array
    //   {
    //     name: '',             // Tag name
    //     description: ''       // Tag description
    //   },
    //   // { ... }
    // ],
    // components: {}            // by default: empty object
  };
  
  const outputFile = '../swagger-output.json';
  const routes = ['./index.ts'];
//   const routes = ['./router/UserExpressRouter.ts'];
  
  /* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */
  
  swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);