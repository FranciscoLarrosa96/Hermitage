import { Component, OnInit, signal, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  protected readonly title = signal('hermitage');
  public readonly reviews = [
    'review1.png',
    'review2.png',
    'review3.png',
    'review4.png',
    'review5.png',
    'review6.png',
    'review7.png',
    'review8.png',
    'review9.png',
    'review10.png',
    'review11.png',
    'review12.png',
  ];

  ngOnInit() {
    this.initSEO();
    this.initAOS();
  }

  /**
   * Configura el título de la página y las meta etiquetas para mejorar el SEO. Esto incluye la descripción, palabras clave, Open Graph y Twitter Card para optimizar cómo se muestra el sitio en los motores de búsqueda y redes sociales.
   */
  private initSEO(): void {
    // Configurar título
    this.titleService.setTitle('Hermitage Boutique Hotel Tandil | Hotel de Lujo en las Sierras');

    // Actualizar meta tags
    this.meta.updateTag({
      name: 'description',
      content:
        'Hermitage Boutique Hotel en Tandil, Argentina. Hotel de lujo con spa, habitaciones premium y vistas a las sierras. Experiencia única de descanso y bienestar en la naturaleza.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'hotel tandil, hotel boutique tandil, hotel lujo tandil, spa tandil, turismo tandil, sierras tandil, alojamiento tandil, hotel 5 estrellas, wellness tandil, escapada romantica tandil',
    });

    // Open Graph
    this.meta.updateTag({
      property: 'og:title',
      content: 'Hermitage Boutique Hotel Tandil | Hotel de Lujo en las Sierras',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Descubre el refugio perfecto en las sierras de Tandil. Hotel boutique de lujo con spa, habitaciones premium y experiencias wellness únicas.',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Hermitage Boutique Hotel Tandil' });
  }

  /**
   * Devuelve un array que contiene las reseñas duplicadas para crear un efecto de marquee continuo en la sección de reseñas. Al concatenar el array consigo mismo, se asegura que las reseñas se repitan sin interrupciones cuando se desplazan horizontalmente.
   */
  get reviewsMarquee() {
    return [...this.reviews, ...this.reviews];
  }

  /**
   * Inicializa la librería AOS para animaciones al hacer scroll. Configura la duración, tipo de easing y si las animaciones se repiten o no.
   */
  private initAOS(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
    });
  }
}
