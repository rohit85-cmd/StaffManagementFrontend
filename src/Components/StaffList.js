import React, { useState, useEffect } from 'react';

function StaffList() {
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7096/api/staffAPI/staffs')
            .then(response =>response.json())
            .then(data => setStaffs(data));
    }, []);

    return (
        <div>
            <h1>Staff's' List</h1>
            <ul>
                {console.log(staffs)}
                {staffs.map(st => (
                    <li key={st.staff_Id}>{st.staff_Id} {st.staff_FirstName} {st.staff_LastName} {st.staff_ContactNo}</li>
                ))}
                 
            </ul>
        </div>
    );
}

export default StaffList;
