const { expect } = require('chai');
const CryptoJS = require('crypto-js');

const User = require('../../../models/user');

const user = {
    first_name: 'FirstName',
    last_name: 'LastName',
    date: '2017-05-05',
    country: 'Bulgaria',
    email: 'test@abv.bg',
    user_name: 'validUserName',
    user_password: 'validPassword',
    confirm_password: 'validPassword',
    avatar: 'http://test.img',
    contact_no: '+35988664552355',
};

//validatePassword

describe('User model tests', () => {
    describe('getDataBaseModel tests', () => {
        // eslint-disable-next-line max-len
        it('getDataBaseModel should return correct model when called with type update', () => {
            const expected = {
                first_name: user.first_name,
                last_name: user.last_name,
                date: user.date,
                country: user.country,
                email: user.email,
                avatar: user.avatar,
                contact_no: user.contact_no,
            };

            const actual = User.getDataBaseModel(user, 'update');

            expect(actual).to.be.deep.equal(expected);
        });

        // eslint-disable-next-line max-len
        it('getDataBaseModel should return correct model when called with type create', () => {
            const expected = {
                first_name: user.first_name,
                last_name: user.last_name,
                date: user.date,
                country: user.country,
                email: user.email,
                user_name: user.user_name,
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256(user.user_password).toString(),
                avatar: user.avatar,
                contact_no: user.contact_no,
                comments: [],
            };

            const actual = User.getDataBaseModel(user, 'create');

            expect(actual).to.be.deep.equal(expected);
        });

        // eslint-disable-next-line max-len
        it('getDataBaseModel should return correct model when called with type updatePassword', () => {
            const expected = {
                user_name: user.user_name,
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256(user.user_password).toString(),
            };

            const actual = User.getDataBaseModel(user, 'updatePassword');

            expect(actual).to.be.deep.equal(expected);
        });
    });

    describe('Valide tests', () => {
        it('Should return true if model is valid for create', () => {
            const isValid = User.validate(user, 'create');
            expect(isValid).to.be.equal(true);
        });

        it('Should return true if model is valid for update', () => {
            const isValid = User.validate(user, 'update');
            expect(isValid).to.be.equal(true);
        });

        it('Should return false if model is invalid first_name', () => {
            const old = user.first_name;
            user.first_name = '111';
            const isValid = User.validate(user, 'create');
            user.first_name = old;
            expect(isValid).to.be.equal(false);
        });

        it('Should return false if model is invalid last_name', () => {
            const old = user.last_name;
            user.last_name = '111';
            const isValid = User.validate(user, 'create');
            user.last_name = old;
            expect(isValid).to.be.equal(false);
        });

        it('Should return false if model is invalid date', () => {
            const old = user.date;
            user.date = '2017-20-20';
            const isValid = User.validate(user, 'create');
            user.date = old;
            expect(isValid).to.be.equal(false);
        });

        it('Should return false if model is invalid date', () => {
            const old = user.date;
            user.date = '2017/05/05';
            const isValid = User.validate(user, 'create');
            user.date = old;
            expect(isValid).to.be.equal(false);
        });

        it('Should return false if model is invalid email', () => {
            const old = user.email;
            user.email = 'invalid-email';
            const isValid = User.validate(user, 'create');
            user.email = old;
            expect(isValid).to.be.equal(false);
        });

        it('Should return false if model is invalid user_name', () => {
            const old = user.user_name;
            user.user_name = 'sm';
            const isValid = User.validate(user, 'create');
            user.user_name = old;
            expect(isValid).to.be.equal(false);
        });

        it('Should return false if model is invalid user_password', () => {
            const old = user.user_password;
            user.user_password = 'short';
            const isValid = User.validate(user, 'create');
            user.user_password = old;
            expect(isValid).to.be.equal(false);
        });

        it('Should return false if model is invalid confirm_password', () => {
            const old = user.confirm_password;
            user.confirm_password = old + 'somethingelse';
            const isValid = User.validate(user, 'create');
            user.confirm_password = old;
            expect(isValid).to.be.equal(false);
        });
    });

    describe('Validate password', () => {
        it('Should return true if valid password is passed', () => {
            const passObject = {
                old_password: user.user_password,
                user_password: user.user_password,
                confirm_password: user.user_password,
            };

            const isValid = User.validatePassword(passObject);
            expect(isValid).to.be.equal(true);
        });

        it('Should return false if valid password is passed', () => {
            const passObject = {
                old_password: 'short',
                user_password: 'short',
                confirm_password: 'diff',
            };

            const isValid = User.validatePassword(passObject);
            expect(isValid).to.be.equal(false);
        });
    });
});
