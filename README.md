### Push notification poc

#### Prerequisites

Test application key has been saved to AWS Secret Manager. To use the key you have to
`saml2aws login`.

#### Development

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

`cd app && npm run build:watch`

##### App

App is running on `localhost:8124`. You can subscribe for push notification. You need to subscribe with at least one device to test push notification.

##### Push server

Push server is running on `localhost:8123`. There is a test page for testing push messages: `localhost:8123/test-push`.

#### Useful articles about push notification

https://developers.google.com/web/fundamentals/push-notifications/how-push-works

https://developer.mozilla.org/en-US/docs/Web/API/notification

https://developers.google.com/web/fundamentals/primers/service-workers/

