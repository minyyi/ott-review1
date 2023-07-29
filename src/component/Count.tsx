import styled from 'styled-components';

interface CounterProps {
  count: number;
}

const Counter = (props: CounterProps) => {
  return (
    <CountDiv>
      <H2>게시글</H2>
      <CountNum>{props.count} </CountNum>
    </CountDiv>
  );
};

export default Counter;

const CountDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: center;
`;

const H2 = styled.h2`
  padding-left: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const CountNum = styled.p`
  font-size: 28px;
  color: green;
  font-weight: 700;
  margin: 18.675px 0;
`;
