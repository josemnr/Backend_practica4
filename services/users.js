const { usersMock } = require('../utils/mocks/users');
const users = require('../utils/json/users.json');
const randomize = require('randomatic');
const fs = require('fs');
// fs.readFileSync('users.json');

var index = users[users.length-1].id
index++;

class UsersService{
  async getUsers(){
    const usersFiltered = users.map(u =>{
      const {name, lastName, email, year, url} = u
     return {name, lastName, email, year, url}
    })
    return usersFiltered || null;
  }

  async getUser(email){
    const user = users.find(u => u.email === email );
    return user || null;
  }

  async logInUser(user){
    const validateUser = users.find(u => u.email ===  user.email );
    if(validateUser){
      if(user.password === validateUser.password){
        if(validateUser.token){
          return validateUser;
        }else{
          const randomizeToken = randomize('Aa0', 10)+"-"+validateUser.id;
          validateUser.token = randomizeToken;
          return validateUser;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  }

  async createUser(user){
    const validateUserEmail = users.find(u => u.email === user.email);
    const validateUserName = users.filter(u => u.name.includes(user.name.toUpperCase()));
    if(validateUserEmail){
      return null;
    }else if(validateUserName){
      const validateLastName = validateUserName.find(u => u.lastName === user.lastName.toUpperCase())
      if(validateLastName){
        return null;
      }
    };
    user.name = user.name.toUpperCase()
    user.lastName = user.lastName.toUpperCase()
    user.id = index;
    index++;
    if(user.url){
      users.push(user)
    }else{
      user.url =  `https://randomuser.me/api/portraits/${user.sexo=="H" ? "men" : "women"}/${user.id}.jpg`;
      users.push(user);
    }
    // fs.writeFileSync('users.json',JSON.stringify(users));
    return users;
  }

  async updateUser(email, user){
    const validateUser = users.find(u => u.email ===  email );
    const index = users.findIndex(u => u.email === email);
    if(validateUser){
      if(user.name){
        user.name = user.name.toUpperCase();
      }
      if(user.lastName){
        user.lastName = user.lastName.toUpperCase();
      }
      user.id = validateUser.id;
      if(index > -1){
        users.splice(index, 1, user);
      }
      // fs.writeFileSync('users.json',JSON.stringify(users));
      return users;
    }else{
      return null;
    }
  }

  async deleteUser(email){
    const validateUser = users.find(u => u.email ===  email );
    if(validateUser){
      const index = users.findIndex(u => u.email === email);
      if(index > -1){
        users.splice(index,1);
      }
      // fs.writeFileSync('users.json',JSON.stringify(users));
      return users;
    }else{
      return null;
    }
  }

  // async getIdByToken(xauthuser){
  //   const validateUserToken = users.find(u => u.token === xauthuser);
  //   if(validateUserToken){
  //     return validateUserToken;
  //   }else{
  //     return null;
  //   }
  // }
}

module.exports = UsersService;