import { useContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, Badge } from "antd";
import { AplicationContext } from "../contexts/AplicationContext";
import { auth } from "../services/firebase";

export function UserAuth() {
  const { user, setUser } = useContext(AplicationContext);

  useEffect(() => {
    const verificadorLogin = onAuthStateChanged(auth, (usuarioAutenticado) => {
      setUser(usuarioAutenticado);
    });

    return () => {
      verificadorLogin();
    };
  }, [setUser]);

  const propsBadge =
    user && user.displayName ? { text: "Sair", color: "red" } : {};

  function handleLognInLogOut() {
    if (!user) {
      const provedorGoogle = new GoogleAuthProvider();

      signInWithPopup(auth, provedorGoogle)
        .then((resultado) => {
          setUser(resultado.user);
        })
        .catch((erro) => {
          console.error(erro);
        });
    } else {
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .catch((erro) => {
          console.error(erro);
        });
    }
  }

  return (
    <Badge.Ribbon {...propsBadge}>
      <Button
        ghost={true}
        size="large"
        type="primary"
        style={{ color: "#FFF" }}
        onClick={handleLognInLogOut}
      >
        {user && user.displayName ? user.displayName : "Login - Cadastro"}
      </Button>
    </Badge.Ribbon>
  );
}
