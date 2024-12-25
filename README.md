# wallpaper-setter

A cross-platform Node.js package for setting desktop wallpaper. Supports macOS, Windows, and Linux (GNOME, KDE, XFCE).

[English](./README.md) | [中文](./README.zh-CN.md)

## Installation

```bash
npm install wallpaper-setter
```

## Usage

### Using ES Modules (Recommended)

```typescript
import { setWallpaper } from "wallpaper-setter";

// Set wallpaper
await setWallpaper("/path/to/your/image.jpg");
```

### Using CommonJS

```javascript
const { setWallpaper } = require("wallpaper-setter");

// Set wallpaper
await setWallpaper("/path/to/your/image.jpg");
```

## Supported Platforms

- macOS
- Windows
- Linux
  - GNOME
  - KDE
  - XFCE

## API

### setWallpaper(imagePath: string): Promise<void>

Sets the specified image as desktop wallpaper.

Parameters:

- `imagePath`: Full path to the image file (supports jpg, png, etc.)

Returns:

- Returns a Promise that resolves when successful, rejects with an error message when failed

## Notes

- On Linux, it automatically detects and attempts to use the current desktop environment (GNOME, KDE, or XFCE)
- On Windows, PowerShell support is required
- On macOS, AppleScript is used to set the wallpaper

## License

MIT
