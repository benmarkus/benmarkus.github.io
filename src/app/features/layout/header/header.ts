import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';

/** Split so the plain address never appears as a scrapable literal. */
const EMAIL_USER = 'markusbence0';
const EMAIL_DOMAIN = 'gmail';
const EMAIL_TLD = 'com';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly emailDisplay = `${EMAIL_USER} [at] ${EMAIL_DOMAIN} (dot) ${EMAIL_TLD}`;
  protected readonly copied = signal(false);
  protected readonly tipLabel = signal('Click to copy');
  protected readonly hovering = signal(false);
  protected readonly dismissed = signal(false);

  @ViewChild('emailWrap') private emailWrapRef?: ElementRef<HTMLElement>;

  private copiedTimer?: ReturnType<typeof setTimeout>;
  private labelResetTimer?: ReturnType<typeof setTimeout>;

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const wrap = this.emailWrapRef?.nativeElement;
    if (wrap && !wrap.contains(event.target as Node)) {
      this.dismissed.set(true);
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }

  protected async copyEmail(): Promise<void> {
    const email = `${EMAIL_USER}@${EMAIL_DOMAIN}.${EMAIL_TLD}`;

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      if (!this.copyFallback(email)) {
        return;
      }
    }

    this.dismissed.set(false);
    clearTimeout(this.labelResetTimer);
    this.tipLabel.set('Copied to clipboard');
    this.copied.set(true);

    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => {
      this.copied.set(false);

      if (this.hovering()) {
        this.tipLabel.set('Click to copy');
      } else {
        this.labelResetTimer = setTimeout(() => this.tipLabel.set('Click to copy'), 200);
      }
    }, 2000);
  }

  /** For browsers without the async clipboard API, or a denied permission. */
  private copyFallback(text: string): boolean {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();

    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }

    document.body.removeChild(field);
    return ok;
  }
}
