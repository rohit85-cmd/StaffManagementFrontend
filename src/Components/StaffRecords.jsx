import React from 'react';
import { useLocation } from 'react-router-dom';


function StaffRecords() {

    const location = useLocation();
    const records = location.state.result.staffRecords;
    const csvheaders = location.state.result.headers;

    console.log(csvheaders);
    console.log(records);
    return (
        <div>
            <h1> <b>({records.length})</b> Staff Members Added Successfully!</h1>
        </div>
    );
}
export default StaffRecords;