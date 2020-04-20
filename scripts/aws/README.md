# CloudFormation Scripts

AWS CloudFormation Scripts to manage CaZZZino Frontend Deployment.

## DEV

```
aws cloudformation --region us-east-1 create-stack --stack-name cazzzino-certificate-dev --template-body file://cloudformation/dev-wildcard-certificate.yml --profile cazzzino-dev
```

```
aws cloudformation --region us-east-1 delete-stack --stack-name cazzzino-certificate-dev --profile cazzzino-dev
```

## TEST

```
aws cloudformation --region us-east-1 create-stack --stack-name cazzzino-certificate-test --template-body file://cloudformation/test-wildcard-certificate.yml --profile cazzzino-test
```

```
aws cloudformation --region us-east-1 delete-stack --stack-name cazzzino-certificate-test --profile cazzzino-test
```
