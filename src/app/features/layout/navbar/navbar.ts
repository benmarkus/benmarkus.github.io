import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly stuck = signal(false);

  @ViewChild('nav') private navRef?: ElementRef<HTMLElement>;

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
}
