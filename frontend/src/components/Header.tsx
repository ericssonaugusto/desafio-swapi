import logo from "../../public/logo.png";
import { Button, Input, Layout, Badge } from "antd";
import { StarFilled, SearchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import { AplicationContext } from "../contexts/AplicationContext";
import { UserAuth } from "./UserAuth";

const { Header } = Layout;

export function HeaderComponent() {
  const {
    favoritos,
    mostrarFavoritos,
    setMostrarFavoritos,
    busca,
    setBusca,
    isMobile,
    setIsMobile,
  } = useContext(AplicationContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const limparBuscaMobile = (e:any) => {
    if (isMobile && !e.target.closest(".ant-input")) {
      setBusca("");
    }
  };

  return (
    <Header className="header-container" onClick={limparBuscaMobile}>
      <div className="flex">
        <a className="area-logo" href="/" target="_blank">
          <img src={logo} className="logo" alt="Logo" />
          <div style={{ fontSize: "1.4rem" }} className="flex">
            <h1 className="titulo">API</h1> <span>swapi.dev</span>
          </div>
        </a>
      </div>
      <div style={{ position: "relative" }}>
        <Input
          size="large"
          placeholder="Buscar personagem"
          prefix={<SearchOutlined />}
          onChange={(event) => setBusca(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setBusca("");
            }
          }}
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Escape") {
              (event.target as HTMLInputElement).value = "";
            }
          }}
          style={{ width: 300 }}
        />
        <small className={`esc-busca ${busca ? "mostrar" : ""}`}>
         {!isMobile ? "[ ESC ] para limpar" : "" } 
        </small>
      </div>
      <div className="area-favorito-login">
        <Button
          size="large"
          type="link"
          className="mostrar-favoritos"
          onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
        >
          {mostrarFavoritos ? "Mostrar Todos" : "Mostrar Favoritos"}
          <Badge size="small" count={favoritos.length}>
            <StarFilled
              style={{
                color: "gold",
                fontSize: "2em",
                backgroundColor: "transparent",
              }}
            />
          </Badge>
        </Button>
        <UserAuth />
      </div>
    </Header>
  );
}
