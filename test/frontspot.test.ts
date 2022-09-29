import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as Frontspot from "../lib/frontspot-stack";

const context = {
  "aws:cdk:bundling-stacks": [],
};

test("AWS Lambda Created", () => {
  const app = new cdk.App({ context });
  // WHEN
  const stack = new Frontspot.FrontspotStack(app, "TestStack");
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Lambda::Function", {
    FunctionName: "upload-content",
  });
});
