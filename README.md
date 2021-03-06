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
inkbex <INPUT> [--dpi NUMBER] [--type EXPORT_TYPE] [--area EXPORT_AREA] [--dest OUTPUT]
```
*INPUT* should be an SVG file or a glob pattern (e.g. *.svg)

*EXPORT_TYPE* must be `png` or `pdf`. The default is `png`.

*EXPORT_AREA* must be `page`, `drawing` or an object ID. The default is `page`. 
As of version 0.5.1 you can provide a **list** of comma separated IDs.

*OUTPUT* should be the export filename or a directory name.

Examples:
```
inkbex icon.svg
```
```
inkbex *.svg --dpi 300
```
```
inkbex *.svg --dpi 90 --dest ./exported/
```
```
inkbex collection.svg --area id1,id2,id3
```
