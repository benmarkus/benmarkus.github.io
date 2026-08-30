import { Component, Input, signal } from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  @Input() project!: Project;

  protected readonly mediaLoaded = signal(false);
}
