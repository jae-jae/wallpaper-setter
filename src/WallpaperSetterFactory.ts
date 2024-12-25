import { IWallpaperSetter } from "./interfaces/IWallpaperSetter";
import { MacOSWallpaperSetter } from "./implementations/MacOSWallpaperSetter";
import { WindowsWallpaperSetter } from "./implementations/WindowsWallpaperSetter";
import { LinuxWallpaperSetter } from "./implementations/LinuxWallpaperSetter";

export class WallpaperSetterFactory {
  static create(): IWallpaperSetter {
    const platform = process.platform;

    switch (platform) {
      case "darwin":
        return new MacOSWallpaperSetter();
      case "win32":
        return new WindowsWallpaperSetter();
      case "linux":
        return new LinuxWallpaperSetter();
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
