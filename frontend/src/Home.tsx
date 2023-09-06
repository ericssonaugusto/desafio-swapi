import { useState, useEffect } from 'react';
import { Card, Col, Row, Input, Button, message } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';


// Interface para os personagens
interface Personagem {
  name: string;
  homeworld: string;
}

export function Home() {
  const [personagens, setPersonagens] = useState<Personagem[]>([]); //armazena a lista de personagens
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);


  console.count('Renderizou')

  useEffect(()=> {
   fetch ('https://desafioswapi.onrender.com/ifaugusto/api/')
   .then( response => response.json())
   .then( data => {
    console.log("Dados recebidos: ", data); // Vamos ver o que recebemos
    setPersonagens(data)}) 
    
  },[])

 


  const verificarBusca = () => {
    if (personagens.some(p => p.name.toLowerCase().includes(busca.toLowerCase()))) {
        message.success('Personagem encontrado!');
    } else {
        message.error('Termo não encontrado.')
    }
  };



  

  // Carregar favoritos, se existir no localStorage
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem('favoritos');
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);
  
  const alternarFavoritos = (nome: string) => {
    const novosFavoritos = favoritos.includes(nome) ? favoritos.filter((fav) => fav !== nome) : [...favoritos, nome];
    setFavoritos(novosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
  };


   const personagensFiltrados = personagens.filter((personagem) => {
    if (mostrarFavoritos) {
      return favoritos.includes(personagem.name);
    }
    return personagem.name.toLowerCase().includes(busca.toLowerCase());
  });

  

  return (
    <div>
      <Button onClick={() => setMostrarFavoritos(!mostrarFavoritos)}>
          {mostrarFavoritos ? 'Mostrar Todos' : 'Mostrar Favoritos'}
          <StarFilled style={{ color: 'gold', fontSize: '1em' }} />
        </Button>

      
      

      <div style={{ padding: 60, textAlign: 'center'}}>
        <Input.Search
          placeholder="Buscar personagem"
          onSearch={(valor) => {
            if (valor.trim() === "") { // Verifica se a string está vazia
            message.warning('Você precisa digitar algo');     
          } else {
            setBusca(valor);
            verificarBusca();
          }
          }}
          style={{ marginBottom: 16, width: 500 }}/>
        
      </div>

        <Row gutter={16} style={{ marginBottom: 16, width: "90%", margin: "0 auto", paddingBottom: 100 }}>
          {personagensFiltrados.map((personagem, i) => (
            <Col span={6} style={{ width: 300, padding: '24px', }} key={i}>
              <Card style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 1px 20px 0px", textAlign: 'center', fontSize: 12}} title={personagem.name}>
                <span
                  onClick={() => alternarFavoritos(personagem.name)}
                  style={{ cursor: 'pointer', fontSize: '2em', padding: '8px' }}
                >
                  { favoritos.includes(personagem.name) ? <StarFilled style={{ color: 'gold' }} /> : <StarOutlined />}
                </span>
              </Card>
            </Col>
          ))}
        </Row>
    </div>
  );
}
