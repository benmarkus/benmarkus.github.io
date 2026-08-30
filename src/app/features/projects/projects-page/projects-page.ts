import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../project.model';
import projectsData from '../../../../data/projects.json';

const ROW_UNIT_PX = 4;

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCard],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage implements AfterViewInit, OnDestroy {
  projects: Project[] = [...projectsData].sort((a, b) => a.id - b.id);

  @ViewChildren('cardEl', { read: ElementRef }) private cardEls!: QueryList<ElementRef<HTMLElement>>;

  private resizeObserver?: ResizeObserver;
  private relayoutScheduled = false;

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => this.scheduleRelayout());
    this.observeCards();
    this.cardEls.changes.subscribe(() => {
      this.resizeObserver?.disconnect();
      this.observeCards();
      this.scheduleRelayout();
    });

    this.relayout();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private observeCards(): void {
    this.cardEls.forEach((ref) => this.resizeObserver!.observe(ref.nativeElement));
  }

  private scheduleRelayout(): void {
    if (this.relayoutScheduled) {
      return;
    }
    this.relayoutScheduled = true;
    requestAnimationFrame(() => {
      this.relayoutScheduled = false;
      this.relayout();
    });
  }

  private relayout(): void {
    const grid = this.cardEls.first?.nativeElement.parentElement;
    if (!grid) {
      return;
    }

    const rowGapPx = parseFloat(getComputedStyle(grid).rowGap || '0');

    this.cardEls.forEach((ref) => {
      const height = ref.nativeElement.getBoundingClientRect().height;
      const span = Math.ceil((height + rowGapPx) / (ROW_UNIT_PX + rowGapPx));
      ref.nativeElement.style.gridRowEnd = `span ${span}`;
    });
  }
}
