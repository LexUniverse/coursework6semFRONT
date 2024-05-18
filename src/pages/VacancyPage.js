import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { fetchOneVacancy } from "../http/vacancyAPI";
import { addVacancyToList, getAllVacanciesInList } from "../http/listApi";
import { check } from "../http/userAPI";

const VacancyPage = () => {
    const { id } = useParams(); // Получаем параметр id из URL
    const [vacancy, setVacancy] = useState({ info: [] });
    const [isInList, setIsInList] = useState(false); // Переменная для отслеживания наличия вакансии в списке
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Переменная для проверки авторизации пользователя

    // Загрузка данных о вакансии при загрузке компонента
    useEffect(() => {
        fetchOneVacancy(id).then(data => setVacancy(data));
        // Проверяем авторизацию пользователя при загрузке компонента
        checkUserAuthentication();
        // Проверяем, есть ли вакансия в списке пользователя
        getAllVacanciesInList().then(data => {
            const isInList = data.some(item => item.id === id);
            setIsInList(isInList);
        });
    }, [id]);

    // Функция для проверки авторизации пользователя
    const checkUserAuthentication = async () => {
        try {
            await check();
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    // Функция для добавления вакансии в список пользователя
    const handleAddToList = async () => {
        try {
            await addVacancyToList(id);
            setIsInList(true); // Устанавливаем флаг, что вакансия добавлена в список
            alert('Вакансия успешно добавлена в ваш список!');
        } catch (error) {
            console.error(error);
            alert('Ошибка при добавлении вакансии в список');
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <h2>{vacancy.job_title}</h2>
                    <p>{vacancy.company}</p>
                    <p>{vacancy.salary}</p>
                </Col>
                <Col md={6}>
                    <Card style={{ width: '20rem' }}>
                        <Card.Body>
                            <Card.Title>Понравилось предложение? Добавьте в список!</Card.Title>
                            <Card.Text>
                                {/* Показываем кнопку добавления только если пользователь авторизован */}
                                {isAuthenticated && !isInList && <Button variant="primary" onClick={handleAddToList}>Добавить</Button>}
                                {/* Показываем сообщение, если вакансия уже в списке */}
                                {isInList && <p>Вакансия уже в вашем списке</p>}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h3>Дополнительная информация</h3>
                    {vacancy.info.map(info => (
                        <div key={info.id}>
                            <h4>{info.title}</h4>
                            <p>{info.description}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default VacancyPage;
