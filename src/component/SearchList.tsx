import { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../assets/fbase';
import { collection, getDocs } from 'firebase/firestore';

import styled from 'styled-components';

const SearchList = () => {
  const cardsCollectionRef = collection(db, 'cards');
  const valueRef =useRef('')
  const [cards, setCards] = useState([]);
  const [searchList, setSearchList] = useState([])
  const navigate = useNavigate();
  const clickCard = (id) => {
    if (!id) return;
    navigate(`/review/${id}`);
  };

  const onChangeFn = (e) => {
    const b =  cards?.filter((card)=>
    card?.title?.includes( e.target.value))
    valueRef.current = b
console.log(b)
  }

  const clickSearch = ()=>{
    setSearchList(valueRef.current)
  }
  useEffect(() => {
    const getCards = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCards(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getCards();
  }, []);

  return (
    <>
      <div style={{marginBottom: '20px',display:'flex'}}>
        <SearchInput onChange={onChangeFn}/>
        <button onClick={clickSearch}>검색</button>
      </div>
     <Wrapper>

      {searchList.map((value, idx) => {
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
    </>
  );
};

export default SearchList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 100px;
  row-gap: 50px;
`;

const SearchInput = styled.input`

`

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
