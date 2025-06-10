
class MapService {
  private static instance: MapService;
  private googleMapsLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  static getInstance(): MapService {
    if (!MapService.instance) {
      MapService.instance = new MapService();
    }
    return MapService.instance;
  }

  async loadGoogleMaps(): Promise<void> {
    if (this.googleMapsLoaded) {
      return Promise.resolve();
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        this.googleMapsLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      // Use environment variable or fallback to placeholder
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBKj9W5QjzJhwj9hUj9X3K2L1M4n5P6R7Q';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.googleMapsLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps'));
      };

      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }

  createMap(container: HTMLElement, options: any = {}) {
    if (!window.google || !window.google.maps) {
      throw new Error('Google Maps not loaded');
    }

    const defaultOptions = {
      center: { lat: 39.8283, lng: -98.5795 },
      zoom: 4,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };

    return new window.google.maps.Map(container, { ...defaultOptions, ...options });
  }

  createMarker(map: any, position: { lat: number; lng: number }, options: any = {}) {
    if (!window.google || !window.google.maps) {
      throw new Error('Google Maps not loaded');
    }

    return new window.google.maps.Marker({
      position,
      map,
      ...options
    });
  }

  createInfoWindow(content: string) {
    if (!window.google || !window.google.maps) {
      throw new Error('Google Maps not loaded');
    }

    return new window.google.maps.InfoWindow({
      content
    });
  }

  fitBounds(map: any, markers: any[]) {
    if (!window.google || !window.google.maps || markers.length === 0) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(marker => {
      bounds.extend(marker.getPosition());
    });
    map.fitBounds(bounds);
  }
}

export default MapService;
