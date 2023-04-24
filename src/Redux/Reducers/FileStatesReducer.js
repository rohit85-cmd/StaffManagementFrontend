

const initialState = {
    file: null,
    fileName: '',
    fileSize: '',
    

}



const changeFile = (state = initialState , action) => {
    if (action.payload) {
        switch (action.type) {
            case 'UpdatingFile':
                return {
                    ...state,
                    file: action.payload,
                    fileName: action.payload.name,
                    fileSize: action.payload.size,

                };

            default:
                return state;

        }
    }
    else {
        return {
            ...state,
            file: null,
            fileName: '',
            fileSize: '',
        }
    }
}

export default changeFile;