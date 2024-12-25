import { execFile } from "child_process";
import { promisify } from "util";
import { IWallpaperSetter } from "../interfaces/IWallpaperSetter";

const execFileAsync = promisify(execFile);

export class LinuxWallpaperSetter implements IWallpaperSetter {
  async setWallpaper(imagePath: string): Promise<void> {
    try {
      // Try GNOME
      await execFileAsync("gsettings", [
        "set",
        "org.gnome.desktop.background",
        "picture-uri",
        `file://${imagePath}`,
      ]);
    } catch {
      try {
        // Try KDE
        await execFileAsync("qdbus", [
          "org.kde.plasmashell",
          "/PlasmaShell",
          "org.kde.PlasmaShell.evaluateScript",
          `
            var allDesktops = desktops();
            for (var i = 0; i < allDesktops.length; i++) {
              d = allDesktops[i];
              d.wallpaperPlugin = 'org.kde.image';
              d.currentConfigGroup = Array('Wallpaper', 'org.kde.image', 'General');
              d.writeConfig('Image', 'file://${imagePath}');
            }
          `,
        ]);
      } catch {
        try {
          // Try XFCE
          await execFileAsync("xfconf-query", [
            "-c",
            "xfce4-desktop",
            "-p",
            "/backdrop/screen0/monitor0/workspace0/last-image",
            "-s",
            imagePath,
          ]);
        } catch (error) {
          throw new Error(
            "Failed to set wallpaper on Linux: Unsupported desktop environment"
          );
        }
      }
    }
  }
}
