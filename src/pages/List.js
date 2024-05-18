import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getAllVacanciesInList, deleteVacancyFromList } from '../http/listApi';
import {VACANCY_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";

const List = () => {
    const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllVacanciesInList();
                setVacancies(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (vacancyId) => {
        try {
            await deleteVacancyFromList(vacancyId);
            setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancyId));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className={"p-5"}>
            <h1>Мой список вакансий</h1>
            {vacancies.map(vacancy => (
                <Card key={vacancy.id}>
                    <Card.Body>
                        <Card.Title>{vacancy.job_title}</Card.Title>
                        <Card.Text>{vacancy.company}</Card.Text>
                        <Link to={VACANCY_ROUTE + `/${vacancy.id}`} style={{textDecoration: 'none'}}>
                            <Button
                                variant="outline-success"
                                className="m-1 mt-3"
                                style={{fontSize: 14}}
                            >
                                Просмотреть детально
                            </Button>
                        </Link>
                        <Button variant="outline-danger" className="m-1 mt-3" style={{fontSize: 14}} onClick={() => handleDelete(vacancy.id)}>Удалить</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default List;
