import { Component } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../project.model';
import projectsData from '../../../../data/projects.json';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCard],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
  projects: Project[] = projectsData;
}
