# LaunchDarkly Sample Client-Side Node.js Application

We've built a simple console application that demonstrates how LaunchDarkly's SDK works. Below, you'll find the basic build procedure, but for more comprehensive instructions, you can visit your [Quickstart page](https://app.launchdarkly.com/quickstart#/).

Please note that this sample application demonstrates how to use the LaunchDarkly Client-Side SDK for Node.js which is designed primarily for use by code that is deployed to an end user, such as in a desktop application or a smart device. It follows the client-side LaunchDarkly model for single-user contexts (much like our mobile or JavaScript SDKs). It is not intended for use in multi-user systems such as web servers and applications.

For a sample application demonstrating how to use LaunchDarkly in *server-side* Node.js applications, refer to our [Server-side Node.js SDK sample application](https://github.com/launchdarkly/hello-node-server).

## Build instructions

1. Install the LaunchDarkly Client-Side Node.js SDK by running `npm install`

2. Edit `index.js` and set the value of `environmentId` to your LaunchDarkly client-side ID. If there is an existing boolean feature flag in your LaunchDarkly project that you want to evaluate, set `featureFlagKey` to the flag key.

```js
  const environmentId = "1234567890abcdef";

  const featureFlagKey = "my-flag";
```

3. Run `node index.js`

You should see the message `"Feature flag '<flag key>' is <true/false> for this user"`.
