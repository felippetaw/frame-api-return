import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../services/app.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums: any;
  private readonly destroy$ = new Subject()

  constructor(private service: AppService) { }

  ngOnInit() {
    const getAlbumsFromService$ = this.service.getAlbums().pipe(map(dataReturn => {
      this.albums = dataReturn;
    }));

    getAlbumsFromService$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
