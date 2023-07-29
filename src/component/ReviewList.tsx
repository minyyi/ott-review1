import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../assets/fbase';
import { collection, getDocs } from 'firebase/firestore';

import styled from 'styled-components';

const ReviewList = () => {
  const cardsCollectionRef = collection(db, 'cards');
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const clickCard = (id) => {
    if (!id) return;
    navigate(`/review/${id}`);
  };

  useEffect(() => {
    const getCards = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCards(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getCards();
  }, []);

  console.log('cards', cards);
  return (
    <Wrapper>
      {cards.map((value, idx) => {
        return (
          <Card key={idx}>
            <CardImageWrapper onClick={() => clickCard(value?.cardId)}>
              <CardImage src={value?.image} width={'auto'} height="auto" />
            </CardImageWrapper>
            <TitleDiv>
              <TitleSpan>{value?.title}</TitleSpan>
            </TitleDiv>
          </Card>
        );
      })}
    </Wrapper>
  );
};

export default ReviewList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 100px;
  row-gap: 50px;
`;

const Card = styled.div`
  width: 200px;
  height: 270px;
  margin: 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardImageWrapper = styled.div`
  height: 250px;
  border: 3px solid lightblue;
  border-radius: 6px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 200px;
  height: 250px;

  object-fit: contain;
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
