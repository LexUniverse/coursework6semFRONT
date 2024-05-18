import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { updateVacancy, fetchOneVacancy, fetchLocation, fetchTypes } from '../http/vacancyAPI';
import { Context } from "../index";

const VacancyUpdate = () => {
    const { id } = useParams();
    const { vacancy } = useContext(Context);
    const [formData, setFormData] = useState({
        job_title: '',
        company: '',
        locationId: '',
        salary: 0,
        employmentTypeId: ''
    });
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        fetchTypes().then(data => vacancy.setEmploymentTypes(data));
        fetchLocation().then(data => {
            vacancy.setLocations(data);
            setLocations(data);
        });
    }, [vacancy]);

    useEffect(() => {
        const fetchVacancyData = async () => {
            try {
                const vacancyData = await fetchOneVacancy(id);
                setFormData(vacancyData);
                setSelectedLocation(vacancyData.locationId);
                setSelectedType(vacancyData.employmentTypeId);
            } catch (error) {
                console.error('Ошибка при загрузке данных о вакансии:', error);
            }
        };
        fetchVacancyData();
    }, [id]);

    const handleLocationChange = (location) => {
        setSelectedLocation(location.id);
        setFormData({ ...formData, locationId: location.id });
    };

    const handleTypeChange = (type) => {
        setSelectedType(type.id);
        setFormData({ ...formData, employmentTypeId: type.id });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVacancy(id, formData);
            console.log('Информация о вакансии успешно обновлена!');
        } catch (error) {
            console.error('Ошибка при обновлении вакансии:', error);
        }
    };

    return (
        <div className={"p-5"}>
            <h1>Редактирование вакансии</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formJobTitle">
                    <Form.Label>Название должности</Form.Label>
                    <Form.Control type="text" name="job_title" value={formData.job_title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formCompany">
                    <Form.Label>Название компании</Form.Label>
                    <Form.Control type="text" name="company" value={formData.company} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formLocation">
                    <Form.Label>Локация</Form.Label>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>
                            { vacancy.selectedLocation.city ? (vacancy.selectedLocation.city + " " + vacancy.selectedLocation.region) : "Выберите локацию" }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {locations.map(location =>
                                <Dropdown.Item
                                    onClick={() => handleLocationChange(location)}
                                    key={location.id}
                                    active={selectedLocation === location.id}
                                >
                                    {location.region} {location.city}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group controlId="formSalary">
                    <Form.Label>Зарплата</Form.Label>
                    <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formEmploymentType">
                    <Form.Label>Тип занятости</Form.Label>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>
                            {vacancy.selectedType.name || "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {vacancy.EmploymentTypes.map(employmentType =>
                                <Dropdown.Item
                                    onClick={() => handleTypeChange(employmentType)}
                                    key={employmentType.id}
                                    active={selectedType === employmentType.id}
                                >
                                    {employmentType.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>
        </div>
    );
};

export default VacancyUpdate;
