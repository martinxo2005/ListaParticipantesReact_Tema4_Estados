import { Participante } from "./Participante"


const ListaParticipantes2 = ({ participantes, titulo, eliminarParticipante, cambiarComprobado, eliminarTodos, todosComprobados }) => {

    return (
        <>
            <h3>{titulo}</h3>
            {
                (participantes.length === 0) ?
                    <p>No hay Participantes</p>
                    :
                    <ul>
                        {participantes.map(
                            participante =>

                                <Participante
                                    key={participante.id}
                                    participante={participante}
                                    eliminarParticipante={eliminarParticipante}
                                    cambiarComprobado={cambiarComprobado}
                                />
                        )
                        }
                    </ul>

            }
            {(eliminarTodos && participantes.length !== 0) ?
                    <button onClick={eliminarTodos}>Eliminar Todos</button>
                    
                : ""
            }
            {todosComprobados ? 
            <button onClick={todosComprobados}>Todos Comprobados</button>
            :""
            }
            
        </>
    )
}

export default ListaParticipantes2