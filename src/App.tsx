import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import {db, app} from './firebase'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore"; 
import { reducerItems, State } from "./reducer";
import styles from './style.module.css';
import { CSVLink } from 'react-csv';
import  UpdateDataBase  from './update/update';
import img from './test.svg';
import avatar from './avatar.svg'
import { CalendarCustom } from './Calendar/CalendarCustom';

function App() {
  // const [items, setItems] = useState<any>([]);
  // useEffect(() => {
  //   const colRef = collection(db, "items");
  //   onSnapshot(colRef, (snapshot) => {
  //   const results: any[] = [];
  //   snapshot.forEach((doc) => {
  //       results.push({
  //       id: doc.id,
  //       ...doc.data(),
  //       });
  //   });
  //   setItems(results);
  //   });
  // }, []);

  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<{ id: string }[]>([]);
  const [currentItemIdUpdate, setCurrentItemId] = useState("");
  const [state, dispatch] = useReducer(reducerItems, { data: [] } as State);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [test, setTest] = useState("");

  const db = getFirestore(app);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "SET_DATA", payload: data });
      setData(data);
    };
    fetchData();
  }, []);

  const handleAddItem = async () => {
    const docRef = await addDoc(collection(db, "items"), {name: inputValue});
    const newData= { id: docRef.id, name: inputValue };
    dispatch({ type: "ADD_DATA", payload: newData});

    setInputValue("");
    alert("Success!");
  }

  const handleClick = async(id:string) => {
    setCurrentItemId(id);
    setClickCount(clickCount + 1);

    if (clickCount === 0) {
      setIsBoxVisible(true);
    } else if (clickCount === 1) {
      setIsBoxVisible(false);
      setClickCount(0);
    }
  };

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'id', key: 'name' },
  ];

  const handleAlert = () => {
    alert("okeee")
  }

  
  
  return (
    <div className={isBoxVisible ? `${styles.container} ${styles.overlay}` : `${styles.container}`}>
      <img src={img} alt="img" className={styles.img}/>
      <img src={avatar} alt="img" className={styles.img}/>
      <ul>
        {state.data.map((item, index) =>
          <>
            <li key={index}>{item.id}</li>
            <li>{item.name}</li>
            <li>{item.status === 1 ? "Okeee" : <button onClick={handleAlert}>:</button>}</li>
            <button onClick={() => handleClick(item.id)}>Update1</button>
          </>
        )}
      </ul>
      {isBoxVisible && 
        <UpdateDataBase currentItemIdUpdate={currentItemIdUpdate}/>
      }
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleAddItem}>Add</button>  
      <>
        <CSVLink data={data} headers={headers}>
          Export CSV
        </CSVLink>
      </>
      <div>
        <p>{selectedDate}</p>
        <CalendarCustom className='calendar' onSelectDate={setSelectedDate}/>
      </div>
    </div>
  );
}

export default App;
