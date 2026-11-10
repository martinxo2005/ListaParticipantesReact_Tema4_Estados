export const FiltrosParticipantes = ({
  busqueda,
  onBusquedaChange,
  filtroEstado,
  onFiltroEstadoChange,
  orden,
  onOrdenChange,
  onRestablecer
}) => {
  return (
    <div style={{ margin: "15px 0", padding: "12px", border: "1px solid #ccc", borderRadius: "6px" }}>
      <h4>Búsqueda, Filtros y Ordenación</h4>
      
      {/* Campo de búsqueda */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="busqueda"><strong>Buscar: </strong></label>
        <input
          id="busqueda"
          type="text"
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          placeholder="Nombre o correo..."
          style={{ padding: "5px", width: "220px" }}
        />
      </div>

      {/* Selector de estado y selector de ordenación */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label htmlFor="filtroEstado"><strong>Estado: </strong></label>
          <select
            id="filtroEstado"
            value={filtroEstado}
            onChange={(e) => onFiltroEstadoChange(e.target.value)}
            style={{ padding: "5px" }}
          >
            <option value="todos">Todos</option>
            <option value="comprobados">Comprobados</option>
            <option value="pendientes">Pendientes</option>
          </select>
        </div>

        <div>
          <label htmlFor="orden"><strong>Orden: </strong></label>
          <select
            id="orden"
            value={orden}
            onChange={(e) => onOrdenChange(e.target.value)}
            style={{ padding: "5px" }}
          >
            <option value="registro">Orden de registro</option>
            <option value="asc">Nombre A-Z</option>
            <option value="desc">Nombre Z-A</option>
          </select>
        </div>

        <button onClick={onRestablecer} style={{ padding: "5px 10px" }}>
          Restablecer filtros
        </button>
      </div>
    </div>
  );
};