import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import NavBar from "./components/Navbar";
import AppRouter from "./components/AppRouter";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await check();
                user.setIsAuth(true);
            } catch (error) {
                console.error("Error checking user authentication:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    if (loading) {
        return <Spinner animation="grow" />;
    }

    return (
        <Router>
            <NavBar />
            <AppRouter />
        </Router>
    );
});

export default App;
