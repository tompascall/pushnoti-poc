// related AWS docs: https://aws.amazon.com/developers/getting-started/nodejs/

const AWS = require('aws-sdk');
const region = "us-east-1";
const client = new AWS.SecretsManager({ region });

const getPushServerKey = new Promise((resolve, reject) => {
    const secretName = "lensa_test_push_server_vapid_private_key";
    let secret;

    client.getSecretValue({SecretId: secretName}, (err, data) => {
        if (err) reject(err);
        console.log(data.SecretString)
        resolve(data.SecretString);
    });
});

