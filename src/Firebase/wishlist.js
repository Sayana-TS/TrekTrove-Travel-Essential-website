import { db } from "./firebaseConfig";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

// Add item to wishlist
export const addWishlistItem = async (userId, item) => {
  const itemRef = doc(db, "Wishlist", userId, "items", item.id);
  await setDoc(itemRef, {
    ...item,
    productId: item.id, // store original product id
  });
};

// Remove item from wishlist
export const removeWishlistItem = async (userId, itemId) => {
  const itemRef = doc(db, "Wishlist", userId, "items", itemId);
  await deleteDoc(itemRef);
};

// Get all wishlist items for a user
export const getWishlistItems = async (userId) => {
  const itemsCol = collection(db, "Wishlist", userId, "items");
  const snapshot = await getDocs(itemsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
