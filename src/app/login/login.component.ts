import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.email,Validators.required]),
    password : new FormControl(null,[Validators.required])
  })

  constructor( private _router:Router, private _userService: UserService,
    private api: APIService ) {}

  ngOnInit(): void {
  }

  //function to complete login
  loginform(){
    if(!this.loginForm.valid ) {
      console.log('Invalid form')
      return
    }

    let reqParams = this.loginForm.value
    reqParams.userType = "User"
    this.api.apiRequest('post', "users/signin", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        const user = result.data.userDetails
        localStorage.setItem("userId", user._id)
        localStorage.setItem("userDetails", JSON.stringify(user))
        this._router.navigate(['/'])
      } else {
        alert("Something went wrong!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
    
  }
  
}