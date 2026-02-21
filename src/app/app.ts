import {
  Component,
  OnInit,
  signal,
  inject,
  computed,
  ElementRef,
  DestroyRef,
  afterNextRender,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import { SplashOverlayComponent } from '../core/splash/splash-overlay.component';

type ResponsiveImages = { desktop: string[]; mobile: string[] };
type GalleryImages = string[] | ResponsiveImages;

type GallerySection = {
  id: string;
  icon: string;
  title: string;
  description: string;
  images: GalleryImages;
};

@Component({
  selector: 'app-root',
  imports: [SplashOverlayComponent],
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
  private readonly elementRef = inject(ElementRef);
  protected readonly title = signal('hermitage');
  protected readonly isScrolled = signal(false);
  protected readonly revealedHeroImages = signal<Set<string>>(new Set());
  // ✅ Lightbox universal (sirve para gallery y rooms)
  protected readonly lightboxOpen = signal(false);
  protected readonly lightboxImages = signal<string[]>([]);
  protected readonly lightboxIndex = signal(0);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  readonly heroRevealed = signal(false);
  // Detector de viewport Mobile/Desktop
  protected readonly isMobile = signal(false);
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

  gallery: GallerySection[] = [
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
    {
      id: 'breakfast',
      icon: 'assets/icons/brakfast.svg',
      title: 'Desayuno',
      description: 'Comenzá tu día...',
      images: {
        desktop: [
          'assets/gallery/desayuno/des-1-d.avif',
          'assets/gallery/desayuno/des-2-d.avif',
          'assets/gallery/desayuno/des-3-d.avif',
          'assets/gallery/desayuno/des-6-d.avif',
          'assets/gallery/desayuno/des-7-d.avif',
          'assets/gallery/desayuno/des-8-d.avif',
          'assets/gallery/desayuno/des-9-d.avif',
        ],
        mobile: [
          'assets/gallery/desayuno/des-1-m.avif',
          'assets/gallery/desayuno/des-10-m.avif',
          'assets/gallery/desayuno/des-11-m.avif',
          'assets/gallery/desayuno/des-4-dm.avif',
          'assets/gallery/desayuno/des-5-dm.avif',
        ],
      },
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

  constructor() {
    afterNextRender(() => {
      const root = this.el.nativeElement;

      // ✅ sin <HTMLElement> genérico (evita ts(2347))
      const heroes = root.querySelectorAll('.js-hero-wipe') as NodeListOf<HTMLElement>;
      if (!heroes.length) return;

      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).classList.add('is-revealed');
            this.heroRevealed.set(true);
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
      );

      heroes.forEach((h) => obs.observe(h));
      this.destroyRef.onDestroy(() => obs.disconnect());

      // Inicializar Flatpickr para el date picker
      this.initDatePicker();

      // Detectar viewport mobile/desktop
      this.checkViewport();
      const resizeHandler = () => this.checkViewport();
      window.addEventListener('resize', resizeHandler);
      this.destroyRef.onDestroy(() => window.removeEventListener('resize', resizeHandler));
    });
  }

  /**
   * Inicializa el date picker con Air Datepicker y configuración premium
   */
  private initDatePicker(): void {
    const dateInput = document.getElementById('contact-date') as HTMLInputElement;
    if (!dateInput) return;

    new AirDatepicker(dateInput, {
      locale: localeEs,
      dateFormat: 'dd/MM/yyyy',
      minDate: new Date(),
      autoClose: true,
      isMobile: false,
      inline: false,
      navTitles: {
        days: 'MMMM yyyy',
      },
      buttons: [],
    });
  }

  ngOnInit() {
    this.initSEO();
    this.initAOS();
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

  /**
   * Detecta si el viewport es mobile o desktop
   */
  private checkViewport(): void {
    this.isMobile.set(window.innerWidth < 768);
  }

  // Helper: devuelve la primera imagen (desktop)
  protected getFirstImage(images: (string | { desktop: string; mobile: string })[]): string {
    const first = images[0];
    return typeof first === 'string' ? first : first.desktop;
  }

  // ---------------- LIGHTBOX (universal) ----------------
  protected openLightbox(
    imageSrc: string,
    images: (string | { desktop: string; mobile: string })[],
    focusId?: string,
  ): void {
    if (!images?.length) return;

    const idx = images.indexOf(imageSrc);
    this.lightboxImages.set(images.map((img) => (typeof img === 'string' ? img : img.desktop)));
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

  /**
   *  Abre el lightbox para una galería específica, adaptando las imágenes según el viewport (mobile/desktop) y posicionando el índice en la imagen seleccionada. También bloquea el scroll del fondo y opcionalmente enfoca un elemento dentro del lightbox para mejorar la accesibilidad.
   * @param images
   * @param startIndex
   * @param focusId
   * @returns
   */
  protected openGalleryLightbox(images: GalleryImages, startIndex = 0, focusId?: string): void {
    const list = this.getImagesByViewport(images);
    if (!list.length) return;

    const safeIndex = Math.min(Math.max(startIndex, 0), list.length - 1);

    this.lightboxImages.set(list);
    this.lightboxIndex.set(safeIndex);
    this.lightboxOpen.set(true);
    document.documentElement.classList.add('overflow-hidden');

    queueMicrotask(() => {
      if (!focusId) return;
      document.getElementById(focusId)?.focus();
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
    this.titleService.setTitle('Hermitage Hotel Tandil | Hotel de Lujo en las Sierras');

    // Actualizar meta tags
    this.meta.updateTag({
      name: 'description',
      content:
        'Hermitage Hotel en Tandil, Argentina. Hotel de lujo con spa, habitaciones premium y vistas a las sierras. Experiencia única de descanso y bienestar en la naturaleza.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'hotel tandil, hotel tandil, hotel lujo tandil, spa tandil, turismo tandil, sierras tandil, alojamiento tandil, hotel 5 estrellas, wellness tandil, escapada romantica tandil',
    });

    // Open Graph
    this.meta.updateTag({
      property: 'og:title',
      content: 'Hermitage Hotel Tandil | Hotel de Lujo en las Sierras',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Descubre el refugio perfecto en las sierras de Tandil. Hotel de lujo con spa, habitaciones premium y experiencias wellness únicas.',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://hermitagetandil.com/assets/previewh.avif',
    });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:url', content: 'https://hermitagetandil.com' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Hermitage Hotel Tandil' });
    this.meta.updateTag({
      name: 'twitter:description',
      content:
        'Descubre el refugio perfecto en las sierras de Tandil. Hotel de lujo con spa, habitaciones premium y experiencias wellness únicas.',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://hermitagetandil.com/assets/previewh.avif',
    });
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

  /**
   *  Dado un conjunto de imágenes que pueden ser un array simple o un objeto con versiones para desktop y mobile, esta función devuelve el array de imágenes correspondiente al viewport actual. Si el formato es responsive, selecciona la lista adecuada según si el usuario está en un dispositivo móvil o de escritorio. Además, incluye un fallback para asegurar que siempre se devuelva una lista de imágenes válida, incluso si alguna de las versiones queda vacía.
   * @param images
   * @returns
   */
  protected getImagesByViewport(images: GalleryImages): string[] {
    // Caso normal (hall, terraza, gym): ya es string[]
    if (Array.isArray(images)) return images;

    // Caso responsive (desayuno)
    const list = this.isMobile() ? images.mobile : images.desktop;

    // fallback por si algún día te queda vacío
    return list?.length ? list : images.desktop;
  }
}
