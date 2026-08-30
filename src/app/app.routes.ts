import { Routes } from '@angular/router';
import { ProjectsPage } from './features/projects/projects-page/projects-page';
import { TeachingPage } from './features/teaching/teaching-page/teaching-page';

export const routes: Routes = [
  { path: 'projects', component: ProjectsPage },
  { path: 'teaching', component: TeachingPage },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
];
