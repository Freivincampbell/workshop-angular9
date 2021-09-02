# Workshop with Angular9, Graphql, Apollo, Nodejs and Mongodb

> A simple Angular9 CRUD  + GraphQL + Apollo + NodeJs + Express + MongoDB

This repository shows a complete example of a CRUD application based on Angular 9, NodeJs with Graphql API.

## For this **workshop** we'd have installed:

# NodeJS
[website](https://nodejs.org/en/download/)
```bash
node -v
>> v12.14.0
```

# npm
[website](https://www.npmjs.com/get-npm)
```bash
npm -v
>> 6.13.7
```

# Angular CLI
[website](https://cli.angular.io/)
```bash
ng -v
>> Angular CLI: 9.0.2
```

## There is a **GitHub** repo with a project that you can use as a server with Nodejs, you should have **MongoDB** installed.
[FreivinCampbellServer](https://github.com/Freivincampbell/workshop-angular9-server)

## If not, there is a link with an app running on Heroku.com
[ServerEndPoint](http://workshopserverdotcreek.herokuapp.com/graphql)


## After downloading  the client or server project/s, you must **run** on your command line:
```bash
npm install
```

## Then, you can run on server project the **npm start** command


## Be sure to run it inside of server project
```bash
cd workshop-angular9-server
```

```bash
npm start
```

## Then, you can run on client project the **npm start** command


## Be sure to run it inside of client project
```bash
cd workshop-angular9
```

```bash
ng serve
```

## If you are running the server project by yourself you must change **URL** endpoint on your client project:

 ```bash
 nano /app/graphql.module.ts
 ```

 ```javascript
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

// const uri = 'http://localhost:4000/graphql'; // 🚀 Local
// const uri = 'http://workshopserverdotcreek.herokuapp.com/graphql'; //🚀 Production
 ```


# Documentation

https://graphql.org/

https://angularjs.org/

https://www.apollographql.com/

http://workshopserverdotcreek.herokuapp.com/graphql
