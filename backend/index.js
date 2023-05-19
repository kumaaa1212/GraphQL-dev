const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const {getUserId} =require('./resolver/utils')
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();
const Query = require('./resolver/Query');
const Mutation = require('./resolver/Mutation');
const Link = require('./resolver/Link');
const User = require('./resolver/user');

const resolvers = {
Query,
Mutation,
User,
Link
};

const server = new ApolloServer({
  typeDefs:fs.readFileSync(path.join(__dirname,'schema.graphql'),"utf-8"),
  resolvers,
  context :({req}) => {
    return {
      ...req,
      prisma,
      userId:req && req.headers.authorization ? getUserId(req) : null
    }
  },
});
// &&はかつってこと
// reqをつけるとreturnが必要になる
// ...をつけることで、reqにuserIdをつけることができる
// 追加したことでどこでもuserIdを使えるようになる
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
