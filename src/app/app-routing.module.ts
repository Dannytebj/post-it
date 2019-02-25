import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GroupComponent } from './components/group/group.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'group/:id',
        component: GroupComponent,
        outlet: 'chat'
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// {
//   path: 'dashboard',
//   children: [
//     {
//       path: '',
//       component: DashboardComponent
//     },
//     {
//       path: 'group',
//       component: GroupComponent,
//       outlet: 'chat'
//     }
//   ],
//   canActivate: [AuthGuard]
// },