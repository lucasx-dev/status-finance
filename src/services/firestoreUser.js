// services/firestoreUser.js
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export async function updateUserBalanceAndTransactions(uid, newBalance, newTransaction) {
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const updatedTransactions = [...(userData.transactions || []), newTransaction];

    await updateDoc(userRef, {
      saldo: newBalance,
      transactions: updatedTransactions,
    });
  }
}

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  }

  return null;
}
