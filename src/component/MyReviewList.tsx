import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../assets/fbase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import Counter from './Count';

const MyReviewList = () => {
  const [authUser, setAuthUser] = useState(null);
  const cardsCollectionRef = collection(db, 'cards');
  const [cards, setCards] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const navigate = useNavigate();

  const filterdList = cards?.filter(
    (card) => card?.userId === authUser?.reloadUserInfo?.localId
  );


  const clickCard = (id) => {
    console.log('r')
    if (!id) return;
    navigate(`/review/${id}`);
  };


  const deleteCard = async (value) => {
    const cardDoc = doc(db, 'cards', value?.id);
    console.log(cardDoc);
    await deleteDoc(cardDoc);
    setDeleteTrigger((pre) => !pre);
    console.log('성공!');
  };

  useEffect(() => {
    const getCards = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc?.id })));
    };

    getCards();
  }, [deleteTrigger]);

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

  useEffect(() => {
    const getCards = async () => {
      const data = await getDocs(filterdList);
      setCards(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getCards();
  }, []);




  console.log('MyReviewList', { cards, filterdList, authUser, deleteTrigger });
  return (
    <>
      <Counter count={filterdList?.length} />
      <Wrapper>
        {filterdList?.map((value, idx) => {
          return (
            <Card key={idx}>
              <DeleteButton
                onClick={() => {
                  deleteCard(value);
                }}
              >
                삭제
              </DeleteButton>
              <CardImageWrapper 
              onClick={() => clickCard(value?.cardId)}
              >
                <CardImage src={value?.image} width={'auto'} height="auto" />
              </CardImageWrapper>
              <TitleDiv>
                <TitleSpan>{value?.title}</TitleSpan>
              </TitleDiv>
            </Card>
          );
        })}
      </Wrapper>
    </>
  );
};

export default MyReviewList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 100px;
  row-gap: 50px;
`;

const Card = styled.div`
  width: 220px;
  height: 350px;
  margin: 0;

  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const CardImageWrapper = styled.div`
  width: 180px;
  height: 250px;
  border: 3px solid lightblue;
  border-radius: 6px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 180px;
  height: 250px;
`;

const TitleDiv = styled.div`
  width: 180px;
  padding: 0 11px;

  display: flex;
  align-items: center;
`;
const TitleSpan = styled.span`
  font-size: 14px;
`;

const DeleteButton = styled.button`
  width: 70px;
  height: 30px;
  margin: 5px auto;
  background-color: pink;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    border: 2px solid coral;
  }
  &:focus {
    cursor: pointer;
    border: 2px solid coral;
    outline: none;
  }

`;
