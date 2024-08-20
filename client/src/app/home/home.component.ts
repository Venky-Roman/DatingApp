import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
registerMode = false;
constructor(public accountService:AccountService)
{

}
ngOnInit(): void {
  throw new Error('Method not implemented.');
}
registerToggle()
{
 this.registerMode = !this.registerMode;
}
cancelRegisterMode(event : boolean)
{
  this.registerMode=event;
}
}
