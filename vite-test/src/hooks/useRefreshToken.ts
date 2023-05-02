import { useAuthContext } from '../services/AuthProvider'
import axios from '../lib/axios';

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async (): Promise<string> => {
    const { data } = await axios('/auth/refresh', { withCredentials: true });
    setAuth((prev) => {
      return { ...prev , accessToken: data.accessToken, isAuthenticated: true };
    });
    return data.accessToken;
  };
  return refresh;
}

export default useRefreshToken