import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    LIST_ROUTE,
    LOGIN_ROUTE,
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    VACANCY_ROUTE,
    EMPLOYER_ROUTE
} from "./utils/consts";
import List from "./pages/List";
import Home from "./pages/Home";
import VacancyPage from "./pages/VacancyPage";
import Auth from "./pages/Auth";
import Employer from "./pages/Employer";
import VacancyUpdate from "./pages/VacancyUpdate";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin // передаем компонент Admin как переменную
    },
    {
        path: LIST_ROUTE,
        Component: List // передаем компонент List как переменную
    },
    {
        path: EMPLOYER_ROUTE,
        Component: Employer // передаем компонент List как переменную
    },
    {
        path: `${VACANCY_ROUTE}/:id/update`, // исправлено на использование строки шаблона
        Component: VacancyUpdate // передаем компонент VacancyPage как переменную
    },
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home // передаем компонент Home как переменную
    },
    {
        path: `${VACANCY_ROUTE}/:id`, // исправлено на использование строки шаблона
        Component: VacancyPage // передаем компонент VacancyPage как переменную
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth // передаем компонент Auth как переменную
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth // передаем компонент Auth как переменную
    }
];
