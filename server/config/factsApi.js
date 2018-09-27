const request = require('request');

module.exports = {
    getRandomFact: () => {
    return new Promise((resolve,reject) => {
            request({url: 'https://fact.birb.pw/api/v1/cat'}, (error, response, body) => {
                if (error) { 
                    reject(error); 
                }
                else { 
                    resolve(body); 
                }
            });
        });
    }
}