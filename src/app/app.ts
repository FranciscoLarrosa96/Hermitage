import { Component, OnInit, signal, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

type RoomCategory = {
  id: string;
  name: string;
  tagline: string;
  hero: string;
  thumbs: string[]; // 3 mini previews
  gallery: string[]; // álbum completo por categoría
  features: { icon: string; label: string }[];
};

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
  lightboxImages: string[] = [];
  lightboxIndex = 0;
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
      icon: 'assets/icons/hall.svg',
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
      icon: 'assets/icons/terrace.svg',
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
      icon: 'assets/icons/garage.svg',
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
      icon: 'assets/icons/gym.svg',
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

  roomCategories: RoomCategory[] = [
    {
      id: 'standard',
      name: 'Standard',
      tagline: 'Cómoda y funcional, ideal para una estadía tranquila.',
      hero: 'assets/rooms/standard/hero.avif',
      thumbs: [
        'assets/rooms/standard/t1.webp',
        'assets/rooms/standard/t2.avif',
        'assets/rooms/standard/t3.avif',
      ],
      gallery: [
        'assets/rooms/standard/1.avif',
        'assets/rooms/standard/2.avif',
        'assets/rooms/standard/3.avif',
        // ...todas las standard (curadas)
      ],
      features: [
        { icon: 'assets/icons/bed.svg', label: 'Cama matrimonial' },
        { icon: 'assets/icons/shower.svg', label: 'Baño privado' },
        { icon: 'assets/icons/wifi.svg', label: 'Wi-Fi' },
      ],
    },
    {
      id: 'superior',
      name: 'Superior',
      tagline: 'Más amplia y luminosa. Algunas con balcón y vista a la plaza.',
      hero: 'assets/rooms/superior/hero.jpg',
      thumbs: [
        'assets/rooms/superior/t1.jpg',
        'assets/rooms/superior/t2.jpg',
        'assets/rooms/superior/t3.jpg',
      ],
      gallery: [
        'assets/rooms/superior/1.jpg',
        'assets/rooms/superior/2.jpg',
        'assets/rooms/superior/3.jpg',
      ],
      features: [
        { icon: 'assets/icons/bed.svg', label: 'Cama matrimonial' },
        { icon: 'assets/icons/terrace.svg', label: 'Balcón (según disp.)' },
        { icon: 'assets/icons/wifi.svg', label: 'Wi-Fi' },
      ],
    },
    {
      id: 'suite',
      name: 'Suite',
      tagline: 'Más moderna y amplia, con frigobar y jacuzzi con hidromasaje.',
      hero: 'assets/rooms/suite/hero.jpg',
      thumbs: [
        'assets/rooms/suite/t1.jpg',
        'assets/rooms/suite/t2.jpg',
        'assets/rooms/suite/t3.jpg',
      ],
      gallery: ['assets/rooms/suite/1.jpg', 'assets/rooms/suite/2.jpg', 'assets/rooms/suite/3.jpg'],
      features: [
        { icon: 'assets/icons/bed.svg', label: 'Cama más amplia' },
        { icon: 'assets/icons/frigobar.svg', label: 'Frigobar' },
        { icon: 'assets/icons/jacuzzi.png', label: 'Jacuzzi / hidromasaje' },
      ],
    },
  ];
  roomsGallery = [
    {
      id: 'standard',
      title: 'Standard',
      icon: 'assets/icons/bed.svg',
      description: 'Cómoda y funcional, ideal para una estadía tranquila.',
      images: [
        'assets/rooms/standard/hero.avif',
        'assets/rooms/standard/1.avif',
        'assets/rooms/standard/2.avif',
        'assets/rooms/standard/3.avif',
      ],
      features: [
        { icon: 'assets/icons/bed.svg', label: 'Cama matrimonial' },
        { icon: 'assets/icons/shower.svg', label: 'Baño privado' },
        { icon: 'assets/icons/wifi.svg', label: 'Wi-Fi' },
        { icon: 'assets/icons/air.svg', label: 'Aire acondicionado' },
      ],
    },

    {
      id: 'superior',
      title: 'Superior',
      icon: 'assets/icons/terrace.svg',
      description: 'Más amplia y luminosa. Algunas con balcón y vista a la plaza.',
      images: [
        'assets/rooms/superior/hero.jpg',
        'assets/rooms/superior/1.jpg',
        'assets/rooms/superior/2.jpg',
        'assets/rooms/superior/3.jpg',
      ],
      features: [
        { icon: 'assets/icons/bed.svg', label: 'Cama matrimonial' },
        { icon: 'assets/icons/terrace.svg', label: 'Balcón (según disp.)' },
        { icon: 'assets/icons/wifi.svg', label: 'Wi-Fi' },
        { icon: 'assets/icons/frigobar.svg', label: 'Frigobar' },
      ],
    },

    {
      id: 'suite',
      title: 'Suite',
      icon: 'assets/icons/jacuzzi.png',
      description: 'Más moderna y amplia, con frigobar y jacuzzi con hidromasaje.',
      images: [
        'assets/rooms/suite/hero.jpg',
        'assets/rooms/suite/1.jpg',
        'assets/rooms/suite/2.jpg',
        'assets/rooms/suite/3.jpg',
      ],
      features: [
        { icon: 'assets/icons/bed.svg', label: 'Cama más amplia' },
        { icon: 'assets/icons/frigobar.svg', label: 'Frigobar' },
        { icon: 'assets/icons/jacuzzi.png', label: 'Jacuzzi / hidromasaje' },
        { icon: 'assets/icons/wifi.svg', label: 'Wi-Fi' },
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

  get imagenSeleccionada(): string | null {
    return this.lightboxOpen() ? this.lightboxImages[this.lightboxIndex] : null;
  }

  openLightboxRooms(img: string, images: string[]) {
    this.lightboxImages = images;
    const idx = images.indexOf(img);
    this.lightboxIndex = idx >= 0 ? idx : 0;

    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';

    queueMicrotask(() => {
      const el = document.getElementById('roomsLightbox');
      el?.focus();
    });
  }

  cerrarLightboxRooms() {
    this.lightboxOpen.set(false);
    this.lightboxImages = [];
    this.lightboxIndex = 0;
    document.body.style.overflow = '';
  }

  siguiente(ev?: Event) {
    ev?.stopPropagation();
    if (!this.lightboxImages.length) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % this.lightboxImages.length;
  }

  anterior(ev?: Event) {
    ev?.stopPropagation();
    if (!this.lightboxImages.length) return;
    this.lightboxIndex =
      (this.lightboxIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;
  }
}
