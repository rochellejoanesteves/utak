import React, { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import MenuItem from "../../components/menuItem";
import "./home.scss";

function Home() {
  const [menu, setMenu] = useState([]);
  const [message, setMessage] = useState("");

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
      } else {
        setMessage("No data found!");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div>
        <h2 className="error">{message}</h2>
      </div>
      {menu.map((item, index) => (
        <MenuItem key={item.id || index} item={item} />
      ))}
    </div>
  );
}

export default Home;
