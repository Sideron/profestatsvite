import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Componentes/Header/Header.jsx";
import FondoDecorativo from "../../Componentes/Fondo/Fondo.jsx";
import profesores from "../../data/Profesores.json";
import cursosData from "../../data/Cursos.json";
import relaciones from "../../data/Relacion_Profesor_Curso.json";
import usuarios from "../../data/Usuarios.json";
import preguntas from "../../data/Preguntas.json";
import "./Evaluacion.css";

const Evaluacion = () => {
  const { teacherId } = useParams();
  const parsedProfesorId = parseInt(teacherId);

  const profesor = profesores.find((p) => p.teacher_id === parsedProfesorId);
  if (!profesor) return <div>Profesor no encontrado.</div>;

  const [curso, setCurso] = useState("");
  const [claridad, setClaridad] = useState("");
  const [ayuda, setAyuda] = useState("");
  const [facilidad, setFacilidad] = useState("");
  const [interes, setInteres] = useState("");
  const [recomienda, setRecomienda] = useState(null);
  const [asistencia, setAsistencia] = useState(null);
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [anonimo, setAnonimo] = useState(null);
  const [caracteristicas, setCaracteristicas] = useState([]);

  const cursosDelProfesor = relaciones
    .filter((rel) => rel.teacher_id === parsedProfesorId)
    .map((rel) => cursosData.find((c) => c.course_id === rel.course_id))
    .filter(Boolean);

  const opcionesCaracteristicas = [
    "Tiene buena disposición",
    "Responde dudas con claridad",
    "Motiva a los estudiantes",
    "Domina el curso",
    "Es empático",
    "Es puntual",
    "Es organizado",
    "Es accesible fuera de clase",
    "Hace clases dinámicas",
    "Explica con ejemplos claros",
    "Transmite seguridad en lo que enseña",
    "Hace seguimiento a los alumnos",
    "Se preocupa por el aprendizaje",
    "Fomenta la participación",
    "Promueve el pensamiento crítico",
    "Califica con justicia",
    "Da buena retroalimentación",
    "Las clases son excelentes",
    "Tomaría su clase otra vez",
    "Respetado por los estudiantes",
    "Es muy cómico"
  ];

  const descriptorClaridad = (v) =>
    ["Muy confuso", "Confuso", "Algo claro", "Bastante claro", "Súper claro"][v - 1] || "";

  const descriptorAyuda = (v) =>
    [
      "No ayuda nada",
      "Le tienes que rogar por algo de ayuda",
      "Si le pides ayuda, te la da",
      "Lo más probable es que te ayude",
      "Ayuda bastante"
    ][v - 1] || "";

  const descriptorFacilidad = (v) =>
    ["Muy difícil", "Difícil", "Lo usual", "Fácil", "Súper fácil"][v - 1] || "";

  const descriptorInteres = (v) =>
    ["Casi nada", "Poco interesado", "Más o menos interesado", "Interesado", "Súper interesado"][v - 1] || "";

  const calcularPromedio = (...valores) => {
    const nums = valores.map(Number).filter((v) => !isNaN(v));
    return nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2) : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cursoValido = cursosDelProfesor.some((c) => c.name === curso);
    if (!cursoValido) {
      alert("El curso seleccionado no pertenece al profesor.");
      return;
    }

    const calificacionGeneral = calcularPromedio(claridad, ayuda, facilidad);

    const usuario = anonimo
      ? {
          user_id: 1,
          username: "Alumno",
          email: "alumno@aloe.ulima.edu.pe",
          password: "123456",
          college_id: 1,
          image_url: require("../../Images/profileDefault.png")
        }
      : {
          user_id: "actual",
          username: "Usuario Actual",
          email: "usuario@ulima.edu.pe",
          image_url: "https://cris.ulima.edu.pe/files-asset/40822754/EEscobedo.jpg?w=320&f=webp"
        };

    const datos = {
      profesorId: parsedProfesorId,
      curso,
      claridad,
      ayuda,
      facilidad,
      calificacionGeneral,
      interes,
      recomienda,
      asistencia,
      calificacion,
      comentario,
      anonimo,
      caracteristicas,
      fecha: new Date().toISOString(),
      usuario
    };

    const reseñasGuardadas = JSON.parse(localStorage.getItem("reseñas")) || [];
    reseñasGuardadas.push(datos);
    localStorage.setItem("reseñas", JSON.stringify(reseñasGuardadas));

    alert("¡Gracias por tu evaluación!");

    setCurso("");
    setClaridad("");
    setAyuda("");
    setFacilidad("");
    setInteres("");
    setRecomienda(null);
    setAsistencia(null);
    setCalificacion("");
    setComentario("");
    setAnonimo(null);
    setCaracteristicas([]);
  };

  return (
    <div className="evaluacion-container">
      <h6>Evaluando a: {profesor.name}</h6>
      <br/>
      <h1>Elige tu curso</h1>
      <select
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        className="select"
      >
        <option value="">Selecciona un curso</option>
        {cursosDelProfesor.map((c) => (
          <option key={c.course_id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Claridad */}
      <div className="likert-row">
        <div className="likert-label">Claridad</div>
        <div className="likert-options">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setClaridad(n)}
              className={`btn ${claridad === n ? "selected" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="likert-description">{descriptorClaridad(claridad)}</div>
      </div>

      {/* Ayuda */}
      <div className="likert-row">
        <div className="likert-label">Ayuda</div>
        <div className="likert-options">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setAyuda(n)}
              className={`btn ${ayuda === n ? "selected" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="likert-description">{descriptorAyuda(ayuda)}</div>
      </div>

      {/* Facilidad */}
      <div className="likert-row">
        <div className="likert-label">Facilidad</div>
        <div className="likert-options">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setFacilidad(n)}
              className={`btn ${facilidad === n ? "selected" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="likert-description">{descriptorFacilidad(facilidad)}</div>
      </div>

      {/* Interés */}
      <div className="likert-row">
        <div className="likert-label">Tu interés en clase</div>
        <div className="likert-options">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setInteres(n)}
              className={`btn ${interes === n ? "selected" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="likert-description">{descriptorInteres(interes)}</div>
      </div>

      {/* Recomienda */}
      <div className="inline-row">
        <div className="inline-label">¿Lo recomiendas?</div>
        <div className="inline-options">
          {["Sí", "No"].map((op, i) => (
            <button
              key={i}
              onClick={() => setRecomienda(op)}
              className={`btn ${recomienda === op ? "selected" : ""}`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Asistencia */}
      <div className="inline-row">
        <div className="inline-label">Asistencia a clase</div>
        <div className="inline-options">
          {["Obligatoria", "No obligatoria"].map((op, i) => (
            <button
              key={i}
              onClick={() => setAsistencia(op)}
              className={`btn ${asistencia === op ? "selected" : ""}`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji rating */}
      <h2>¿Qué calificación le das al profesor?</h2>
      <div className="emoji-group">
        {[
          { label: "Excelente", emoji: "🤩" },
          { label: "Buena", emoji: "🙂" },
          { label: "Regular", emoji: "😐" },
          { label: "Mala", emoji: "🙁" },
        ].map(({ label, emoji }, i) => (
          <button
            key={i}
            onClick={() => setCalificacion(label)}
            className={`emoji-btn ${calificacion === label ? "selected" : ""}`}
          >
            <span className="emoji">{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Características */}
      <h2>¿Cuáles de estas frases describen mejor al profesor?</h2>
      <div className="checkbox-group">
        {opcionesCaracteristicas.map((carac, index) => {
          const selected = caracteristicas.includes(carac);
          return (
            <button
              key={index}
              className={`btn ${selected ? "selected" : ""}`}
              onClick={() => {
                setCaracteristicas((prev) =>
                  selected ? prev.filter((c) => c !== carac) : [...prev, carac]
                );
              }}
            >
              <input type="checkbox" value={carac} checked={selected} readOnly />
              {carac}
            </button>
          );
        })}
      </div>

      {/* Comentario */}
      <h2>Añadir un comentario (opcional)</h2>
      <textarea
        className="textarea"
        placeholder="Escribe un comentario..."
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        maxLength={300}
      />

      {/* Anonimato */}
      <h2>¿Quieres que tu calificación sea anónima?</h2>
      <div className="button-group">
        {["Sí", "No"].map((op, i) => (
          <button
            key={i}
            onClick={() => setAnonimo(op === "Sí")}
            className={`btn ${anonimo === (op === "Sí") ? "selected" : ""}`}
          >
            {op}
          </button>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Enviar evaluación
      </button>
    </div>
  );
};

export default Evaluacion;