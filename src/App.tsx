import { Outlet } from "react-router";

function App() {
  // const { isLoading, isAuthenticated } = useKindeAuth();
  // console.log(isAuthenticated , isLoading , 'sadasdasd');

  // if (isLoading) return <>Loading...</>;
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
