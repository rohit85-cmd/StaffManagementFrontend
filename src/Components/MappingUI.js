import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MappingUI() {
    //const [leftValue, setLeftValue] = useState('');
    const [rightValue, setRightValue] = useState('');

    const [dbFields, setDbFields] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7096/api/staffAPI/headers')
            .then(Response => Response.json())
            .then(data => setDbFields(data));
    }, []);



    /*function handleLeftChange(event) {
        setLeftValue(event.target.value);
    }*/

    function handleRightChange(event) {
        setRightValue(event.target.value);
    }

    function handleMapClick() {
        //setRightValue(leftValue);
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
                            {/*<input type="text" value={rightValue} onChange={handleRightChange} />*/}
                            <select>
                                <option>select option</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
