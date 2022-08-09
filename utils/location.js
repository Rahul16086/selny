import { GOOGLE_API_KEY } from "@env";

const API_KEY = GOOGLE_API_KEY;

export const getMapPreview = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${API_KEY}`;
};
