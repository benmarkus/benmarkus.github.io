import { Routes } from '@angular/router';
import { ProjectsPage } from './features/projects/projects-page/projects-page';

export const routes: Routes = [
  { path: 'projects', component: ProjectsPage },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
];
