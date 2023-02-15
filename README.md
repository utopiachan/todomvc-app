# TodomvcApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.


## User guide

Sign up your account via register button. sign in to account and it will direct you to the todolist component.Enter your todos and click on the drop down list on the todos to translate your button. User usage link will be available when signed up with user name admin.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## backend server
we will use nodemon and express for the backend server
use these commands to install
`npm install --save express`
`npm install --save-dev nodemon`
Navigate to server folder and run the code to open a listening server port:`npm run start:dev` 
application is using postgres for database storage. configure your own databse detail in the .env file.
We have two table: one is user and one is todo.
database table structure can be found from the models file. location:rootfolder/src/app/models

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
