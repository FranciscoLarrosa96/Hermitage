import {
  Component,
  OnInit,
  AfterViewInit,
  signal,
  inject,
  computed,
  ElementRef,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

type RoomCategory = {
  id: string;
  name: string;
  tagline: string;
  hero: string;
  thumbs: string[];
  gallery: string[];
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
export class App implements OnInit, AfterViewInit {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly elementRef = inject(ElementRef);
  protected readonly title = signal('hermitage');
  protected readonly isScrolled = signal(false);
  protected readonly revealedHeroImages = signal<Set<string>>(new Set());
  // ✅ Lightbox universal (sirve para gallery y rooms)
  protected readonly lightboxOpen = signal(false);
  protected readonly lightboxImages = signal<string[]>([]);
  protected readonly lightboxIndex = signal(0);
  private heroObserver?: IntersectionObserver;

  protected readonly selectedImage = computed(() => {
    const imgs = this.lightboxImages();
    const idx = this.lightboxIndex();
    return imgs[idx] ?? '';
  });
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

  roomsGallery = [
    {
      id: 'standard',
      title: 'Standard',
      icon: 'assets/icons/bed.svg',
      description: 'Cómoda y funcional, ideal para una estadía tranquila.',
      hero: 'assets/rooms/standard/hero.avif',
      images: [
        'assets/rooms/standard/2.avif',
        'assets/rooms/standard/3.avif',
        'assets/rooms/standard/4.avif',
      ],
      features: [
        { icon: 'assets/icons/bed.svg', label: 'Cama matrimonial' },
        { icon: 'assets/icons/shower.svg', label: 'Baño privado' },
        { icon: 'assets/icons/wifi.svg', label: 'Wi-Fi' },
        { icon: 'assets/icons/acondicionado.svg', label: 'Aire acondicionado' },
      ],
    },

    {
      id: 'superior',
      title: 'Superior',
      icon: 'assets/icons/terrace.svg',
      description: 'Más amplia y luminosa. Algunas con balcón y vista a la plaza.',
      hero: 'assets/rooms/superior/hero.avif',
      images: [
        'assets/rooms/superior/1.avif',
        'assets/rooms/superior/3.avif',
        'assets/rooms/superior/4.avif',
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
      hero: 'assets/rooms/suite/hero.avif',
      images: [
        'assets/rooms/suite/2.avif',
        'assets/rooms/suite/3.avif',
        'assets/rooms/suite/4.avif',
        'assets/rooms/suite/5.avif',
        'assets/rooms/suite/6.avif',
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

  ngAfterViewInit() {
    // SSR safety
    if (typeof window === 'undefined') return;

    const heroes: NodeListOf<HTMLElement> =
      this.elementRef.nativeElement.querySelectorAll('.js-hero-wipe');

    if (!heroes.length) return;

    this.heroObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    heroes.forEach((el) => this.heroObserver!.observe(el));
  }

  /**
   * Verifica si una imagen hero específica ya fue revelada
   */
  protected isHeroRevealed(imageId: string): boolean {
    return this.revealedHeroImages().has(imageId);
  }

  /**
   * Retorna todas las imágenes de una room (hero + resto) para el lightbox
   */
  protected getAllRoomImages(section: any): string[] {
    return [section.hero, ...section.images];
  }

  /**
   * Detecta cuando el usuario hace scroll y actualiza el estado del header
   */
  protected onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.isScrolled.set(scrollPosition > 700);
  }
  // ---------------- LIGHTBOX (universal) ----------------
  protected openLightbox(imageSrc: string, images: string[], focusId?: string): void {
    if (!images?.length) return;

    const idx = images.indexOf(imageSrc);
    this.lightboxImages.set(images);
    this.lightboxIndex.set(idx >= 0 ? idx : 0);

    this.lightboxOpen.set(true);
    document.documentElement.classList.add('overflow-hidden'); // lock scroll (mejor que body)

    // opcional: foco para accesibilidad
    queueMicrotask(() => {
      if (!focusId) return;
      const el = document.getElementById(focusId);
      el?.focus();
    });
  }

  protected closeLightbox(): void {
    this.lightboxOpen.set(false);
    this.lightboxImages.set([]);
    this.lightboxIndex.set(0);
    document.documentElement.classList.remove('overflow-hidden');
  }

  protected nextImage(ev?: Event): void {
    ev?.stopPropagation();
    const imgs = this.lightboxImages();
    if (!imgs.length) return;
    this.lightboxIndex.set((this.lightboxIndex() + 1) % imgs.length);
  }

  protected previousImage(ev?: Event): void {
    ev?.stopPropagation();
    const imgs = this.lightboxImages();
    if (!imgs.length) return;
    this.lightboxIndex.set((this.lightboxIndex() - 1 + imgs.length) % imgs.length);
  }

  protected goToImage(i: number, ev?: Event): void {
    ev?.stopPropagation();
    const imgs = this.lightboxImages();
    if (!imgs.length) return;
    const idx = Math.max(0, Math.min(i, imgs.length - 1));
    this.lightboxIndex.set(idx);
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
