
export const Participante = ({ participante, eliminarParticipante,cambiarComprobado }) => {


  return (
    <>
      <li>
        {participante.nombre} - {participante.email} -
        {
          participante.comprobado ? " Confirmado" : " Pendiente"
        }
        {cambiarComprobado &&
          <button onClick={()=> cambiarComprobado(participante.id)}>{participante.comprobado ? "Pasar a comprobar" : "Comprobado"}
          </button>
        }
        {eliminarParticipante &&
          <button onClick={() => eliminarParticipante(participante.id)}>
            Eliminar
          </button>}



      </li>
    </>
  )
}
