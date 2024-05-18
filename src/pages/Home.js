import React, {useContext, useEffect} from 'react';
import { Col, Container, Row } from "react-bootstrap";
import LocationBar from "../components/LocationBar";
import EmploymentTypeBar from "../components/EmploymentTypeBar";
import VacancyList from "../components/VacancyList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchLocation, fetchTypes, fetchVacancy} from "../http/vacancyAPI";
import Pages from "../components/Pages";

const Home = observer(() => {
    const  {vacancy} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => vacancy.setEmploymentTypes(data))
        fetchLocation().then(data => vacancy.setLocations(data))
        fetchVacancy(null, null, 1, 5).then(data => {
            vacancy.setVacancies(data.rows)
            vacancy.setTotalCount(data.count)
        })
    }, []);

    useEffect(
        () => {
            if(vacancy.selectedType === "all") {
                fetchVacancy(null, vacancy.selectedLocation.id, vacancy.page, 5).then(data => {
                    vacancy.setVacancies(data.rows);
                    vacancy.setTotalCount(data.count);
                });
            } else {
                fetchVacancy(vacancy.selectedType.id, vacancy.selectedLocation.id, vacancy.page, 5).then(data => {
                    vacancy.setVacancies(data.rows);
                    vacancy.setTotalCount(data.count);
                });
            }
        }, [vacancy.page, vacancy.selectedType, vacancy.selectedLocation],
    );



    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <LocationBar />
                </Col>
                <Col md={9}>
                    <Row>
                        <Col md={12}>
                            <EmploymentTypeBar />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <VacancyList/>
                        </Col>
                    </Row>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Home;
