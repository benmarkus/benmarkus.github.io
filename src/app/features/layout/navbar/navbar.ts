import { Component, ElementRef, HostListener, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  protected readonly stuck = signal(false);

  @ViewChild('nav') private navRef?: ElementRef<HTMLElement>;

  private pendingStickyScroll = false;
  private navigationSub?: Subscription;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.navigationSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.pendingStickyScroll) {
          return;
        }
        this.pendingStickyScroll = false;
        requestAnimationFrame(() => this.scrollToStickyBoundary());
      });
  }

  ngOnDestroy(): void {
    this.navigationSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    const el = this.navRef?.nativeElement;
    if (!el) {
      return;
    }
    this.stuck.set(el.getBoundingClientRect().top <= 0);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected onNavLinkClick(): void {
    if (this.stuck()) {
      this.pendingStickyScroll = true;
    }
  }

  private scrollToStickyBoundary(): void {
    const el = this.navRef?.nativeElement;
    if (!el) {
      return;
    }
    el.style.position = 'static';
    const rect = el.getBoundingClientRect();
    el.style.position = '';
    const target = Math.round(window.scrollY + rect.top) + 1;
    window.scrollTo({ top: target, behavior: 'instant' });
  }
}
