import { WallpaperSetterFactory } from "../WallpaperSetterFactory";
import { MacOSWallpaperSetter } from "../implementations/MacOSWallpaperSetter";
import { WindowsWallpaperSetter } from "../implementations/WindowsWallpaperSetter";
import { LinuxWallpaperSetter } from "../implementations/LinuxWallpaperSetter";

describe("WallpaperSetterFactory", () => {
  const originalPlatform = process.platform;

  afterEach(() => {
    Object.defineProperty(process, "platform", {
      value: originalPlatform,
    });
  });

  it("should create MacOSWallpaperSetter for darwin platform", () => {
    Object.defineProperty(process, "platform", {
      value: "darwin",
    });
    const setter = WallpaperSetterFactory.create();
    expect(setter).toBeInstanceOf(MacOSWallpaperSetter);
  });

  it("should create WindowsWallpaperSetter for win32 platform", () => {
    Object.defineProperty(process, "platform", {
      value: "win32",
    });
    const setter = WallpaperSetterFactory.create();
    expect(setter).toBeInstanceOf(WindowsWallpaperSetter);
  });

  it("should create LinuxWallpaperSetter for linux platform", () => {
    Object.defineProperty(process, "platform", {
      value: "linux",
    });
    const setter = WallpaperSetterFactory.create();
    expect(setter).toBeInstanceOf(LinuxWallpaperSetter);
  });

  it("should throw error for unsupported platform", () => {
    Object.defineProperty(process, "platform", {
      value: "freebsd",
    });
    expect(() => WallpaperSetterFactory.create()).toThrow(
      "Unsupported platform: freebsd"
    );
  });
});
