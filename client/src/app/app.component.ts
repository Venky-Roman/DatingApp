import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  users:any;
  serveruri:string='https://localhost:7245/api/Users'
  constructor(private http:HttpClient,private accountService:AccountService)
  {

  }
  ngOnInit(): void {
    this.http.get(`${this.serveruri}`).subscribe(
      {
        next: (response)=> this.users=response,
        error:(error) => console.log(error),
        complete :() => console.log(this.users)
      }
    )
  }
  setCurrentUserSource()
  {
    const userSource = localStorage.getItem('user');
    if(!userSource) return;
    const user : User = JSON.parse(userSource);
    this.accountService.setCurrentUser(user);
  }

} 
