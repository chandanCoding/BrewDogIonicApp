import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataCarrierService {
  private paramData: any;
  constructor() {}
  public setParamData(data: any) {
    this.paramData = data;
  }
  public getParamData() {
    return this.paramData;
  }
  public clearParamData() {
    this.paramData = "";
  }
}
