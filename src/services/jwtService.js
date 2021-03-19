import axios from "axios";
import jwtDecode from "jwt-decode";
import EventEmitter from "./EventEmiter";
/* eslint-disable camelcase */

const API = "http://localhost:5000";

class JwtService extends EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.logout();
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.API_URL}/auth/register`, data)
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:5000/auth/login`, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data);
          }

        }).catch(error=>{

          reject(error.response.data);

        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:5000/auth/token`, {
           
            access_token: this.getAccessToken(),
          
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data);
          } else {
            this.logout();
            Promise.reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          console.log(`error`, error)
          this.logout();
          Promise.reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post("/api/auth/user/update", {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("access_token");
  };

  
}

const instance = new JwtService();

export default instance;
