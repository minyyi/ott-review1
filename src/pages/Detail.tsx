import uuid from 'react-uuid';
import styled from 'styled-components';
import Layout from '../component/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../assets/fbase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';

export default function Detail() {
  const navigate = useNavigate();
  const commentsCollectionRef = collection(db, 'comments');
  const cardsCollectionRef = collection(db, 'cards');
  const { id } = useParams();
  const [detailData, setdetailData] = useState({});
  const [commentsList, setCommentList] = useState([]);
  const [comment, setComment] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const [addCommentTrigger, setAddcommentTrigger] = useState(false);

  const clickAddComment = async () => {
    await addDoc(commentsCollectionRef, {
      createAt: new Date().getTime(),
      comment,
      commentsId: uuid(),
      cardId:id,
      userEmail: authUser?.email,
      userId: authUser?.reloadUserInfo?.localId,
    });
    window.alert('댓글 추가가 완료되었습니다.');
    setAddcommentTrigger((pre) => !pre);
    setComment('');
  };

  useEffect(() => {
    const getDetail = async () => {
      const data = await getDocs(cardsCollectionRef);
      const List = data.docs.map((doc) => ({ ...doc.data() }));
      const find = List?.find((data) => data.cardId === id);
      setdetailData(find);
    };

    getDetail();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      const data = await getDocs(commentsCollectionRef);
      const List = data.docs.map((doc) => ({ ...doc.data() }));
      const cardComments = List?.filter((card)=> card.cardId === id)
      const sortedList = [...cardComments].sort(function (a, b) {
        return b.createAt - a.createAt;
      });
      setCommentList(sortedList);
    };

    getComments();
  }, [addCommentTrigger]);

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

  console.log('detail',{ id, detailData, comment ,commentsList});
  return (
    <Layout>
      <Section>
        <Top>
          <Photo>
            <Img src={detailData?.image} />
          </Photo>
        </Top>

        <Content>
          <TileDiv>
            <Title>{detailData?.title}</Title>
          </TileDiv>
          <TextDiv>
            <Text>{detailData?.desc}</Text>
          </TextDiv>
        </Content>
      </Section>

      <ReplyDiv style={{ display: authUser ? 'flex' : 'none' }}>
        <Reply
          type="text"
          style={{ flex: 4 }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <Button onClick={clickAddComment} style={{ flex: 1 }}>
          등록
        </Button>
      </ReplyDiv>

      <ReplCount>댓글 {commentsList?.length}</ReplCount>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}
      >
        {commentsList?.map((comment, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                minHeight: '40px',
                alignItems: 'center',
                border: '1px solid black',
                padding: '5px',
                margin: '5px',
                columnGap: '20px',
              }}
            >
              <p>{comment?.userEmail}</p>
              <p>{comment?.comment}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

const Section = styled.section`
  max-width: 700px;
  margin: 10px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Photo = styled.div`
  border: 1px solid black;
  width: 600px;
  height: 700px;
  overflow: hidden;
`;
const Img = styled.img`
  object-fit: contain;
`;


const Content = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TileDiv = styled.div`
  max-width: 400px;
`;

const Title = styled.p`
  color: black;
  font-size: 24px;
`;

const TextDiv = styled.div`
  max-width: 700px;
  font-size: 20px;
`;

const Text = styled.p`
  font-size: 16px;
`;

const ReplCount = styled.div`

`

const ReplyDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 900px;
`

const Reply = styled.input`
  height: 30px;
`

const Button = styled.button`
  height: 30px;
  background-color: pink;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    border: 2px solid coral;
  }
  &:focus {
    cursor: pointer;
    outline: none;
    border: 2px solid coral;
  }
`
