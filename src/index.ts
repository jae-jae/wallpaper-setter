import { WallpaperSetterFactory } from "./WallpaperSetterFactory";
import { IWallpaperSetter } from "./interfaces/IWallpaperSetter";

export async function setWallpaper(imagePath: string): Promise<void> {
  try {
    const wallpaperSetter: IWallpaperSetter = WallpaperSetterFactory.create();
    await wallpaperSetter.setWallpaper(imagePath);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to set wallpaper: ${errorMessage}`);
  }
}

export { IWallpaperSetter } from "./interfaces/IWallpaperSetter";
export { WallpaperSetterFactory } from "./WallpaperSetterFactory";
