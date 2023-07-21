// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCdu9K04chuhYK6d4xGx5RoxPI-CQaXtV0",
  authDomain: "react-bf382.firebaseapp.com",
  projectId: "react-bf382",
  storageBucket: "react-bf382.appspot.com",
  messagingSenderId: "606540058729",
  appId: "1:606540058729:web:ec82dbde684cdae727d2f8",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const fileSize = file.size / (1024 * 1024);

  if (fileSize > 300) {
    return null;
  } else {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}
