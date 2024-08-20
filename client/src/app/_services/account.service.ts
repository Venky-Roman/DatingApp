import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BaseUri='https://localhost:7245/api/';
  private CurrentUserSource = new BehaviorSubject<User | null> (null);
  CurrentUser$ = this.CurrentUserSource.asObservable();

  constructor(private http : HttpClient) { }

  login(model:User)
  {
    return this.http.post<User>(this.BaseUri + 'Account/login',model).pipe(
      map((response) =>
      {
        const user = response;
        if(user)
          {
            localStorage.setItem('user',JSON.stringify(user))
            this.CurrentUserSource.next(user);
          } 
      })
    ) 
  }
  register(model: User)
  {
    return this.http.post<User>(this.BaseUri + 'Account/register',model).pipe(
      map((response) =>
      {
        const user=response;
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user))
          this.CurrentUserSource.next(user);
        }
        return user;
      })
    )
  }
  setCurrentUser(user : User)
  {
    this.CurrentUserSource.next(user);
  }
  logout()
  {
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }
}
