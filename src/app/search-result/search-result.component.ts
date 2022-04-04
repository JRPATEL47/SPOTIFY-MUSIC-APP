import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results:any;
  searchQuery:String = "";

  searchSubscription: Subscription | undefined;

  constructor(private ms: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params=>{

      this.searchQuery=params['q'];
      
        this.searchSubscription = this.ms.searchArtists(this.searchQuery).subscribe((data:any) => this.results = data.artists.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index));
    });

  }

}
