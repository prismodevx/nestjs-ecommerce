import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@shared/response/api-response';

type WithData<T> = { data: T };

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T | WithData<T>, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | WithData<T>>,
  ): Observable<ApiResponse<T>> {
    const request: { url: string } = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const responseData: WithData<T> =
          (data as WithData<T>).data !== undefined
            ? (data as WithData<T>)
            : { data: data as T };

        return {
          success: true,
          code: (responseData as any).code ?? 'SUCCESS',
          message: (responseData as any).message,
          data: responseData.data,
          meta: {
            timestamp: new Date().toISOString(),
            path: request.url,
            ...((responseData as any).meta ?? {}),
          },
        } as ApiResponse<T>;
      }),
    );
  }
}
