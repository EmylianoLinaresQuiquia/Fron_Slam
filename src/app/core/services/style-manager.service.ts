import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addStyle(href: string): void {
    const linkElement = this.renderer.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    this.renderer.appendChild(this.document.head, linkElement);
  }

  removeStyle(href: string): void {
    const linkElements = this.document.head.querySelectorAll(`link[href="${href}"]`);
    linkElements.forEach((link) => {
      this.renderer.removeChild(this.document.head, link);
    });
  }
}
