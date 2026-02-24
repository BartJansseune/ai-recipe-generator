import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement, Role, ServicePrincipal, ManagedPolicy } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
  data,
});

// Create IAM role for AppSync CloudWatch logging
const appsyncLogsRole = new Role(
  backend.data.resources.graphqlApi.stack,
  "AppSyncCloudWatchLogsRole",
  {
    assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
    managedPolicies: [
      ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSAppSyncPushToCloudWatchLogs"),
    ],
  }
);

// Enable CloudWatch logging for AppSync
const cfnApi = backend.data.resources.cfnResources.cfnGraphqlApi;
cfnApi.logConfig = {
  cloudWatchLogsRoleArn: appsyncLogsRole.roleArn,
  fieldLogLevel: "ALL",
  excludeVerboseContent: false,
};

const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.eu-west-1.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "eu-west-1",
      signingServiceName: "bedrock",
    },
  }
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      // Allow access to the inference profile in eu-west-1
      "arn:aws:bedrock:eu-west-1:744698194513:inference-profile/eu.amazon.nova-2-lite-v1:0",
      // Allow access to the Nova foundation model in any EU region (inference profiles route dynamically)
      "arn:aws:bedrock:eu-*::foundation-model/amazon.nova-2-lite-v1:0",
    ],
    actions: ["bedrock:InvokeModel"],
  })
);