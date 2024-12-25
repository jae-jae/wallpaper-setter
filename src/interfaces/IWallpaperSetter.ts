export interface IWallpaperSetter {
  setWallpaper(imagePath: string): Promise<void>;
}
