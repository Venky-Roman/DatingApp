import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurd/auth.guard';

const routes: Routes = [
  {
    path:"nav", component:NavComponent
  },
  {
    path:"", component:HomeComponent
  },
  {
    path:"",
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {
        path:"members", component:MembersListComponent
      },
      {
        path:"members/:id", component:MembersDetailComponent
      },
      {
        path:"list", component:ListComponent
      },
      {
        path:"messages", component:MessagesComponent
      },
    ]
  },
  {
    path:"**", component:HomeComponent,pathMatch:"full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
