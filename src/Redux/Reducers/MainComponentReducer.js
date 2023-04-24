
const initialState = {
    staffcount: 0,
    isSuccessfulMigration:false,
}

const UpdateStaffCount = (state = initialState , action) => {
    switch (action.type) {
        case 'UpdateStaffCount':
            return { ...state, staffcount: action.payload };
        case 'IsSuccessfulMigration':
            return { ...state, isSuccessfulMigration: true };
        default:
            return state;
        
    }
}

export default UpdateStaffCount;