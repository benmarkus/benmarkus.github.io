import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page/home-page';
import { ProjectsPage } from './features/projects/projects-page/projects-page';
import { TeachingPage } from './features/teaching/teaching-page/teaching-page';
import { CvPage } from './features/cv/cv-page/cv-page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'projects', component: ProjectsPage },
  { path: 'teaching', component: TeachingPage },
  { path: 'cv', component: CvPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
