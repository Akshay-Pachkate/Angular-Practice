import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";



export interface Options{
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        context?: HttpContext;
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
}


export interface Product{
    id?: number,
    name: string;
    price: string;
    image: string;
    rating: number;
}


export interface Products{
    items: Product[];
    total: number;
    perPage: number;
    totalPages: number;
    page: number
}


export interface PaginationParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    page: number;
    perPage: number;
}