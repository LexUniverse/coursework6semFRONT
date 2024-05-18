import React, { useContext } from 'react';
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, LIST_ROUTE, EMPLOYER_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setRole(null);
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{ color: "gray" }} to={HOME_ROUTE}>WorkPlace</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: "gray" }}>
                        {user.role === 'ADMIN' &&
                            <NavLink to={ADMIN_ROUTE} style={{ textDecoration: 'none' }}>
                                <Button variant={"outline-light"} className={"m-lg-2"}>Панель Администратора</Button>
                            </NavLink>
                        }
                        {user.role !== 'USER' &&
                            <NavLink to={EMPLOYER_ROUTE} style={{ textDecoration: 'none' }}>
                                <Button variant={"outline-light"} className={"m-lg-2"}>Создать Вакансию</Button>
                            </NavLink>
                        }
                        <NavLink to={LIST_ROUTE} style={{ textDecoration: 'none' }}>
                            <Button variant={"outline-light"} className={"m-lg-2"}>Мой список</Button>
                        </NavLink>
                        <NavLink to={LOGIN_ROUTE} style={{ textDecoration: 'none' }}>
                            <Button variant={"outline-light"} className={"m-lg-2"} onClick={logOut}>Выйти</Button>
                        </NavLink>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: "gray" }}>
                        <NavLink to={LOGIN_ROUTE} style={{ textDecoration: 'none' }}>
                            <Button variant={"outline-light"} className={"m-lg-2"}>Авторизация</Button>
                        </NavLink>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
