import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function StaffRecords() {

    const location = useLocation();
    const records = location.state.result.staffRecords;
    const csvheaders = location.state.result.headers;

    console.log(csvheaders);
    console.log(records);
    return (
        <div>
            <h1>Migrated Staff Records Successfully</h1>
        </div>
    );
}
export default StaffRecords;