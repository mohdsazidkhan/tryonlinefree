const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'tryonlinefree',
  api_key: '382451823486165',
  api_secret: 'JuGQPhNzifF8oSwPiDvl7K-AWaY'
});

module.exports = cloudinary;