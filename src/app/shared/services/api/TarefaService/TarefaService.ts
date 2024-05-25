import { Api as client } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface ITarefa{
    id: string;
    funcao: string;
    feito: boolean;
    editando: boolean;
}

const getAll = async () : Promise<ITarefa[] | ApiException> => {
    try{
        const {data} = await client().get(`/Tarefas`);
        data.forEach( (element: ITarefa) =>{ 
            console.log(element.feito);
        });
        return data;

    }
    catch(error: any){
        return new ApiException(error.message || "Houve erro ao buscar os registros..");
    }
}
const getById = async (id: string) : Promise<ITarefa | null | ApiException> => {
    try{
        const response : any = await client().get(`/Tarefas/${id}`);
        if(response === null){
            return null;
        }
        return response;

    }
    catch(error: any){
        return new ApiException(error.message || `Erro ao buscar a Tarefa de Id ${id}.`);
    }
}
const post  = async (dados: ITarefa) :  Promise<ITarefa | ApiException> => {
    try{
        const response : any = await client().post(`/Tarefas/`, dados);
        return response;

    }
    catch(error: any){
        return new ApiException(error.message || `Erro ao atualizar o registro ID: ${dados.id}.`);
    }
}

const patch = async (tarefaAlterada: ITarefa) : Promise<undefined | ApiException> => {
    try{
        const response : any = await client().put(`/Tarefas/${tarefaAlterada.id}`, tarefaAlterada);
        return response;

    }
    catch(error: any){
        return new ApiException(error.message || `Erro ao deletar o registro de ID ${tarefaAlterada.id}}.`);
    }
}
const exclude = async (id: string) : Promise< undefined | ApiException> => {
    try{
        const response : any = await client().delete(`/Tarefas/${id}`);
        return response;

    }
    catch(error: any){
        return new ApiException(error.message || `Erro ao buscar a Tarefa de Id ${id}.`);
    }
}

export const TarefaService = {
    getAll,
    getById,
    post,
    patch,
    exclude
};