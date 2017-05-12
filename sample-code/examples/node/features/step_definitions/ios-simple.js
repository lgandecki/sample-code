// features/step_definitions/browser_steps.js
var {defineSupportCode} = require('cucumber');
require("./../../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    // Q = require('q'),
    serverConfigs = require('./../../helpers/appium-servers');

// let wait = ms => new Promise(resolve => setTimeout(resolve, ms));


defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(60 * 1000);
});

defineSupportCode(function({Given, When, Then}) {
    let driver;
    Given('I open the app', async function() {
        var serverConfig = process.env.npm_package_config_sauce ?
            serverConfigs.sauce : serverConfigs.local;
        driver = wd.promiseRemote(serverConfig);
        require("./../../helpers/logging").configure(driver);

        var desired = _.clone(require("./../../helpers/caps").ios92);
        desired.app = "/Users/lukaszgandecki/webstorm/thebrainfamily/TheBrain2.0/mobileClient/ios/build/Build/Products/Release-iphonesimulator/mobileClient.app";
        if (process.env.npm_package_config_sauce) {
            desired.name = 'ios - simple';
            desired.tags = ['sample'];
        }
        await driver.init(desired);
    });

    When('I do nothing', async function() {
        const goForwardElement = await driver.waitForElementByAccessibilityId('ScanForwardButton', 20000);
        await goForwardElement.click();

        await driver.sleep(5000);



        const toAnswer = await driver.waitForElementByName('goToQuestionsb', 5000);
        console.log("Gozdecki: toAnswer",toAnswer);
        await toAnswer.click();

        var actionTap = new wd.TouchAction();


        await actionTap.tap({x: 25, y: 65})
        await driver.performTouchAction(actionTap);


        // await driver.tap({x: 10, y: 65});
        //
        await driver.sleep(500);

        var actionOne = new wd.TouchAction();
        actionOne
            .press({x: 10, y: 65})
            .wait(500)
            // .moveTo({x: 10, y: 0})
            .release();
        await driver.performTouchAction(actionOne);

        var actionTwo = new wd.TouchAction();
        actionTwo
            .press({x: 10, y: 330})
            .wait(200)
            // .moveTo({x: 10, y: 200})
            // .wait(500)
            .moveTo({x: 10, y: 666})
            .release();
        await driver.performTouchAction(actionTwo);

        // driver.click()

        await driver.sleep(10000000);
        console.log("Gozdecki: element",element);
    });

    Then('I see the app', function (text) {
        // function populate() {
        //     var seq = _(['IntegerA', 'IntegerB']).map(function (id) {
        //         return function (sum) {
        //             return driver.waitForElementById(id, 3000).then(function (el) {
        //                 var x = _.random(0,10);
        //                 sum += x;
        //                 return el.type('' + x).then(function () { return sum; })
        //                     .elementById('Done').click().sleep(1000); // dismissing keyboard
        //             }).then(function () { return sum; });
        //         };
        //     });
        //     return seq.reduce(Q.when, new Q(0));
        // }
        //
        console.log("nothing again");
        // return driver.waitForElementById('IntegerA', 3000)
            // .then(function(el) {
            // console.log("Gozdecki: el",el);
            // var x = _.random(0,10);
            // el.type(''  + x).then(function() {
            //     console.log("inside");
            // }).elementById('Done').click().sleep(1000).then(function() {
            //     elementByAccessibilityId('ComputeSumButton')
            //         .click().sleep(1000)
            //         .elementByAccessibilityId('Answer')
            //         .text().should.become("" + sum);
            // });
        // });

        // return driver
        //     .resolve(populate()).then(function (sum) {
        //         return driver.
        //         elementByAccessibilityId('ComputeSumButton')
        //             .click().sleep(1000)
        //             .elementByAccessibilityId('Answer')
        //             .text().should.become("" + sum);
        //     });

    });

});