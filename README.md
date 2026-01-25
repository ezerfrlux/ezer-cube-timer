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

### Devlopment

#### If you want to contribute or build it from source, follow these steps:

1. __Clone the repo__

```
git clone https://github.com/ezerfrlux/ezer-cube-timer.git
```

2. __Download dependencies__
```
npm install
```

3. __Run in dev mode__
```
npm run tauri dev
```

4. __Build for production__
```
npm run tauri build
```

### Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request to improve the timer.

#### License 
This project  is licesed under the __MIT License__ .