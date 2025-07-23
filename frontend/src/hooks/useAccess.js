// hooks/useAccess.js
import { useAuthStore } from "../store/useAuthStore";

export const useAccess = () => {
  const authUser = useAuthStore(state => state.authUser);

  const isAdmin = authUser?.role === "ADMIN";
  const isUser = authUser?.role === "USER";
  const plan = authUser?.plan;

  // Check if user has one of these plans
  const hasPlan = (plans) => plans.includes(plan);

  return {
    authUser,
    isAdmin,
    isUser,
    plan,
    hasPlan,
  };
};
