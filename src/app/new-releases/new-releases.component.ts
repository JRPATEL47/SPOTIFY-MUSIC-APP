import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy{

  releases: any;
  newReleaseSubscription : Subscription | undefined;

  constructor(private ms: MusicDataService) {}

  ngOnInit(): void {

    this.newReleaseSubscription = this.ms.getNewReleases().subscribe((data:any) => this.releases = data.albums.items);
  }

  ngOnDestroy(): void {
    this.newReleaseSubscription?.unsubscribe();
      
  }

}
