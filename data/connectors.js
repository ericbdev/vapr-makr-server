import { Sequelize } from 'sequelize';
import casual from 'casual';
import { _ } from 'lodash';
import fetch from 'node-fetch';
import Mongoose from 'mongoose';

import {seedFlavors, seedManufacturers } from './seeders';

// See https://github.com/sequelize/sequelize/issues/8417 for more information about the `operatorsAliases` configuration
const Op = Sequelize.Op;

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
  operatorsAliases: Op,
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

const FlavorsModel = db.define('flavors', {
  id: { type: Sequelize.MEDIUMINT, primaryKey: true },
  name: { type: Sequelize.STRING },
  manufacturerId: { type: Sequelize.MEDIUMINT },
});

const ManufacturersModel = db.define('manufacturers', {
  id: { type: Sequelize.MEDIUMINT, primaryKey: true },
  shortName: { type: Sequelize.STRING },
  longName: { type: Sequelize.STRING },
});

FlavorsModel.hasOne(ManufacturersModel, { foreignKey: 'id' });

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

const Manufacturers = db.models.manufacturers;
const Flavors = db.models.flavors;
const Author = db.models.author;
const Post = db.models.post;

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost/views', {
  useMongoClient: true,
});

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('views', ViewSchema);

casual.seed(123);
db.sync({ force: true }).then(() => {
  seedFlavors(FlavorsModel);
  seedManufacturers(ManufacturersModel);

  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then(author => {
      return author
        .createPost({
          title: `A post by ${author.firstName}`,
          text: casual.sentences(3),
        })
        .then(post => {
          return View.update(
            { postId: post.id },
            { upsert: true },
            { views: casual.integer(0, 100) },
          );
        });
    });
  });
});

const FortuneCookie = {
  getOne() {
    return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  },
};

export { Flavors, Manufacturers, Author, Post, View, FortuneCookie };
