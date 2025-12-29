import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

export function Login() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      login({
        id: "user-1",
        email: "demo@task.app",
        name: "Demo User",
      })
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </div>
  );
}
