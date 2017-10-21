//action types

// action creators
export function saveName(name){
    return {
        type: 'GET_SPELLER_NAME',
        name: name
    }
}

export function saveAnswer(answer){
    return {
        type: 'GET_ANSWER',
        answer: answer
    }
}