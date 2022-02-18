#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { IdamStack } from '../lib/idam-stack';
import { IdamCognito } from '../lib/idam-cognito';

const app = new cdk.App();
new IdamStack(app, 'idam-ui',{
env: {
    account: '560133137152',
    region: 'ap-southeast-2'
  }
});

new IdamCognito(app,'idam-cognito',{
  env: {
    account: '560133137152',
    region: 'ap-southeast-2'
  }
})