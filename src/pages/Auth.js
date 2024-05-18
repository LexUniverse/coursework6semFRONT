import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const navigate = useNavigate(); // Инициализируем navigate
    const { user } = useContext(Context);
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('worker');

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const click = async () => {
        try {
            if (location.pathname === LOGIN_ROUTE) {
                await login(email, password);
            } else {
                let roleToSend = '';
                if (role === 'worker') {
                    roleToSend = 'USER';
                } else if (role === 'employer') {
                    roleToSend = 'EMPLOYER';
                }
                await registration(email, password, roleToSend);
            }
            user.setUser(user);
            user.setIsAuth(true);
            navigate('/home'); // Перенаправляем пользователя на /home
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{location.pathname === LOGIN_ROUTE ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {location.pathname !== LOGIN_ROUTE && (
                        <Form.Group controlId="role">
                            <Form.Check
                                type="radio"
                                label="Я работник"
                                value="worker"
                                checked={role === 'worker'}
                                onChange={handleRoleChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Я наниматель"
                                value="employer"
                                checked={role === 'employer'}
                                onChange={handleRoleChange}
                            />
                        </Form.Group>
                    )}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3 align-items-center">
                        {location.pathname === LOGIN_ROUTE ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь</NavLink>
                            </div>
                        }
                        <Button
                            className="mt-3 align-self-end"
                            variant="outline-success"
                            onClick={click}
                        >
                            {location.pathname === LOGIN_ROUTE ? "Войти" : "Зарегистрироваться"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
