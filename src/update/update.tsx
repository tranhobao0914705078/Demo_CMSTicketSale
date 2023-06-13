// Trong UpdateDataBase.tsx
import React, { useState, useEffect, useReducer } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { reducerItems, State } from "../reducer";
import {db, app} from '../firebase'
import styles from '../style.module.css'


const UpdateDataBase = ({ currentItemIdUpdate }: { currentItemIdUpdate: string }) => {
    const [isBoxVisibleUpdate, setIsBoxVisibleUpdate] = useState(false);
    const [data, setData] = useState<{ id: string }[]>([]);
    const [clickCount, setClickCount] = useState(0);
    const [state, dispatch] = useReducer(reducerItems, { data: [] } as State);
    const [inputValueUpdate, setInputValueUpdate] = useState("");
    const [dataUpdate, setdataUpdate] = useState("");
    const db = getFirestore(app);

    useEffect(() => {
        const fetchItem = async () => {
          const itemRef = doc(db, "items", currentItemIdUpdate);
          const snapshot = await getDoc(itemRef);
          if (snapshot.exists()) {
            const itemData = snapshot.data();
            setdataUpdate(itemData.name);
          }
        };
      
        fetchItem();
      }, [currentItemIdUpdate, db]);

    const handleUpdate = async (id: string, newName: string) => {
        const itemRef = doc(db, "items", currentItemIdUpdate);
        await updateDoc(itemRef, {name: newName});
    
        const updatedDoc = state.data.map((item) =>{
          if(item.id === id){
            return { ...item, name: newName};
          }
          return item;
        })
        dispatch({ type: "UPDATE_DATA", payload: updatedDoc }); 
        alert("success");
        window.location.reload();
    }
    
    return (
        <div className={`${styles.box} ${styles.visible}`}>
            <input type="text" className={styles.inputUpdate} placeholder={dataUpdate} onChange={(e) => setInputValueUpdate(e.target.value)}/>
            <button onClick={() => handleUpdate(currentItemIdUpdate, inputValueUpdate)}>Update</button>
        </div>
  )
};

export default UpdateDataBase;
