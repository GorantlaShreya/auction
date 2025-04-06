import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:5001/auctions");
        const data = await response.json();

        const filtered = data.filter((item) =>
          item.itemName.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [query]);

  return (
    <div className="content-box" style={{ padding: "40px" }}>
      <h2>Search Results for: <strong>{query}</strong></h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No matching auctions found.</p>
      ) : (
        <div className="auction-grid">
          {results.map((item) => (
            <div key={item._id} className="auction-card">
              <h3>{item.itemName}</h3>
              <p>{item.description}</p>
              <p><strong>Current Bid:</strong> ${item.currentBid}</p>
              <p><strong>Closing Time:</strong> {new Date(item.closingTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
