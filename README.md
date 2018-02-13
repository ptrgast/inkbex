# Inkbex - Batch export from SVG files using Inkscape

Inkbex is a wrapper of the Inkscape export commands for easily exporting from multiple SVG files using "glob" patterns (e.g. *.svg). In order for Inkbex to work you must have Inkscape installed on your system and added to your PATH.

![](/../screenshots/screenshots/run.gif?raw=true)

## Download & Setup

1. Download or clone the repository on your system

2. Install dependencies
```
npm install
```

3. Make inkbex global so you can run it from any folder
```
npm link
```

## Run

Usage:

```
inkbex <INPUT> [--dpi NUMBER]
```
*INPUT* should be an SVG file or a glob pattern (e.g. *.svg)

Examples:
```
inkbex icon.svg
```
```
inkbex *.svg --dpi 300
```
