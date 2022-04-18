const axios = require('axios');
const contactData = require('../data/contact.json');


export const contactService = {
    query,
};

// query();
async function query() {
    try {
        console.log(contactData);
        // const res = axios.get('../data/contact.json');
        console.log('res.data', res.data);
        return contactData;
    }
    catch (err) {
        console.log('Cannot load contacts', err);
        throw err;
    }

}