// import React from 'react';
import styled from 'styled-components';
import Layout from './component/Layout';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

interface ReviewRegitserProps {
  title: string,
  text: string,
  onSubmit: () => void,
  onTextChange: (text:string) => void
  onTitleChange: (title:string) => void
}



export default function ReviewRegister(props: ReviewRegitserProps) {
  const handleInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    props.onTitleChange(event.target.value)
  }

  // const handleSubmit = (event: SubmitEvent) => {
  //   event.preventDefault();
  //   props.onSubmit();
  // }

  const navigate = useNavigate()
  const clickSave = () => {
    navigate('/review')
  }

  return (
    <Layout>
      <H2>리뷰적기</H2>
      <Section>
        <Div>
          <Photo>사진넣기</Photo>
        </Div>
        <Div>
          <TitleLabel>제목:</TitleLabel>
          <TileInput value= {props.title} onChange={handleInputChanged} placeholder='콘텐츠의 제목을 기록해주세요'/>
        </Div>
        
        <Div>
          <TitleLabel>내용:</TitleLabel>
          <FormText value={props.text} required as="textarea" rows={10} placeholder='기억에 남는 대사, 감상 등을 남겨주세요.'>
            {/* 내용내용내용줄거리 명대사 { props.text } */}
          </FormText>
        </Div> 
        <Button type='submit' onClick={clickSave}>
          저장
        </Button>
      </Section>

    </Layout>
  );
}
 


const Section = styled.section`
  width: 800px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`

const H2 = styled.h2`
`

const Photo = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
`
const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;


`

const TileInput = styled.input`
  width: 300px;
  height: 20px;
`

const TitleLabel = styled.p`
  color: black;
  font-size: 20px;
  margin-right: 10px;
`

const FormText = styled.textarea`
  width: 700px;
  resize: none;
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


        {/* <Form.Control required type="email" placeholder="제목을 입력해 주세요." /> */}
        {{/* <Form.Control required as="textarea" rows={20} /> */}}
