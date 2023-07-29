import MainPage from './pages/MainPage';

export type ReviewType = {
  id: number;
  title: string;
  text: string;
};

function App() {
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
