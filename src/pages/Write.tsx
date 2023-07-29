import { styled } from 'styled-components';
import { db, storage, auth } from '../assets/fbase.tsx';
import uuid from 'react-uuid';
import Layout from '../component/Layout.tsx';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref, listAll } from 'firebase/storage';

export default function Write() {
  const cardsCollectionRef = collection(db, 'cards');
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [imageArray, setImageArray] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const handleImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files);
  };

  const createCard = async () => {
    await addDoc(cardsCollectionRef, {
      title,
      desc,
      cardId: uuid(),
      image: imageurl,
      userId: authUser?.reloadUserInfo?.localId,
    });
    window.alert('글 추가가 완료되었습니다');
    navigate('/');
  };


  useEffect(() => {
    const imageRef = ref(storage, `photo/${image[0]?.name}`); 
    if (!image) return;
    uploadBytes(imageRef, image[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        window.alert('업로드 완료');
        console.log(url);
      });
    });
  }, [image]);

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

  console.log({ title, desc, image, imageArray, authUser, cardsCollectionRef });

  return (
    <Layout>
      <h1>글쓰기</h1>
      <Container>
        <InputBox>
          <Label>제목</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>

          <Label>상세내용</Label>
          <DescInput
            rows={10}
            cols={50}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></DescInput>

          <Label>이미지</Label>
          <ImageInput type="file" onChange={handleImage}></ImageInput>

          <Button type="submit" onClick={createCard}>
            <ButtonSpan>저장</ButtonSpan>
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
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 250px;
  height: 20px;
  margin: 10px 0 20px;
`;

const ImageInput = styled.input`
 margin:10px;
`;

const DescInput = styled.textarea`
  margin: 10px 0 20px;
  resize: none

`;
const Label = styled.label`
  font-size: 20px;
`;

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
`;
const ButtonSpan = styled.span``;
