import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageSrc(path?: string) {
  if (!path) return '';

  // Clean the path: replace backslashes and remove leading slashes
  const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');

  // Use Vite's BASE_URL to ensure it works in dev and production
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
