import {BrowserRouter, Route, Routes as Switch, Navigate} from 'react-router-dom';
import { TarefaApp } from '../pages/tarefa/tarefa';

export const Routes = () => {

    return (
    <BrowserRouter>
        <Switch>
            <Route 
                path = "/pagina-inicial"
                element={TarefaApp()}
            >    
            </Route>
            <Route
                path="*"
                element={<Navigate to="/pagina-inicial"/>}
            >
            </Route>
        </Switch>
    </BrowserRouter>);

};