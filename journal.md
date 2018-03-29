## journal.md

## 2. https://github.com/rasor/ng-maze-vr-blank/tree/9db7b42a3890cd0110be5930cbb25d7f32ab1e32

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
## 3. https://github.com/rasor/ng-maze-vr-blank/tree/3040c3c33f61c73bd232d445d2cff70b7df88b94

* Create a component for A-Frame

```bash
ng generate component components/aframe-vr
```

* A-Frame html moved to components/aframe-vr and replaced with
`<aframe-vr></aframe-vr>`

## Next commit ------------

* Going a step back - Testing what happens, when loading aframe from within the main module

```js
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

The End
