import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user } = useAuth();

  return <>{user ? <AppRoutes /> : <AuthRoutes />}</>;
}
