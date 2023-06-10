import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subDataArray: any[] = [];

  constructor(private subService: SubscribersService) { }

  ngOnInit(): void {
    this.subService.loadSubscribers().subscribe( val => {
      console.log(val);

      this.subDataArray = val
    })

  }

  onDelete(id: string) {
    this.subService.deleteData(id);
  }


}



