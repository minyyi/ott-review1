import ReviewList from "../component/ReviewList";
import Layout from "../component/Layout.tsx";
import { useState } from "react";

export default function MainPage() {
  const [searchTitle, setSearchTitle] = useState([]);

  const filterdTitle = searchTitle.filter((searchTitle) => {
    return searchTitle.title.toLowerCase().includes(userInput.toLowerCase());
  });

  return (
    <Layout >
      <h1>추천</h1>
      <ReviewList />

    </Layout>
     
  );
}

