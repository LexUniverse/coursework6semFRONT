import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateVacancy from "../components/modals/CreateVacancy";


const Employer = () => {
    const [vacancyVisible, setVacancyVisible] = useState(false)
    return (
    <Container className={'d-flex flex-column'}>
        <Button
            variant={"outline-dark"} className={'mt-4 p-2'}
            onClick={() => setVacancyVisible(true)}
        >
            Создать вакансию
        </Button>
        <CreateVacancy show={vacancyVisible} onHide={() => setVacancyVisible(false)}/>
    </Container>
)
    ;
};

export default Employer;
