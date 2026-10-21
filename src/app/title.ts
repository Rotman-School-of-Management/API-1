import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Title {
    private pageTitleSubject = new BehaviorSubject<string>('Default Title');
  //public pageTitle$: Observable<string> = this.pageTitleSubject.asObservable();
  pageTitle$ = this.pageTitleSubject.asObservable(); // Expose as Observable

setTitle(newTitle: string) {
  this.pageTitleSubject.next(newTitle); // Update the title
}
}
