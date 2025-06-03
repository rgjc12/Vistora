// utils/updateUserProfile.js
import { updateProfile, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { setUser } from "../../store/slices/authSlice";
import { auth, db } from "../firebase";

export const updateUserProfile = async (
  uid,
  {
    name,
    email,
    phone,
    organizationName,
    organizationEmail,
    organizationAddress,
  },
  dispatch
) => {
  try {
    const user = auth.currentUser;

    if (!user || user.uid !== uid) {
      throw new Error("No authenticated user found or UID mismatch");
    }

    // 1. Update Firebase Auth displayName
    if (name && user.displayName !== name) {
      await updateProfile(user, { displayName: name });
    }

    // 2. Update Firebase Auth email
    if (email && user.email !== email) {
      await updateEmail(user, email);
    }

    // 3. Update Firestore
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      name,
      email,
      phone,
      organizationName,
      organizationEmail,
      organizationAddress,
    });

    // 4. Update Redux state
    dispatch(
      setUser({
        user: {
          uid,
          name,
          email,
          phone,
          organizationName,
          organizationEmail,
          organizationAddress,
          userType: user.userType,
          //user: "admin", // or however you're managing roles
        },
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return { success: false, error: error.message };
  }
};
