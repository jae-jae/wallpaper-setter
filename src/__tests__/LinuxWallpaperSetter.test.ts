import { LinuxWallpaperSetter } from "../implementations/LinuxWallpaperSetter";
import * as childProcess from "child_process";

jest.mock("child_process", () => ({
  execFile: jest.fn(),
}));

describe("LinuxWallpaperSetter", () => {
  const setter = new LinuxWallpaperSetter();
  const mockExecFile = childProcess.execFile as unknown as jest.Mock;

  beforeEach(() => {
    mockExecFile.mockClear();
  });

  it("should set wallpaper using GNOME if available", async () => {
    mockExecFile.mockImplementation((cmd, args, callback) => {
      callback?.(null, { stdout: "", stderr: "" });
    });

    const imagePath = "/path/to/image.jpg";
    await setter.setWallpaper(imagePath);

    expect(mockExecFile).toHaveBeenCalledWith(
      "gsettings",
      [
        "set",
        "org.gnome.desktop.background",
        "picture-uri",
        `file://${imagePath}`,
      ],
      expect.any(Function)
    );
  });

  it("should try KDE if GNOME fails", async () => {
    let callCount = 0;
    mockExecFile.mockImplementation((cmd, args, callback) => {
      if (callCount === 0) {
        callCount++;
        callback?.(new Error("GNOME not available"), {
          stdout: "",
          stderr: "",
        });
      } else {
        callback?.(null, { stdout: "", stderr: "" });
      }
    });

    const imagePath = "/path/to/image.jpg";
    await setter.setWallpaper(imagePath);

    expect(mockExecFile).toHaveBeenCalledWith(
      "qdbus",
      expect.arrayContaining(["org.kde.plasmashell"]),
      expect.any(Function)
    );
  });

  it("should try XFCE if GNOME and KDE fail", async () => {
    let callCount = 0;
    mockExecFile.mockImplementation((cmd, args, callback) => {
      if (callCount < 2) {
        callCount++;
        callback?.(new Error("Desktop environment not available"), {
          stdout: "",
          stderr: "",
        });
      } else {
        callback?.(null, { stdout: "", stderr: "" });
      }
    });

    const imagePath = "/path/to/image.jpg";
    await setter.setWallpaper(imagePath);

    expect(mockExecFile).toHaveBeenCalledWith(
      "xfconf-query",
      expect.arrayContaining(["-c", "xfce4-desktop"]),
      expect.any(Function)
    );
  });

  it("should throw error if all desktop environments fail", async () => {
    mockExecFile.mockImplementation((cmd, args, callback) => {
      callback?.(new Error("Desktop environment not available"), {
        stdout: "",
        stderr: "",
      });
    });

    await expect(setter.setWallpaper("/path/to/image.jpg")).rejects.toThrow(
      "Failed to set wallpaper on Linux: Unsupported desktop environment"
    );
  });
});
