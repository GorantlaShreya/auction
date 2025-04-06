import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import MyNavbar from "./components/MyNavbar";
import Homepage from "./components/Homepage";
import Home from "./components/Home";
import Services from "./components/Services";
import About from "./components/About";
import PostAuction from "./components/PostAuction";
import SignIn from "./components/SignIn1";
import SignUp from "./components/SignUp1";
import AuctionList from "./components/AuctionList";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/post-auction" element={<PostAuction />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<AuctionList />}/>
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
