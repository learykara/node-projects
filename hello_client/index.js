var unirest = require('unirest');

// unirest.
//   get('https://www.thinkful.com/').
//   end(function (response) {
//     console.log('Status: ', response.statusCode);
//     console.log('Headers: ', response.headers);
//     console.log('Body: ', response.body);
//   });

unirest.
  get('http://localhost:8090/headers').
  end(function (response) {
    console.log('Status: ', response.statusCode);
    console.log('Headers: ', response.headers);
    console.log('Body: ', response.body);
  });

unirest.
  get('http://localhost:8090/version').
  end(function (response) {
    console.log('Status: ', response.statusCode);
    console.log('Headers: ', response.headers);
    console.log('Body: ', response.body);
  });
