import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../services/firebaseConfig";

const db = getFirestore(app);

export async function saveUser(user) {
  if (!user || !user.uid) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      nome: user.displayName || "",
      email: user.email || "",
      saldo: 0,
      output: [],
      input: [],
      transactions: [],
    });
  }
}
