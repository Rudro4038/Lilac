export const getFallbackImageUrl = publicId => {
  const cloudName = 'dxabfyao8';
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
};
