
const FormularioRegistro = ({ anadirParticipante }) => {

  const nuevoParticipante = () => {
    anadirParticipante({
      // id: 10,
      nombre: document.querySelector("#nombre").value,
      email: document.querySelector("#email").value,
      comprobado: false,
    })
  }
  return (
    <>
      <label>Nombre:</label>
      <input type="text" id="nombre" />
      <label>Email:</label>
      <input type="email" id="email" />
      <button onClick={nuevoParticipante} >Registrar</button>
      <h3 id="mensaje"></h3>
    </>
  )
}

export default FormularioRegistro;