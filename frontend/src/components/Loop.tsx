import { useState, useEffect } from 'react';
import { Card, Col, Row, Input, Button } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import ReactLoading from 'react-loading';

// Interface para os personagens
interface Carregar {
  name: string;
  homeworld: string;
}
export function Loop() {
  const [loading, setLoading] = useState(true);
  const [personagens, setPersonagens] = useState<Carregar[]>([]);
  const [planetas, setPlanetas] = useState<{ [url: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);  // Estado para alternar entre mostrar todos e mostrar favoritos
  
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
  // Função para carregar personagens
  const loadPersonagens = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setPersonagens(prev => [...prev, ...data.results]);
    setLoading(false);
    for (const personagem of data.results) {
      fetchPlanetName(personagem.homeworld);
    }

    if (data.next) {
      loadPersonagens(data.next);
    }
  };
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
  useEffect(() => {
    setLoading(true);
    setPersonagens([]);
    const url = searchTerm
      ? `https://desafioswapi.onrender.com/ifaugusto/api?search=${searchTerm}`
      : 'https://desafioswapi.onrender.com/ifaugusto/api/';
    loadPersonagens(url);
  }, [searchTerm]);
  // Filtrar personagens se a opção "mostrarFavoritos" estiver ativada
  const personagensParaExibir = mostrarFavoritos ? personagens.filter(p => favoritos.includes(p.name)) : personagens;
  return (
    <div style={{ padding: 24, minHeight: 360 }}>
      
      <Input.Search
        placeholder="Buscar personagem"
        onSearch={value => setSearchTerm(value)}
        style={{ marginBottom: 16 }}
      />
      <div style={{ width: "100%", display: 'flex', padding: '2rem', justifyContent: 'center' }}>
      <Button style={{minWidth: "200px"}}  onClick={() => setMostrarFavoritos(!mostrarFavoritos)}>  {/* Botão para alternar entre mostrar todos e mostrar favoritos */}
        {mostrarFavoritos ? 'Mostrar Todos' : 'Mostrar Favoritos'} 
        <StarFilled style={{ color: 'gold', fontSize: '1em' }}/>
      </Button>
      </div>
      {loading ? (
      <div className='loading flex'>
        <span>Buscando dados no backend</span>

        <ReactLoading 
        type='spokes'
        color='#DDD' 
        height={'6%'} 
        width={'7%'} />
       
        </div>
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
                  title={favoritos.includes(personagem.name) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'} 
                  style={{ cursor: 'pointer', fontSize: '2em', padding: '8px' }}  // Ajustes de tamanho e espaçamento
                >
                  {favoritos.includes(personagem.name) ? <StarFilled style={{ color: 'gold' }} /> : <StarOutlined />}
                </span>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}