const Home = () => {
  return (
    <div className="content-box" style={{ padding: "40px", textAlign: "left" }}>
      <h1>Welcome to Our Online Auction Platform</h1>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Experience the ease and excitement of bidding from the comfort of your home. Our platform
        connects buyers and sellers in a secure and transparent way. Whether you're looking to sell
        your valuable items or discover unique treasures, you're in the right place.
      </p>
      <ul style={{ marginTop: "20px", fontSize: "17px" }}>
        <li> Post your own auction listings effortlessly</li>
        <li> Browse and bid on a wide range of items</li>
        <li> Safe and trusted by our growing community</li>
      </ul>
      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Start your auction journey today by signing up or browsing the latest auctions!
      </p>
    </div>
  );
};

export default Home;
