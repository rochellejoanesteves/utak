import React, { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, get, set, push } from "firebase/database";
import MenuItem from "../../components/menuItem";
import "./home.scss"

function Home() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "menu");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setMenu(Object.values(snapshot.val()));
      } else {
        alert("error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {menu.map((item, index) => (
        <MenuItem key={item.id || index} item={item} />
      ))}
    </div>
  );
}

export default Home;
