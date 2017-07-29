const { expect } = require('chai');

const c = require('../../../models/user');

const user = {
    first_name: 'FirstName',
    last_name: 'LastName',
    date: '22/5/2017',
    country: 'Bulgaria',
    email: 'test@abv.bg',
    user_name: 'validUserName',
    user_password: 'validPassword',
    avatar: 'http://test.img',
    contact_no: '+35988664552355',
};

//getDataBaseModel
//validate

//validatePassword

describe('User model tests', () => {
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

        const actual = c.getDataBaseModel(user, 'update');
        console.log(actual);

        expect(actual).to.be.deep.equal(expected);
    });
});
