import express from 'express'
import middleware from '../middlewares/middlefunc.js'
import auth from '../middlewares/auth.js'
import User from '../models/user.js'
import asyncMiddleware from '../middlewares/asyncMIddleware.js'

const router = express.Router()

router.get('/me', auth, asyncMiddleware( async (req, res) =>{
        const username = req.user.username
        let user = User.findOne({leetcode:username})
        console.log(user)
}));

router.get('/userInfo',auth, asyncMiddleware(async (req, res) =>{
    const username = req.user.username.toString()
    const ret = await middleware(matchedUser, endpt, {username:username});
    res.status(200).send(ret)
}));

router.get('/recentSubmissions', auth, asyncMiddleware(async (req, res) =>{
        const username = req.user.username.toString()
        const ret = await middleware(recentAcSubmissionList, endpt, {username:username});
        console.log(ret)
        res.send(ret)
}))

router.get('/dailycode',auth, asyncMiddleware(async (req, res) =>{
        const ret = await middleware(daily_code, endpt, null);
        console.log(ret)
        res.send(ret)
}))

router.get('/allQuestionSolved', auth, asyncMiddleware(async (req, res) =>{
        const username = req.user.username.toString()
        const ret = await middleware(allQuestionsSolved, endpt, {username:username});
        console.log(ret)
        res.send(ret)
}));

const endpt = 'https://leetcode.com/graphql'

//daily code challenge
const daily_code = `
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
}`

//user progress in dsa
const allQuestionsSolved = `
query allQuestionsSolved($username:String!) {
    matchedUser(username:$username){
    submitStatsGlobal{
        acSubmissionNum{
        count
        difficulty
    }
    }
 }
}`

//logged user information
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
//recent Submissions
const recentAcSubmissionList = `
query recentSubmissions($username:String!) {
    recentAcSubmissionList( username:$username ){
        id
        timestamp
        title 
    }
}`

export default router