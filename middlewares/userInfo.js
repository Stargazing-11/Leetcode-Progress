import middleware from "./middlefunc.js"

const userInfo = async(username) =>{
    const endpt = 'https://leetcode.com/graphql'
    const matchedUser = `
        query userInfo( $username:String! ) {
            matchedUser( username: $username ) {
                username
                profile{
                    userAvatar
                    realName
                    countryName
                    ranking
                }
                githubUrl
                linkedinUrl
                }
            }
        `
        const user = await middleware(matchedUser, endpt, {username:username}) 
    return user
}

export default userInfo
