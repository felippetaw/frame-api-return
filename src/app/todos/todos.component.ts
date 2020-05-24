import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../services/app.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: any;
  private readonly destroy$ = new Subject()

  constructor(private service: AppService) { }

  ngOnInit() {
    const getTodosFromService$ = this.service.getTodos().pipe(map(dataReturn => {
      this.todos = dataReturn
      console.log(this.todos);
    }));

    getTodosFromService$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
