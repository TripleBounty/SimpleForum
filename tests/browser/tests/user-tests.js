const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe('User tests', () => {
    const user = {
        firstName: 'firstname',
        lastName: 'lastname',
        date: '05-05-2017',
        username: 'stest',
        password: 'aabbaabb',
        email: 'aa@abv.bg',
        number: '+355888889999',
    };

    const userUpdate = {
        firstName: 'ufirstname',
        lastName: 'ulastname',
        date: '06-06-2017',
        username: 'test',
        password: 'aabbaabb',
        email: 'uu@abv.bg',
        number: '+355888889980',
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
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.click('#user-name-nav > a');
            })
            .then(() => {
                driver.sleep(1000);
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
                driver.sleep(1000);
                return utils.getText(' #user-name-nav > a');
            })
            .then((username) => {
                expect(username).to.be.deep.equal('test');
                done();
            })
            .catch(done);
    });

    it('expect update to log user if exist and update data', (done) => {
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
                driver.sleep(1000);
                return utils.click('#settings');
            })
            .then(() => {
                return utils.click('#personal');
            })
            .then(() => {
                // eslint-disable-next-line max-len
                return utils.setValueClear('#inputFirstName', userUpdate.firstName);
            })
            .then(() => {
                // eslint-disable-next-line max-len
                return utils.setValueClear('#inputLastName', userUpdate.lastName);
            })
            .then(() => {
                return utils.setValue('#inputDate', userUpdate.date);
            })
            .then(() => {
                return utils.setValueClear('#inputEmail', userUpdate.email);
            })
            .then(() => {
                return utils.setValueClear('#inputMobile', userUpdate.number);
            })
            .then(() => {
                driver.sleep(2000);
                // eslint-disable-next-line max-len
                return utils.click('#update');
            })
            .then(() => {
                driver.sleep(1000);
                return utils.getText('#user_name');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(userUpdate.username);
            })
            .then(() => {
                return utils.getText('#first_name');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(userUpdate.firstName);
            })
            .then(() => {
                return utils.getText('#last_name');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(userUpdate.lastName);
            })
            .then(() => {
                return utils.getText('#email');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(userUpdate.email);
            })
            .then(() => {
                driver.sleep(3000);
                return utils.getText('#number');
            })
            .then((prop) => {
                expect(prop).to.be.deep.equal(userUpdate.number);
                done();
            })
            .catch(done);
    });
});
