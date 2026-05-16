const DB_NAME = "protofolioDB";
const DB_VERSION = 1;
const STORE_NAME = "products";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        var store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error Connect To DB!");
  });
}
// CRUD
async function addData(productObj) {
  //open DB
  const db = await openDB();
  //transaction
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.add(productObj);
  return transaction.result;
}

async function getData() {
  //open DB
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error Getting Data!");
  });
}

// Update data
async function updateData(productId, data) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  // find product by id
  const request = store.get(productId);
  request.onsuccess = () => {
    //founded or not founded
    const product = request.result;

    if (!product) {
      console.log("No Product With This Id!");
      return;
    }

    let newProduct = { ...product, ...data };
    store.put(newProduct);
  };
}
// Delete one 
async function deleteOne(productId) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.delete(productId);
  return transaction.result;
}
// Delete many
async function deleteAll() {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.clear();
  return transaction.result;
}