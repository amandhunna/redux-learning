export const ADD_TWEETS = 'ADD_TWEETS';

export const addTweets = tweets => ({
    type: ADD_TWEETS,
    payload: { tweets},
})

export const fetchTweets = () => {
    console.log("clicked")
    return (dispatch) => {
        console.log("here")
        fetch('http://tweet-stream.glitch.me/api/tweets')
        .then((res) => res.json())
        .then(response => { 
            console.log("response",response);
            dispatch(addTweets(response.tweets));
        })
        .catch(error => {console.error("error", error)})
    }
}

