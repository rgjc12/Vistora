import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase"; // or wherever yours is
import { useDispatch } from "react-redux";

import { doc, getDoc } from "firebase/firestore";
import { login, logout, setLoading } from "../../store/slices/authSlice";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          const data = docSnap.exists() ? docSnap.data() : {};

          dispatch(
            login({
              user: {
                uid: user.uid,
                email: user.email,
                name: data?.name || "No Name",
                userType: data?.userType || "basic",
                phone: data?.phone || "",
                organizationAddress: data?.organizationAddress || "",
                organizationName: data?.organizationName,
                organizationEmail: data?.organizationEmail,
              },
              token,
              role: data?.userType || "basic",
            })
          );
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        dispatch(logout());
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppWrapper;
