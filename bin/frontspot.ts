#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FrontspotStack } from "../lib/frontspot-stack";
// Account: 132630997775
// Region: eu-central-1

const app = new cdk.App();

new FrontspotStack(app, "FrontspotStack", {
  env: {
    account: "132630997775",
    region: "eu-central-1",
  },
});
