export class AssetModel {
    asset: string;
    price: number;

    constructor(asset: string, price: number) {
        this.asset = asset;
        this.price = price;
    }
}