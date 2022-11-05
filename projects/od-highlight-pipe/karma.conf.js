// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// https://github.com/karma-runner/karma-chrome-launcher#headless-chromium-with-puppeteer
process.env.CHROME_BIN = require("puppeteer").executablePath();
const ci =
  process.env.CI === true ||
  process.env.CI === "True" ||
  process.env.CI === "true";

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "../../coverage/od-highlight-pipe"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !ci,
    // https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322852784
    browsers: ["CustomChromeHeadless"],
    customLaunchers: {
      CustomChromeHeadless: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
    singleRun: ci,
    restartOnFileChange: true,
  });
};
