import { Component, OnInit } from "@angular/core";
import { DataCarrierService } from "../services/data-carrier.service";
import { ToolkitService } from "../services/toolkit.service";
import { API_BASE_URL } from "../services/http-provider.service";
import { WishlistHandlerService } from "../services/wishlist-handler.service";
@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  private receivedParams: any;
  isWishlisted: string = "heart-empty";
  _color: string = "";
  constructor(
    private _dataCarrier: DataCarrierService,
    private _toolkit: ToolkitService,
    private _wishlist: WishlistHandlerService
  ) {}
  ngOnInit() {
    this.receivedParams = this._dataCarrier.getParamData();
    if (this._wishlist.checkIsWishlisted(this.receivedParams.id)) {
      this.isWishlisted = "heart";
      this._color = "danger";
    }
  }
  getName(meta: string): string {
    return meta.split("<")[0];
  }
  copyPathToClipboard(): any {
    let text = API_BASE_URL + `/${this.receivedParams.id}`;
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      res => {
        this._toolkit.presentToast(
          "API path to this item has been copied to the clipboard."
        );
      },
      err => {
        this._toolkit.presentToast("Could not copy text: " + err, "E");
      }
    );
    this._toolkit.presentToast("API path to this item is copied to clipboard");
  }
  fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; //avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
  }
  toggleWishlist(id: number): any {
    const result = this._wishlist.AddRemoveToWishlist(id);
    this.isWishlisted = result ? "heart" : "heart-empty";
    this._color = result ? "danger" : "";
    if (result)
      this._toolkit.presentToast(
        `${this.receivedParams.name} has been added to the Wishlist.`,
        "I"
      );
    else
      this._toolkit.presentToast(
        `${this.receivedParams.name} has been removed from the Wishlist.`,
        "W"
      );
  }
}
