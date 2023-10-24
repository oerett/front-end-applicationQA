import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
    label: string;
    url: string;
}
@Injectable({
    providedIn: 'root',
})

export class BreadcrumbService {
    private _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

    get breadcrumbs(): Observable<Breadcrumb[]> {
        return this._breadcrumbs.asObservable();
    }

    constructor(private router: Router) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            const root: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = this.createBreadcrumbs(root);
            this._breadcrumbs.next(breadcrumbs);
        });
    }

    private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children: ActivatedRouteSnapshot[] = route.children;
        if (children.length === 0) {
            return breadcrumbs;
        }
        for (const child of children) {
            const routeURL: string = child.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
                breadcrumbs.push({ label: routeURL, url: url });
            }
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }
}
