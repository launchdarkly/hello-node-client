const LaunchDarkly = require('launchdarkly-node-client-sdk');

// Set environmentId to your LaunchDarkly client-side ID.
const environmentId = "";

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = "my-boolean-flag";

function showMessage(s) {
  console.log("*** " + s);
  console.log("");
}

if (environmentId == "") {
  showMessage("Please edit index.js to set environmentId to your LaunchDarkly client-side ID first");
  process.exit(1);
}

// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
const context = {
  kind: "user",
  key: "example-context-key",
  name: "Sandy"
};

const ldClient = LaunchDarkly.initialize(environmentId, context);

ldClient.waitForInitialization().then(function () {
  showMessage("SDK successfully initialized!");
  const flagValue = ldClient.variation(featureFlagKey, false);

  showMessage("Feature flag '" + featureFlagKey + "' is " + flagValue + " for this context");

  // Here we ensure that the SDK shuts down cleanly and has a chance to deliver analytics
  // events to LaunchDarkly before the program exits. If analytics events are not delivered,
  // the context properties and flag usage statistics will not appear on your dashboard. In a
  // normal long-running application, the SDK would continue running and events would be
  // delivered automatically in the background.
  ldClient.close();
}).catch(function (error) {
  showMessage("SDK failed to initialize: " + error);
  process.exit(1);
});
