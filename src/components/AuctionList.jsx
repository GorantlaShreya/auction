import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [bids, setBids] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("http://localhost:5001/auctions");
        setAuctions(response.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, [refresh]);

  const handleBidChange = (auctionId, value) => {
    setBids((prevBids) => ({ ...prevBids, [auctionId]: value }));
  };

  const placeBid = async (auctionId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to place a bid.");
      return;
    }

    const bidAmount = Number(bids[auctionId]);
    const selectedAuction = auctions.find((a) => a._id === auctionId);
    const current = selectedAuction?.currentBid || selectedAuction?.originalPrice || 0;

    if (bidAmount <= current) {
      alert(`Your bid must be higher than ₹${current}`);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5001/bid/${auctionId}`,
        { bid: bidAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      setRefresh((prev) => !prev); 
      setBids((prev) => ({ ...prev, [auctionId]: "" }));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place bid.");
    }
  };

  return (
    <div className="auction-list-container">
      <h2>Active Auctions</h2>
      {auctions.length === 0 ? (
        <p>No auctions available. Be the first to post!</p>
      ) : (
        <ul className="auction-list">
          {auctions.map((auction) => (
            <li key={auction._id} className="auction-card">
              <h3>{auction.itemName}</h3>
              <p><strong>Description:</strong> {auction.description}</p>
              <p><strong>Original Price:</strong> ₹{auction.originalPrice}</p>
              <p>
  <strong>Current Bid:</strong> ₹
  {auction.currentBid && auction.currentBid > 0
    ? auction.currentBid
    : auction.originalPrice}
</p>
              <p><strong>Closing Date:</strong> {new Date(auction.closingTime).toLocaleString()}</p>

              <div className="bid-section">
                <input
                  type="number"
                  placeholder={`> ₹${
                    auction.currentBid && auction.currentBid > 0
                      ? auction.currentBid
                      : auction.originalPrice
                  }`}                  
                  value={bids[auction._id] || ""}
                  onChange={(e) => handleBidChange(auction._id, e.target.value)}
                />
                <button onClick={() => placeBid(auction._id)}>Place Bid</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuctionList;
