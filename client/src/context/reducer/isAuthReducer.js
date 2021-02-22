export const isAuthReducer = (state, action) => {
    switch(action.type){
        case 'NOT_AUTH':
            return false;
        case 'IS_AUTH':
            return true;
        default:
            return state;
    }
}  