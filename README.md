# reverb-CS701 Top Level

This repository combines the client and server into a single repository that can be co-developed and tested with the goal of being ultimately deployed to Heroku or basin.cs.middlebury.edu.

The client was created with [create-react-app](https://github.com/facebookincubator/create-react-app) (CRA) and the server is a separate Node.js application. The client-server integration is based on this [tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [repository](https://github.com/fullstackreact/food-lookup-demo). This repository will be referred to as the "top-level" to distinguish it from the client and server.

## Need the Application Addresses:
Livestreaming music listening experiences for free.

## Installing Dependencies

The skeleton is structured as three separate packages and so the dependencies need to be installed independently in each of the top-level, the client and the server, i.e.:

```
npm install
npm install --prefix client
npm install --prefix server
```

## Running the Application

The combined application, client and server, can be run with `npm start` in the top-level directory. `npm start` launches the CRA development server on http://localhost:3000 and the backend server on http://localhost:3001. By setting the `proxy` field in the client `package.json`, the client development server will proxy any unrecognized requests to the server.

## Testing

The client application can be independently tested as described in the [CRA documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests), i.e.:

```
npm test --prefix client
```

The server can be similarly independently tested:

```
npm test --prefix server
```

## Linting

Both the client and server can be independently linted via:

```
npm run lint --prefix client
```

and

```
npm run lint --prefix server
```
## Server

Application uses Firebase databases server located at: https://console.firebase.google.com/project/reverb-9081f/overview

No add-ons used.

## Features

* uses:
  * only React (create-react-app)
  * firebase
  * react-router
* features:
  * Sign In
  * Sign Up
  * Sign Out
  * Password Forget
  * Password Change
  * Verification Email
  * Protected Routes with Authorization
  * Roles-based Authorization
  * Social Logins with Google, Facebook and Twitter
  * Linking of Social Logins on Account dashboard
  * Auth Persistence with Local Storage
  * Database with Users and Songs


## Installation

* `git clone https://github.com/a11one/reverb-CS701.git`
* `cd reverb-CS701`
* `npm install`
* `npm start`
* visit http://localhost:3000

Get an overview of Firebase, how to create a project, what kind of features Firebase offers, and how to navigate through the Firebase project dashboard in this [visual tutorial for Firebase](https://www.robinwieruch.de/firebase-tutorial/).

## Installing Firebase
npm install --save firebase

## Installing Reacststrap (Bootstrap 4)

npm install --save bootstrap
npm install --save reactstrap react react-dom

### Activate Sign-In Methods

Additional sign-in methods can be activated through the Firebase authentication plaform. Currently, only the email and password method is enabled. 

![firebase-enable-google-social-login_640](https://user-images.githubusercontent.com/2479967/49687774-e0a31e80-fb42-11e8-9d8a-4b4c794134e6.jpg)

* Email/Password
* [Google](https://www.robinwieruch.de/react-firebase-social-login/)
* [Facebook](https://www.robinwieruch.de/firebase-facebook-login/)
* [Twitter](https://www.robinwieruch.de/firebase-twitter-login/)
* [Troubleshoot](https://www.robinwieruch.de/react-firebase-social-login/)


### Security Rules

```
{
  "rules": {
    ".read": false,
    ".write": false,
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])",
        ".write": "$uid === auth.uid || root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])"
      },
      ".read": "root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])",
      ".write": "root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])"
    },
    "messages": {
      ".indexOn": ["createdAt"],
      "$uid": {
        ".write": "data.exists() ? data.child('userId').val() === auth.uid : newData.child('userId').val() === auth.uid"
      },
      ".read": "auth != null",
      ".write": "auth != null",
    },
  }
}
```
