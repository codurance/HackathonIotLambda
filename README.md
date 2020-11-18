# Hello world

## Resources
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-j.html

- https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html

- https://github.com/awsdocs/aws-lambda-developer-guide/tree/master/sample-apps/blank-nodejs

- https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html


NOTES:
You can tell the Lambda runtime which handler method to invoke by setting the handler parameter on your function's configuration. When you configure a function in Node.js, the value of the handler setting is the file name and the name of the exported handler module, separated by a dot. For example, the default value in the console is index.handler which calls exports.handler in index.js.