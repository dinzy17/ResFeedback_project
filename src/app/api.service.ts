import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Router } from "@angular/router"
import { serverUrl } from "./config"
interface TokenResponse {
  status: string
  data: {
    token: string
    userId: string
    userDetails: string
  }
}

@Injectable()
export class APIService {
  private token: string = ""
  private userId: string = ""
  private userDetails: string = ""

  constructor(private http: HttpClient, private router: Router) {}

  //function to save token and user id
  private saveToken(
    token: string,
    userId: string,
    userDetails: string,
    req: any
  ): void {
    this.token = token
    this.userId = userId
    if (typeof userDetails != "string") {
      userDetails = JSON.stringify(userDetails)
    }
    this.userDetails = userDetails
    localStorage.setItem("userId", userId)
    localStorage.setItem("userDetails", userDetails)
  }

  //function to get token from localStorage
  private getToken(): string {
    if (!this.token) {
      this.token = this.getKeyFromStorage("token")
    }
    return this.token
  }

  //function to get key from storages
  private getKeyFromStorage(key: any): any {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key)
    }
    return ""
  }

  //function to get key from storages
  private removeKeyFromStorage(key: any): any {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
    }
  }

  //function to get user id from localStorage
  public getUser(): string {
    if (!this.userId) {
      this.userId = this.getKeyFromStorage("userId")
    }
    return this.userId
  }

  //function to get token & userId  from token payload
  public getUserDetails(): any {
    const token = this.getToken()
    const userId = this.getUser()
    let payload
    if (token && userId) {
      payload = token.split(".")[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  //function to check if user is logged in
  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  //function to make request from frontend
  private request(
    method: "post" | "get",
    type: string,
    data?: any
  ): Observable<any> {
    let base
    if (method === "post") {
      base = this.http.post(serverUrl + `/api/${type}`, data)
    } else {
      base = this.http.get(serverUrl + `/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      })
    }

    const request = base.pipe(
      map((response: any) => {
        if (response.data && response.data.token) {
          //check if user type is same
          if (data.userType === response.data.userType) {
            const { token, userId, userDetails } =
              response.data
            this.saveToken(
              token,
              userId,
              userDetails,
              data
            )
            return response
          } else {
            return {
              status: "error",
              data: { message: "Please check your credentials" },
            }
          }
        } else {
          return response
        }
      })
    )
    return request
  }

  //function to make request to server to logout user
  public logout(): void {
    this.token = ""
    this.removeKeyFromStorage("userId")
    this.removeKeyFromStorage("userDetails")

    window.localStorage.clear()
    this.router.navigate(["/"])
  }

  //function to make request to server
  public apiRequest(method: any, apiUrl: string, req_vars: any): Observable<any> {
    let token = localStorage.getItem("token")
    if (token !== undefined && token != "") {
      req_vars.accessToken = token
    }
    let response = this.request(method, apiUrl, req_vars)
    return response
  }
}
