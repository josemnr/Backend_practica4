const router = require('express').Router();
const UsersService = require('../services/users');
const usersService = new UsersService();
const {
  userEmailSCHEMA,
  logInUserSchema,
  createUserSchema,
  updateUserSchema,
  autenticationUser
} = require('../utils/schema/users');
const validationHandler = require('../utils/middleware/validationHandlers')

//Root route
  router.get('/',
  async function(req, res, next) {
    try {
      res.status(200).json({
        message: 'Users app práctica 4'
      });
    } catch (err) {
      next(err);
    }
  });

//Create user
  router.post('/users',
  validationHandler(createUserSchema),
  async function(req, res, next) {
    const { body: user } = req;
    try {
      const createdUser = await usersService.createUser( user );
      if(createdUser){
        res.status(201).json({
          data: createdUser,
          message: 'user created'
        });
      }else{
        throw new Error('User already exist');
      }
    } catch (err) {
      next(err);
    }
  });

//Login user
  router.post('/login',
  validationHandler(logInUserSchema),
  async function(req, res, next) {
    const { body: user } = req
    try {
      const loggedUser = await usersService.logInUser(user);
      if(loggedUser){
        res.status(201).json({
          data: loggedUser.token,
          message: 'user logged'
        });
      }else{
        throw new Error('login user');
      }
    } catch (err) {
      next(err);
    }
  });

//Get users
  router.get('/users',
  async function(req, res, next) {
    const { xauthuser } = req.params;
    // req.setRequestHeader({'x-auth-user':xauthuser});
    try {
      const users = await usersService.getUsers();
      // const validateUserToken = await usersService.getIdByToken(xauthuser);
      // if(validateUserToken){
      //   req.id = validateUserToken.id;
      //   console.log(req.id);
      // }else{
      //   throw new Error('invalid token');
      // }
      if(users){
        res.status(200).json({
          data: users,
          message: 'users listed'
        });
      }else{
        throw new Error('getting users')
      }
    } catch (err) {
      next(err);
    }
  });

//Get user
  router.get('/users/:email',
  validationHandler({email: userEmailSCHEMA}, 'params'),
  validationHandler(autenticationUser),
  async function(req, res, next) {
     const { email } = req.params;
    try {
      const user = await usersService.getUser( email );
      if(user){
        res.status(200).json({
          data:user,
          message: 'user retrieved'
        });
      }else{
        throw new Error('getting user')
      }
    } catch (err) {
      next(err);
    }
  });

//Update user
  router.put('/users/:email',
  validationHandler({email: userEmailSCHEMA}, 'params'),
  validationHandler(updateUserSchema),
  async function(req, res, next) {
    const { email } = req.params;
    const { body: user } = req;
    try {
      const updatedUser = await usersService.updateUser(email, user);
      if(updatedUser){
        res.status(200).json({
          data: updatedUser,
          message: 'user updated'
        });
      }else{
        throw new Error('updating user');
      }
    } catch (err) {
      next(err);
    }
  });

//Delete user
  router.delete('/users/:email',
  validationHandler({email: userEmailSCHEMA}, 'params'),
  validationHandler(autenticationUser),
  async function(req, res, next) {
    const { email } = req.params;
    try {
      const deletedUser = await usersService.deleteUser( email );
      if(deletedUser){
        res.status(200).json({
          data:deletedUser,
          message: 'user deleted'
        });
      }else{
        throw new Error('deleting user')
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;