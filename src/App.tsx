import React, { useState, useEffect, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Tippy from '@tippyjs/react/headless';
import {db, app} from './firebase'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore"; 
import { reducerItems, State } from "./reducer";
import { Link, useParams } from 'react-router-dom';
import styles from './style.module.css';
import { CSVLink } from 'react-csv';

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
  const [inputValueUpdate, setInputValueUpdate] = useState("");
  const [currentItemId, setCurrentItemId] = useState("");
  const [state, dispatch] = useReducer(reducerItems, { data: [] } as State);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
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

  const handleUpdate = async (id: string, newName: string) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, {name: newName});

    const updatedDoc = state.data.map((item) =>{
      if(item.id === id){
        return { ...item, name: newName};
      }
      return item;
    })
    dispatch({ type: "SET_DATA", payload: updatedDoc }); 
    alert("Success!");
    setIsBoxVisible(false);
  }
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'id', key: 'id' },
  ];
  
  return (
    <div className={isBoxVisible ? `${styles.container} ${styles.overlay}` : `${styles.container}`}>
      <ul>
        {state.data.map((item, index) =>
          <>
            <li key={index}>{item.name}</li>
            <li key={index}>{item.id}</li>
            <button onClick={() => handleClick(item.id)}>Update1</button>
          </>
        )}
      </ul>
      {isBoxVisible && 
        <div className={`${styles.box} ${styles.visible}`}>
            <input type="text" className={styles.inputUpdate} onChange={(e) => setInputValueUpdate(e.target.value)}/>
            <button onClick={() => handleUpdate(currentItemId, inputValueUpdate)}>Update</button>
        </div>
      }
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleAddItem}>Add</button>  
      <>
        <CSVLink data={data} headers={headers}>
          Export CSV
        </CSVLink>
      </>
    </div>
  );
}

export default App;
