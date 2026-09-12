import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const [ticketHistory, setTicketHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const [newStatus, setNewStatus] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [statusSuccess, setStatusSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    categoryId: "",
    priorityId: "",
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadTickets = async () => {
    try {
      setLoading(true);

      const response = await api.get("/Tickets");

      setTickets(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleViewTicket = async (id) => {
    try {
      setDetailLoading(true);
      setDetailError("");

      setHistoryLoading(true);
      setHistoryError("");

      setStatusError("");
      setStatusSuccess("");
      setNewStatus("");

      setSelectedTicket(null);
      setTicketHistory([]);

      // Obtener detalle
      const ticketResponse = await api.get(`/Tickets/${id}`);

      setSelectedTicket(ticketResponse.data);

      // Obtener historial
      try {
        const historyResponse = await api.get(
          `/Tickets/${id}/history`
        );

        setTicketHistory(historyResponse.data);
      } catch (historyErr) {
        console.error(historyErr);

        setHistoryError(
          "No se pudo cargar el historial del ticket."
        );
      }
    } catch (err) {
      console.error(err);

      setDetailError(
        "No se pudo cargar el detalle del ticket."
      );
    } finally {
      setDetailLoading(false);
      setHistoryLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedTicket || !newStatus) {
      return;
    }

    try {
      setStatusUpdating(true);
      setStatusError("");
      setStatusSuccess("");

      await api.put(
        `/Tickets/${selectedTicket.id}/status`,
        {
          status: newStatus,
          userId: 1,
        }
      );

      setStatusSuccess(
        "Estado del ticket actualizado correctamente."
      );

      // Recargar detalle e historial
      await handleViewTicket(selectedTicket.id);

      // Actualizar listado
      await loadTickets();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setStatusError(err.response.data.message);
      } else {
        setStatusError(
          "No se pudo actualizar el estado del ticket."
        );
      }
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
    setTicketHistory([]);

    setDetailError("");
    setHistoryError("");

    setNewStatus("");
    setStatusError("");
    setStatusSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    setSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        userId: Number(formData.userId),
        categoryId: Number(formData.categoryId),
        priorityId: Number(formData.priorityId),
      };

      await api.post("/Tickets", data);

      setSuccessMessage(
        "Ticket creado correctamente."
      );

      setFormData({
        title: "",
        description: "",
        userId: "",
        categoryId: "",
        priorityId: "",
      });

      setShowForm(false);

      await loadTickets();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError(
          "No se pudo crear el ticket. Verifica los datos."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app">

      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="header">
        <div>
          <h1>HelpDeskPro</h1>
          <p>Sistema de Gestión de Incidencias TI</p>
        </div>

        <div className="header-user">
          <span>Administrador</span>
          <small>ADMIN</small>
        </div>
      </header>

      <main className="container">

        {/* ============================= */}
        {/* ENCABEZADO */}
        {/* ============================= */}

        <div className="page-header">
          <div>
            <h2>Tickets</h2>
            <p>
              Administración y seguimiento de incidencias
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(true);
              setFormError("");
              setSuccessMessage("");
            }}
          >
            + Nuevo ticket
          </button>
        </div>

        {/* ============================= */}
        {/* MENSAJE DE ÉXITO */}
        {/* ============================= */}

        {successMessage && (
          <div className="message success">
            {successMessage}
          </div>
        )}

        {/* ============================= */}
        {/* FORMULARIO NUEVO TICKET */}
        {/* ============================= */}

        {showForm && (
          <form
            className="form-container"
            onSubmit={handleCreateTicket}
          >
            <div className="form-header">
              <div>
                <h3>Nuevo ticket</h3>

                <p>
                  Registra una nueva incidencia de soporte TI.
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="message error">
                {formError}
              </div>
            )}

            <div className="form-grid">

              {/* TÍTULO */}

              <div className="form-group">
                <label>Título</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej. No puedo acceder al correo"
                  required
                />
              </div>

              {/* USUARIO */}

              <div className="form-group">
                <label>Usuario</label>

                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Seleccionar usuario
                  </option>

                  <option value="4">
                    Juan Usuario
                  </option>

                  <option value="5">
                    Ana Usuario
                  </option>
                </select>
              </div>

              {/* CATEGORÍA */}

              <div className="form-group">
                <label>Categoría</label>

                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Seleccionar categoría
                  </option>

                  <option value="1">
                    Hardware
                  </option>

                  <option value="2">
                    Software
                  </option>

                  <option value="3">
                    Redes
                  </option>

                  <option value="4">
                    Accesos
                  </option>

                  <option value="5">
                    Correo
                  </option>

                  <option value="6">
                    Impresoras
                  </option>
                </select>
              </div>

              {/* PRIORIDAD */}

              <div className="form-group">
                <label>Prioridad</label>

                <select
                  name="priorityId"
                  value={formData.priorityId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Seleccionar prioridad
                  </option>

                  <option value="1">
                    BAJA
                  </option>

                  <option value="2">
                    MEDIA
                  </option>

                  <option value="3">
                    ALTA
                  </option>

                  <option value="4">
                    CRITICA
                  </option>
                </select>
              </div>

              {/* DESCRIPCIÓN */}

              <div className="form-group full-width">
                <label>Descripción</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe detalladamente el problema..."
                  required
                ></textarea>
              </div>

            </div>

            {/* ACCIONES DEL FORMULARIO */}

            <div className="form-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Creando..."
                  : "Crear ticket"}
              </button>

            </div>
          </form>
        )}

        {/* ============================= */}
        {/* CARGANDO DETALLE */}
        {/* ============================= */}

        {detailLoading && (
          <div className="message">
            Cargando detalle del ticket...
          </div>
        )}

        {/* ============================= */}
        {/* ERROR DETALLE */}
        {/* ============================= */}

        {detailError && (
          <div className="message error">
            {detailError}
          </div>
        )}

        {/* ============================= */}
        {/* DETALLE DEL TICKET */}
        {/* ============================= */}

        {selectedTicket && (
          <div className="form-container">

            <div className="form-header">
              <div>
                <h3>Detalle del ticket</h3>

                <p>
                  Información completa de la incidencia seleccionada.
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={handleCloseDetail}
              >
                ✕
              </button>
            </div>

            <div className="form-grid">

              {/* TICKET */}

              <div className="form-group">
                <label>Ticket</label>

                <input
                  type="text"
                  value={selectedTicket.ticketNumber}
                  readOnly
                />
              </div>

              {/* ESTADO */}

              <div className="form-group">
                <label>Estado</label>

                <input
                  type="text"
                  value={selectedTicket.status}
                  readOnly
                />
              </div>

              {/* TÍTULO */}

              <div className="form-group">
                <label>Título</label>

                <input
                  type="text"
                  value={selectedTicket.title}
                  readOnly
                />
              </div>

              {/* USUARIO */}

              <div className="form-group">
                <label>Usuario</label>

                <input
                  type="text"
                  value={selectedTicket.usuario}
                  readOnly
                />
              </div>

              {/* CATEGORÍA */}

              <div className="form-group">
                <label>Categoría</label>

                <input
                  type="text"
                  value={selectedTicket.categoria}
                  readOnly
                />
              </div>

              {/* PRIORIDAD */}

              <div className="form-group">
                <label>Prioridad</label>

                <input
                  type="text"
                  value={selectedTicket.prioridad}
                  readOnly
                />
              </div>

              {/* DESCRIPCIÓN */}

              <div className="form-group full-width">
                <label>Descripción</label>

                <textarea
                  value={selectedTicket.description}
                  rows="6"
                  readOnly
                ></textarea>
              </div>

              {/* FECHA CREACIÓN */}

              <div className="form-group">
                <label>Fecha de creación</label>

                <input
                  type="text"
                  value={new Date(
                    selectedTicket.createdAt
                  ).toLocaleString("es-PE")}
                  readOnly
                />
              </div>

              {/* ÚLTIMA ACTUALIZACIÓN */}

              <div className="form-group">
                <label>Última actualización</label>

                <input
                  type="text"
                  value={
                    selectedTicket.updatedAt
                      ? new Date(
                          selectedTicket.updatedAt
                        ).toLocaleString("es-PE")
                      : "Sin actualización"
                  }
                  readOnly
                />
              </div>

              {/* RESOLUCIÓN */}

              <div className="form-group">
                <label>Fecha de resolución</label>

                <input
                  type="text"
                  value={
                    selectedTicket.resolvedAt
                      ? new Date(
                          selectedTicket.resolvedAt
                        ).toLocaleString("es-PE")
                      : "Pendiente"
                  }
                  readOnly
                />
              </div>

              {/* CIERRE */}

              <div className="form-group">
                <label>Fecha de cierre</label>

                <input
                  type="text"
                  value={
                    selectedTicket.closedAt
                      ? new Date(
                          selectedTicket.closedAt
                        ).toLocaleString("es-PE")
                      : "Pendiente"
                  }
                  readOnly
                />
              </div>

            </div>

            {/* ============================= */}
            {/* ACTUALIZAR ESTADO */}
            {/* ============================= */}

            <div className="status-update">

              <div className="status-update-header">
                <div>
                  <h4>Actualizar estado</h4>

                  <p>
                    Cambia el estado actual del ticket.
                  </p>
                </div>
              </div>

              <div className="status-update-controls">

                <select
                  value={newStatus}
                  onChange={(e) => {
                    setNewStatus(e.target.value);
                    setStatusError("");
                    setStatusSuccess("");
                  }}
                >
                  <option value="">
                    Seleccionar nuevo estado
                  </option>

                  <option value="NUEVO">
                    Nuevo
                  </option>

                  <option value="ASIGNADO">
                    Asignado
                  </option>

                  <option value="EN_PROCESO">
                    En proceso
                  </option>

                  <option value="EN_ESPERA">
                    En espera
                  </option>

                  <option value="RESUELTO">
                    Resuelto
                  </option>

                  <option value="CERRADO">
                    Cerrado
                  </option>

                  <option value="REABIERTO">
                    Reabierto
                  </option>
                </select>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleUpdateStatus}
                  disabled={
                    !newStatus || statusUpdating
                  }
                >
                  {statusUpdating
                    ? "Actualizando..."
                    : "Actualizar estado"}
                </button>

              </div>

              {/* ERROR */}

              {statusError && (
                <div className="message error">
                  {statusError}
                </div>
              )}

              {/* ÉXITO */}

              {statusSuccess && (
                <div className="message success">
                  {statusSuccess}
                </div>
              )}

            </div>

            {/* ============================= */}
            {/* BOTÓN CERRAR DETALLE */}
            {/* ============================= */}

            <div className="form-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={handleCloseDetail}
              >
                Cerrar detalle
              </button>

            </div>

            {/* ============================= */}
            {/* HISTORIAL DEL TICKET */}
            {/* ============================= */}

            <div className="history-container">

              <div className="form-header">
                <div>
                  <h3>Historial del ticket</h3>

                  <p>
                    Registro de cambios realizados en la incidencia.
                  </p>
                </div>
              </div>

              {/* CARGANDO HISTORIAL */}

              {historyLoading && (
                <div className="message">
                  Cargando historial...
                </div>
              )}

              {/* ERROR HISTORIAL */}

              {historyError && (
                <div className="message error">
                  {historyError}
                </div>
              )}

              {/* SIN HISTORIAL */}

              {!historyLoading &&
                !historyError &&
                ticketHistory.length === 0 && (
                  <div className="message">
                    Este ticket todavía no tiene historial.
                  </div>
                )}

              {/* TABLA HISTORIAL */}

              {!historyLoading &&
                !historyError &&
                ticketHistory.length > 0 && (

                  <div className="table-container">

                    <table>

                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Usuario</th>
                          <th>Acción</th>
                          <th>Valor anterior</th>
                          <th>Nuevo valor</th>
                        </tr>
                      </thead>

                      <tbody>

                        {ticketHistory.map((item) => (

                          <tr key={item.id}>

                            <td>
                              {new Date(
                                item.createdAt
                              ).toLocaleString("es-PE")}
                            </td>

                            <td>
                              {item.usuario}
                            </td>

                            <td>
                              {item.action}
                            </td>

                            <td>
                              {item.oldValue || "-"}
                            </td>

                            <td>
                              <strong>
                                {item.newValue || "-"}
                              </strong>
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                )}

            </div>

          </div>
        )}

        {/* ============================= */}
        {/* CARGANDO LISTADO */}
        {/* ============================= */}

        {loading && (
          <div className="message">
            Cargando tickets...
          </div>
        )}

        {/* ============================= */}
        {/* ERROR LISTADO */}
        {/* ============================= */}

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        {/* ============================= */}
        {/* LISTADO DE TICKETS */}
        {/* ============================= */}

        {!loading &&
          !error &&
          !selectedTicket && (

            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>Ticket</th>
                    <th>Título</th>
                    <th>Usuario</th>
                    <th>Categoría</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>

                </thead>

                <tbody>

                  {tickets.map((ticket) => (

                    <tr key={ticket.id}>

                      <td>
                        <strong>
                          {ticket.ticketNumber}
                        </strong>
                      </td>

                      <td>
                        {ticket.title}
                      </td>

                      <td>
                        {ticket.usuario}
                      </td>

                      <td>
                        {ticket.categoria}
                      </td>

                      <td>
                        {ticket.prioridad}
                      </td>

                      <td>

                        <span
                          className={`status ${ticket.status
                            .toLowerCase()
                            .replace("_", "-")}`}
                        >
                          {ticket.status}
                        </span>

                      </td>

                      <td>
                        {new Date(
                          ticket.createdAt
                        ).toLocaleDateString("es-PE")}
                      </td>

                      <td>

                        <button
                          className="btn-secondary"
                          onClick={() =>
                            handleViewTicket(ticket.id)
                          }
                        >
                          Ver
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </main>
    </div>
  );
}

export default App;