// utils/updateUserProfile.js
import { updateProfile, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { setUser } from "../../store/authSlice"; // Adjust path if needed
import { auth, db } from "../firebase";

export const updateUserProfile = async (
  uid,
  { name, email, phone },
  dispatch
) => {
  try {
    const user = auth.currentUser;

    // Update Firebase Auth Profile
    if (user && user.uid === uid) {
      // 1. Update displayName
      if (name && user.displayName !== name) {
        await updateProfile(user, { displayName: name });
      }

      // 2. Update email (only if changed)
      if (email && user.email !== email) {
        await updateEmail(user, email);
      }

      // 3. Update Firestore user document
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        name,
        email,
        phone,
      });

      // 4. Update Redux
      dispatch(
        setUser({
          user: {
            name,
            email,
            uid,
            phone,
            role: "admin", // You may want to dynamically pull this too
          },
        })
      );

      return { success: true };
    } else {
      throw new Error("No user found or mismatched UID");
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return { success: false, error: error.message };
  }
};
