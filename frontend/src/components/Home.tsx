import { useState, useEffect } from 'react';
import { Card, Col, Row, Input, Button } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import ReactLoading from 'react-loading';

// Interface para os personagens
interface Carregar {
  name: string;
  homeworld: string;
}

// Cache global para personagens
const cache: { [key: string]: Carregar[] } = {};

export function Home() {
  const [loading, setLoading] = useState(true);
  const [personagens, setPersonagens] = useState<Carregar[]>([]);
  const [personagensFiltrados, setPersonagensFiltrados] = useState<Carregar[]>([]); // Novo estado para personagens filtrados
  const [planetas, setPlanetas] = useState<{ [url: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const favs = localStorage.getItem('favoritos');
    if (favs) {
      setFavoritos(JSON.parse(favs));
    }
  }, []);

  // Função para buscar o nome do planeta
  const fetchPlanetName = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setPlanetas(prev => ({ ...prev, [url]: data.name }));
  };

  // Carrega personagens da API
  const loadPersonagens = async (url: string) => {
    setLoading(true);

    if (cache['all']) {
      setPersonagens(cache['all']);
      setLoading(false);
      return;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data)) {
      setPersonagens(data);
      setLoading(false);
      cache['all'] = data;

      for (const personagem of data) {
        fetchPlanetName(personagem.homeworld);
      }
    }
  };

  // Efeito para filtrar personagens baseado no termo de busca
  useEffect(() => {
    if (!searchTerm) {
      setPersonagensFiltrados(personagens);
      return;
    }
    const filtrados = personagens.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setPersonagensFiltrados(filtrados);
  }, [searchTerm, personagens]);

  useEffect(() => {
    const url = 'https://desafioswapi.onrender.com/ifaugusto/api/';
    loadPersonagens(url);
  }, []);

  // Função para adicionar/remover favoritos
  const toggleFavorito = (name: string) => {
    let novosFavoritos: string[];
    if (favoritos.includes(name)) {
      novosFavoritos = favoritos.filter(fav => fav !== name);
    } else {
      novosFavoritos = [...favoritos, name];
    }
    setFavoritos(novosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
  };

  const personagensParaExibir = mostrarFavoritos ? personagensFiltrados.filter(p => favoritos.includes(p.name)) : personagensFiltrados;

  return (
    <>
      <div style={{ padding: 24, minHeight: 8, textAlign: 'center' }}>
        <Input.Search
          placeholder="Buscar personagem"
          onSearch={value => setSearchTerm(value)}
          style={{ marginBottom: 16 }}
        />
        <Button onClick={() => setMostrarFavoritos(!mostrarFavoritos)}>
          {mostrarFavoritos ? 'Mostrar Todos' : 'Mostrar Favoritos'}
          <StarFilled style={{ color: 'gold', fontSize: '1em' }} />
        </Button>
      </div>
      {loading ? (
        <ReactLoading type="spokes" color="#DDD" height={'7%'} width={'7%'} />
      ) : (
        <Row gutter={16}>
          {personagensParaExibir.map((personagem, i) => (
            <Col span={6} style={{ width: 300, padding: '24px' }} key={i}>
              <Card title={personagem.name} bordered={false}>
                <br />
                Planeta: {planetas[personagem.homeworld] || 'Carregando...'}
                <br />
                <span
                  onClick={() => toggleFavorito(personagem.name)}
                  style={{ cursor: 'pointer', fontSize: '2em', padding: '8px' }}
                >
                  {favoritos.includes(personagem.name) ? <StarFilled style={{ color: 'gold' }} /> : <StarOutlined />}
                </span>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
