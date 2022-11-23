import { useSelector } from "react-redux/es/exports";

export function useAuth() {
  const { login, password, image, role } = useSelector((state) => state.user);

  return {
    isAuth: !!login,
    password,
    image,
    role,
  };
}
