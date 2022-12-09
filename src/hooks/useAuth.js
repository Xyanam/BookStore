import { useSelector } from "react-redux/es/exports";

export function useAuth() {
  const { login, image, role } = useSelector((state) => state.user);

  return {
    isAuth: !!login,
    image,
    role,
  };
}
