const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe('Test', () => {
    const user = {
        firstName: 'firstname',
        lastName: 'lastname',
        date: '05-05-2017',
        username: 'stest',
        password: 'aabbaabb',
        email: 'aa@abv.bg',
        number: '+355888889999',
    };


    const appUrl = 'http://localhost:3002';
    let driver = null;
    beforeEach(() => {
        driver = setupDriver('chrome');
        utils.setDriver(driver);
    });

    it('expect Register to create user in database and loggin', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('#register');
            })
            .then(() => {
                return utils.setValue('#inputFirstName', user.firstName);
            })
            .then(() => {
                return utils.setValue('#inputLastName', user.lastName);
            })
            .then(() => {
                return utils.setValue('#inputDate', user.date);
            })
            .then(() => {
                return utils.setValue('#inputUserName', user.username);
            })
            .then(() => {
                return utils.click('#countries > option:nth-child(2)');
            })
            .then(() => {
                return utils.setValue('#inputPassword', user.password);
            })
            .then(() => {
                return utils.setValue('#inputConfirmPassword', user.password);
            })
            .then(() => {
                return utils.setValue('#inputEmail', user.email);
            })
            .then(() => {
                return utils.setValue('#inputMobile', user.number);
            })
            .then(() => {
                // eslint-disable-next-line max-len
                return utils.click('#contact_form > fieldset > div.form-group > div > button');
            })
            .then(() => {
                // eslint-disable-next-line max-len
                return utils.click('#user-name-nav > a');
            })
            .then(() => {
                return utils.getText('#user_name');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(user.username);
            })
            .then(() => {
                return utils.getText('#first_name');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(user.firstName);
            })
            .then(() => {
                return utils.getText('#last_name');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(user.lastName);
            })
            .then(() => {
                return utils.getText('#email');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(user.email);
            })
            .then(() => {
                return utils.getText('#number');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(user.number);
            })
            .then(() => {
                return utils.getText('#country');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal('Bulgaria');
                done();
            })
            .catch(done);
    });

    it('expect Login to log user if exist', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('#log-in > a');
            })
            .then(() => {
                return utils.setValue('#inputUsername', 'test');
            })
            .then(() => {
                return utils.setValue('#inputPassword', 'testtest');
            })
            .then(() => {
                return utils.click('#submit');
            })
            .then(() => {
                return utils.getText(' #user-name-nav > a');
            })
            .then((username) => {
                expect(username).to.be.deep.equal('test');
                done();
            })
            .catch(done);
    });
});
