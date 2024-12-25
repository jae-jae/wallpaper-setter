import { MacOSWallpaperSetter } from "../implementations/MacOSWallpaperSetter";
import * as childProcess from "child_process";

jest.mock("child_process", () => ({
  execFile: jest.fn(),
}));

describe("MacOSWallpaperSetter", () => {
  const setter = new MacOSWallpaperSetter();
  const mockExecFile = childProcess.execFile as unknown as jest.Mock;

  beforeEach(() => {
    mockExecFile.mockClear();
    mockExecFile.mockImplementation((cmd, args, callback) => {
      callback?.(null, { stdout: "", stderr: "" });
    });
  });

  it("should set wallpaper using osascript", async () => {
    const imagePath = "/path/to/image.jpg";
    await setter.setWallpaper(imagePath);

    expect(mockExecFile).toHaveBeenCalledWith(
      "osascript",
      ["-e", expect.stringContaining(imagePath)],
      expect.any(Function)
    );
  });

  it("should throw error when osascript fails", async () => {
    const error = new Error("Command failed");
    mockExecFile.mockImplementation((cmd, args, callback) => {
      callback?.(error, { stdout: "", stderr: "" });
    });

    await expect(setter.setWallpaper("/path/to/image.jpg")).rejects.toThrow();
  });
});
