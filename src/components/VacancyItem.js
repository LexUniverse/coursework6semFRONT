import React, {useContext, useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {VACANCY_ROUTE} from "../utils/consts";
import {deleteVacancy} from "../http/vacancyAPI";
import {Context} from "../index";

const VacancyItem = ({vacancy}) => {
    const fontSize = vacancy.job_title.length > 20 ? 0.8 : 1;
    const {user} = useContext(Context);
    const handleDelete = async () => {
        try {
            await deleteVacancy(vacancy.id);
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Col xs={12} className="mb-3">
            <Card
                style={{borderLeft: '5px solid lightgreen', height: 200}}
            >
                <div className="p-3">
                    <div style={{fontSize: `${fontSize}em`}}>{vacancy.job_title}</div>
                    <div>{vacancy.company}</div>
                    <div>От: {vacancy.salary} руб.</div>
                    <div></div>
                </div>
                <div className="p-3" style={{marginTop: '-20px'}}>
                    <div role="group" aria-label="Кнопки">
                        <Link to={VACANCY_ROUTE + `/${vacancy.id}`} style={{textDecoration: 'none'}}>
                            <Button
                                variant="outline-success"
                                className="m-1 mt-3"
                                style={{fontSize: 14}}
                            >
                                Просмотреть детально
                            </Button>
                        </Link>
                        {user.role === 'ADMIN' && (
                            <Link to={VACANCY_ROUTE + `/${vacancy.id}/update`} style={{textDecoration: 'none'}}>
                                <Button
                                    variant="outline-secondary"
                                    className="m-1 mt-3"
                                    style={{fontSize: 14}}
                                >
                                    Редактировать
                                </Button>
                            </Link>
                        )}
                        {user.role === 'ADMIN' && (
                            <Button
                                variant="outline-danger"
                                className="m-1 mt-3"
                                style={{fontSize: 14}}
                                onClick={handleDelete}
                            >
                                Удалить
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </Col>
    )
        ;
};

export default VacancyItem;
