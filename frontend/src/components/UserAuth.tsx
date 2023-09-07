import { useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AplicationContext } from "../contexts/AplicationContext";
import {auth} from "../services/firebase";  



export function UserAuth() {
  const { setUser, email, setEmail, password, setPassword } =
    useContext(AplicationContext);

  

  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password )
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h3>Entrar com Email</h3>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <button onClick={handleEmailSignIn}>Entrar com Email</button>

      <hr />

      <h3>OU</h3>

      <button onClick={handleGoogleSignIn}>Entrar com Google</button>
    </>
  );
}
