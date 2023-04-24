
export const Increment = () => {
    return {
        type: 'INCREMENT',

    }
}

export const Decrement =() => {
    return {
        type: 'DECREMENT',

    }
}


export const StaffUpdate = (staffCount) => {

    return {
        type: 'UpdateStaffCount',
        payload: staffCount,
    }
}
export const IsSuccessfulMigration = () => {

    return {
        type: 'IsSuccessfulMigration',
        
    }
}

export const FileStatus = (file) => {
    return {
        type: 'UpdatingFile',
        payload:file,
    }
}