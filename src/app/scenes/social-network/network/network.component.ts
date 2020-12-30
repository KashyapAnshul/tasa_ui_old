import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  networkConfig:any ={
    isLoading:false,
    data:[]
  }
  constructor() { }

  ngOnInit(): void {
  }

}
