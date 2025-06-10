
import { toast } from 'react-hot-toast';

export class VoiceCommandService {
  private static instance: VoiceCommandService;

  static getInstance(): VoiceCommandService {
    if (!VoiceCommandService.instance) {
      VoiceCommandService.instance = new VoiceCommandService();
    }
    return VoiceCommandService.instance;
  }

  // DOM manipulation methods
  findElementByText(text: string): HTMLElement | null {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      if (node.textContent?.toLowerCase().includes(text.toLowerCase())) {
        const element = node.parentElement;
        if (element && (element.tagName === 'BUTTON' || element.tagName === 'A' || element.onclick)) {
          return element;
        }
      }
    }
    return null;
  }

  clickElementByText(text: string): boolean {
    const element = this.findElementByText(text);
    if (element) {
      element.click();
      return true;
    }
    return false;
  }

  fillFormByLabel(labelText: string, value: string): boolean {
    const labels = document.querySelectorAll('label');
    for (const label of labels) {
      if (label.textContent?.toLowerCase().includes(labelText.toLowerCase())) {
        const input = label.nextElementSibling as HTMLInputElement || 
                     document.getElementById(label.getAttribute('for') || '') as HTMLInputElement;
        if (input) {
          input.value = value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
      }
    }
    return false;
  }

  highlightElement(selector: string, duration: number = 2000): void {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      const originalStyle = element.style.cssText;
      element.style.outline = '3px solid #ff6b35';
      element.style.outlineOffset = '2px';
      element.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        element.style.cssText = originalStyle;
      }, duration);
    }
  }

  scrollToElementByText(text: string): boolean {
    const element = this.findElementByText(text);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.highlightElement(`#${element.id}`, 2000);
      return true;
    }
    return false;
  }

  // App state management
  getPageContext(): any {
    return {
      url: window.location.href,
      pathname: window.location.pathname,
      title: document.title,
      forms: this.getFormsOnPage(),
      buttons: this.getButtonsOnPage(),
      links: this.getLinksOnPage()
    };
  }

  private getFormsOnPage(): Array<{id: string, inputs: string[]}> {
    const forms = document.querySelectorAll('form');
    return Array.from(forms).map(form => ({
      id: form.id || 'unnamed-form',
      inputs: Array.from(form.querySelectorAll('input, textarea, select')).map(input => 
        input.getAttribute('name') || input.getAttribute('id') || input.getAttribute('placeholder') || 'unnamed-input'
      )
    }));
  }

  private getButtonsOnPage(): string[] {
    const buttons = document.querySelectorAll('button, [role="button"]');
    return Array.from(buttons).map(btn => btn.textContent?.trim() || 'unnamed-button');
  }

  private getLinksOnPage(): Array<{text: string, href: string}> {
    const links = document.querySelectorAll('a[href]');
    return Array.from(links).map(link => ({
      text: link.textContent?.trim() || 'unnamed-link',
      href: (link as HTMLAnchorElement).href
    }));
  }

  // Search assistance
  performSearchOnPage(query: string): HTMLElement[] {
    const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search" i], input[name*="search" i]');
    const results: HTMLElement[] = [];

    searchInputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        input.value = query;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        results.push(input);
        
        // Try to find and click search button
        const searchButton = input.parentElement?.querySelector('button[type="submit"], button:has([data-lucide="search"])') ||
                            input.closest('form')?.querySelector('button[type="submit"]');
        if (searchButton instanceof HTMLElement) {
          setTimeout(() => searchButton.click(), 100);
        }
      }
    });

    return results;
  }

  // Notification helpers
  showSuccess(message: string): void {
    toast.success(message);
  }

  showError(message: string): void {
    toast.error(message);
  }

  showInfo(message: string): void {
    toast(message);
  }
}

export const voiceCommandService = VoiceCommandService.getInstance();
