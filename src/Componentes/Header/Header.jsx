import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import logo from "../../Images/logo.png"; // Cambia la ruta si usas otra ubicación

const Header = () => {
  const navigate = useNavigate();

  const CerrarSesion = () => {
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="ProfeStats logo" className="logo" />
        <span className="brand-name">
          <span className="brand-light">Profe</span>
          <span className="brand-bold">Stats</span>
        </span>
      </div>
      <nav className="nav">
        <a href="/filtrogeneral">BUSCAR</a>
        <a href="/perfil">PERFIL</a>
      </nav>
      <button className="logout-btn" onClick={CerrarSesion}>CERRAR SESIÓN</button>
    </header>
  );
};

export default Header;