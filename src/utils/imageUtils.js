// Image URL helpers
// Currently using Unsplash as image source.
// To switch to Cloudinary: upload images to your dkaknfwcl account under
// a "foodstore/" folder, then replace getCloudinaryUrl calls.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Build an optimised Cloudinary URL.
 * Usage: getCloudinaryUrl('foodstore/burger_classic')
 * Applies f_auto (WebP on modern browsers) + q_auto (smart compression).
 */
export function getCloudinaryUrl(publicId, { width = 600 } = {}) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
}

/**
 * Fallback handler for broken images — replace src with a placeholder.
 */
export function handleImageError(e) {
  e.currentTarget.src =
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&fit=crop';
  e.currentTarget.onerror = null; // prevent infinite loop
}
