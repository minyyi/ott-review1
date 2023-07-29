import { useState } from "react";
import SearchList from "../component/SearchList.tsx";
import Layout from "../component/Layout.tsx";


export default function MainPage() {
  const [searchTitle, setSearchTitle] = useState([]);

  const filterdTitle = searchTitle.filter((searchTitle) => {
    return searchTitle.title.toLowerCase().includes(userInput.toLowerCase());
  });

  return (
    <Layout >
      <h1>검색</h1>
      <SearchList />

    </Layout>
     
  );
}


