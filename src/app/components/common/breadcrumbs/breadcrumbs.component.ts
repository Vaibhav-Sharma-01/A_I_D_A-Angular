import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  PRIMARY_OUTLET,
  RoutesRecognized,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { map, mergeMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: any = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.breadcrumbs.push({
      url: this.activatedRoute.firstChild?.snapshot.data.path,
      label: this.activatedRoute.firstChild?.snapshot.data.breadcrumb,
      params: this.router.routerState.snapshot.root.params
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          let routes: any;
          routes = route;
          if (routes.firstChild.component === undefined) {
            while (!routes.firstChild) {
              routes = routes.firstChild;
            }
          }
          routes = routes.firstChild;
          return routes;
        })
      )
      .pipe(
        map((routes) => {
          return routes;
        })
      )
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        const snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        const url = snapshot.url;
        const routeData = route.snapshot.data;
        const label = routeData.breadcrumb;
        const params = snapshot.root.params;
        this.breadcrumbs.push({
          url,
          label,
          params,
        });
      });
  }
}
