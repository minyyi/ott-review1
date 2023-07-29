import { styled } from 'styled-components';
import Layout from '../component/Layout';
import MyReviewList from '../component/MyReviewList';

interface ProfileProps {
  name: string;
}

export default function Profile(props: ProfileProps) {
  return (
    <Layout>
      <ProfileDiv>
        <Info>
          <NameDiv>
            <BoldName>{props.name}</BoldName>
          </NameDiv>
        </Info>
      </ProfileDiv>
      <HR />
      <MyList>
        <MyReviewList />
      </MyList>
    </Layout>
  );
}

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid gray;
  border-radius: 50%;
  margin: 20px 0 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameDiv = styled.div`
  margin: 20px auto;
`;

const BoldName = styled.b`
  font-size: 20px;
`;

const Icon = styled.div`
  margin-left: 30px;
  width: 100px;
  display: flex;
  justify-content: space-around;
`;

const MyList = styled.article`
  width: 1000px;
  margin: 0 auto;
`;

const HR = styled.hr`
  color: lightgray;
  width: 1000px;
`;
