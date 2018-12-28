// related AWS docs: https://aws.amazon.com/developers/getting-started/nodejs/

const AWS = require('aws-sdk');
const region = "us-east-1";
const smClient = new AWS.SecretsManager({ region });

exports.getPushServerKey = new Promise((resolve, reject) => {
    const secretName = "lensa_test_push_server_vapid_private_key";
    let secret;

    smClient.getSecretValue({SecretId: secretName}, (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data.SecretString).PUSH_SERVER_VAPID_PRIVATE_KEY);
    });
});