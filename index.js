const LaunchDarkly = require('launchdarkly-node-client-sdk');

const user = {
  "firstName":"Bob",
  "lastName":"Loblaw",
  "key":"bob@example.com",
  "custom":{
     "groups":"beta_testers"
  }
};

// TODO: Enter your LaunchDarkly Client-side ID here
const ldClient = LaunchDarkly.initialize("YOUR_CLIENT_SIDE_ID", user);

ldClient.on('ready', () => {
  // TODO: Enter the key for your feature flag here
  const showFeature = ldClient.variation("YOUR_FEATURE_FLAG_KEY", false);

  if (showFeature) {
    // application code to show the feature
    console.log("Showing your feature to " + user.key);
  } else {
    // the code to run if the feature is off 
    console.log("Not showing your feature to " + user.key);
  }

  ldClient.close(() => {
    console.log('Client has been closed');
    process.exit(0);
  });
});
