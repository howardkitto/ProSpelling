//action types

// action creators
export function saveName(name){
    return {
        type: 'GET_SPELLER_NAME',
        name: name
    }
}

export function levelSelected(level){
    console.log('LEVEL_SELECTED ' + level)
    return {
        type: 'LEVEL_SELECTED',
        level: level
    }
}


export function saveAnswer(answer){
    return {
        type: 'GET_ANSWER',
        answer: answer
    }
}

export function getNextWord(){
    return{
        type: 'GET_NEXT_WORD'
    }

}

export function getWordsList(){
    return{
        type: 'GET_WORDS_LIST'
    }

}