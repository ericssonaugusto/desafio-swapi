import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { AplicationContext } from "../contexts/AplicationContext";

interface DadosFormulario {
  email: string;
  senha: string;
  perguntaSecreta: string;
  respostaSecreta: string;
}

const User: React.FC = () => {
  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({
    email: "",
    senha: "",
    perguntaSecreta: "",
    respostaSecreta: "",
  });
  const [estaCadastrando, setEstaCadastrando] = useState(false);
  const { estaLogado, setEstaLogado } = useContext(AplicationContext);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dadosCadastrados, setDadosCadastrados] =
    useState<DadosFormulario | null>(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("userData");
    if (dadosSalvos) {
      setDadosCadastrados(JSON.parse(dadosSalvos));
    }
  }, []);

  const limparFormulario = () => {
    setDadosFormulario({
      email: "",
      senha: "",
      perguntaSecreta: "",
      respostaSecreta: "",
    });
  };

  const validarSenha = (senha: string) => {
    return senha.length >= 6;
  };

  const manipularEnvioFormulario = () => {
    const { email, senha } = dadosFormulario;

    if (estaCadastrando) {
      if (dadosCadastrados && dadosCadastrados.email === email) {
        message.error("Esse usuário já possui cadastro. Faça login.");
        return;
      }

      if (validarSenha(senha)) {
        localStorage.setItem("userData", JSON.stringify(dadosFormulario));
        message.success("Cadastro efetuado com sucesso!");
        limparFormulario();
        setEstaCadastrando(false);
        setDadosCadastrados(dadosFormulario);
      } else {
        message.error("A senha deve ter pelo menos 6 caracteres.");
      }
    } else {
      if (!estaLogado) {
        if (dadosCadastrados) {
          const { email: emailCadastrado, senha: senhaCadastrada } =
            dadosCadastrados;
          if (email === emailCadastrado && senha === senhaCadastrada) {
            message.success("Login efetuado com sucesso!");
            setEstaLogado(true);
            limparFormulario();
          } else {
            message.error(
              "Usuário ou senha incorretos. Por favor, tente novamente."
            );
          }
        } else {
          message.error("Usuário não encontrado. Por favor, cadastre-se.");
        }
      }
    }
  };

  const fazerLogout = () => {
    setEstaLogado(false);
    message.success("Você saiu com sucesso!");
    window.location.reload();
  };

  const abrirModalEsqueciSenha = () => {
    setModalVisivel(true);
  };
  const verificarRespostaSecreta = () => {
    if (dadosCadastrados) {
      const { respostaSecreta, senha } = dadosCadastrados;
      if (dadosFormulario.respostaSecreta === respostaSecreta) {
        message.success(`Sua senha foi recuperada: ${senha}`);
        setModalVisivel(false);
      } else {
        message.error("Resposta incorreta.");
      }
    }
  };

  return (
    <>
      <Form
        style={{ width: "300px", margin: "10% auto", textAlign: "center" }}
        onFinish={manipularEnvioFormulario}
      >
        <Form.Item label="E-mail">
          <Input
            type="email"
            value={dadosFormulario.email}
            onChange={(e) =>
              setDadosFormulario({ ...dadosFormulario, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Senha">
          <Input.Password
            value={dadosFormulario.senha}
            onChange={(e) =>
              setDadosFormulario({ ...dadosFormulario, senha: e.target.value })
            }
          />
        </Form.Item>
        {estaCadastrando && (
          <>
            <Form.Item label="Pergunta Secreta">
              <Input
                value={dadosFormulario.perguntaSecreta}
                onChange={(e) =>
                  setDadosFormulario({
                    ...dadosFormulario,
                    perguntaSecreta: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Resposta Secreta">
              <Input
                value={dadosFormulario.respostaSecreta}
                onChange={(e) =>
                  setDadosFormulario({
                    ...dadosFormulario,
                    respostaSecreta: e.target.value,
                  })
                }
              />
            </Form.Item>
          </>
        )}
        <Button
          type="primary"
          htmlType="submit"
          style={estaLogado ? { backgroundColor: "red" } : {}}
          onClick={estaLogado ? fazerLogout : undefined}
        >
          {estaLogado ? "Sair" : estaCadastrando ? "Cadastrar" : "Fazer Login"}
        </Button>
        <div style={{ marginTop: "10px" }}>
          {!estaLogado && (
            <>
              <a onClick={() => setEstaCadastrando(!estaCadastrando)}>
                {estaCadastrando ? "Já possuo cadastro" : "Desejo me cadastrar"}
              </a>
              <br />
              {!estaCadastrando && (
                <a onClick={abrirModalEsqueciSenha}>Esqueci a senha</a>
              )}
            </>
          )}
        </div>
      </Form>
      <Modal
        title="Responda à pergunta secreta para recuperar sua senha"
        visible={modalVisivel}
        onCancel={() => setModalVisivel(false)}
        onOk={verificarRespostaSecreta}
      >
        <p>{dadosCadastrados?.perguntaSecreta}</p>
        <Input
          placeholder="Sua resposta"
          value={dadosFormulario.respostaSecreta}
          onChange={(e) =>
            setDadosFormulario({
              ...dadosFormulario,
              respostaSecreta: e.target.value,
            })
          }
        />
      </Modal>
    </>
  );
};

export default User;
