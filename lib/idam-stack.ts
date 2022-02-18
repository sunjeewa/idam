import * as cdk from '@aws-cdk/core';
import s3 = require('@aws-cdk/aws-s3');
import codecommit = require('@aws-cdk/aws-codecommit');
import amplify = require('@aws-cdk/aws-amplify');

export class IdamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const UIBucket = new s3.Bucket(this, 'UIBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html'
    });

    new cdk.CfnOutput(this, 'OutUIBucket', {
      value: UIBucket.bucketDomainName
    });

    // CodeCommit repository for Amplify UI
    const UICodeCommitRepo = new codecommit.Repository(this, 'UICodeCommitRepo', {
      repositoryName: 'idam-ui',
      description: 'Idam UI repository'
    });

    // Creation of the amplify app

    const amplifyApp = new amplify.App(this, 'IdamApp', {
      sourceCodeProvider: new amplify.CodeCommitSourceCodeProvider({
        repository: UICodeCommitRepo
      }),
    });

    const masterBranch = amplifyApp.addBranch('master');

    // end of resources
  }
}
