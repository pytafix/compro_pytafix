import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pytafix.com',
      lastModified: new Date(),
    },
    {
      url: 'https://pytafix.com/layanan',
      lastModified: new Date(),
    },
    {
      url: 'https://pytafix.com/tentang-kami',
      lastModified: new Date(),
    },
    {
      url: 'https://pytafix.com/booking-servis',
      lastModified: new Date(),
    },
    {
      url: 'https://pytafix.com/cek-status-servis',
      lastModified: new Date(),
    },
  ]
}
