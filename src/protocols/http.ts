export interface HttpRequest<T = any, U = any> {
	query?: T;
	body?: U;
}

export interface HttpResponse<T = any> {
	statusCode: number;
	body: T;
}
