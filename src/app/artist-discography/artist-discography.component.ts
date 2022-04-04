import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums:any;
  artist:any;

  artistSubscription: Subscription | undefined;
  albumSubscription: Subscription | undefined;
  paramsSubscription: Subscription | undefined;

  constructor(private ms: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.paramsSubscription = this.route.params.subscribe((params:Params) =>{
      let idParameter = params["id"];
      this.artistSubscription = this.ms.getArtistById(idParameter).subscribe((data:any) => this.artist = data );
      this.albumSubscription = this.ms.getAlbumsByArtistId(idParameter).subscribe((data:any) => this.albums = data.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index) );
    });
    
  }

  ngOnDestroy(): void {
    this.artistSubscription?.unsubscribe();
    this.albumSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
  }

}
