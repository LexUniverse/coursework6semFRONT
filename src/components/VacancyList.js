import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import VacancyItem from "./VacancyItem";

const VacancyList = observer(() => {
    const {vacancy} = useContext(Context)

    return (
        <Row className={'d-flex'}>
            {vacancy.Vacancies.map(vacancy =>
                <VacancyItem key={vacancy.id} vacancy={vacancy}/>
            )}

        </Row>
    );
});

export default VacancyList;