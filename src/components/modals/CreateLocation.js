import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { createLocation } from "../../http/vacancyAPI";

const CreateLocation = ({ show, onHide, token }) => {
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');

    const addLocation = () => {
        createLocation({ region, city }, token)
            .then(data => {
                setRegion('');
                setCity('');
                onHide();
            })
            .catch(error => {
                console.error('Ошибка при создании локации:', error);
            });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавление локации</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Регион"
                        className={"mt-2 mb-2"}
                        value={region}
                        onChange={e => setRegion(e.target.value)}
                    />
                    <Form.Control
                        placeholder="Город"
                        className={"mt-2 mb-2"}
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addLocation}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateLocation;
