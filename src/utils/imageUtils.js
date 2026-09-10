// Image helpers.
// Meal images are hardcoded URLs in src/data/meals.js:
//   Armenian dishes  → Cloudinary (dkaknfwcl account, foodstore/armenian/*)
//   Everything else  → Unsplash
// This module only provides a fallback for broken images.

/**
 * Fallback handler for broken images — replace src with a placeholder.
 */
export function handleImageError(e) {
	e.currentTarget.src =
		'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&fit=crop'
	e.currentTarget.onerror = null // prevent infinite loop
}
