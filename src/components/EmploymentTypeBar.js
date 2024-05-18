import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Button } from "react-bootstrap";
import { deleteType } from "../http/vacancyAPI";

const EmploymentTypeBar = observer(() => {
    const { vacancy } = useContext(Context);
    const { user } = useContext(Context);

    const clearSelection = () => {
        vacancy.clearSelectedType(); // Вызываем метод для очистки выбранного типа
    };

    const handleDeleteType = async (id) => {
        try {
            await deleteType(id);
            window.location.reload(); // Перезагрузка страницы после удаления
        } catch (error) {
            console.error('Ошибка при удалении типа:', error);
        }
    };

    return (
        <div className="d-flex flex-wrap"> {/* Используем класс d-flex для создания горизонтального расположения */}
            {vacancy.EmploymentTypes.map(employmentType =>
                <Card
                    style={{cursor: "pointer"}}
                    border={employmentType.id === vacancy.selectedType.id ? "danger" : "gray"}
                    key={employmentType.id}
                    className={"p-1 m-1"}
                    onClick={()=> vacancy.setSelectedType(employmentType)}
                >
                    {user.role === "ADMIN" ?
                        <div>
                            <p>id: {employmentType.id} {employmentType.name}</p>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteType(employmentType.id)}>Удалить</Button>
                        </div>
                        :
                        employmentType.name
                    }
                </Card>
            )}
            <Button variant="secondary" className="p-1 m-2" onClick={clearSelection}>Очистить выбор</Button>
        </div>
    );
});

export default EmploymentTypeBar;
