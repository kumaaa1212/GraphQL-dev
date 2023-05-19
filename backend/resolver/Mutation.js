const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  return { token, user };
}

async function login(parent, args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("そのような人はいません");
  }
  const vaild = await bcrypt.compare(args.password, user.password);
  if (!vaild) {
    throw new Error("無効です");
  }
  const token = jwt.sign({ userId: user.id },process.env.APP_SECRET);
  return { token, user };
}
async function post(parent, args, context) {
  return await context.prisma.link.create({
    data: {
      url: args.url,
      descriptoin: args.descriptoin,
      postedBy: { connect: { id: context.userId } },
      // connectを使うことで、postedByのidをつなげることができる。他の型と繋げることができる
    }
  });
}
module.exports = {
  signup,
  login,
  post,
}
