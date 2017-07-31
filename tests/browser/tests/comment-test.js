const {
    expect,
} = require('chai');
const {
    setupDriver,
} = require('../utils/setup-driver');
const utils = require('../utils/ui');

describe('Comments Tests', () => {
    const userLoggin = {
        username: 'test',
        password: 'testtest',
        loginPage: 'Login',
    };

    const comment = {
        message: 'My awesome test',
    };

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
// eslint-disable-next-line max-len
    it('expect logged in user to be able to create new comment in forum post', (done) => {
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
                // eslint-disable-next-line max-len
                return utils.click('#new_post_form > div:nth-child(6) > div > button');
            })
            .then(() => {
                driver.sleep(100);
                // eslint-disable-next-line max-len
                return utils.click('body > div > div > ul > li:nth-child(13) > span > a');
            }).then(() => {
                driver.sleep(200);
                // eslint-disable-next-line max-len
                return utils.click('body > div > form > div > div.container > a');
            }).then(() => {
                driver.sleep(2000);
                return utils.click('#commentSend');
            }).then(() => {
                return utils.setValue('#status_message', comment.message);
            }).then(() => {
                driver.sleep(2000);
                return utils.click('#commentSend');
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.getText('#comments-list > li > div > div > div > div > div.comment-content > h4');
            }).then((message) => {
                expect(message).to.be.deep.equal(comment.message);
                driver.close();
                done();
            }).catch(done);
    });
    // eslint-disable-next-line max-len
    it('expect logged in user to be able to edit his comment in forum post', (done) => {
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
                driver.sleep(100);
                // eslint-disable-next-line max-len
                return utils.click('body > div > div > ul > li:nth-child(13) > span > a');
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.click('#comments-list > li > div > div > div > div > div.comment-content > div > a.btn.btn-warning.btnEdit');
            }).then(() => {
                // eslint-disable-next-line max-len
                return utils.setValue('#comments-list > li > div > div > div > div > div.comment-content > h4 > input', userLoggin.username);
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.enter('#comments-list > li > div > div > div > div > div.comment-content > h4 > input');
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.getText('#comments-list > li > div > div > div > div > div.comment-content > h4');
            }).then((message) => {
                expect(message).to.be.deep.equal('testMy awesome test');
                driver.close();
                done();
            }).catch(done);
    });
    // eslint-disable-next-line max-len
    it('expect logged in user to be able to remove his comment in forum post', (done) => {
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
                driver.sleep(100);
                // eslint-disable-next-line max-len
                return utils.click('body > div > div > ul > li:nth-child(13) > span > a');
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.click('#comments-list > li > div > div > div > div > div.comment-content > div > a.btn.btn-warning.btnEdit');
            }).then(() => {
                // eslint-disable-next-line max-len
                return utils.setValue('#comments-list > li > div > div > div > div > div.comment-content > h4 > input', userLoggin.username);
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.enter('#comments-list > li > div > div > div > div > div.comment-content > h4 > input');
            }).then(() => {
                driver.sleep(200);
                // eslint-disable-next-line max-len
                return utils.click('body > div > form > div > div.container > a');
            }).then(() => {
                driver.sleep(2000);
                return utils.click('#commentSend');
            }).then(() => {
                return utils.setValue('#status_message', comment.message);
            }).then(() => {
                driver.sleep(2000);
                return utils.click('#commentSend');
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.click('#comments-list > li:nth-child(1) > div > div > div > div > div.comment-content > div > a.btn.btn-warning.btnEdit');
            }).then(() => {
                // eslint-disable-next-line max-len
                return utils.click('#comments-list > li:nth-child(1) > div > div > div > div > div.comment-content > div > a.btn.btn-danger.btnDelete');
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.getText('#comments-list > li:nth-child(2) > div > div > div > div > div.comment-content > h4');
            }).then((message) => {
                expect(message).to.be.deep.equal('My awesome test');
                driver.close();
                done();
            }).catch(done);
    });
    // eslint-disable-next-line max-len
    it('expect NOT logged in user to NOT be able to add a comment in forum post', (done) => {
        driver.get(appUrl)
            .then(() => {
                driver.sleep(100);
                // eslint-disable-next-line max-len
                return utils.click('body > div > div > ul > li:nth-child(13) > span > a');
            }).then(() => {
                // eslint-disable-next-line max-len
                return utils.click('body > div > form > div > div.container > a');
            })
            .then(() => {
                driver.sleep(2000);
                return utils.click('#commentSend');
            }).then(() => {
                return utils.setValue('#status_message', comment.message);
            }).then(() => {
                driver.sleep(2000);
                return utils.click('#commentSend');
            }).then(() => {
                driver.sleep(1000);
                // eslint-disable-next-line max-len
                return utils.getText('body > div > div > div > div > div.panel-heading > strong');
            }).then((message) => {
                expect(message).to.be.deep.equal(userLoggin.loginPage);
                driver.close();
                done();
            }).catch(done);
    });
});
