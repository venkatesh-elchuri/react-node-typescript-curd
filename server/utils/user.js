const fs = require('fs');

const getUserInfo = () =>{
    let usersList = fs.readFileSync('./mocks/data.json');
    return JSON.parse(usersList);
}

const updateUsersList = (userList) =>{
    let usersList = JSON.stringify(userList);
    return fs.writeFileSync('./mocks/data.json',usersList)
}

module.exports = {
    getUserInfo,
    updateUsersList
}