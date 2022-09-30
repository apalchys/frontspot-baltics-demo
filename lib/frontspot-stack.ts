import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class FrontspotStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "Bucket", {
      bucketName: "frontspot-baltics-demo2",
    });

    const lambdaFunction = new nodejs.NodejsFunction(
      this,
      "FrontSpotFunction",
      {
        entry: "src/handlers/upload-content/index.ts",
        environment: {
          BUCKET_NAME: bucket.bucketName,
        },
      }
    );

    bucket.grantReadWrite(lambdaFunction);

    const url = lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "LambdaFunctionUrl", {
      value: url.url,
      exportName: "LambdaFunctionUrl",
    });
  }
}
