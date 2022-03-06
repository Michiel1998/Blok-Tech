const fs = require('fs');

module.exports.registerUser = function (newUser) {
    fs.readFile('database/users.json', (error, data) => {
        if (error) {
            console.log(error.message);
        }
        const toString = JSON.parse(data.toString())
        toString.push(newUser)
        return fs.writeFile('database/users.json', toString, {},(error) => {
          console.error('The following error occured: ', err);
        })
    })
}

module.exports.showUsers = async function () {
    try {
      const allUsers = await fs.readFile('database/users.json');
      return JSON.parse(users.toString()).map((allUsers) => ({ email: user.email }));
    } catch (err) {
      console.error('The following error occured: ', err);
    }
  };