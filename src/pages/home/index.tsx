/* eslint-disable react/jsx-key */
import React from "react";
import Topbar from "components/Topbar";
import TopButtons from "./TopButtons";

const Home: React.FC = () => {
  return (
    <>
      <Topbar />
      <TopButtons />
    </>
  );
};

export default Home;
