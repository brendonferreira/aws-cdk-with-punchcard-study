"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_dynamodb_1 = require("@aws-cdk/aws-dynamodb");
const cdk = require("@aws-cdk/core");
const punchcard_1 = require("punchcard");
const { dynamic, string, integer, struct } = punchcard_1.Shape;
const app = new cdk.App();
const stack = new cdk.Stack(app, 'TaskExample');
// NOTE: make sure you export the app as default, or else your code won't run at runtime
exports.default = app;
// create and use punchcard or CDK constructs
const personsTable = new punchcard_1.DynamoDB.Table(stack, 'PersonsTable', {
    partitionKey: 'id',
    shape: {
        id: string(),
        count: integer({
            minimum: 0
        })
    },
    billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
});
new punchcard_1.Lambda.Function(stack, 'PersonsList', {
    depends: personsTable,
    handle: async (event, personsTable) => {
        return await personsTable.scan();
    }
});
