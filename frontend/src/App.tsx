// Importação de bibliotecas e componentes
import './global.css';
import logo from '/logo.png'
import { Button, Modal, Layout} from 'antd';
import { Home } from './Home';
import User from './components/User';
import React, {useState} from 'react';



const { Content, Footer, Header } = Layout;

// Componente App
const App: React.FC = () => {
  /* const [searchTerm, setSearchTerm] = 'useState'<string>(''); */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <Layout className='height-full'>
      <Header className='header-container'>
      <div className='flex'>
      <a className='area-logo' href="/" target="_blank">
      <img src={logo} className="logo" alt="Logo" />    
      <div className='flex'><h1 className="titulo">API </h1> <span>swapi.dev</span> </div>   
      
      </a>
      </div>
      <Button type="primary" onClick={showModal}>
        Login - Cadastro
      </Button>
      <Modal title="Usuário" footer={null} open={isModalOpen} onCancel={handleCancel}>
        <User/>
      </Modal>

      </Header>
      <Content>
      <Home/>  
      </Content>
    <Footer className='footer-container'>
              Desafio FullStack ©2023 Created by Ericsson Augusto
    </Footer>
    </Layout>
    
    
    </>
  );
};

export default App;
