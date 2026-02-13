import { Component, inject } from '@angular/core';
import { SplashService } from './splash.service';

@Component({
  selector: 'app-splash-overlay',
  standalone: true,
  template: `
    @if (splash.visible()) {
      <div class="splash" [class.splash-leave]="splash.leaving()" role="status" aria-live="polite">
        <!-- Fondo -->
        <div class="splash-backdrop"></div>

        <!-- Panel -->
        <div class="splash-card">
          <div class="splash-logo">
            <img
              src="assets/logos/hotel_logo_blanco.svg"
              alt="Hermitage Hotel"
              class="h-16"
              draggable="false"
            />
            <img
              src="assets/stars.png"
              alt="3 estrellas"
              class="h-6 mt-2 opacity-90"
              draggable="false"
            />
          </div>

          <p class="splash-tagline">DONDE LA CALMA ENCUENTRA SU HOGAR</p>

          <div class="splash-line" aria-hidden="true"></div>
        </div>

        <!-- Cortina diagonal de salida -->
        <div class="splash-exit-wipe" aria-hidden="true"></div>
      </div>
    }
  `,
})
export class SplashOverlayComponent {
  readonly splash = inject(SplashService);
}
