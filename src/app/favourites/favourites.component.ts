import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit , OnDestroy{

  favourites:Array<any> = [];
  favouritesSubscription: Subscription | undefined;
  removeSubscription: Subscription | undefined;

  constructor(private ms:MusicDataService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.favouritesSubscription = this.ms.getFavourites().subscribe((data:any) => this.favourites = data.tracks);

  }

ngOnDestroy(): void {
  this.favouritesSubscription?.unsubscribe();
  this.removeSubscription?.unsubscribe();
}

remove(id:string){
    this.removeSubscription = this.ms.removeFromFavourites(id).subscribe((data:any) => this.favourites = data.tracks);
}

}


