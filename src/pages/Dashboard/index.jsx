// pages/dashboard/index.tsx

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { role, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
    } else if (role === "TPA") {
      router.replace("/dashboard/tpa");
    } else if (role === "Provider") {
      router.replace("/dashboard/provider");
    }
  }, [role, isLoading, isAuthenticated]);

  return null; // Optionally show a spinner if isLoading
}
