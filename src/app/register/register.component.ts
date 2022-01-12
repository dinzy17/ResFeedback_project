import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.email,Validators.required]),
    fullName : new FormControl(null,[Validators.required]),
    password : new FormControl(null,[Validators.required]),
    cpass : new FormControl(null,[Validators.required])
  })
  constructor( private _router:Router, private _userService: UserService,
    private api: APIService ) {}
    ngOnInit(): void {

    }

    //function to register user
    registerButton(){
      if(!this.registerForm.valid ){
        console.log('Invalid form')
        return
      }

      let reqParams = this.registerForm.value
      this.api.apiRequest('post', "users/signup", reqParams).subscribe(result => {
        console.log("result", result)
        this._router.navigate(['/login'])
      }, (err) => {
        console.log("err ==> ", err)
        alert("Something went wrong!")
      })
    }
    
  }
