var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var RogerradioAutoOriginal = /** @class */ (function (_super) {
    __extends(RogerradioAutoOriginal, _super);
    function RogerradioAutoOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RogerradioAutoOriginal.prototype.setMediaItems = function (mediaItems) { return cordova(this, "setMediaItems", { "sync": true }, arguments); };
    RogerradioAutoOriginal.pluginName = "RogerradioAuto";
    RogerradioAutoOriginal.plugin = "cordova-plugin-rogerradio-auto";
    RogerradioAutoOriginal.pluginRef = "cordova.plugins.rogerradioAuto";
    RogerradioAutoOriginal.repo = "https://github.com/TheHolyRogerCoin/RogerRadioApp";
    RogerradioAutoOriginal.platforms = ["Android"];
    return RogerradioAutoOriginal;
}(IonicNativePlugin));
var RogerradioAuto = new RogerradioAutoOriginal();
export { RogerradioAuto };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3JvZ2VycmFkaW8tYXV0by9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7SUF3Q3BDLGtDQUFpQjs7OztJQVduRCxzQ0FBYSxhQUFDLFVBQXlDOzs7Ozs7eUJBcER6RDtFQXlDb0MsaUJBQWlCO1NBQXhDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9ucyBpdGVtcyB0aGF0IGNhbiBiZSB1cGRhdGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENhcnBsYXlBbmRyb2lkQXV0b01lZGlhSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIGl0ZW1LZXk6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgc3VidGl0bGU6IHN0cmluZztcbiAgaXNDb250YWluZXI6IGJvb2xlYW47XG4gIGlzUGxheWFibGU6IGJvb2xlYW47XG4gIGFydHdvcmtVcmw6IHN0cmluZztcbn1cblxuLyoqXG4gKiBAbmFtZSBSb2dlcnJhZGlvQXV0b1xuICogQGRlc2NyaXB0aW9uXG4gKiBDb3Jkb3ZhIHBsdWdpbiBmb3IgUm9nZXJSYWRpbyBhbmRyb2lkIGF1dG8uXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogY29yZG92YS1wbHVnaW4tcm9nZXJyYWRpby1hdXRvLlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBSb2dlcnJhZGlvQXV0byB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvcm9nZXJyYWRpby1hdXRvL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSByb2dlcnJhZGlvQXV0bzogUm9nZXJyYWRpb0F1dG8pIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqIHRoaXMucm9nZXJyYWRpb0F1dG8uc2V0TWVkaWFJdGVtcyguLi4pO1xuICogYGBgXG4gKlxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ1JvZ2VycmFkaW9BdXRvJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tcm9nZXJyYWRpby1hdXRvJyxcbiAgcGx1Z2luUmVmOiAnY29yZG92YS5wbHVnaW5zLnJvZ2VycmFkaW9BdXRvJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9UaGVIb2x5Um9nZXJDb2luL1JvZ2VyUmFkaW9BcHAnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb2dlcnJhZGlvQXV0byBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIHNldE1lZGlhSXRlbXNcbiAgICpcbiAgICogQHBhcmFtIG1lZGlhSXRlbXMge0NhcnBsYXlBbmRyb2lkQXV0b01lZGlhSXRlbVtdfVxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIHNldE1lZGlhSXRlbXMobWVkaWFJdGVtczogQ2FycGxheUFuZHJvaWRBdXRvTWVkaWFJdGVtW10pOiB2b2lkIHt9XG59XG4iXX0=