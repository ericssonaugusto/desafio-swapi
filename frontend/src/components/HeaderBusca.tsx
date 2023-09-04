import { Input } from 'antd';

export function HeaderBusca(){
  const [buscador, setBuscador] = useState('');
  
  const enviaInputBusca = () => {
    setBuscador("Estes são os dados que vão do componente pai para o componente filho.");
  }
  return (

    <Input.Search
      placeholder="Buscar personagem"
      onSearch={value => enviaInputBusca(value)}
      style={{ marginBottom: 16 }}
    />
  );
}
