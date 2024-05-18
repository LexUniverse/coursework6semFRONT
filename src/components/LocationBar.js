import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Button } from "react-bootstrap";
import { deleteLocation } from "../http/vacancyAPI";

const LocationBar = observer(() => {
    const { vacancy } = useContext(Context);
    const { user } = useContext(Context);

    // Стили для контейнера списка
    const listContainerStyle = {
        height: '300px', // Установите желаемую высоту
        overflowY: 'auto', // Добавьте скроллер по вертикали при необходимости
    };

    const clearSelection = () => {
        vacancy.clearSelectedLocation(); // Вызываем метод для очистки выбранного местоположения
    };

    const handleDeleteLocation = async (id) => {
        try {
            await deleteLocation(id);
            window.location.reload(); // Перезагрузка страницы после удаления
        } catch (error) {
            console.error('Ошибка при удалении локации:', error);
        }
    };

    return (
        <div style={listContainerStyle}> {/* Обертка с определенной высотой */}
            <ListGroup>
                {vacancy.Locations.map(location =>
                    <ListGroup.Item
                        style={{ cursor: 'pointer' }}
                        active={vacancy.selectedLocation && vacancy.selectedLocation.id === location.id}
                        onClick={() => vacancy.setSelectedLocation(location)}
                        key={location.id}
                    >
                        <div>
                            {user.role === "ADMIN" ?
                                <div>
                                    <p className={"m-0"}>id: {location.id} </p>
                                    <p className={"m-0"}>({location.region}) </p>
                                    <p className={"m-0"}>{location.city}</p>
                                    <Button variant="danger" size="sm" className="mt-1" onClick={() => handleDeleteLocation(location.id)}>Удалить</Button>
                                </div>
                                :
                                <div>
                                    <p className={"m-0"}>({location.region}) </p>
                                    <p className={"m-0"}>{location.city}</p>
                                </div>
                            }
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Button variant="secondary" className={"mt-2"} onClick={clearSelection}>Очистить выбор</Button>
        </div>
    );
});

export default LocationBar;
