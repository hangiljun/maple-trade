import { MetadataRoute } from 'next'
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const BASE_URL = 'https://www.xn--kj0b36u99jp4ed8l.com';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/tip`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    const [newsSnap, tipsSnap, reviewsSnap] = await Promise.all([
      getDocs(query(collection(db, 'news'), orderBy('createdAt', 'desc'))),
      getDocs(query(collection(db, 'tips'), orderBy('createdAt', 'desc'))),
      getDocs(query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))),
    ]);

    const newsRoutes: MetadataRoute.Sitemap = newsSnap.docs.map((doc) => ({
      url: `${BASE_URL}/news/${doc.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const tipRoutes: MetadataRoute.Sitemap = tipsSnap.docs.map((doc) => ({
      url: `${BASE_URL}/tip/${doc.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const reviewRoutes: MetadataRoute.Sitemap = reviewsSnap.docs.map((doc) => ({
      url: `${BASE_URL}/reviews/${doc.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...newsRoutes, ...tipRoutes, ...reviewRoutes];
  } catch {
    return staticRoutes;
  }
}
