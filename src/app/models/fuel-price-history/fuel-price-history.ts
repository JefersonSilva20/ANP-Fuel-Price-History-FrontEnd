import { Region } from '../region/region';
import { State } from '../state/state';
import { County } from '../county/county';
import { Reseller } from '../reseller/reseller';
import { Product } from '../product/product';
import { Banner } from '../banner/banner';

export class FuelPriceHistory {

    constructor(public id: number,
        public region: Region,
        public state: State,
        public county: County,
        public reseller: Reseller,
        public product: Product,
        public banner: Banner,
        public date:string,
        public purchasePrice: number,
        public salePrice: number,
        public measurementUnit: string) {
        
        
    }
}
