import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { Page } from 'src/app/models/pagination/page/page';

@Injectable({
  providedIn: 'root'
})
export class FuelPriceHistoryService {



  private apiUrl: string;
  private currentApiUrl: string;
  private apifilePath: string;
  private pagePath: string;
  private currentPath: string;
  private authHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/fuelsPricesHistory';
    this.currentApiUrl = this.apiUrl;
    this.apifilePath = '/import';
    this.pagePath = '?page=';
    this.authHeader = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));

  }

  public resetCurrentApiUrl(){
    this.currentApiUrl = this.apiUrl;
    this.pagePath = '?page=';
  }

  public findAll(): Observable<Page<FuelPriceHistory>> {
    return this.http.get<Page<FuelPriceHistory>>(this.apiUrl, {
      headers: this.authHeader
    });
  }

  findAllWithPage(pageNumber: number) {
    return this.http.get<Page<FuelPriceHistory>>(`${this.currentApiUrl}${this.pagePath}${pageNumber}`, {
      headers: this.authHeader
    });
  }

  save(fuel: FuelPriceHistory) {
    return (fuel.id == 0) 
      ? this.http.post<FuelPriceHistory>(this.apiUrl, fuel, { headers: this.authHeader }) 
      : this.update(fuel);
  }

  update(fuel: FuelPriceHistory) {
    return this.http.put<FuelPriceHistory>(`${this.apiUrl}/${fuel.id}`, fuel, { headers: this.authHeader });
  }

  public findById(id: number): Observable<Page<FuelPriceHistory>> {
    return this.http.get<Page<FuelPriceHistory>>(`${this.apiUrl}${id}`, {
      headers: this.authHeader
    })
  }

  public upload(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', `${this.apiUrl}${this.apifilePath}`, data, {
      reportProgress: true,
      responseType: 'text',
      headers: this.authHeader
    });
    return this.http.request(newRequest);
  }

  findAvgPurchasePriceCountyName(county: string) {
    return this.http.get<number>(`${this.apiUrl}/avg/purchasePrice/county?county=${county}`, {
      headers: this.authHeader
    })
  }

  findAvgSalesPriceCountyName(county: string) {
    return this.http.get<number>(`${this.apiUrl}/avg/salesPrice/county?county=${county}`, {
      headers: this.authHeader
    })
  }

  findAvgPurchaseAndSalesPriceByCountyName(county: string) {
    return this.http.get<number>(`${this.apiUrl}/avg/purchaseAndSalesPrice/county?county=${county}`, {
      headers: this.authHeader
    })
  }

  findAvgPurchasePriceBannerName(banner: string) {
    return this.http.get<number>(`${this.apiUrl}/avg/purchasePrice/banner?banner=${banner}`, {
      headers: this.authHeader
    })
  }

  findAvgSalesPriceBannerName(banner: string) {
    return this.http.get<number>(`${this.apiUrl}/avg/salesPrice/banner?banner=${banner}`, {
      headers: this.authHeader
    })
  }

  findAvgPurchaseAndSalesPriceByBannerName(banner: string) {
    return this.http.get<number>(`${this.apiUrl}/avg/purchaseAndSalesPrice/banner?banner=${banner}`, {
      headers: this.authHeader
    })
  }

  getFuelsPricesHistoriesByRegionName(region: string) {
    this.currentApiUrl = `${this.apiUrl}/search/region?region=${region}`;
    this.pagePath = '&page=';
    return this.http.get<Page<FuelPriceHistory>>(this.currentApiUrl, {
      headers: this.authHeader
    })
  }

  getFuelPriceHistoryByResellerName(reseller: string) {
    this.currentApiUrl = `${this.apiUrl}/search/reseller?reseller=${reseller}`;
    this.pagePath = '&page=';
    return this.http.get<Page<FuelPriceHistory>>(this.currentApiUrl, {
      headers: this.authHeader
    })
  }

  getFuelPriceHistoryByDate(date: Date) {
    this.currentApiUrl = `${this.apiUrl}/search/date?date=${date}`;
    this.pagePath = '&page=';
    return this.http.get<Page<FuelPriceHistory>>(this.currentApiUrl, {
      headers: this.authHeader
    })
  }

  delete(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`, { headers: this.authHeader });
  }
}
