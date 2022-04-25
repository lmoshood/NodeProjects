const UserModel = require('../models/users.model');

exports.insert = (req, res) => {

   UserModel.createUser(req.body)
       .then((result) => {
           res.status(201).send({id: result._id});
       });
};

exports.getById = (req, res) => {
   UserModel.findById(req.params.userId).then((result) => {
       res.status(200).send(result);
   });
};

exports.patchById = (req, res) => {
   
   UserModel.patchUser(req.params.userId, req.body).then((result) => {
           res.status(204).send({});
   });
};

exports.list = (req, res) => {
   
   UserModel.list().then((result) => {
       res.status(200).send(result);
   })
};

exports.removeById = (req, res) => {
   UserModel.removeById(req.params.userId)
       .then((result)=>{
           res.status(204).send({});
       });
};

