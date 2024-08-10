import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private route: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    this.apiService.loginUser(this.loginForm.value).subscribe((res: any) => {
      console.log("login response ==> " + res);
      if (res === "Login successful") {
        this.snackBar.open("Login successful", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.route.navigate([""]);
      } else if (res === "Invalid credentials" || res === "User not found") {
        alert("Please enter valid credentials.");
      } else {
        alert("An unexpected error occurred.");
      }
    });
    
    this.snackBar.open("Invilid Credintials!!", "Close", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    
  }

  passwordFieldType: string = 'password';
  showPassword: boolean = false;
}
