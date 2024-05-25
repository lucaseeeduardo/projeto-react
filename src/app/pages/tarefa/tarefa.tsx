import { useCallback, useEffect, useState } from "react";
import { TarefaService } from "../../shared/services/api/TarefaService/TarefaService";
import React from "react";
import { v4 } from "uuid";
import { Button, Checkbox, Input, List, ListItem, ListItemText, TextField } from "@mui/material";
import { CSSProperties } from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';

interface ITarefa{
    id: string;
    funcao: string;
    feito: boolean;
    editando: boolean;
}
const style = {
    p: 0,
    width: '100%',
    maxWidth: 1024,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };

  const styleInputTodo:  CSSProperties = {
    padding: 0,
    width: '100%',
    maxWidth: 500,
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    textAlign: 'center'
};

 const styleDeleteButton:  CSSProperties = {
    backgroundColor: 'background.paper',
    color: "red",
    borderColor: 'divider',
    border: '1px solid'
};
const ariaLabel = { 'aria-label': 'description' };

export const TarefaApp = () =>{
    const [listaDeTarefas, setListaDeTarefas] = useState<ITarefa[]>([]);
    const handleAplicarAlteracoes : React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((e) => {
        if(e.key === 'Enter'){
            listaDeTarefas.map(tarefa => {
                if(tarefa.editando === true){
                    tarefa.funcao = e.currentTarget.value;
                    tarefa.editando = false;
                    TarefaService.patch(tarefa);
                }
            })
        }
    }
    , [listaDeTarefas]);
    

    useEffect(() =>  {
        TarefaService.getAll().then((response) => {
            if(response instanceof Error){
                console.log(response.message);
            }
            else{
                setListaDeTarefas(response);
            }
        })
    }, [listaDeTarefas]);

    const handleAdicionarTarefa: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((e) =>{
        
        if(e.key === 'Enter'){
            let valor = e.currentTarget.value;
            if (!valor || !valor.trim()) return;

            if(listaDeTarefas.some(x=>x.funcao === valor)) return;
            if(valor.trim() === ''){
                return;
            }
            TarefaService.post({
                id: v4(),
                funcao: valor.trim(),
                feito: false,
                editando: false
            }).then((response) => {
              if(response instanceof Error){
                console.log(response.message);
              }else{
                setListaDeTarefas([...listaDeTarefas, response]);
              }
            })
        }
    }, [listaDeTarefas]);

    return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input
                title="alterarTarefa" 
                id="alterarTarefa"
                type="text"
                placeholder="O que quero fazer?"
                inputProps={ariaLabel}
                onKeyDown={(e) => { handleAdicionarTarefa(e)} }
                style={styleInputTodo}
            />
        </div>
        <ul>{listaDeTarefas.map((itemListaAtual)=> {
            return !itemListaAtual.editando
                    ?<List sx={style} aria-label="mailbox folders">
                       <ListItem key={itemListaAtual.funcao}>
                        <Checkbox
                            title={"checkbox$"+itemListaAtual.id}
                            id={"checkbox$"+itemListaAtual.id}
                            checked={itemListaAtual.feito}
                            onChange={() => {
                                const index = listaDeTarefas.findIndex(x => x.id === itemListaAtual.id);
                                listaDeTarefas[index].feito = !listaDeTarefas[index].feito;
                                setListaDeTarefas([...listaDeTarefas]);
                                TarefaService.patch(itemListaAtual);
                            } } />
                            <ListItemText primary={itemListaAtual.funcao}/>
                            <Button variant="outlined"
                                onClick={() => {
                                    const index = listaDeTarefas.findIndex(x => x.id === itemListaAtual.id);
                                    listaDeTarefas[index].editando = !listaDeTarefas[index].editando;
                                    setListaDeTarefas([...listaDeTarefas]);
                                    TarefaService.patch(itemListaAtual);
                                } }
                            >
                            Editar</Button>
                            <blockquote></blockquote>
                            <Button variant="outlined"
                                style={styleDeleteButton}
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                    const index = listaDeTarefas.findIndex(x => x.id === itemListaAtual.id);
                                    listaDeTarefas.splice(index, 1);
                                    setListaDeTarefas([...listaDeTarefas]);
                                    TarefaService.exclude(itemListaAtual.id);
                                } }
                            >
                            Excluir</Button>
                        </ListItem>
                    </List>
                    : <List sx={style} aria-label="mailbox folders">
                        <ListItem 
                            key = {itemListaAtual.funcao}>
                                <Input
                                    title="alterarTarefa" 
                                    id="alterarTarefa"
                                    type="text"
                                    placeholder={itemListaAtual.funcao}
                                    inputProps={ariaLabel}
                                    onKeyDown={(e) => 
                                        { handleAplicarAlteracoes(e)}
                                    } 
                                />
                        <ListItemText/>
                        <Button variant="contained" onClick={() => {
                            const index = listaDeTarefas.findIndex(x => x.id === itemListaAtual.id);
                            listaDeTarefas[index].editando = !listaDeTarefas[index].editando;
                            setListaDeTarefas([...listaDeTarefas]);
                            TarefaService.patch(itemListaAtual);
                        } } >Cancelar</Button>
                        </ListItem>
                    </List>
                })
            }
        </ul>
    </div>
    );
}