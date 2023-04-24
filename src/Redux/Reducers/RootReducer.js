import changeNumber from './ButtonReducer'
import UpdateStaffCount from './MainComponentReducer'
import changeFile from './FileStatesReducer'
import {combineReducers } from 'redux'

const rootReducer = combineReducers({
    changeNumber: changeNumber,
    UpdateStaffCount: UpdateStaffCount,
    changeFile: changeFile,

})

export default rootReducer;