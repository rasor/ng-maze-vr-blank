## journal.md

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
--- cosole ---
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
--- cosole ---
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

## Next commit ------------

`scripts.bundle.js` is loaded after `polyfills.bundle.js`

As the blog ´[A-frame with Angular](https://medium.com/@pitipon/a-frame-with-angular-setup-project-5797b2f2a03b)´ told you, you needed to load A-Frame before zone.js.  

So this time we go one more level up to polyfills.

* Remove the stripts in `.angular-cli.json` (or just rename the scripts property)

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

### Result

Now A-Frame is loaded in `polyfills.bundle.js` before zone.js and A-Frame content is rendered  

## Next commit ------------
## Next commit ------------

The End
