let serverUrlEnv = ""

//localhost
if (window.location.hostname.indexOf("localhost") > -1) {
  serverUrlEnv = "http://localhost:8000"
} else {
  //server
  serverUrlEnv = window.location.origin
}

export const snackbarTime = 5000
export const commonErrMsg = "Something went wrong. Please try again!"
export const serverUrl = serverUrlEnv
