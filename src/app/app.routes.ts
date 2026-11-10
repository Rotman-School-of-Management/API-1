import { Routes } from '@angular/router';
import { FacultyList } from './pages/faculty-list/faculty-list';
import { FacultyDetail } from './pages/faculty-detail/faculty-detail';

export const routes: Routes = [
  { path: '',
  component: FacultyList,
  pathMatch: 'full' // 👈 Add this line
  }, 
  { path: 'faculty/:id', component: FacultyDetail }, 
  { path: '**', redirectTo: '' }
];
