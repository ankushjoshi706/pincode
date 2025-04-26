import React, { useState } from "react";
import Loader from "./components/Loader";
import PostOfficeCard from "./components/PostOfficeCard";
import "./App.css";

function App() {
  const [pincode, setPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [filteredOffices, setFilteredOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLookup = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError("Pincode must be exactly 6 digits and numeric.");
      setSuccessMessage("");
      setPostOffices([]);
      setFilteredOffices([]);
      return;
    }
    setError("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();
      setLoading(false);
      if (data[0].Status === "Error" || !data[0].PostOffice) {
        setError("Invalid Pincode. Please try again.");
        setPostOffices([]);
        setFilteredOffices([]);
      } else {
        setPostOffices(data[0].PostOffice);
        setFilteredOffices(data[0].PostOffice);
        const count = data[0].PostOffice.length;
        setSuccessMessage(`Message: ${count} Pincode(s) found.`);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setLoading(false);
      setPostOffices([]);
      setFilteredOffices([]);
    }
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
    const filtered = postOffices.filter((office) =>
      office.Name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOffices(filtered);
  };

  const clearFilter = () => {
    setFilterText("");
    setFilteredOffices(postOffices);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLookup();
    }
  };

  return (
    <div className="App">
      {/* Pincode Input */}
      <div className="input-section">
        <h2>Enter Pincode</h2>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Pincode"
          maxLength="6"
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleLookup}>Lookup</button>
      </div>

      {/* Error / Success Messages */}
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      {/* Loader */}
      {loading && <Loader />}

      {/* Filter */}
      {postOffices.length > 0 && !loading && (
        <div className="filter-section">
          <input
            type="text"
            value={filterText}
            onChange={handleFilter}
            placeholder="Filter by Post Office Name"
          />
          {filterText && (
            <button onClick={clearFilter} className="clear-btn">
              Clear
            </button>
          )}
        </div>
      )}

      {/* Result Cards */}
      <div className="card-container">
        {filteredOffices.length > 0
          ? filteredOffices.map((office, index) => (
              <PostOfficeCard key={index} office={office} />
            ))
          : !loading &&
            postOffices.length > 0 && (
              <div className="no-data">
                Couldn’t find the postal data you’re looking for…
              </div>
            )}
      </div>
    </div>
  );
}

export default App;
