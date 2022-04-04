import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit , OnDestroy{
  album:any;
  paramsSubscription: Subscription | undefined;
  albSubscription: Subscription | undefined;
  favSubscription: Subscription | undefined;


  constructor( private msb: MatSnackBar, private ms: MusicDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {

   

    this.paramsSubscription = this.route.params.subscribe((params:Params) =>{
      let idParameter = params["id"];
      this.albSubscription = this.ms.getAlbumById(idParameter).subscribe((data:any) => this.album = data );
    });

   
  }

    
  addToFav(trackID : string){

    this.favSubscription = this.ms.addToFavourites(trackID).subscribe({
        next: (success)=>{
          this.msb.open("Adding to Favourites...", "Done", { duration: 1500 });
        },
        error:(error)=>{
          this.msb.open("Unable to add song to Favourites", "Done", { duration: 1500 });
        }
      });

  }

  ngOnDestroy(): void {
    this.albSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
    this.favSubscription?.unsubscribe();
  }

}
