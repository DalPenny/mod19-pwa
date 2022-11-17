import { openDB } from 'idb';

const initdb = async () =>
//opens and initilizes our jate db
  openDB('jate', 1, {
    upgrade(db) {
      //checking to see if index db has jate db
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate indexdatabase already exists');
        return;
      }
      //if jate db doesn't exist create it here, setting up schema/table in index/jate db
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// PUT method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT data on to jate Db');
  // console.error('PUT-jateDb not implemented');

// Create a connection to the jate database and version we want to use.
const jateDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges. writing to jate
const tx = jateDb.transaction('jate', 'readwrite');

// Open up the desired object store.
const store = tx.objectStore('jate');

const putrequest = store.put({content});

 // Get confirmation of the put request.
 const result = await putrequest;
 console.log('data saved to the database', result);

};

// Add logic for GET method that gets all the content from the database //unit 23
export const getDb = async () => {
  console.log('GET data from jate database');
  // console.error('GET - jate database not implemented ');

// Create a connection to the database database and version we want to use.
const jateDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
const tx = jateDb.transaction('jate', 'readonly');

// Open up the desired object store.
const store = tx.objectStore('jate');

 // Use the .getAll() method to get all data in the database.
 const getrequest = store.getAll();

 // Get confirmation of the request.
const result = await getrequest;
console.log('result.value', result);
return result.content;

};

initdb();
