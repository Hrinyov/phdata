import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App() {

  return (
    <RecoilRoot>
     <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </QueryClientProvider> 
    </RecoilRoot>
  );
}

export default App;
