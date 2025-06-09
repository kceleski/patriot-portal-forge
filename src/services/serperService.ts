
const SERPER_API_KEY = '733250b24251587060f2279318b07749da0b86fe';

export interface SerperMapResult {
  title: string;
  address: string;
  phoneNumber?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  latitude?: number;
  longitude?: number;
  cid?: string;
  placeId?: string;
}

export interface SerperPlaceResult extends SerperMapResult {
  description?: string;
  category?: string;
  hours?: string;
}

export class SerperService {
  static async searchMaps(query: string): Promise<SerperMapResult[]> {
    try {
      const response = await fetch(`https://google.serper.dev/maps?q=${encodeURIComponent(query)}&apiKey=${SERPER_API_KEY}`);
      const data = await response.json();
      
      return data.places?.map((place: any) => ({
        title: place.title,
        address: place.address,
        phoneNumber: place.phoneNumber,
        website: place.website,
        rating: place.rating,
        reviews: place.reviews,
        latitude: place.gpsCoordinates?.latitude,
        longitude: place.gpsCoordinates?.longitude,
        cid: place.cid,
        placeId: place.placeId
      })) || [];
    } catch (error) {
      console.error('Error searching maps:', error);
      return [];
    }
  }

  static async searchPlaces(query: string): Promise<SerperPlaceResult[]> {
    try {
      const response = await fetch(`https://google.serper.dev/places?q=${encodeURIComponent(query)}&apiKey=${SERPER_API_KEY}`);
      const data = await response.json();
      
      return data.places?.map((place: any) => ({
        title: place.title,
        address: place.address,
        phoneNumber: place.phoneNumber,
        website: place.website,
        rating: place.rating,
        reviews: place.reviews,
        latitude: place.gpsCoordinates?.latitude,
        longitude: place.gpsCoordinates?.longitude,
        cid: place.cid,
        placeId: place.placeId,
        description: place.description,
        category: place.category,
        hours: place.hours
      })) || [];
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  }

  static async getReviews(cid: string): Promise<any[]> {
    try {
      const response = await fetch(`https://google.serper.dev/reviews?cid=${cid}&apiKey=${SERPER_API_KEY}`);
      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      console.error('Error getting reviews:', error);
      return [];
    }
  }

  static async searchImages(query: string): Promise<any[]> {
    try {
      const response = await fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: {
          'X-API-KEY': SERPER_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: query })
      });
      const data = await response.json();
      return data.images || [];
    } catch (error) {
      console.error('Error searching images:', error);
      return [];
    }
  }
}
