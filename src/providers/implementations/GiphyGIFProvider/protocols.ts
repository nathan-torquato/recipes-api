export interface GIFResponse {
	data: GIFObject[];
}

export interface GIFObject {
	id: string;
	images: GIFImageObject;
}

interface GIFImageObject {
	original: {
		height: string;
		width: string;
		size: string;
		url: string;
	};
}
