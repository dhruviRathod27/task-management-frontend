import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()

export class AppInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const origin = environment.origin;
        const httpRequest = req.clone({
            url: `${origin}${req.url}`
        })
        return next.handle(httpRequest)
            .pipe(
                catchError(err => {
                    if(err instanceof HttpErrorResponse && err.status === 0){
                        console.log(`Check your Network Connection`);
                    }else if (err instanceof HttpErrorResponse && err.status === 401){
                        // TODO: Log out 
                    }
                    return throwError(err.error);
                })
            )
    }
}