export const API_BASE_URL = 'https://rashtrakulkustisankul.com/hdm/api';
export const IMAGE_BASE_URL = 'https://rashtrakulkustisankul.com/hdm';

/**
 * Resolve full image URL for menu items and category icons
 */
export const resolveImageUrl = (url) => {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:') ||
    url.startsWith('data:')
  ) {
    return url;
  }
  return `${IMAGE_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};
