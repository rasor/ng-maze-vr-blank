## journal.md

## 1. https://github.com/rasor/ng-maze-vr-blank/tree/9db7b42a3890cd0110be5930cbb25d7f32ab1e32

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
## Next commit ------------

* Create a component for A-Frame

```bash
ng generate component components/aframe-vr
```

* A-Frame html moved to components/aframe-vr and replaced with
`<aframe-vr></aframe-vr>`


The End
