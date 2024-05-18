import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import { createVacancy, fetchLocation, fetchTypes } from "../../http/vacancyAPI";
import { observer } from "mobx-react-lite";

const CreateVacancy = observer(({ show, onHide }) => {
    const { vacancy } = useContext(Context);
    const [info, setInfo] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState(0);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const addVacancy = async () => {
        try {
            const vacancyData = {
                job_title: jobTitle,
                company: company,
                locationId: vacancy.selectedLocation.id,
                salary: salary,
                employmentTypeId: vacancy.selectedType.id,
                info: JSON.stringify(info) // Преобразуем массив объектов в строку JSON
            };

            const response = await createVacancy(vacancyData);
            console.log('Ответ от сервера:', response);

            onHide();
        } catch (error) {
            console.error('Ошибка при создании вакансии:', error);
        }
    };

    useEffect(() => {
        fetchTypes().then(data => vacancy.setEmploymentTypes(data));
        fetchLocation().then(data => vacancy.setLocations(data));
    }, []);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Создание вакансии
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={jobTitle}
                        onChange={e => setJobTitle(e.target.value)}
                        placeholder="Название должности"
                        className={"mt-2 mb-2"}
                    />
                    <Form.Control
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder="Название компании"
                        className={"mt-2 mb-2"}
                    />
                    <Form.Control
                        value={salary}
                        onChange={e => setSalary(Number(e.target.value))}
                        placeholder="Зарплата в рублях"
                        className={"mt-2 mb-2"}
                        type={"number"}
                    />
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{vacancy.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {vacancy.EmploymentTypes.map(employmentType =>
                                <Dropdown.Item onClick={() => vacancy.setSelectedType(employmentType)} key={employmentType.id}>{employmentType.name} </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{ vacancy.selectedLocation.city ? (vacancy.selectedLocation.city + " " + vacancy.selectedLocation.region) : "Выберите локацию" }</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {vacancy.Locations.map(location =>
                                <Dropdown.Item onClick={() => vacancy.setSelectedLocation(location)} key={location.id}>{location.region} {location.city} </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className={"mt-3"} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder={"Название свойства"}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder={"Описание свойства"}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => deleteInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide} >Закрыть</Button>
                <Button variant="outline-success" onClick={addVacancy}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateVacancy;
