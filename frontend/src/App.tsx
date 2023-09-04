// Importação de bibliotecas e componentes
import './index.css';
import logo from '/logo.svg'
import React from 'react';
import { Layout} from 'antd';
import { Loop } from './components/Loop';


const { Content, Footer, Header } = Layout;

// Componente App
const App: React.FC = () => {
  /* const [searchTerm, setSearchTerm] = 'useState'<string>(''); */
  return (
    <>
    <Layout className='height-full'>
      <Header className='header-container'>
      <div className='flex'>
        <a href="#" target="_blank">
          <img src={logo} className="logo" alt="Logo" />
        </a>
      <h1 className="star-font">StarWars</h1>
      </div>
      {/* <HeaderBusca  setSearchTerm={setSearchTerm}/> */}
      <nav>
        <ul className='nav-menu'>
          <li>Página inicial</li>
          <li>Sobre</li>
        </ul>
      </nav>
      </Header>
      <Content>             
              <Loop />
      </Content>
    <Footer className='footer-container'>
              Desafio FullStack ©2023 Created by Ericsson Augusto
            </Footer>
    </Layout>
    
    
    </>
  );
};

export default App;
