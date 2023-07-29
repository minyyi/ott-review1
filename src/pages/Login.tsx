import { styled } from "styled-components";
import Layout from "../component/Layout.tsx";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../assets/fbase.tsx";

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.alert('로그인 완료!')
        navigate('/')

      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Layout>
      <h1>로그인</h1>
      <Container>
        <InputBox>
          <Label>이메일</Label>
          <Input type="email" 
          value={email}  onChange={(e) => setEmail(e.target.value)}
          ></Input>

          <Label>비밀번호</Label>
          <Input type="password" 
          value={password} onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <Button type="submit" onClick={signIn}>
            <ButtonSpan>로그인</ButtonSpan>
          </Button>
        </InputBox>
      </Container>
    </Layout>
     
  );
}

const Container = styled.div`
  width: 500px;
  height: 600px;
  margin: 20px auto;
  border: 5px solid gray 0.7;

  display: flex;
  justify-content: center;
  align-items: center;

`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Input = styled.input`
  width: 250px;
  height: 20px;
  margin: 10px 0 20px;
`
const Label = styled.label`
  font-size: 20px;
`

const Button = styled.button`
  width: 70px;
  height: 30px;
  margin: 10px auto;
  background-color: pink;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    border: 2px solid coral;
  }
`
const ButtonSpan = styled.span`

`