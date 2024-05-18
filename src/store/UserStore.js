import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode"; // Используем импорт из пакета jwt-decode

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._role = null;
        makeAutoObservable(this);
        this.checkAuth();
    }

    // Добавляем метод для проверки аутентификации и извлечения роли из токена
    checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            this.setUser(decodedToken);
            this.setIsAuth(true);
            this.setRole(decodedToken.role); // Устанавливаем роль из токена
        }
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setRole(role) {
        this._role = role;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get role() {
        return this._role;
    }
}
