// related AWS docs: https://aws.amazon.com/developers/getting-started/nodejs/

const region = "us-east-1";
const secretName = "lensa_test_push_server_vapid_private_key";
const AWS = require('aws-sdk');
const smClient = new AWS.SecretsManager({ region });

exports.getPushServerKey = new Promise((resolve, reject) =>
    smClient.getSecretValue({SecretId: secretName}, (err, data) => {
        if (err) {
            return reject(err);
        }
        resolve(JSON.parse(data.SecretString).PUSH_SERVER_VAPID_PRIVATE_KEY);
    }));