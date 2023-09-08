import { useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "antd";
import {  UserOutlined } from "@ant-design/icons";
import { AplicationContext } from "../contexts/AplicationContext";
import {auth} from "../services/firebase";  



export function UserAuth() {
  const { setUser } = useContext(AplicationContext);

  function handleGoogleSignIn(){
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  return (
     <Button
          ghost={true}
          size="large"
          type="primary"
          style={{ color: "#FFF" }}
          onClick={handleGoogleSignIn}> 
          Login - Cadastro
          <UserOutlined />
        </Button>
  );
}
