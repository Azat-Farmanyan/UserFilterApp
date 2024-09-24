import { Routes } from '@angular/router';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

export const routes: Routes = [
  {
    path: 'user-settings',
    component: UserSettingsComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'user-settings' },
  { path: '**', component: UserSettingsComponent },
];
