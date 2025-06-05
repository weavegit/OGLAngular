import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent extends Component implements OnInit {
  ngOnInit(): void {
    console.log("SplashComponent")
  }


}
