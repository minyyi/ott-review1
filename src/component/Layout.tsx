import React, { ReactNode, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../assets/fbase';
import SearchBar from './SearchBar'

export default function Layout(props: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        console.log('sign out successful');
      })
      .catch((error) => console.log(error));
  };





  const navigate = useNavigate();

  const clickWriteButton = () => {
    navigate('/write');
  };
  const clickLoginButton = () => {
    navigate('/login');
  };
  const clickSignUpButton = () => {
    navigate('/signup');
  };
  const clickLogo = () => {
    navigate('/');
  };
  const clickMy = () => {
    navigate('/my');
  };
  const clickSearch = () => {
    console.log('클릭')
    navigate('/search');
  };



  return (
    <Box>
      <Appbar>
        <Div2>
          <Tab>
            <P onClick={clickLogo}>오티티리뷰</P>
            <SearchBar onClick={clickSearch}/>
          </Tab>

          {authUser ? (
            <Tab>
              <P onClick={clickWriteButton}>글쓰기</P>
              <P onClick={userSignOut}>로그아웃</P>
              <P onClick={clickMy}>My</P>
            </Tab>
          ) : (
            <Tab>
              <P onClick={clickLoginButton}>로그인</P>
              <P onClick={clickSignUpButton}>회원가입</P>
            </Tab>
          )}
        </Div2>
      </Appbar>
      <Body>
        <BodyDiv>{props.children}</BodyDiv>
      </Body>
      <Footer>
        <Div>
          <P>오티티리뷰</P>
          <Copyright> OTT 2023 All Rights Reserved.</Copyright>
        </Div>
      </Footer>
    </Box>
  );
}

const Box = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Div = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Div2 = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

const Tab = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const P = styled.p``;


const Appbar = styled.div`
  height: 80px;
  padding: 0 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: lightgray;
  opacity: 0.7;
`;

const Body = styled.div`
  flex-grow: 1;
  background-color: white;
`;

const BodyDiv = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Footer = styled.div`
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: lightgray;
  opacity: 0.7;
`;

const Copyright = styled.span`
  font-size: 12px;
`;
