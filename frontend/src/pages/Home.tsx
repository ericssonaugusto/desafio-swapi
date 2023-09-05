import { useState, useEffect } from 'react';
import { Card, Col, Row, Input, Button, message } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import ReactLoading from 'react-loading';

// Interface para os personagens
interface Personagem {
  name: string;
  homeworld: string;
}

export function Home() {

  const [personagens, setPersonagens] = useState<Personagem[]>([]); //armazena a lista de personagens
  const [carregando, setCarregando] = useState(true); // 
  
  useEffect(() => {
    const chamandoPersonagens =async () => {  
    try {
    setCarregando(true);  
    const urlAPI = 'https://desafioswapi.onrender.com/ifaugusto/api/'
    const response = await fetch(urlAPI);
    const data = await response.json()
    setPersonagens(data)
    } catch (erro) {
        console.error('Houve um erro ao buscar os personagens:', erro);
      } finally {
        // Isso será executado independentemente do sucesso ou falha da chamada à API
        setCarregando(false);
    }
  }
    chamandoPersonagens()
  },[])  
  



/*


        if (data && Array.isArray(data) && data.length > 0) { // Verifica se os dados são válidos
          setPersonagens(data);
          setCarregando(false); // Só é executado se a API trouxer dados válidos
        }
      } catch (erro) {
        console.error('Houve um erro ao buscar os personagens:', erro);
      }

*/

  
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem('favoritos');
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  const verificarBusca = () => {
    if (personagens.some(p => p.name.toLowerCase().includes(busca.toLowerCase()))) {
      message.success('Personagem encontrado!');
    } else {
      message.error('Termo não encontrado.');
      setTimeout(() => {
        setBusca('');
      }, 2000);
    }
  };

  const alternarFavoritos = (nome: string) => {
    const novosFavoritos = favoritos.includes(nome) ? favoritos.filter((fav) => fav !== nome) : [...favoritos, nome];
    setFavoritos(novosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
  };

  const personagensFiltrados = personagens.filter((personagem) => personagem.name.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div>
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Input.Search
          placeholder="Buscar personagem"
          onSearch={(valor) => {
            setBusca(valor);
            verificarBusca();
          }}
          style={{ marginBottom: 16 }}
        />
        <Button onClick={() => setMostrarFavoritos(!mostrarFavoritos)}>
          {mostrarFavoritos ? 'Mostrar Todos' : 'Mostrar Favoritos'}
          <StarFilled style={{ color: 'gold', fontSize: '1em' }} />
        </Button>
      </div>
      { carregando ? (
        <ReactLoading type="spokes" color="#DDD" height={'7%'} width={'7%'} />
      ) : (
        <Row gutter={16}>
          {personagensFiltrados.map((personagem, i) => (
            <Col span={6} style={{ width: 300, padding: '24px' }} key={i}>
              <Card title={personagem.name}>
                <span
                  onClick={() => alternarFavoritos(personagem.name)}
                  style={{ cursor: 'pointer', fontSize: '2em', padding: '8px' }}
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
