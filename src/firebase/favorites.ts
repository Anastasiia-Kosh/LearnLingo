import { get, ref, remove, set } from "firebase/database";
import { db } from "./firebase";

export const getFavorites = async (uid: string): Promise<string[]> => {
  const favoritesRef = ref(db, `users/${uid}/favorites`);
  const snapshot = await get(favoritesRef);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.keys(snapshot.val());
};

export const addFavorite = async (
  uid: string,
  teacherId: string,
): Promise<void> => {
  const favoriteRef = ref(db, `users/${uid}/favorites/${teacherId}`);

  await set(favoriteRef, true);
};

export const removeFavorite = async (
  uid: string,
  teacherId: string,
): Promise<void> => {
  const favoriteRef = ref(db, `users/${uid}/favorites/${teacherId}`);

  await remove(favoriteRef);
};
