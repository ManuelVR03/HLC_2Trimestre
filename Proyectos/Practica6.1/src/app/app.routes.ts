import { Routes } from '@angular/router';
import { HomePage as Home } from './home/home.page';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
