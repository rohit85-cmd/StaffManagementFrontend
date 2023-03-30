import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


function MappingUI() {
    

    const [dbFields, setDbFields] = useState([]);
    
    const location = useLocation();
    const csvFields = location.state.csvFields;
    console.log(csvFields);
    const fileName = location.state.fileName;
    console.log(fileName);
    const [selectedValues, setSelectedValues] = useState({});

    function handleSelectChange(event, field) {
        const newSelectedValues = { ...selectedValues };
        newSelectedValues[field] = event.target.value;
        setSelectedValues(newSelectedValues);
    }

    


    useEffect(() => {
        fetch('https://localhost:7096/api/staffAPI/headers')
            .then(Response => Response.json())
            .then(data => setDbFields(data));
    }, []);


    const handleMapClick = async(e) => {
        //console.log(selectedValues);
        try {
            console.log("Selcted Values: ", selectedValues);

            var response = await axios.post("https://localhost:7096/api/staffAPI/migrate/" + fileName, selectedValues);
            if (response.status === 200) {
                console.log("migration Successful");
                toast.success('Data Migrated to sql table', {
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark",
                });
            }

        } 
        catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark", 
            });
        }
    }

    return (
        <div>
            <h2>Mapping Template</h2>

            <Container>
                {dbFields.map((field, index) => (
                    <Row>
                        <Col>
                            <label key={index} value={field}>{field}</label>
                        </Col>
                        <Col>
                            
                            <select value={selectedValues[field]} onChange={(e) => handleSelectChange(e, field)}>
                                <option>--Select Option--</option>
                              

                                {csvFields.map((field, index) => (
                                    <option key={index} value={field} disabled={Object.values(selectedValues).includes(field)}>{field}</option>
                                ))} 
                                
                                
                            </select>
                        </Col>
                    </Row>

                ))}


            </Container>
            <Button variant="primary" onClick={handleMapClick}>Map</Button>

        </div>

    );
}

export default MappingUI;
