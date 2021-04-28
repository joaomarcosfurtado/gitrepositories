import { PageHeader } from "../components/PageHeader";
import { RepositoryList } from "../components/RepositoryList";

const Homepage = (): JSX.Element => {
  return (
    <>
      <PageHeader />
      <RepositoryList />
    </>  
  );

}

export default Homepage;