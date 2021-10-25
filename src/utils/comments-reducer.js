export const commentsReducer = (state, action) => {
    switch(action.type) {
        case "add_user_comment": {
            // action.data = {name: ___, message: ____}
            return {
                ...state,
                posts: [...state.posts, action.data]
            }
        }
        case "add_dealer_comment": {
            // action.data = insult
            return {
                ...state,
                posts: [...state.posts, {name: "Dealer", message: action.data}]
            }
        }
        case "add_message_and_comment": {
            // action.data = [{}, {}]
            return {
                ...state,
                posts: [...state.posts, action.data[0], action.data[1]]
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}