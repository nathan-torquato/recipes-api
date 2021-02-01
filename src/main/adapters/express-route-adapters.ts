import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../protocols';

export function adaptRoute(controller: Controller) {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			body: req.body,
		};
		const { body, statusCode } = await controller.handle(httpRequest);
		return res.status(statusCode).json(body);
	};
}
