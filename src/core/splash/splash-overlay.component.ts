import { Component, inject } from '@angular/core';
import { SplashService } from './splash.service';

@Component({
  selector: 'app-splash-overlay',
  template: `
    @if (splash.visible()) {
      <div class="splash" [class.splash-leave]="splash.leaving()" role="status" aria-live="polite">
        <div class="splash-backdrop"></div>

        <div class="splash-card">
          <div class="splash-logo">
            <img
              src="assets/logos/hotel_logo_blanco.svg"
              alt="Hermitage Hotel"
              class="h-14 sm:h-16"
            />
            <img src="assets/stars.png" alt="3 estrellas" class="h-5 sm:h-6 mt-2 opacity-90" />
          </div>

          <p class="splash-tagline">Donde la calma encuentra su hogar</p>

          <div class="splash-progress" aria-hidden="true">
            <span></span>
          </div>

          <p class="splash-hint">Cargando experiencia…</p>
        </div>

        <div class="splash-wipe" aria-hidden="true"></div>
      </div>
    }
  `,
})
export class SplashOverlayComponent {
  readonly splash = inject(SplashService);
}
