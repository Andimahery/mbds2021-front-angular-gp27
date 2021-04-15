import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments';
  events: string[] = [];
  opened: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          if (child.snapshot.data['header']) {
            return child.snapshot.data['header'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }

  /* login() {
     // si je suis pas loggé, je me loggue, sinon, si je suis
     // loggé je me déloggue et j'affiche la page d'accueil
 
     if (this.authService.loggedIn) {
       // je suis loggé
       // et bien on se déloggue
       this.authService.logOut();
       // on navigue vers la page d'accueil
       this.router.navigate(["/home"]);
     } else {
       // je ne suis pas loggé, je me loggue
       this.authService.logIn("admin", "toto");
     }
   }*/
}
