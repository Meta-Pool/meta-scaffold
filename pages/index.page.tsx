import type { NextPage } from "next";
import ErrorHandlerHash from "../components/ErrorHandlerHash";
import Hero from "./Hero/index.page";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <ErrorHandlerHash></ErrorHandlerHash>
    </>
  );
};

export default Home;
