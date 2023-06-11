import { TOKEN_TYPE } from "stores/AuthStore";
import axios from "axios";
import jwtDecode from "jwt-decode";
const baseURL =
  "https://port-0-auth-nest-7xwyjq992llir9r422.sel4.cloudtype.app";
const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem(TOKEN_TYPE.AUTH);
    let refreshToken = localStorage.getItem(TOKEN_TYPE.REFRESH);

    if (token && refreshToken) {
      // @ts-ignore
      const tokenExpiration = jwtDecode(token)!.exp;
      const currentUnixTime = Math.floor(Date.now() / 1000);

      if (tokenExpiration < currentUnixTime) {
        // 토큰이 만료된 경우
        try {
          const response = await refreshAccessToken(refreshToken);
          console.log("response", response);
          localStorage.setItem(TOKEN_TYPE.AUTH, response.data.access_token);

          config.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          console.log(response.data.access_token);
        } catch (error) {
          localStorage.clear();
        }
      } else {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken: string) => {
  const headers = {
    refreshToken: `Bearer ${refreshToken}`,
  };

  try {
    const response = await axios.post(
      `${baseURL}/auth/token/refresh`,
      {},
      { headers: headers }
    );

    return response;
  } catch (error) {
    console.error("Failed to refresh access token: ", error);
    throw error;
  }
};
export default api;
