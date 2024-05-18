import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateLocation from "../components/modals/CreateLocation";

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [locationVisible, setLocationVisible] = useState(false)

    return (
        <Container className={'d-flex flex-column'}>
            <Button
                variant={"outline-dark"} className={'mt-4 p-2'}
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"} className={'mt-4 p-2'}
                onClick={() => setLocationVisible(true)}
            >
                Добавить локацию
            </Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateLocation show={locationVisible} onHide={() => setLocationVisible(false)}/>
        </Container>
    );
};

export default Admin;