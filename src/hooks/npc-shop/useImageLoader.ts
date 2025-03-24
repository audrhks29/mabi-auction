import { useEffect, useState } from "react";

export function useImageLoader(data: any, tabNumber: number) {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const totalImages = data?.[tabNumber]?.item?.length || 0;

  useEffect(() => {
    setLoadedImages([]);
    setFailedImages([]);
  }, [tabNumber, data]);

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => (prev.includes(imageUrl) ? prev : [...prev, imageUrl]));
  };

  const handleImageError = (imageUrl: string) => {
    setFailedImages(prev => (prev.includes(imageUrl) ? prev : [...prev, imageUrl]));
    handleImageLoad(imageUrl);
  };

  const allImagesLoaded = loadedImages.length === totalImages && totalImages > 0;

  return { totalImages, allImagesLoaded, handleImageLoad, handleImageError };
}
