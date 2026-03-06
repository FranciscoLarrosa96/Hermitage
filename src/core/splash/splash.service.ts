import { Injectable, signal, computed, afterNextRender, DestroyRef, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SplashService {
  private readonly destroyRef = inject(DestroyRef);

  // visible = se muestra el overlay
  readonly visible = signal(true);
  // leaving = activa animación de salida
  readonly leaving = signal(false);

  // útil si querés bindear aria-hidden
  readonly ariaHidden = computed(() => (!this.visible() ? 'true' : 'false'));

  constructor() {
    // asegura que al menos se vea un poquito (premium, no flash)
    const MIN_MS = 3000;
    const start = performance.now();

    // cuando ya hubo 1 render, habilitamos salida
    afterNextRender(() => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);

      window.setTimeout(() => this.hide(), remaining);

      this.destroyRef.onDestroy(() => {
        // por si acaso
      });
    });
  }

  hide() {
    if (!this.visible() || this.leaving()) return;

    this.leaving.set(true);

    // igualá este tiempo con el CSS (320ms)
    window.setTimeout(() => {
      this.visible.set(false);
      this.leaving.set(false);
    }, 320);
  }
}
