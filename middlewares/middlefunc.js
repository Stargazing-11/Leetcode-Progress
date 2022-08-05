import fetch from "node-fetch"


//serve as a middleware
const middleware = async (query, endpt, variables) =>{
    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            query: query,
            variables: variables
         }),
    }
    const response = await fetch(endpt, init)
    return response.json()
}

export default middleware