// Importação de bibliotecas e componentes
import './global.css'
import { Layout, FloatButton} from 'antd'
import { ContentHome, Personagem } from './ContentHome'
import React, {useState} from 'react'
import { AplicationContext } from './contexts/AplicationContext'
import { HeaderComponent } from './components/Header'


const { Content, Footer } = Layout;

// Componente App
const App: React.FC = () => {

// States do Home
  const [personagens, setPersonagens] = useState<Personagem[]>([]) //armazena a lista de personagens

  const [favoritos, setFavoritos] = useState<string[]>([])
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)
  const [busca, setBusca] = useState('')
  const [estaLogado, setEstaLogado] = useState(false);

  return (
    
     <AplicationContext.Provider 
          value={{ personagens, 
                    setPersonagens, 
                    favoritos, 
                    setFavoritos, 
                    mostrarFavoritos, 
                    setMostrarFavoritos,
                    busca, 
                    setBusca,
                    estaLogado, 
                    setEstaLogado
                  }}>
          <Layout className='height-full'>
            
            <HeaderComponent/>
            <Content>
               <ContentHome/>  
            </Content>
          
          <Footer className='footer-container'>
                    Desafio FullStack ©2023 Created by Ericsson Augusto
          </Footer>

          </Layout>
    <FloatButton.Group shape="circle">
      <FloatButton.BackTop visibilityHeight={50} />
    </FloatButton.Group>
    
    </AplicationContext.Provider>
  );
};

export default App
