import React, { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import MenuItem from "../../components/menuItem";
import "./home.scss";

function Home() {
  const [menu, setMenu] = useState([]);
  const [message, setMessage] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "menu");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const keys = Object.keys(snapshot.val());
        const data = keys.map((key) => {
          return { id: key, ...snapshot.val()[key] };
        });
        setMenu(data);
        setFilteredMenu(data);
      } else {
        setMessage("No data found!");
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filtered = menu.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMenu(filtered);
  };
  return (
    <div className="home">
      {!!!message && (
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      )}
      <div className="cards">
        <di>
          <h2 className="error">{message}</h2>
        </di>
        {filteredMenu.map((item, index) => (
          <MenuItem key={item.id || index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
