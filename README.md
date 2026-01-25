# Ezer Cube Timer

## A rubik cube timer with a modern interface multi-platform

<img src="./public//logo.png" width="250" />

### Features
-  __Minimalist Design__
-  __Lightweight thanks to the Tauri framework__
-  __Cross-Platform: Available for Linux(AppImage/Deb)/ Windows, macOS and Web__ 
- __Open Source__


### Installation

#### Linux (Arch, Ubuntu, etc)

Download the latest __.AppImage__ from the<a href="https://github.com/ezerfrlux/ezer-cube-timer/releases/tag/1.0.0">
Releases</a> page


```
chmod +x ezer-cube-timer_0.1.0_amd64.AppImage
```
Execute the image
```
./ezer-cube-timer_0.1.0_amd64.AppImage
```

#### Windows

1. Clone the repo

```
git clone https://github.com/ezerfrlux/ezer-cube-timer.git
```

2. Download dependencies 
```
npm install
```

3. Build project
```
npm run tauri build
```

4. Execute __.exe__ in 
```
./src-tauri/target/release/bundle/nsis
```

