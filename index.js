const LaunchDarkly = require('launchdarkly-node-client-sdk');

// Set clientSideId to your LaunchDarkly client-side ID.
const clientSideId = process.env.LAUNCHDARKLY_CLIENT_SIDE_ID ?? 'your-client-side-id';

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = process.env.LAUNCHDARKLY_FLAG_KEY ?? 'sample-feature';

function showBanner() {
  console.log(
    `        ██
          ██
      ████████
         ███████
██ LAUNCHDARKLY █
         ███████
      ████████
          ██
        ██
`,
  );
}

function printValueAndBanner(flagValue) {
  console.log(`*** The '${featureFlagKey}' feature flag evaluates to ${flagValue}.`);

  if (flagValue) showBanner();
}

if (!clientSideId) {
  console.log('*** Please set LAUNCHDARKLY_CLIENT_SIDE_ID to your client-side ID, or edit index.js to use your client-side ID.');
  process.exit(1);
}

// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
const context = {
  kind: 'user',
  key: 'example-user-key',
  name: 'Sandy',
};


const ldClient = LaunchDarkly.initialize(clientSideId, context);


async function main() {
  try {
    await ldClient.waitForInitialization(5);

    console.log('*** SDK successfully initialized!');

    const eventKey = `change:${featureFlagKey}`;
    ldClient.on(eventKey, async () => {
      const flagValue = await ldClient.variation(featureFlagKey, false);
      printValueAndBanner(flagValue);
    });

    const flagValue = await ldClient.variation(featureFlagKey, false);
    printValueAndBanner(flagValue);

    if (typeof process.env.CI !== "undefined") {
      process.exit(0);
    }
  } catch (error) {
    console.log(`*** SDK failed to initialize: ${error}`);
    process.exit(1);
  }

}

main();
