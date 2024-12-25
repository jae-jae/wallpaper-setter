import { execFile } from "child_process";
import { promisify } from "util";
import { IWallpaperSetter } from "../interfaces/IWallpaperSetter";

const execFileAsync = promisify(execFile);

export class MacOSWallpaperSetter implements IWallpaperSetter {
  async setWallpaper(imagePath: string): Promise<void> {
    const script = `
      tell application "System Events"
        tell every desktop
          set picture to "${imagePath}"
        end tell
      end tell
    `;

    await execFileAsync("osascript", ["-e", script]);
  }
}
