import { IWallpaperSetter } from "../interfaces/IWallpaperSetter";
import { execFile } from "child_process";
import { promisify } from "util";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import { tmpdir } from "os";

const execFileAsync = promisify(execFile);

export class WindowsWallpaperSetter implements IWallpaperSetter {
  async setWallpaper(imagePath: string): Promise<void> {
    const script = `
      Add-Type @"
        using System;
        using System.Runtime.InteropServices;
        public class Wallpaper {
          [DllImport("user32.dll", CharSet = CharSet.Auto)]
          public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
        }
"@
      $SPI_SETDESKWALLPAPER = 0x0014
      $UpdateIniFile = 0x01
      $SendChangeEvent = 0x02
      [Wallpaper]::SystemParametersInfo($SPI_SETDESKWALLPAPER, 0, "${imagePath}", $UpdateIniFile -bor $SendChangeEvent)
    `;

    const scriptPath = join(tmpdir(), "temp_wallpaper.ps1");

    try {
      // 写入 PowerShell 脚本文件
      await writeFile(scriptPath, script, { encoding: "utf8" });

      // 执行脚本
      await execFileAsync("powershell", [
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        scriptPath,
      ]);
    } catch (error) {
      throw new Error(
        `Failed to set wallpaper on Windows: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      // 清理临时文件
      try {
        await unlink(scriptPath);
      } catch {
        // 忽略删除临时文件时的错误
      }
    }
  }
}
