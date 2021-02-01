import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../protocols';

export function expressRouteAdapter(controller: Controller) {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			body: req.body,
		};

		try {
			const { body, statusCode } = await controller.handle(httpRequest);
			return res.status(statusCode).json(body);
		} catch (error) {
			return res.status(error.statusCode || 500).json(error.message);
		}
	};
}
