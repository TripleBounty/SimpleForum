const CryptoJS = require('crypto-js');

class User {
    static getDataBaseModel(model, type) {
        const {
            first_name,
            last_name,
            date,
            country,
            email,
            user_name,
            user_password,
            avatar,
            contact_no,
        } = model;

        if (type === 'update') {
            return {
                first_name: first_name,
                last_name: last_name,
                date: date,
                country: country,
                email: email,
                avatar: avatar,
                contact_no: contact_no,
            };
        }

        // eslint-disable-next-line new-cap
        const passwordHash = CryptoJS.SHA256(user_password).toString();

        if (type === 'updatePassword') {
            return {
                user_name: user_name,
                user_password: passwordHash,
            };
        }

        return {
            first_name: first_name,
            last_name: last_name,
            date: date,
            country: country,
            email: email,
            user_name: user_name,
            user_password: passwordHash,
            avatar: avatar,
            contact_no: contact_no,
        };
    }

    static validate(user, type) {
        const {
            first_name,
            last_name,
            date,
            email,
            user_name,
            user_password,
            confirm_password,
        } = user;

        const error = [];

        this._validateStringField('first name', 2, /^[a-zA-Z]+$/,
            first_name, error);
        this._validateStringField('last name', 2, /^[a-zA-Z]+$/,
            last_name, error);
        if (type === 'create') {
            this._validateStringField('user name', 4, /^[a-zA-Z0-9_\.]+$/,
                user_name, error);
        }
        this._validateEmail(email, error);
        this._validateDate(date, error);
        if (type === 'create') {
            if (user_password.length < 8 &&
                user_password.localeCompare(confirm_password) === 0) {
                error.push({
                    field: 'password',
                    message: 'Invalid password',
                });
            }
        }

        if (error.length !== 0) {
            return false;
        }

        return true;
    }

    static validatePassword(user) {
        const {
            old_password,
            user_password,
            confirm_password,
        } = user;

        const error = [];


        if (old_password.length < 8 &&
            user_password.length < 8 &&
            user_password.localeCompare(confirm_password) === 0) {
            error.push({
                field: 'password',
                message: 'Invalid password',
            });
        }

        if (error.length !== 0) {
            return false;
        }

        return true;
    }

    static _validateStringField(name, min, regex, field, error) {
        if (field.length < min || !regex.test(field)) {
            error.push({
                field: name,
                message: 'Invalid field ${name}',
            });
        }
    }

    static _validateEmail(field, error) {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regexEmail.test(field)) {
            error.push({
                field: 'email',
                message: 'Invalid email',
            });
        }
    }

    static _validateNumber(field, error) {
        const regexNumber = /^[+0-9]+$/;
        if (field.length !== 13 && !regexNumber.test(field)) {
            error.push({
                field: 'Contact no',
                message: 'Invalid mobile number',
            });
        }
    }

    static _validateDate(dateString, error) {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) {
            error.push({
                field: 'birth date',
                message: 'Invalid date',
            });
            return;
        }

        const d = new Date(dateString) | 0;

        if (!d) {
            error.push({
                field: 'birth date',
                message: 'Invalid date',
            });
            return;
        }
        return;
    }
}

module.exports = User;
