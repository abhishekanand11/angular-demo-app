import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { filter } from 'rxjs/operators';


@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const regex = new RegExp(`^${term}`, 'i');
    return of(HEROES.filter(hero => hero.name.match(regex)));
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
// const filterBy = (term) => {
//   const termLowerCase = term.toLowerCase();
//   return (hero) =>
//     Object.keys(hero)
//       .some(name => HEROES[name].toLowerCase().indexOf(termLowerCase) !== -1);
// };



