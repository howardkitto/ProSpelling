//action types

export const NAME = 'NAME'

// action creators
export function saveName(name){
    return {
        type: 'GET_SPELLER_NAME',
        name: name
    }
}