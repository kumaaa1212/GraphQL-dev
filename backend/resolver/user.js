// userのリゾルバー関数を定義する
// type User{
//   id:ID!
//   name:String!
//   email:String!
//   links:[Link!]!
// }

function links(parent, args, context) {
    return context.prisma.user.findUnique({
        where: { id: parent.id },
    }).links()
}
module.exports = {
    links,
}



