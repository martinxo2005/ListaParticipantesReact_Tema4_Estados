import { useState } from "react"
import { Cabecera } from "./components/Cabecera"
import Contador from "./components/Contador"
import FormularioRegistro from "./components/FormularioRegistro"
import ListaParticipantes2 from "./components/ListaParticipantes2"
import { FiltrosParticipantes } from "./components/FiltrosParticipantes"
import { participantes2 } from "./js/participantes2"

const App2 = () => {
    const [listadoParticipantes, setListadoParticipantes] = useState(participantes2);

    // Estados para la búsqueda, filtrado y ordenación (Lifting State Up)
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todos"); // "todos", "comprobados", "pendientes"
    const [orden, setOrden] = useState("registro"); // "registro", "asc", "desc"

    // 1. Filtrado combinado (Búsqueda + Estado)    
    const terminoBusqueda = busqueda.trim().toLowerCase();

    const participantesFiltrados = listadoParticipantes.filter(p => {
        // Coincidencia parcial case-insensitive en nombre o email
        const coincideNombre = p.nombre.toLowerCase().includes(terminoBusqueda);
        const coincideEmail = p.email.toLowerCase().includes(terminoBusqueda);
        const coincideBusqueda = coincideNombre || coincideEmail;

        // Filtro por comprobación
        let coincideEstado = true;
        if (filtroEstado === "comprobados") {
            coincideEstado = p.comprobado === true;
        } else if (filtroEstado === "pendientes") {
            coincideEstado = p.comprobado === false;
        }

        return coincideBusqueda && coincideEstado;
    });

    // 2. Ordenación manteniendo inmutabilidad (copia con [...array])
    const participantesProcesados = [...participantesFiltrados];

    if (orden === "asc") {
        participantesProcesados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === "desc") {
        participantesProcesados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    // 3. Segunda lista: solo los comprobados pertenecientes a los resultados filtrados actuales
    const listaParticipantesComprobados = participantesProcesados.filter(
        participante => participante.comprobado
    );

    // Comprobación para mensaje del resumen
    const hayFiltrosActivos = busqueda.trim() !== "" || filtroEstado !== "todos" || orden !== "registro";

    // Restablecer controles
    const restablecerFiltros = () => {
        setBusqueda("");
        setFiltroEstado("todos");
        setOrden("registro");
    };

    const anadirParticipante = (nuevo) => {
        if (!compruebaMail(nuevo.email.trim().toLowerCase())) {
            const participante = {
                id: calculaID() + 1,
                ...nuevo
            }

            setListadoParticipantes(listadoParticipantes => [
                ...listadoParticipantes,
                participante
            ])
            limpiarFormulario();
            document.querySelector("#nombre").focus();
        } else {
            document.querySelector("#mensaje").innerHTML = "ERROR. Email repetido";
        }
    }

    const compruebaMail = (email) => {
        return listadoParticipantes.some(
            p => p.email.trim().toLowerCase() === email
        )
    }

    const limpiarFormulario = () => {
        document.querySelector("#nombre").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#mensaje").innerHTML = ""
    }

    const calculaID = () => {
        return listadoParticipantes.reduce(
            (max, p) => Math.max(p.id, max), 0
        )
    }

    const eliminarParticipante = (id) => {
        setListadoParticipantes(
            listadoParticipantes =>
                listadoParticipantes.filter(
                    participante => participante.id !== id
                )
        )
    }

    const cambiarComprobado = (id) => {
        setListadoParticipantes(
            actuales =>
                actuales.map(
                    p => p.id === id ?
                        {
                            ...p,
                            comprobado: !p.comprobado
                        } :
                        p
                )
        )
    }

    // Afectan a TODOS los registrados (sin importar filtros)
    const eliminarTodos = () => {
        setListadoParticipantes([]);
    }

    const todosComprobados = () => {
        setListadoParticipantes(
            actuales => 
                actuales.map(
                    p => ({
                        ...p,
                       comprobado: true,
                    })
                )
        )
    }

    return (
        <>
            <Cabecera />
            <FormularioRegistro anadirParticipante={anadirParticipante} />
            <Contador 
                totalRegistrados={listadoParticipantes.length} 
                totalVisibles={participantesProcesados.length}
                hayFiltrosActivos={hayFiltrosActivos}
            />
            <FiltrosParticipantes 
                busqueda={busqueda}
                onBusquedaChange={setBusqueda}
                filtroEstado={filtroEstado}
                onFiltroEstadoChange={setFiltroEstado}
                orden={orden}
                onOrdenChange={setOrden}
                onRestablecer={restablecerFiltros}
            />
            <ListaParticipantes2
                participantes={participantesProcesados}
                titulo="Lista de Participantes"
                eliminarParticipante={eliminarParticipante}
                cambiarComprobado={cambiarComprobado}
                eliminarTodos={eliminarTodos}
                todosComprobados={todosComprobados}
            />
            <ListaParticipantes2
                participantes={listaParticipantesComprobados}
                titulo="Lista de Participantes Comprobados"
            />
        </>
    )
}

export default App2