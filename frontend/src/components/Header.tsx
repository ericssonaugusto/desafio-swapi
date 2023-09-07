import logo from '../../public/logo.png'
import { Button, Modal, Input, Layout } from 'antd'
import User from '../components/User'
import { StarFilled, SearchOutlined, UserOutlined  } from '@ant-design/icons'
import React, {useState, useContext} from 'react'
import { AplicationContext } from '../contexts/AplicationContext'

const { Header } = Layout;

export function HeaderComponent(){
  const { personagens, 
          setPersonagens,
          favoritos, 
          setFavoritos,
          mostrarFavoritos, 
          setMostrarFavoritos,
          busca, 
          setBusca } = useContext(AplicationContext)

   
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  };
  const handleCancel = () => {
    setIsModalOpen(false)
  };


    return (
        <AplicationContext.Provider 
          value={{ personagens, 
                    setPersonagens, 
                    favoritos, 
                    setFavoritos, 
                    mostrarFavoritos, 
                    setMostrarFavoritos,
                    busca, 
                    setBusca 
                  }}>
    
            <Header className='header-container'>
              <div className='flex'>
                <a className='area-logo' href="/" target="_blank">
                  <img src={logo} className="logo" alt="Logo" />    
                  <div style={{fontSize: "1.4  rem"}} className='flex'><h1 className="titulo">API </h1> <span>swapi.dev</span> </div>   
                </a>
              </div>
              <div style={{position: 'relative'}}>
              <Input
                size="large"  
                placeholder="Buscar personagem"
                prefix={<SearchOutlined />}
                onChange={(event) => {   
                  setBusca(event.target.value)           
                }}
                onKeyDown={(event)=> {
                  if (event.key === 'Escape')
                  {setBusca('')}
                }}
                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>)=> {
                  if (event.key === 'Escape')
                  {(event.target as HTMLInputElement).value =''}
                }}
                style={{ width: 500 }}/>  
                <small className={`esc-busca ${busca ? 'mostrar' : ''}`}>[ ESC ] para limpar</small>
                </div>
                 


               <div style={{display: 'flex', alignItems: 'center', gap: '3rem'}}>
              <Button size="large" type="link" className='mostrar-favoritos' onClick={() => setMostrarFavoritos(!mostrarFavoritos)}>
                {mostrarFavoritos ? 'Mostrar Todos' : 'Mostrar Favoritos'}
                <StarFilled style={{ color: 'gold', fontSize: '1em', backgroundColor: 'transparent' }} />
               
              </Button>

              <Button ghost={true} size="large" type="primary" style={{color: "#FFF"}}  onClick={showModal}>
                Login - Cadastro
                 <UserOutlined />
              </Button>
              <Modal title="Usuário" footer={null} open={isModalOpen} onCancel={handleCancel}>
                
                <User/>
              </Modal>
              </div>
            </Header>
            </AplicationContext.Provider>
    )
}