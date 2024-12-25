# wallpaper-setter

一个跨平台的 Node.js 包，用于设置桌面壁纸。支持 macOS、Windows 和 Linux（GNOME、KDE、XFCE）。

[English](./README.md) | [中文](./README.zh-CN.md)

## 安装

```bash
npm install wallpaper-setter
```

## 使用方法

### 使用 ES Modules (推荐)

```typescript
import { setWallpaper } from "wallpaper-setter";

// 设置壁纸
await setWallpaper("/path/to/your/image.jpg");
```

### 使用 CommonJS

```javascript
const { setWallpaper } = require("wallpaper-setter");

// 设置壁纸
await setWallpaper("/path/to/your/image.jpg");
```

## 支持的平台

- macOS
- Windows
- Linux
  - GNOME
  - KDE
  - XFCE

## API

### setWallpaper(imagePath: string): Promise<void>

设置指定图片为桌面壁纸。

参数：

- `imagePath`: 图片的完整路径（支持 jpg、png 等格式）

返回值：

- 返回一个 Promise，成功时 resolve，失败时 reject 并返回错误信息

## 注意事项

- 在 Linux 上，会自动检测并尝试使用当前桌面环境（GNOME、KDE 或 XFCE）
- 在 Windows 上，需要 PowerShell 支持
- 在 macOS 上，使用 AppleScript 来设置壁纸

## 许可证

MIT
