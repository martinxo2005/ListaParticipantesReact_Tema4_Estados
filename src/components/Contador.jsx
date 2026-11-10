const Contador = ({ totalRegistrados, totalVisibles, hayFiltrosActivos }) => {
  return (
    <div>
      <h3>Participantes ({totalRegistrados})</h3>
      {hayFiltrosActivos && (
        <p style={{ fontWeight: "bold", color: "#555" }}>
          Mostrando {totalVisibles} de {totalRegistrados} participantes
        </p>
      )}
    </div>
  );
};

export default Contador;