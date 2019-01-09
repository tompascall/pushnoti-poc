### Push notification poc

#### Prerequisites

Test application key has been saved to AWS Secret Manager. To use the key you have to
`saml2aws login`.

#### Architecture

We use 3 Docker containers for composing project:

##### App

Simple static page to test the frontend components of push notification:  
- feature detection
- check subscription
- ask permission

##### Push server

This server saves subscription, and has an endpoint to send a push message to all subscribers.

Default url: `http://localhost:8123`

Endpoints:
- `/push-api/save-subscription`
- `/push-api/trigger-push-message`

For testing purpose it serves a static page to compose and trigger push message: `/test-push`

##### Store

Mysql db to store subscription. The database name is `pn`. The we create `subscriptions` table to store subscription data.

#### Config

The config is set in `.env` file in project root.

#### Development

`cd app && npm i && npm run build:watch`

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

##### App

App is running on `localhost:8124`. You can subscribe for push notification. You need to subscribe with at least one device to test push notification.

##### Push server

Push server is running on `localhost:8123`. There is a test page for testing push messages: `localhost:8123/test-push`.

#### Useful articles about push notification

https://developers.google.com/web/fundamentals/push-notifications/how-push-works

https://developer.mozilla.org/en-US/docs/Web/API/notification

https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

https://developers.google.com/web/fundamentals/primers/service-workers/
