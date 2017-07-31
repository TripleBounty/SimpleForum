const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe('Test', () => {
    const userLoggin = {
        username: 'test',
        password: 'testtest',
    }

    const testPost = {
        title: 'Test post title',
        content: 'Test post content',
    };

    const appUrl = 'http://localhost:3002';
    let driver = null;
    beforeEach(() => {
        driver = setupDriver('chrome');
        utils.setDriver(driver);
    });

    it('expect loggin user to be able to create new forum post', (done) => {
        driver.get(appUrl)
            .then(() => {
                return utils.click('#log-in > a');
            })
            .then(() => {
                return utils.setValue('#inputUsername', userLoggin.username);
            })
            .then(() => {
                return utils.setValue('#inputPassword', userLoggin.password);
            })
            .then(() => {
                return utils.click('#submit');
            })
            .then(() => {
                return utils.click('#new-forum-post');
            })
            .then(() => {
                return utils.setValue('#inputTitle', testPost.title);
            })
            .then(() => {
                return utils.setValue('#inputPostContent', testPost.content);
            })
            .then(() => {
                return utils.click('#new_post_form > div:nth-child(6) > div > button');
            })
            .then(() => {
                driver.sleep(100);
                return utils.getText('body > div > div > div > div > h3');
            })
            .then((title) => {
                 expect(title).to.be.deep.equal(testPost.title.toUpperCase());
            })
            .then(() => {
                return utils.getText('body > div > div > div > div > p:nth-child(4)');
            })
            .then((content) => {
                expect(content).to.be.deep.equal(testPost.content);
            })
            .then(() => {
                return utils.getText('body > div > div > div > div > p.text-right > a');
            })
            .then((username) => {
                expect(username).to.be.deep.equal(userLoggin.username.toUpperCase());
                done();
            })
            .catch(done);
    });
});
