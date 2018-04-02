/// <reference types="aframe" />
// Above ref is needed when aframe is loaded from <script> instead of
// import 'aframe';
// It will use the types from @types/aframe

// Alternatively you could define the types you wants to use by hand:
// declare var AFRAME: any; 
// declare namespace AFrame{
//   interface Coordinate{}
// } 

import { Component, OnInit, 
  ViewChild, AfterViewInit, ElementRef } from '@angular/core';


@Component({
  selector: 'aframe-vr',
  templateUrl: './aframe-vr.component.html',
  styleUrls: ['./aframe-vr.component.css']
})
export class AframeVrComponent implements OnInit, AfterViewInit  {
  @ViewChild('scene') theScene: ElementRef;
  public vrBoxes: VrBox[] = [
    //new VrBox(AFRAME.utils.coordinates.parse("-1 1.5 -4")),
    new VrBox(AFRAME.utils.coordinates.parse("-1 3.5 -4"))
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log("Found theScene " + this.theScene.nativeElement.tagName);
  }
}

class VrBox {
  public position: string;

  constructor(pos: AFrame.Coordinate) {
    this.position = AFRAME.utils.coordinates.stringify(pos);
  }
}
