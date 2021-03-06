## journal.md

A blog was made for this code: [Dependency management in Angular CLI - Lib: A-Frame](https://rasor.github.io/dependency-management-in-angular-cli-lib-a-frame.html)

## 2. <https://github.com/rasor/ng-maze-vr-blank/tree/9db7b42a3890cd0110be5930cbb25d7f32ab1e32>

```bash
# create
ng new ng-maze-vr-blank
cd ng-maze-vr-blank
# test
ng serve
# http://localhost:4200/

# Aframe https://medium.com/@pitipon/a-frame-with-angular-setup-project-5797b2f2a03b

npm install aframe@0.7.0
npm install @types/aframe@0.7.0 --save-dev
```

* Add to import and schemas of @NgModule:  
`CUSTOM_ELEMENTS_SCHEMA`

* Add some A-Frame html

* Test drive

```bash
git remote add origin https://github.com/rasor/ng-maze-vr-blank.git
git push -u origin master
```
## 3. <https://github.com/rasor/ng-maze-vr-blank/tree/3040c3c33f61c73bd232d445d2cff70b7df88b94>

* Create a component for A-Frame

```bash
ng generate component components/aframe-vr
```

* A-Frame html moved to components/aframe-vr and replaced with
`<aframe-vr></aframe-vr>`

## 4. <https://github.com/rasor/ng-maze-vr-blank/tree/69b38f4b340fe14d1676e2749f78061e24254ac8>

* Going a step back - Testing what happens, when loading aframe from within the main module

```typescript
// --- app.module.tss ---
// Require aframe in main bundle before an aframe component is loaded
import 'aframe';
import 'aframe-extras';
import { AframeVrComponent } from './components/aframe-vr/aframe-vr.component';
```

* Result:

```
--- console ---
zone.js:2803 Uncaught TypeError: Cannot assign to read only property 'attributeChangedCallback' of object '[object HTMLElement]'
    at eval (zone.js:2803)
    at Array.forEach (<anonymous>)
    at HTMLDocument.document.registerElement (zone.js:2789)
    at module.exports.registerElement (aframe-master.js:74843)
```

If you view-page-source of the page you will see

```html
<body>
  <app-root></app-root>
  <script type="text/javascript" src="inline.bundle.js"></script>
  <script type="text/javascript" src="polyfills.bundle.js"></script>
  <script type="text/javascript" src="styles.bundle.js"></script>
  <script type="text/javascript" src="vendor.bundle.js"></script>
  <script type="text/javascript" src="main.bundle.js"></script>
</body>
```

`zone.js` is stored in `polyfills.bundle.js`,  
`aframe-master.js` (and all other node_modules from package.json) is stored in `vendor.bundle.js` and in  
`main.bundle.js` the error is thrown when we try to load A-Frame with `import 'aframe';`

## 5. <https://github.com/rasor/ng-maze-vr-blank/tree/cd0fd787cb4aa9dcc287925e2ddd9310e7b837ab>

Angular CLI has a way to load libraries globally, as if they were in script tags.

* Remove the aframe import from app.module.ts
* Add the A-Frame library to Angular Cli config

```yaml
// --- .angular-cli.json --- 
  "apps": [
    {
      "scripts": [
        "../node_modules/aframe/dist/aframe-master.js",
        "../node_modules/aframe-extras/dist/aframe-extras.min.js"
      ],
```

### Result

If you view-page-source of the page you will see

```html
<body>
  <app-root></app-root>
  <script type="text/javascript" src="inline.bundle.js"></script>
  <script type="text/javascript" src="polyfills.bundle.js"></script>
  <script type="text/javascript" src="styles.bundle.js"></script>
  <script type="text/javascript" src="*scripts.bundle.js*"></script>
  <script type="text/javascript" src="vendor.bundle.js"></script>
  <script type="text/javascript" src="main.bundle.js"></script></body>
```

New is ´scripts.bundle.js´. 

```
--- console ---
zone.js:2803 Uncaught TypeError: Cannot assign to read only property 'attributeChangedCallback' of object '[object HTMLElement]'
    at eval (zone.js:2803)
    at Array.forEach (<anonymous>)
    at HTMLDocument.document.registerElement (zone.js:2789)
    at module.exports.registerElement (scripts.bundle.js:74843)
```

`zone.js` is stored in `polyfills.bundle.js`,  
`aframe-master.js` is stored and loaded in `scripts.bundle.js` and  
all other node_modules from package.json is stored in `vendor.bundle.js`.  
The error is thrown when we try to auto-load A-Frame inside `scripts.bundle.js`.

The common pattern is again that A-Frame is loaded after zone.js.

## 6. <https://github.com/rasor/ng-maze-vr-blank/tree/d15d7271277ba6b8bc5c16fc35bd06d8497569f2>

`scripts.bundle.js` is loaded after `polyfills.bundle.js`

As the blog ´[A-frame with Angular](https://medium.com/@pitipon/a-frame-with-angular-setup-project-5797b2f2a03b)´ told you, you needed to load A-Frame before zone.js.  

So this time we go one more level up to polyfills.

* Remove the scripts in `.angular-cli.json` (or just rename the scripts property)

```yaml
// --- .angular-cli.json --- 
  "apps": [
    {
      "someUnusedScripts": [
        "../node_modules/aframe/dist/aframe-master.js",
        "../node_modules/aframe-extras/dist/aframe-extras.min.js"
      ],
```

* Add aframe to polyfills before zone.js

```typescript
// --- src\polyfills.ts ---
// Load aframe before zone.js
import 'aframe';
import 'aframe-extras';
import 'zone.js/dist/zone';  // Included with Angular CLI.
```

### Result #2.2

Now A-Frame is loaded in `polyfills.bundle.js` before zone.js and A-Frame content is rendered  

## 7. <https://github.com/rasor/ng-maze-vr-blank/tree/4f666ce66cf74e211ee06df0f019b528723c2398>

## Problem #3 - Some A-Frame extras doesn't render

If you want to replace the floor `<a-plane>` with the floor from A-Frame extras `<a-grid>` you can't see it. This happens with following change:  

```html
<!-- src/app/components/aframe-vr.component.html -->
  <!-- <a-plane position="0 -1 -4" rotation="-45 0 0" width="15" height="80" color="#7BC8A4"></a-plane> -->
  <a-grid position="0 -1 -4" rotation="-90 0 0" static-body width="15" height="80" color="#7BC8A4"></a-grid>
```

### Solution attempt 3

Now we will move loading of A-Frame even further up from polyfills to the `<head>`  

* Remove A-Frame from polyfills

```typescript
// --- src/polyfills.ts ---
// Load aframe before zone.js
//import 'aframe';
//import 'aframe-extras';
import 'zone.js/dist/zone';  // Included with Angular CLI.
```

* In Ng Cli config copy A-Frame dist to assets  

```yaml
// --- .angular-cli.json --- 
  "apps": [
    {
      "assets": [
        { "glob": "**/*", "input": "../node_modules/aframe/dist", "output": "./assets/lib/aframe/dist/" },
        { "glob": "**/*", "input": "../node_modules/aframe-extras/dist", "output": "./assets/lib/aframe-extras/dist/" }
      ],
```

_Link: Copy assets via [angular-cli](https://github.com/angular/angular-cli/wiki/stories-asset-configuration)_

* In index.html head load A-Frame + extras  

```html
<!-- src/index.html -->
<head>
  <script src="assets/lib/aframe/dist/aframe-master.js"></script>
  <script src="assets/lib/aframe-extras/dist/aframe-extras.min.js"></script>
</head>
```

### Result #3 - Commit 7

Now A-Frame is loaded already in the `<head>` before `polyfills.bundle.js` and also `<a-grid>` is rendered  

## Problem #4 - When using <script> for loading, then @types are not loaded and you cannot use the types in code

Having the libraries loaded now I want to use them in code. Example:

```typescript
class VrBox {
  position: string;

  constructor(pos: AFrame.Coordinate) {
    this.position = AFRAME.utils.coordinates.stringify(pos);
  }
}
```

WebPack complains:

```
error TS2552: Cannot find name 'AFRAME'. Did you mean 'frames'
error TS2503: Cannot find namespace 'AFrame'.
```

### Solution #4a

If you did not have the @types/aframe you could define the types yourself

```typescript
declare var AFRAME: any; 
declare namespace AFrame{
  interface Coordinate{}
} 
```

### Solution #4b

But since you have the @types/aframe you instead just can import them

```typescript
/// <reference types="aframe" />
// Above ref is needed when aframe is loaded from <script> instead of
// import 'aframe';
// It will use the types from @types/aframe
```

### Result #4 - Commit 10

Now we can use A-Frame library in our code.

## Next commit ------------
## Next commit ------------
## Next commit ------------

The End
