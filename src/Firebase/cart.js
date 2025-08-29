import { doc, setDoc, deleteDoc, getDocs, getDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Add or update cart item
export const addCartItem = async (userId, item) => {
  const itemRef = doc(db, "Cart", userId, "items", item.id);
  await setDoc(itemRef, { ...item, productId: item.id });
};

// Remove cart item
export const removeCartItem = async (userId, itemId) => {
  const itemRef = doc(db, "Cart", userId, "items", itemId);
  await deleteDoc(itemRef);
};

// Update quantity of existing item (keeps all other fields)
export const updateCartQuantity = async (userId, itemId, quantity) => {
  const itemRef = doc(db, "Cart", userId, "items", itemId);
  const itemSnap = await getDoc(itemRef);

  if (itemSnap.exists()) {
    const itemData = itemSnap.data();
    await setDoc(itemRef, { ...itemData, quantity });
  }
};

// Fetch cart items
export const getCartItems = async (userId) => {
  const itemsCol = collection(db, "Cart", userId, "items");
  const snapshot = await getDocs(itemsCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Clear all cart items for a user
export const clearUserCart = async (userId) => {
  const itemsCol = collection(db, "Cart", userId, "items");
  const snapshot = await getDocs(itemsCol);

  const deletions = snapshot.docs.map((doc) =>
    deleteDoc(doc.ref)
  );

  await Promise.all(deletions);
};