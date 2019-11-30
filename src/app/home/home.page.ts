import { Component, ViewChild } from "@angular/core";
import { HttpProviderService } from "../services/http-provider.service";
import {
  NavController,
  ModalController,
  AlertController
} from "@ionic/angular";
import { DataCarrierService } from "../services/data-carrier.service";
import { ToolkitService } from "../services/toolkit.service";
import { IonInfiniteScroll } from "@ionic/angular";
import { WishlistHandlerService } from "../services/wishlist-handler.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  public dataCollection: any = [];
  public pageCount: number = 1;
  myInput: string;
  dataLoading: boolean = true;
  constructor(
    private _httpProvider: HttpProviderService,
    private _navController: NavController,
    private _dataCarrier: DataCarrierService,
    private _toolkit: ToolkitService,
    public _wishlist: WishlistHandlerService,
    private alertController: AlertController
  ) {}
  ngOnInit() {
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: "Welcome to BrewDog App!",
      message: "Beer catalogues at your convenience.",
      buttons: ["OK"],
      translucent: true
    });

    await alert.present();
    await alert.onDidDismiss().then(() => {
      this.processRequest();
    });
  }
  openDetails(dataItem: any): any {
    if (!this._toolkit.IsNullOrEmptyObject(dataItem)) {
      this._dataCarrier.clearParamData();
      this._dataCarrier.setParamData(dataItem);
      this._navController.navigateForward("list");
    }
  }
  processRequest(page: number = 1, searchParam: string = "") {
    let searchQuery = "";
    let route = "";
    if (!this._toolkit.IsNullOrEmptyObject(searchParam)) {
      searchQuery = `?beer_name=${searchParam}`;
      route = searchQuery;
    } else route = `?page=${page}&per_page=25`;
    this._httpProvider.HttpGet(route).subscribe(
      data => {
        if (page > 1) this.dataCollection = this.dataCollection.concat(data);
        else this.dataCollection = data;
      },
      error => {},
      () => {
        this.dataLoading = false;
      }
    );
  }
  loadData(event) {
    this.pageCount++;
    setTimeout(() => {
      this.processRequest(this.pageCount, "");
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataCollection.length == 500) {
        event.target.disabled = true;
      }
    }, 500);
  }
  filterResults(ev: any) {
    this.infiniteScroll.disabled = true;
    //this.myInput = !this._toolkit.IsNullOrEmptyObject(ev) ? ev.target.value : "";
    if (!this._toolkit.IsNullOrEmptyObject(this.myInput))
      this.processRequest(0, this.myInput);
    else {
      this.infiniteScroll.disabled = false;
      this.pageCount = 1;
      this.processRequest();
    }
  }
}
