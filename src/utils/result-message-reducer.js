
export default function resultMessageReducer(state, action) {
    switch(action.type) {
        case "split_win_lose": {
            return {
                ...state,
                result: "WIN ONE LOSE ONE",
                winAmount: action.data / 2
            }
        }
        case "split_win_push": {
            return {
                ...state,
                result: "WIN ONE PUSH ONE",
                winAmount: action.data + (action.data / 2)
            }
        }
        case "split_lose_push": {
            return {
                ...state,
                result: "LOSE ONE PUSH ONE",
                winAmount: -action.data / 2
            }
        }
        case "split_both_lose": {
            return {
                ...state,
                result: "BOTH HANDS LOSE",
                winAmount: -action.data
            }
        }
        case "split_both_win": {
            return {
                ...state,
                result: "BOTH HANDS WIN",
                winAmount: action.data
            }
        }
        case "split_blackjack_win": {
            return {
                ...state,
                result: "ONE BLACKJACK ONE WIN",
                winAmount: ((action.data / 2) * 1.5) + (action.data / 2)
            }
        }
        case "split_blackjack_lose": {
            return {
                ...state,
                result: "ONE BLACKJACK ONE LOSE",
                winAmount: ((action.data / 2) * 2.5) 
            }
        }
        case "both_blackjack": {
            return {
                ...state,
                result: "TWO BLACKJACKS",
                winAmount: action.data * 2.5
            }
        }
        case "split_blackjack_push": {
            return {
                ...state,
                result: "ONE BLACKJACK ONE PUSH",
                winAmount: (action.data / 2) * 2.5
            }
        }
        case "blackjack": {
            return {
                ...state,
                result: "BLACKJACK",
                winAmount: action.data * 2.5
            }
        }
        case "push": {
            return {
                ...state,
                result: "PUSH",
                winAmount: 0
            }
        }
        case "win": {
            return {
                ...state,
                result: "WIN",
                winAmount: action.data * 2
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