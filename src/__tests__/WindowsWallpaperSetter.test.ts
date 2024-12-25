import { WindowsWallpaperSetter } from "../implementations/WindowsWallpaperSetter";
import * as childProcess from "child_process";
import * as path from "path";

jest.mock("child_process", () => ({
  execFile: jest.fn(),
}));

jest.mock("path", () => ({
  join: jest.fn(),
}));

describe("WindowsWallpaperSetter", () => {
  const setter = new WindowsWallpaperSetter();
  const mockExecFile = childProcess.execFile as unknown as jest.Mock;
  const mockJoin = path.join as jest.Mock;

  beforeEach(() => {
    mockExecFile.mockClear();
    mockJoin.mockClear();
    mockExecFile.mockImplementation((cmd, args, callback) => {
      callback?.(null, { stdout: "", stderr: "" });
    });
    mockJoin.mockImplementation((...args) => args.join("/"));
  });

  it("should set wallpaper using powershell", async () => {
    const imagePath = "C:/path/to/image.jpg";
    const scriptPath = "current/dir/temp_wallpaper.ps1";
    mockJoin.mockReturnValue(scriptPath);

    await setter.setWallpaper(imagePath);

    expect(mockExecFile).toHaveBeenCalledWith(
      "powershell",
      ["-ExecutionPolicy", "Bypass", "-File", scriptPath],
      expect.any(Function)
    );
  });

  it("should throw error when powershell fails", async () => {
    const error = new Error("Command failed");
    mockExecFile.mockImplementation((cmd, args, callback) => {
      callback?.(error, { stdout: "", stderr: "" });
    });

    await expect(setter.setWallpaper("C:/path/to/image.jpg")).rejects.toThrow();
  });
});
