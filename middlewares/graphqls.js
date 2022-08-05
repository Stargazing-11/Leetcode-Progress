const schemas = {
    "daily_code": `
        query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                userStatus
                link
                question {
                    acRate
                    difficulty
                    frontendQuestionId: questionFrontendId
                    status
                    title
                    topicTags {
                        name
                    }
                }
            }
        }`,

    "allQuestionsSolved": `
        query allQuestionsSolved($username:String!) {
            matchedUser(username:$username){
            submitStatsGlobal{
                acSubmissionNum{
                count
                difficulty
            }
            }
        }
        }`,

    "userInfo":`
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
            }`, 

    "recentSubmissions":`
        query recentSubmissions($username:String!) {
            recentAcSubmissionList( username:$username ){
                id
                timestamp
                title 
            }
        }`
}