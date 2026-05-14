const fs = require("fs");
const path = require("path");

/**
 * Convert Cucumber JSON to Allure Results format
 * This script reads test-results/cucumber.json and converts it to
 * Allure format in test-results/allure-results/
 */

const cucumberJsonPath = path.resolve(
  __dirname,
  "test-results",
  "cucumber.json",
);
const allureResultsDir = path.resolve(
  __dirname,
  "test-results",
  "allure-results",
);
const screenshotsDir = path.resolve(__dirname, "test-results", "screenshots");
const videosDir = path.resolve(__dirname, "test-results", "videos");

// Ensure allure-results directory exists
if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir, { recursive: true });
}

// Read cucumber JSON
if (!fs.existsSync(cucumberJsonPath)) {
  console.log("❌ No cucumber.json found at", cucumberJsonPath);
  console.log("Run tests first: npm test");
  process.exit(1);
}

try {
  const cucumberData = JSON.parse(fs.readFileSync(cucumberJsonPath, "utf8"));

  let testCount = 0;

  // Process each feature
  for (const feature of cucumberData) {
    // Process each scenario
    for (const scenario of feature.elements || []) {
      const scenarioName = scenario.name.replace(/[^a-z0-9-_]/gi, "_");
      const allureTestResultFile = path.join(
        allureResultsDir,
        `${scenarioName}-result.json`,
      );

      // Determine status
      let status = "unknown";
      let statusDetails = null;

      const steps = scenario.steps || [];
      const failedStep = steps.find(
        (s) =>
          s.result &&
          (s.result.status === "failed" || s.result.status === "undefined"),
      );

      if (failedStep) {
        status = "failed";
        statusDetails = {
          message: failedStep.result.error_message || "Step failed",
          trace: failedStep.result.error_message || "",
        };
      } else if (steps.some((s) => s.result && s.result.status === "skipped")) {
        status = "skipped";
      } else if (steps.every((s) => s.result && s.result.status === "passed")) {
        status = "passed";
      }

      // Collect attachments (screenshots & videos)
      const attachments = [];

      // Add screenshots for this scenario
      if (fs.existsSync(screenshotsDir)) {
        const screenshots = fs
          .readdirSync(screenshotsDir)
          .filter((f) => f.includes(scenarioName))
          .map((f) => path.join(screenshotsDir, f));

        for (const screenshot of screenshots) {
          const buffer = fs.readFileSync(screenshot);
          const attachmentFile = path.join(
            allureResultsDir,
            `${path.basename(screenshot)}-attachment.png`,
          );
          fs.copyFileSync(screenshot, attachmentFile);

          attachments.push({
            name: path.basename(screenshot),
            source: `${path.basename(screenshot)}-attachment.png`,
            type: "image/png",
          });
        }
      }

      // Add video for this scenario
      if (fs.existsSync(videosDir)) {
        const videoFile = path.join(videosDir, `${scenarioName}.webm`);
        if (fs.existsSync(videoFile)) {
          const attachmentFile = path.join(
            allureResultsDir,
            `${scenarioName}-video-attachment.webm`,
          );
          fs.copyFileSync(videoFile, attachmentFile);

          attachments.push({
            name: `${scenarioName}.webm`,
            source: `${scenarioName}-video-attachment.webm`,
            type: "video/webm",
          });
        }
      }

      // Build Allure test result
      const allureResult = {
        name: scenario.name,
        status: status,
        statusDetails: statusDetails,
        stage: "finished",
        start: Date.now() - Math.random() * 10000,
        stop: Date.now(),
        duration: Math.random() * 5000,
        description: feature.description || "",
        labels: [
          { name: "feature", value: feature.name },
          { name: "suite", value: feature.name },
        ],
        steps: (steps || []).map((step) => ({
          name: `${step.keyword} ${step.name}`,
          status: step.result?.status || "unknown",
          stage: "finished",
          start: Date.now() - Math.random() * 5000,
          stop: Date.now(),
        })),
        attachments: attachments,
        parameters: [],
      };

      // Write Allure result file
      fs.writeFileSync(
        allureTestResultFile,
        JSON.stringify(allureResult, null, 2),
      );
      testCount++;
    }
  }

  console.log(`✅ Converted ${testCount} scenarios to Allure format`);
  console.log(`📁 Results saved to: ${allureResultsDir}`);
  console.log(`\nNext step: npm run report`);
} catch (error) {
  console.error(
    "❌ Error converting Cucumber JSON to Allure format:",
    error.message,
  );
  process.exit(1);
}
