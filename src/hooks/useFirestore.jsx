import {useEffect, useState, useRef} from 'react';
import {db} from '../firebase/config';

//firebase imports
import {collection, onSnapshot, query, where} from 'firebase/firestore';

const useFirestore = (c, _q) => {
  const [documents, setDocuments] = useState(null);

  //setup my query
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, c);

    if (q) {
      //only add a query if one is passed in
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, snapshot => {
      const results = [];
      snapshot.docs.forEach(doc => {
        results.push({id: doc.id, ...doc.data()});
      });
      setDocuments(results);
    });
    return () => unsub();
  }, [c]);
  return {documents};
};

export {useFirestore};
