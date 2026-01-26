// import * as cdk from "aws-cdk-lib";
// import { Construct } from "constructs";
// import { Stack, StackProps, CfnOutput, RemovalPolicy } from "aws-cdk-lib";
// import * as s3 from "aws-cdk-lib/aws-s3";
// import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
// import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
// import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
// import * as iam from "aws-cdk-lib/aws-iam";

// export class InfraStack extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super(scope, id, props);

//     // Step 3: Secure S3 bucket - NO public read access
//     const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
//       websiteIndexDocument: "index.html",
//       websiteErrorDocument: "index.html",
//       publicReadAccess: false, // Changed from true to false
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // More secure
//       removalPolicy: RemovalPolicy.DESTROY,
//       autoDeleteObjects: true,
//     });

//     // Step 2 & 4: CloudFront distribution with OAC (Origin Access Control)
//     // Use the NEW S3StaticWebsiteOrigin (handles OAC automatically)
//     const distribution = new cloudfront.Distribution(
//       this,
//       "WebsiteDistribution",
//       {
//         defaultRootObject: "index.html",
//         defaultBehavior: {
//           // Use S3StaticWebsiteOrigin instead of S3Origin
//           origin: new origins.S3StaticWebsiteOrigin(websiteBucket, {
//             originAccessIdentity: false, // This forces OAC instead of OAI
//           }),
//           viewerProtocolPolicy:
//             cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
//           allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
//           cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
//         },
//         errorResponses: [
//           {
//             httpStatus: 403,
//             responseHttpStatus: 200,
//             responsePagePath: "/index.html",
//             ttl: Duration.minutes(5),
//           },
//           {
//             httpStatus: 404,
//             responseHttpStatus: 200,
//             responsePagePath: "/index.html",
//             ttl: Duration.minutes(5),
//           },
//         ],
//       }
//     );

//     // Step 4: Explicitly grant CloudFront access to the S3 bucket
//     // This creates the bucket policy that only allows CloudFront to read from S3
//     websiteBucket.addToResourcePolicy(
//       new iam.PolicyStatement({
//         actions: ["s3:GetObject"],
//         resources: [websiteBucket.arnForObjects("*")],
//         principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
//         conditions: {
//           StringEquals: {
//             "AWS:SourceArn": `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
//           },
//         },
//       })
//     );

//     // Deploy React build files
//     new s3deploy.BucketDeployment(this, "DeployWebsite", {
//       sources: [s3deploy.Source.asset("dist")],
//       destinationBucket: websiteBucket,
//       distribution,
//       distributionPaths: ["/*"],
//     });

//     // Step 7: Final outputs - CloudFront is now the main URL
//     new CfnOutput(this, "CloudFrontURL", {
//       value: `https://${distribution.domainName}`,
//       description: "Your website URL via CloudFront (use this)",
//     });

//     new CfnOutput(this, "BucketWebsiteURL", {
//       value: websiteBucket.bucketWebsiteUrl,
//       description: "S3 Website URL (should be blocked now)",
//     });

//     new CfnOutput(this, "DistributionId", {
//       value: distribution.distributionId,
//       description: "CloudFront Distribution ID",
//     });
//   }
// }
