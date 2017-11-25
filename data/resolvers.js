import {
  Flavors,
  Manufacturers,
  Author,
  View,
  FortuneCookie,
} from './connectors';

const resolvers = {
  Query: {
    getManufacturer(_, args) {
      console.log(_, args);
      //return Manufacturers.getOne();
    },
    allFlavors() {
      return Flavors.findAll();
    },
    author(_, args) {
      console.log(args);
      return Author.find({ where: args });
    },
    allAuthors(_, args) {
      return Author.findAll();
    },

    getFortuneCookie() {
      return FortuneCookie.getOne();
    },
  },
  Author: {
    posts(author) {
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id }).then(view => view.views);
    },
  },
};

export default resolvers;
