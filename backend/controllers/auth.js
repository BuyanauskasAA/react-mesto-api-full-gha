const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ConflictError, BadRequestError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const signup = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь уже зарегистрирован!'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при регистрации пользователя!'));
      } else {
        next(err);
      }
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ message: 'Вы авторизованы!' });
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли!' });
};

module.exports = {
  signup,
  signin,
  signout,
};
