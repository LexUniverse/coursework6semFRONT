import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import VacancyStore from "./store/VacancyStore";

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Context.Provider value={{
          user: new UserStore(),
          vacancy: new VacancyStore(),
      }}>
          <App />
      </Context.Provider>
  </React.StrictMode>
);

