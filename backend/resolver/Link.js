// type Link{
//   id:ID!
//   descriptoin:String!
//   url:String!
//   postedBy:User
// }

// 誰によって投稿されたのかを明示するための関数
function postedBy(parent, args, context) {
  return context.prisma.link.findUnique({
    where: { id: parent.id },
  }).postedBy();
}
module.exports = {
  postedBy,
}
// type Link{
//   id:ID!
//   descriptoin:String!
//   url:String!
//   postedBy:User
// }
// このスキーマー全体につけるのではなく、フィールドにつけるときは最後に関数をつける


// parent.idはまず親はLinkであることを示している。それのidだから、Linkのidを取得している。