# Test Reporting Guide

## What gets generated

Run:

```bash
npm test
```

This generates:
- Cucumber HTML summary at `test-results/report.html`
- Cucumber JSON at `test-results/cucumber.json`
- Allure raw results at `allure-results/`
- Screenshot artifacts at `test-results/screenshots/`
- Video artifacts at `test-results/videos/`

## Best report to open

Use Allure when you want to see screenshots and videos attached to each scenario:

```bash
npm run report
```

If you only want a quick pass/fail summary, open `test-results/report.html`.

## Notes

- Allure is generated directly from `cucumber-js` using `allure-cucumberjs/reporter`.
- Screenshots saved during a scenario are copied into `test-results/screenshots/` and attached.
- Video is recorded in `test-results/videos/` and attached after each scenario.
- The Playwright HTML report is still available, but the Cucumber/Allure flow is the one that shows attachments for this suite.
