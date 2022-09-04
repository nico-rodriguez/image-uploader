<h1 align="center">Image Uploader</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://image-uploader-38e5.onrender.com/">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx">
      Challenge
    </a>
  </h3>
</div>

## Overview

Visit [https://image-uploader-38e5.onrender.com/](https://image-uploader-38e5.onrender.com/).

Uploading an image:

![success](./success.gif)

Rate limiting:

![too-many-requests](./too-many-requests.gif)

### Built With

- React
- Express

## Features

The backend is secured with Helmet, `express-rate-limit` and `express-slow-down`. This way, the amount of images that can be uploaded, and the upload rate is limited, to prevent DoS attacks. Also, the files that can be uploaded are filtered to images of under 4MB.

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx) was to build an application to complete the given user stories.

## Deploy

After logging in to Heroku and creating a new app, run the following for deploying:

```bash
git push heroku master
```

The `package.json` at the root describes how to install dependencies, build the frontend and run the server:

- `postinstall`: step into each `backend` and `frontend` folders and run `npm install`
- `heroku-postbuild`: build the frontend application and copy the code to `backend` for static serving
- `start`: move to the `backend` folder and run the server

This is necessary, since code from both backend and frontend is in the same repository.
