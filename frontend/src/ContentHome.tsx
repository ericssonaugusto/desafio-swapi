import { useEffect, useContext } from "react";
import { Card, Col, Row } from "antd";
import { StarFilled, StarOutlined, SearchOutlined } from "@ant-design/icons";
import { AplicationContext } from "./contexts/AplicationContext";

// Interface para os personagens
export interface Personagem {
  name: string;
  homeworld: string;
}

export function ContentHome() {
  const {
    personagens,
    setPersonagens,
    favoritos,
    setFavoritos,
    mostrarFavoritos,
    setMostrarFavoritos,
    busca,
  } = useContext(AplicationContext);

  useEffect(() => {
    fetch("https://desafioswapi.onrender.com/ifaugusto/api/")
      .then((response) => response.json())
      .then((data) => {
        setPersonagens(data);
      });
  }, []);

  // Carregar favoritos, se existir no localStorage
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem("favoritos");
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  const alternarFavoritos = (nome: string) => {
    const novosFavoritos = favoritos.includes(nome)
      ? favoritos.filter((fav: any) => fav !== nome)
      : [...favoritos, nome];
    setFavoritos(novosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
  };

  const personagensFiltrados = personagens.filter((personagem: Personagem) => {
    if (mostrarFavoritos) {
      return favoritos.includes(personagem.name);
    }
    // parte buscar
    if (personagem.name.toLowerCase().includes(busca.toLowerCase())) {
      return personagem;
    }
  });
  useEffect(() => {
    const teclaPressionada = (e: KeyboardEvent) => {
      if (
        (e.key === "Escape" && favoritos.length === 0) ||
        personagensFiltrados.length === 0
      ) {
        setMostrarFavoritos();
      }
    };

    window.addEventListener("keydown", teclaPressionada);
    return () => window.removeEventListener("keydown", teclaPressionada);
  }, [favoritos]);
  return (
    <div>
      <div style={{ padding: 60, textAlign: "center" }}></div>

      <Row
        gutter={16}
        style={{
          marginBottom: 16,
          width: "90%",
          margin: "0 auto",
          paddingBottom: 100,
        }}
      >
        {personagensFiltrados.length === 0 ? (
          <div className="erro-proposital">
            {busca ? (
              <SearchOutlined style={{ fontSize: "4rem" }} />
            ) : (
              <StarOutlined style={{ fontSize: "4rem" }} />
            )}
            {busca ? (
              <p>Desculpe, isso não foi encontrado! </p>
            ) : (
              <p>Você não possui favoritos</p>
            )}

            <span>Pressione [ESC] para retornar</span>
          </div>
        ) : (
          ""
        )}
        {personagensFiltrados.map((personagem: Personagem, i: number) => (
          <Col span={6} style={{ width: 300, padding: "24px" }} key={i}>
            <Card
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 20px 0px",
                textAlign: "center",
                fontSize: 12,
              }}
              title={personagem.name}
            >
              <span
                onClick={() => alternarFavoritos(personagem.name)}
                style={{ cursor: "pointer", fontSize: "2em", padding: "8px" }}
              >
                {favoritos.includes(personagem.name) ? (
                  <StarFilled style={{ color: "gold" }} />
                ) : (
                  <StarOutlined />
                )}
              </span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
