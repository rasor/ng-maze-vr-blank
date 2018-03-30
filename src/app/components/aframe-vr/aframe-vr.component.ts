import { Component, OnInit, 
  ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'aframe-vr',
  templateUrl: './aframe-vr.component.html',
  styleUrls: ['./aframe-vr.component.css']
})
export class AframeVrComponent implements OnInit, AfterViewInit  {
  @ViewChild('scene') theScene: ElementRef;
  vrBoxes: VrBox[] = [
    new VrBox()//,
    //new VrBox()
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log("Found theScene " + this.theScene.nativeElement.tagName);
  }
}

class VrBox {
}
