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
var RogerRadioPlayerOriginal = /** @class */ (function (_super) {
    __extends(RogerRadioPlayerOriginal, _super);
    function RogerRadioPlayerOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RogerRadioPlayerOriginal.prototype.setCallbackStopped = function (callback) { return cordova(this, "setCallbackStopped", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.setCallbackAlertsEnable = function (callback) { return cordova(this, "setCallbackAlertsEnable", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.setCallbackAlertsDisable = function (callback) { return cordova(this, "setCallbackAlertsDisable", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerLoad = function (url) { return cordova(this, "playerLoad", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerReload = function () { return cordova(this, "playerReload", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerPlay = function () { return cordova(this, "playerPlay", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerStop = function () { return cordova(this, "playerStop", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerSetVolume = function (vol) { return cordova(this, "playerSetVolume", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerUnmute = function () { return cordova(this, "playerUnmute", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerMute = function () { return cordova(this, "playerMute", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.playerExit = function () { return cordova(this, "playerExit", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.updateMetadata = function (artist, title) { return cordova(this, "updateMetadata", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.controlsDestroy = function () { return cordova(this, "controlsDestroy", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.controlsSubscribe = function () { return cordova(this, "controlsSubscribe", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.prototype.controlsCreate = function () { return cordova(this, "controlsCreate", { "sync": true }, arguments); };
    RogerRadioPlayerOriginal.pluginName = "RogerRadioPlayer";
    RogerRadioPlayerOriginal.plugin = "cordova-plugin-roger-radio-player";
    RogerRadioPlayerOriginal.pluginRef = "cordova.plugins.rogerRadioPlayer";
    RogerRadioPlayerOriginal.repo = "https://github.com/TheHolyRogerCoin/RogerRadioApp";
    RogerRadioPlayerOriginal.platforms = ["Android"];
    return RogerRadioPlayerOriginal;
}(IonicNativePlugin));
var RogerRadioPlayer = new RogerRadioPlayerOriginal();
export { RogerRadioPlayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3JvZ2VyLXJhZGlvLXBsYXllci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7SUEwQmxDLG9DQUFpQjs7OztJQVdyRCw2Q0FBa0IsYUFBQyxRQUFrQztJQVlyRCxrREFBdUIsYUFBQyxRQUFrQztJQVkxRCxtREFBd0IsYUFBQyxRQUFrQztJQVkzRCxxQ0FBVSxhQUFDLEdBQVc7SUFVdEIsdUNBQVk7SUFVWixxQ0FBVTtJQVVWLHFDQUFVO0lBWVYsMENBQWUsYUFBQyxHQUFXO0lBVTNCLHVDQUFZO0lBVVoscUNBQVU7SUFVVixxQ0FBVTtJQWFWLHlDQUFjLGFBQUMsTUFBYyxFQUFFLEtBQWE7SUFVNUMsMENBQWU7SUFVZiw0Q0FBaUI7SUFVakIseUNBQWM7Ozs7OzsyQkE3TGhCO0VBMkJzQyxpQkFBaUI7U0FBMUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cbi8qKlxuICogQG5hbWUgUm9nZXJSYWRpb1BsYXllclxuICogQGRlc2NyaXB0aW9uXG4gKiBDb3Jkb3ZhIHBsdWdpbiBmb3IgUm9nZXJSYWRpbyBQbGF5ZXIuXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogY29yZG92YS1wbHVnaW4tcm9nZXItcmFkaW8tcGxheWVyLlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBSb2dlclJhZGlvUGxheWVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9yb2dlci1yYWRpby1wbGF5ZXIvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvZ2VyUmFkaW9QbGF5ZXI6IFJvZ2VyUmFkaW9QbGF5ZXIpIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqIGBgYFxuICpcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdSb2dlclJhZGlvUGxheWVyJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tcm9nZXItcmFkaW8tcGxheWVyJyxcbiAgcGx1Z2luUmVmOiAnY29yZG92YS5wbHVnaW5zLnJvZ2VyUmFkaW9QbGF5ZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL1RoZUhvbHlSb2dlckNvaW4vUm9nZXJSYWRpb0FwcCcsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvZ2VyUmFkaW9QbGF5ZXIgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBzZXRDYWxsYmFja1N0b3BwZWRcbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIHtmdW5jdGlvbn1cbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBzZXRDYWxsYmFja1N0b3BwZWQoY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWQge31cblxuICAvKipcbiAgICogc2V0Q2FsbGJhY2tBbGVydHNFbmFibGVcbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIHtmdW5jdGlvbn1cbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBzZXRDYWxsYmFja0FsZXJ0c0VuYWJsZShjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBzZXRDYWxsYmFja0FsZXJ0c0Rpc2FibGVcbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIHtmdW5jdGlvbn1cbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBzZXRDYWxsYmFja0FsZXJ0c0Rpc2FibGUoY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWQge31cblxuICAvKipcbiAgICogcGxheWVyTG9hZFxuICAgKlxuICAgKiBAcGFyYW0gdXJsIHtzdHJpbmd9XG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgcGxheWVyTG9hZCh1cmw6IHN0cmluZyk6IHZvaWQge31cblxuICAvKipcbiAgICogcGxheWVyUmVsb2FkXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgcGxheWVyUmVsb2FkKCk6IHZvaWQge31cblxuICAvKipcbiAgICogcGxheWVyUGxheVxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIHBsYXllclBsYXkoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBwbGF5ZXJTdG9wXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgcGxheWVyU3RvcCgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIHBsYXllclNldFZvbHVtZVxuICAgKlxuICAgKiBAcGFyYW0gdm9sIHtudW1iZXJ9XG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgcGxheWVyU2V0Vm9sdW1lKHZvbDogbnVtYmVyKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBwbGF5ZXJVbm11dGVcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBwbGF5ZXJVbm11dGUoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBwbGF5ZXJNdXRlXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgcGxheWVyTXV0ZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIHBsYXllckV4aXRcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBwbGF5ZXJFeGl0KCk6IHZvaWQge31cblxuICAvKipcbiAgICogdXBkYXRlTWV0YWRhdGFcbiAgICpcbiAgICogQHBhcmFtIGFydGlzdCB7c3RyaW5nfVxuICAgKiBAcGFyYW0gdGl0bGUge3N0cmluZ31cbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICB1cGRhdGVNZXRhZGF0YShhcnRpc3Q6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHZvaWQge31cblxuICAvKipcbiAgICogY29udHJvbHNEZXN0cm95XG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgY29udHJvbHNEZXN0cm95KCk6IHZvaWQge31cblxuICAvKipcbiAgICogY29udHJvbHNTdWJzY3JpYmVcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBjb250cm9sc1N1YnNjcmliZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIGNvbnRyb2xzQ3JlYXRlXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgY29udHJvbHNDcmVhdGUoKTogdm9pZCB7fVxufVxuIl19