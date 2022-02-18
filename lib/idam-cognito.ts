import * as cdk from '@aws-cdk/core';
import cognito = require('@aws-cdk/aws-cognito');

export class IdamCognito extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Cognito UserPool
    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'IdamUserPool',
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email address',
        emailBody: 'Hello {username}, {####} <br/> <br/> Please verify your email address by clicking on the following link: <br/> <br/> <a href="{verificationUrl}">Verify email</a>',
      },
      signInAliases: {
        username: true,
        email: true
      }
    });

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId
    });

    // Create a UserPool client

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPoolClientName: 'IdamUserPoolClient',
      userPool: userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO
      ]
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId
    });


    // end of resources
  }
}
