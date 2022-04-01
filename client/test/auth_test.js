// Include the chrome driver
require("chromedriver");

// Include selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

// Get the credentials from the JSON file
let { username, pass } = require("./credentials.json");

// Step 1 - Opening the Apps' sign in page
let tabToOpen =
    tab.get("http://localhost:3000/login");
tabToOpen
    .then(function () {

        // Timeout to wait if connection is slow
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 10000, // 10 seconds
            });
        return findTimeOutP;
    })
    .then(function () {

        // Step 2 - Finding the username input
        let promiseUsernameBox =
            tab.findElement(swd.By.name("username"));
        return promiseUsernameBox;
    })
    .then(function (usernameBox) {

        // Step 3 - Entering the username
        let promiseFillUsername =
            usernameBox.sendKeys(username);
        return promiseFillUsername;
    })
    .then(function () {
        console.log(
            "Username entered successfully"
        );

        // Step 4 - Finding the password input
        let promisePasswordBox =
            tab.findElement(swd.By.name("password"));
        return promisePasswordBox;
    })
    .then(function (passwordBox) {

        // Step 5 - Entering the password
        let promiseFillPassword =
            passwordBox.sendKeys(pass);
        return promiseFillPassword;
    })
    .then(function () {
        console.log(
            "Password entered successfully"
        );

        // Step 6 - Finding the Sign In button
        let promiseSignInBtn = tab.findElement(
            swd.By.css(".btn-primary")
        );
        return promiseSignInBtn;
    })
    .then(function (signInBtn) {

        // Step 7 - Clicking the Sign In button
        let promiseClickSignIn = signInBtn.click();
        return promiseClickSignIn;
    })
    .then(function () {
        console.log("Successfully signed in!");
    })
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    })
    .then(function () {

        // Timeout to wait if connection is slow
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 10000, // 10 seconds
            });
        return findTimeOutP;
    })
    .then(function () {
        // Step 2 - Finding the Logout button
        let promiseLogOutBtn = tab.findElement(
            swd.By.id("logout")
        );
        return promiseLogOutBtn;
    })
    .then(function (LogOutBtn) {

        // Step 3 - Clicking the Logout button
        let promiseClickLogOutBtn = LogOutBtn.click();
        return promiseClickLogOutBtn;
    })
    .then(function () {
        console.log("Successfully loged out!");
    })
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    });