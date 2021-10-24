
export default function resultMessageReducer(state, action) {
    switch(action.type) {
        case "split_both_bust": {
            return {
                ...state,
                result: "BOTH CARDS BUST",
                winAmount: action.data
            }
        }
        case "split_one_win": {
            return {
                ...state,
                result: "WIN ONE LOSE ONE",
                winAmount: action.data
            }
        }
        case "split_both_lose": {
            return {
                ...state,
                result: "BOTH CARDS LOST",
                winAmount: -action.data
            }
        }
        case "split_both_win": {
            return {
                ...state,
                result: "BOTH CARDS WIN",
                winAmount: action.data
            }
        }
        case "one_blackjack_one_win": {
            return {
                ...state,
                result: "ONE BLACKJACK ONE WIN",
                winAmount: action.data
            }
        }
        case "one_blackjack_one_lose": {
            return {
                ...state,
                result: "ONE BLACKJACK ONE LOSE",
                winAmount: action.data
            }
        }
        case "both_blackjack": {
            return {
                ...state,
                result: "TWO BLACKJACKS",
                winAmount: action.data
            }
        }
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
        case 'game_over': {
            return {
                ...state,
                result: "GAME OVER. GO HOME"
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