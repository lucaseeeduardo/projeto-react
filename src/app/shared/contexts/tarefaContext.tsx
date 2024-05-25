import React, { createContext } from "react";
import * as uuid from "uuid";

interface ITarefaContextData {
    id: string;
    funcao: string;
    feito: boolean;
    editando: boolean;
}
interface ITarefaProviderProps{
    children: React.ReactNode
}

export const TarefasContext = createContext<ITarefaContextData>({} as ITarefaContextData);

export const TarefasProvider: React.FC<ITarefaProviderProps> = ({children}) =>{
    return (
        <TarefasContext.Provider value = {{id: uuid.v4(), funcao: " ", feito: false, editando: false}}>
        {children}
        </TarefasContext.Provider>
    )
}