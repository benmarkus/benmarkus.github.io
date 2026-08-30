import { Component, Input, OnDestroy, signal } from '@angular/core';
import { Project } from '../project.model';

const MIN_PLACEHOLDER_MS = 600;

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard implements OnDestroy {
  @Input() project!: Project;

  protected readonly mediaLoaded = signal(false);

  private readonly mediaStartedAt = Date.now();
  private settleTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this.settleTimer);
  }

  protected onMediaSettled(): void {
    const remaining = MIN_PLACEHOLDER_MS - (Date.now() - this.mediaStartedAt);
    if (remaining <= 0) {
      this.mediaLoaded.set(true);
      return;
    }
    this.settleTimer = setTimeout(() => this.mediaLoaded.set(true), remaining);
  }
}
