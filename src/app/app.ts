import { Component, OnInit, signal, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  host: {
    '(window:scroll)': 'onWindowScroll()',
    '(window:keydown)': 'onKeyDown($event)',
  },
})
export class App implements OnInit {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  protected readonly title = signal('hermitage');
  protected readonly isScrolled = signal(false);
  protected readonly lightboxOpen = signal(false);
  protected readonly currentImage = signal('');
  protected readonly currentImageIndex = signal(0);
  protected readonly currentGalleryImages = signal<string[]>([]);

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

  gallery = [
    {
      id: 'hall',
      title: 'Hall',
      description:
        'Un espacio elegante pensado para tu descanso, donde cada detalle invita a la relajación y el confort.',
      images: [
        'assets/gallery/hall/1.avif',
        'assets/gallery/hall/2.avif',
        'assets/gallery/hall/3.avif',
        'assets/gallery/hall/4.avif',
        'assets/gallery/hall/5.avif',
      ],
    },
    {
      id: 'terrace',
      title: 'Terraza',
      description:
        'Disfrutá de vistas panorámicas a las sierras en un ambiente al aire libre con pileta y espacios de descanso.',
      images: [
        'assets/gallery/terraza/1.avif',
        'assets/gallery/terraza/2.avif',
        'assets/gallery/terraza/3.avif',
        'assets/gallery/terraza/4.avif',
      ],
    },
    {
      id: 'parking',
      title: 'Estacionamiento',
      description:
        'Estacionamiento cubierto y seguro para tu vehículo, con acceso directo al hotel.',
      images: [
        'assets/gallery/cochera/1.avif',
        'assets/gallery/cochera/2.avif',
        'assets/gallery/cochera/3.avif',
        'assets/gallery/cochera/4.avif',
      ],
    },
    {
      id: 'gym',
      title: 'Gimnasio',
      description:
        'Mantené tu rutina de ejercicios en nuestro gimnasio equipado con máquinas modernas y espacios funcionales.',
      images: [
        'assets/gallery/gym/g1.avif',
        'assets/gallery/gym/g2.avif',
        'assets/gallery/gym/g3.avif',
        'assets/gallery/gym/g4.avif',
        'assets/gallery/gym/g5.avif',
      ],
    },
  ];

  ngOnInit() {
    this.initSEO();
    this.initAOS();
  }

  /**
   * Detecta cuando el usuario hace scroll y actualiza el estado del header
   */
  protected onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.isScrolled.set(scrollPosition > 700);
  }
  /**
   * Abre el lightbox con la imagen seleccionada
   */
  protected openLightbox(imageSrc: string, images: string[]): void {
    this.currentImage.set(imageSrc);
    this.currentGalleryImages.set(images);
    this.currentImageIndex.set(images.indexOf(imageSrc));
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el lightbox
   */
  protected closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  /**
   * Navega a la imagen anterior en el lightbox
   */
  protected previousImage(): void {
    const images = this.currentGalleryImages();
    const currentIndex = this.currentImageIndex();
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    this.currentImageIndex.set(newIndex);
    this.currentImage.set(images[newIndex]);
  }

  /**
   * Navega a la imagen siguiente en el lightbox
   */
  protected nextImage(): void {
    const images = this.currentGalleryImages();
    const currentIndex = this.currentImageIndex();
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    this.currentImageIndex.set(newIndex);
    this.currentImage.set(images[newIndex]);
  }

  /**
   * Maneja la navegación del lightbox con el teclado
   */
  protected onKeyDown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
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
