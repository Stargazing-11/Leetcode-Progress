import middleware from "./middlefunc.js";

const endpt = 'https://leetcode.com/graphql'

function validator (username) {

    const quer = `
    query progress($username:String!){
        matchedUser(username:$username){
            username
        }
    }`

    return middleware(quer, endpt, {username:username})
}
export default validator