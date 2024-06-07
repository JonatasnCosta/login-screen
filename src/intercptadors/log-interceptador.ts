import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogIntercepador implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        return next.handle().pipe(tap(()=>{

            const hora = Date.now();
            const request = context.switchToHttp().getRequest();

            console.log(`URL: ${request.url}`);
            console.log(`METHOD: ${request.method}`);
            console.log(`A execução durou ${Date.now() - hora} milisegundos`);
            console.log("----------------------------");

        }));
    }
}