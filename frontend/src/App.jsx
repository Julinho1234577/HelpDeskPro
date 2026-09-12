import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
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

            setSuccessMessage("Ticket creado correctamente.");

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

                {successMessage && (
                    <div className="message success">
                        {successMessage}
                    </div>
                )}

                {showForm && (
                    <form
                        className="form-container"
                        onSubmit={handleCreateTicket}
                    >
                        <div className="form-header">
                            <div>
                                <h3>Nuevo ticket</h3>

                                <p>
                                    Registra una nueva incidencia de soporte
                                    TI.
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

                {loading && (
                    <div className="message">
                        Cargando tickets...
                    </div>
                )}

                {error && (
                    <div className="message error">
                        {error}
                    </div>
                )}

                {!loading && !error && (
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

                                        <td>{ticket.title}</td>

                                        <td>{ticket.usuario}</td>

                                        <td>{ticket.categoria}</td>

                                        <td>{ticket.prioridad}</td>

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
                                            ).toLocaleDateString(
                                                "es-PE"
                                            )}
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