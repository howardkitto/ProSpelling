//action types

// action creators
export function saveName(name){
    return {
        type: 'GET_SPELLER_NAME',
        name: name
    }
}

export function changeQuestionState(questionState){
    // console.log('changeQuestionState got '+ questionState)
    return {
        type: 'CHANGE_QUESTION_STATE',
        questionState: questionState
    }
}

export function levelSelected(level){
    // console.log('LEVEL_SELECTED ' + level)
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

export function createWord(word){
    // console.log('CREATE_WORD ' +JSON.stringify(word))
    return {
        type: 'CREATE_WORD',
        word: word
    }
}

export function editWord(word){
    // console.log('EDIT_WORD' + JSON.stringify(word))
    return {
        type: 'EDIT_WORD',
        word: word
    }
}

export function updateWord(word){
    // console.log('UPDATE_WORD ' +JSON.stringify(word))
    return {
        type: 'UPDATE_WORD',
        word: word
    }
}

export function deleteWord(word){
    // console.log('DELETE_WORD action '+JSON.stringify(word))
    return {
        type: 'DELETE_WORD',
        word: word
    }
}

export function getWord(level){
    return{
        type: 'GET_NEXT_WORD',
        level: level
    }

}

export function getWordsList(){
    return{
        type: 'GET_WORDS_LIST'
    }
}

export function submitAnswer(){
    return{
        type: 'SUBMIT_ANSWER'
    }
}