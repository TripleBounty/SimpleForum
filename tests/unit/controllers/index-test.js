const chai = require('chai');
const expect = chai.expect;

const data = {};

const controllers = require('../../../controllers')(data);

describe('Index controller tests', () => {
    it('Expect controllers to have userControler property', () => {
        expect(controllers).to.have.own.property('userController');
    });

    it('Expect controllers to have userControler property', () => {
        expect(controllers).to.have.own.property('postController');
    });

    it('Expect controllers to have userControler property', () => {
        expect(controllers).to.have.own.property('commentController');
    });

    it('Expect controllers to have userControler property', () => {
        expect(controllers).to.have.own.property('chatController');
    });
});
