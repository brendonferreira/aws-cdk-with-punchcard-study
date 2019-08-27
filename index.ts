
import { BillingMode } from '@aws-cdk/aws-dynamodb';
import cdk = require('@aws-cdk/core');
import { Duration } from '@aws-cdk/core';
import { Schedule } from '@aws-cdk/aws-events';
import { Shape, DynamoDB, Lambda } from 'punchcard';

const { dynamic, string, integer, struct } = Shape;


const app = new cdk.App();
const stack = new cdk.Stack(app, 'TaskExample');

// NOTE: make sure you export the app as default, or else your code won't run at runtime
export default app;

// create and use punchcard or CDK constructs
const personsTable = new DynamoDB.Table(stack, 'PersonsTable', {
  partitionKey: 'id',
  shape: {
    id: string(),
    count: integer({
      minimum: 0
    })
  },
  billingMode: BillingMode.PAY_PER_REQUEST
});

new Lambda.Function(stack, 'PersonsList', {
  depends: personsTable,
  handle: async (event, personsTable) => {
    return await personsTable.scan()
  }
});