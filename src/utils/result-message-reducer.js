
export default function resultMessageReducer(state, action) {
    switch(action.type) {
        case "blackjack": {
            return {
                ...state,
                result: "BLACKJACK",
                winAmount: action.data
            }
        }
        case "player_bust": {
            return {
                ...state,
                result: "BUST",
                winAmount: -action.data
            }
        }
        case "push": {
            return {
                ...state,
                result: "PUSH",
            }
        }
        case "win": {
            return {
                ...state,
                result: "WIN",
                winAmount: action.data
            }
        }
        case "lose": {
            return {
                ...state,
                result: "LOSE",
                winAmount: -action.data
            }
        }
        case "reset": {
            return {
                result: "",
                winAmount: 0
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}