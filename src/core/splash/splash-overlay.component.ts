import { Component, inject } from '@angular/core';
import { SplashService } from './splash.service';

@Component({
  selector: 'app-splash-overlay',
  standalone: true,
  template: `
    @if (splash.visible()) {
      <div class="splash" [class.splash-leave]="splash.leaving()" role="status" aria-live="polite">
        <!-- Fondo con gradiente premium -->
        <div class="splash-backdrop"></div>

        <!-- Partículas decorativas -->
        <div class="splash-particles" aria-hidden="true">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
          <div class="particle particle-5"></div>
        </div>

        <!-- Panel principal -->
        <div class="splash-card">
          <!-- Logo con animación de entrada -->
          <div class="splash-logo">
            <div class="logo-container">
              <img
                src="assets/logos/hotel_logo_blanco.svg"
                alt="Hermitage Hotel"
                class="main-logo"
                draggable="false"
              />
              <div class="logo-glow"></div>
            </div>

            <!-- Estrellas con animación escalonada -->
            <div class="stars-container">
              <img src="assets/stars.png" alt="3 estrellas" class="stars" draggable="false" />
            </div>
          </div>

          <!-- Línea decorativa elegante -->
          <div class="splash-divider" aria-hidden="true">
            <div class="divider-elegant"></div>
          </div>

          <!-- Tagline premium -->
          <div class="splash-tagline">
            <span class="tagline-main">DONDE LA CALMA</span>
            <span class="tagline-sub">ENCUENTRA SU HOGAR</span>
          </div>

          <!-- Indicador de carga elegante -->
          <div class="splash-progress">
            <div class="progress-bar"></div>
          </div>
        </div>

        <!-- Efecto de salida mejorado -->
        <div class="splash-exit-wipe" aria-hidden="true"></div>
      </div>
    }
  `,
})
export class SplashOverlayComponent {
  readonly splash = inject(SplashService);
}
