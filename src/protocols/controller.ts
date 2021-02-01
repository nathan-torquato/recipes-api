import { HttpRequest, HttpResponse } from './Http';

export interface Controller {
	handle<T>(httpRequest: HttpRequest<T>): Promise<HttpResponse>;
}
