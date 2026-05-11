module.exports = {
  default: {
    paths: ["tests/Features/*.feature"],
    require: ["tests/Hooks/*.js", "tests/Steps/*.js"],
    format: ["progress", "html:test-results/report.html"],
    publishQuiet: true,
  },
};
