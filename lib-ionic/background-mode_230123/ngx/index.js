import { __extends } from "tslib";
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordova } from '@ionic-native/core';
import { Observable } from 'rxjs';
var BackgroundMode = /** @class */ (function (_super) {
    __extends(BackgroundMode, _super);
    function BackgroundMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackgroundMode.prototype.enable = function () { return cordova(this, "enable", { "sync": true }, arguments); };
    BackgroundMode.prototype.disable = function () { return cordova(this, "disable", { "sync": true }, arguments); };
    BackgroundMode.prototype.setEnabled = function (enable) { return cordova(this, "setEnabled", { "sync": true }, arguments); };
    BackgroundMode.prototype.fireEvent = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return cordova(this, "fireEvent", { "sync": true }, arguments);
    };
    BackgroundMode.prototype.isEnabled = function () { return cordova(this, "isEnabled", { "sync": true }, arguments); };
    BackgroundMode.prototype.isActive = function () { return cordova(this, "isActive", { "sync": true }, arguments); };
    BackgroundMode.prototype.setDefaults = function (overrides) { return cordova(this, "setDefaults", { "platforms": ["Android"] }, arguments); };
    BackgroundMode.prototype.configure = function (options) { return cordova(this, "configure", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.on = function (event) { return cordova(this, "on", { "observable": true, "clearFunction": "un", "clearWithArgs": true }, arguments); };
    BackgroundMode.prototype.un = function (event, callback) { return cordova(this, "un", {}, arguments); };
    BackgroundMode.prototype.moveToBackground = function () { return cordova(this, "moveToBackground", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.disableWebViewOptimizations = function () { return cordova(this, "disableWebViewOptimizations", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.moveToForeground = function () { return cordova(this, "moveToForeground", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.overrideBackButton = function () { return cordova(this, "overrideBackButton", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.excludeFromTaskList = function () { return cordova(this, "excludeFromTaskList", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.isScreenOff = function (fn) { return cordova(this, "isScreenOff", { "platforms": ["Android"] }, arguments); };
    BackgroundMode.prototype.wakeUp = function () { return cordova(this, "wakeUp", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.unlock = function () { return cordova(this, "unlock", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.disableBatteryOptimizations = function () { return cordova(this, "disableBatteryOptimizations", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.requestForegroundPermission = function () { return cordova(this, "requestForegroundPermission", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.pluginName = "BackgroundMode";
    BackgroundMode.plugin = "cordova-plugin-background-mode";
    BackgroundMode.pluginRef = "cordova.plugins.backgroundMode";
    BackgroundMode.repo = "https://github.com/katzer/cordova-plugin-background-mode";
    BackgroundMode.platforms = ["AmazonFire OS", "Android", "Browser", "iOS", "Windows"];
    BackgroundMode.decorators = [
        { type: Injectable }
    ];
    return BackgroundMode;
}(IonicNativePlugin));
export { BackgroundMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2JhY2tncm91bmQtbW9kZS9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQTZFRSxrQ0FBaUI7Ozs7SUFRbkQsK0JBQU07SUFTTixnQ0FBTztJQWNQLG1DQUFVLGFBQUMsTUFBZTtJQWExQixrQ0FBUyxhQUFDLEtBQWE7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOzs7O0lBV3ZDLGtDQUFTO0lBV1QsaUNBQVE7SUFhUixvQ0FBVyxhQUFDLFNBQXVDO0lBV25ELGtDQUFTLGFBQUMsT0FBcUM7SUFhL0MsMkJBQUUsYUFBQyxLQUFhO0lBV2hCLDJCQUFFLGFBQUMsS0FBYSxFQUFFLFFBQWtDO0lBV3BELHlDQUFnQjtJQVNoQixvREFBMkI7SUFTM0IseUNBQWdCO0lBU2hCLDJDQUFrQjtJQVNsQiw0Q0FBbUI7SUFVbkIsb0NBQVcsYUFBQyxFQUEyQjtJQVN2QywrQkFBTTtJQVNOLCtCQUFNO0lBU04sb0RBQTJCO0lBUzNCLG9EQUEyQjs7Ozs7OztnQkFoTjVCLFVBQVU7O3lCQTlFWDtFQStFb0MsaUJBQWlCO1NBQXhDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9ucyBpdGVtcyB0aGF0IGNhbiBiZSB1cGRhdGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tncm91bmRNb2RlQ29uZmlndXJhdGlvbiB7XG4gIC8qKlxuICAgKiBUaXRsZSBvZiB0aGUgYmFja2dyb3VuZCB0YXNrXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogRGVzY3JpcHRpb24gb2YgYmFja2dyb3VuZCB0YXNrXG4gICAqL1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgbG9vayBmb3IgYDxpY29uIG5hbWU+LnBuZ2AgaW4gcGxhdGZvcm1zL2FuZHJvaWQvcmVzL2RyYXdhYmxlfG1pcG1hcFxuICAgKi9cbiAgaWNvbj86IHN0cmluZztcblxuICAvKipcbiAgICogU2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBub3RpZmljYXRpb24gY2lyY2xlXG4gICAqL1xuICBjb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogQnkgZGVmYXVsdCB0aGUgYXBwIHdpbGwgY29tZSB0byBmb3JlZ3JvdW5kIHdoZW4gdGFwcGluZyBvbiB0aGUgbm90aWZpY2F0aW9uLiBJZiBmYWxzZSwgcGx1Z2luIHdvbid0IGNvbWUgdG8gZm9yZWdyb3VuZCB3aGVuIHRhcHBlZC5cbiAgICovXG4gIHJlc3VtZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gc2V0IHRvIGZhbHNlIG1ha2VzIHRoZSBub3RpZmljYXRpb25zIHZpc2libGUgb24gbG9jayBzY3JlZW4gKEFuZHJvaWQgNS4wKylcbiAgICovXG4gIGhpZGRlbj86IGJvb2xlYW47XG5cbiAgLyoqIEJpZyB0ZXh0ICovXG4gIGJpZ1RleHQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgdGV4dCB0aGF0IHNjcm9sbHMgaXRzZWxmIG9uIHN0YXR1c2JhclxuICAgKi9cbiAgdGlja2VyPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBpZiB0cnVlIHBsdWdpbiB3aWxsIG5vdCBkaXNwbGF5IGEgbm90aWZpY2F0aW9uLiBEZWZhdWx0IGlzIGZhbHNlLlxuICAgKi9cbiAgc2lsZW50PzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAbmFtZSBCYWNrZ3JvdW5kIE1vZGVcbiAqIEBkZXNjcmlwdGlvblxuICogQ29yZG92YSBwbHVnaW4gdG8gcHJldmVudCB0aGUgYXBwIGZyb20gZ29pbmcgdG8gc2xlZXAgd2hpbGUgaW4gYmFja2dyb3VuZC5cbiAqIFJlcXVpcmVzIENvcmRvdmEgcGx1Z2luOiBjb3Jkb3ZhLXBsdWdpbi1iYWNrZ3JvdW5kLW1vZGUuIEZvciBtb3JlIGluZm8gYWJvdXQgcGx1Z2luLCB2aXNpdDogaHR0cHM6Ly9naXRodWIuY29tL2thdHplci9jb3Jkb3ZhLXBsdWdpbi1iYWNrZ3JvdW5kLW1vZGVcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQmFja2dyb3VuZE1vZGUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2JhY2tncm91bmQtbW9kZS9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2dyb3VuZE1vZGU6IEJhY2tncm91bmRNb2RlKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmJhY2tncm91bmRNb2RlLmVuYWJsZSgpO1xuICogYGBgXG4gKlxuICogQGludGVyZmFjZXNcbiAqIEJhY2tncm91bmRNb2RlQ29uZmlndXJhdGlvblxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ0JhY2tncm91bmRNb2RlJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tYmFja2dyb3VuZC1tb2RlJyxcbiAgcGx1Z2luUmVmOiAnY29yZG92YS5wbHVnaW5zLmJhY2tncm91bmRNb2RlJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9rYXR6ZXIvY29yZG92YS1wbHVnaW4tYmFja2dyb3VuZC1tb2RlJyxcbiAgcGxhdGZvcm1zOiBbJ0FtYXpvbkZpcmUgT1MnLCAnQW5kcm9pZCcsICdCcm93c2VyJywgJ2lPUycsICdXaW5kb3dzJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmRNb2RlIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogRW5hYmxlIHRoZSBiYWNrZ3JvdW5kIG1vZGUuXG4gICAqIE9uY2UgY2FsbGVkLCBwcmV2ZW50cyB0aGUgYXBwIGZyb20gYmVpbmcgcGF1c2VkIHdoaWxlIGluIGJhY2tncm91bmQuXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgZW5hYmxlKCk6IHZvaWQge31cblxuICAvKipcbiAgICogRGlzYWJsZSB0aGUgYmFja2dyb3VuZCBtb2RlLlxuICAgKiBPbmNlIHRoZSBiYWNrZ3JvdW5kIG1vZGUgaGFzIGJlZW4gZGlzYWJsZWQsIHRoZSBhcHAgd2lsbCBiZSBwYXVzZWQgd2hlbiBpbiBiYWNrZ3JvdW5kLlxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIGRpc2FibGUoKTogdm9pZCB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBvciBkaXNhYmxlIHRoZSBiYWNrZ3JvdW5kIG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSBlbmFibGUge2Jvb2xlYW59IFRoZSBzdGF0dXMgdG8gc2V0IGZvci5cbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBzZXRFbmFibGVkKGVuYWJsZTogYm9vbGVhbik6IHZvaWQge31cblxuICAvKipcbiAgICogRmlyZSBldmVudCB3aXRoIGdpdmVuIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IHtzdHJpbmd9IGV2ZW50IFRoZSBldmVudCdzIG5hbWUuXG4gICAqIEBwYXJhbSBhcmdzIHthcnJheX0gVGhlIGNhbGxiYWNrJ3MgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgZmlyZUV2ZW50KGV2ZW50OiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGJhY2tncm91bmQgbW9kZSBpcyBlbmFibGVkIG9yIG5vdC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybnMgYSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBiYWNrZ3JvdW5kIG1vZGUgaXMgZW5hYmxlZC5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBpc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbiBiZSB1c2VkIHRvIGdldCB0aGUgaW5mb3JtYXRpb24gaWYgdGhlIGJhY2tncm91bmQgbW9kZSBpcyBhY3RpdmUuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm5zIGEgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiB0aGUgYmFja2dyb3VuZCBtb2RlIGlzIGFjdGl2ZS5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBpc0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogT3ZlcndyaXRlIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxuICAgKiBBdmFpbGFibGUgb25seSBmb3IgQW5kcm9pZCBwbGF0Zm9ybS5cbiAgICogQHBhcmFtIG92ZXJyaWRlcyB7QmFja2dyb3VuZE1vZGVDb25maWd1cmF0aW9ufSBEaWN0IG9mIG9wdGlvbnMgdG8gYmUgb3ZlcnJpZGRlbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICB9KVxuICBzZXREZWZhdWx0cyhvdmVycmlkZXM/OiBCYWNrZ3JvdW5kTW9kZUNvbmZpZ3VyYXRpb24pOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIE1vZGlmeSB0aGUgZGlzcGxheWVkIGluZm9ybWF0aW9uLlxuICAgKiBBdmFpbGFibGUgb25seSBmb3IgQW5kcm9pZCBwbGF0Zm9ybS5cbiAgICogQHBhcmFtIHtCYWNrZ3JvdW5kTW9kZUNvbmZpZ3VyYXRpb259IFtvcHRpb25zXSBBbnkgb3B0aW9ucyB5b3Ugd2FudCB0byB1cGRhdGUuIFNlZSB0YWJsZSBiZWxvdy5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIGNvbmZpZ3VyZShvcHRpb25zPzogQmFja2dyb3VuZE1vZGVDb25maWd1cmF0aW9uKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBjYWxsYmFjayBmb3IgZ2l2ZW4gZXZlbnQuXG4gICAqID4gQXZhaWxhYmxlIGV2ZW50cyBhcmUgYGVuYWJsZWAsIGBkaXNhYmxlYCwgYGFjdGl2YXRlYCwgYGRlYWN0aXZhdGVgIGFuZCBgZmFpbHVyZWAuXG4gICAqIEBwYXJhbSBldmVudCB7c3RyaW5nfSBFdmVudCBuYW1lXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgb2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBjbGVhckZ1bmN0aW9uOiAndW4nLFxuICAgIGNsZWFyV2l0aEFyZ3M6IHRydWUsXG4gIH0pXG4gIG9uKGV2ZW50OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZm9yIGV2ZW50cyB0aGF0IHRoZSBwbHVnaW4gZmlyZXMuIEF2YWlsYWJsZSBldmVudHMgYXJlIGBlbmFibGVgLCBgZGlzYWJsZWAsIGBhY3RpdmF0ZWAsIGBkZWFjdGl2YXRlYCBhbmQgYGZhaWx1cmVgLlxuICAgKiBAcGFyYW0gZXZlbnQge3N0cmluZ30gRXZlbnQgbmFtZVxuICAgKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdG8gYmUgZXhlYyBhcyBjYWxsYmFjay5cbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgdW4oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmRyb2lkIGFsbG93cyB0byBwcm9ncmFtbWF0aWNhbGx5IG1vdmUgZnJvbSBmb3JlZ3JvdW5kIHRvIGJhY2tncm91bmQuXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnXSxcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBtb3ZlVG9CYWNrZ3JvdW5kKCk6IHZvaWQge31cblxuICAvKipcbiAgICogRW5hYmxlIEdQUy10cmFja2luZyBpbiBiYWNrZ3JvdW5kIChBbmRyb2lkKS5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIGRpc2FibGVXZWJWaWV3T3B0aW1pemF0aW9ucygpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIEFuZHJvaWQgYWxsb3dzIHRvIHByb2dyYW1tYXRpY2FsbHkgbW92ZSBmcm9tIGJhY2tncm91bmQgdG8gZm9yZWdyb3VuZC5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIG1vdmVUb0ZvcmVncm91bmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGUgYmFjayBidXR0b24gb24gQW5kcm9pZCB0byBnbyB0byBiYWNrZ3JvdW5kIGluc3RlYWQgb2YgY2xvc2luZyB0aGUgYXBwLlxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHBsYXRmb3JtczogWydBbmRyb2lkJ10sXG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgb3ZlcnJpZGVCYWNrQnV0dG9uKCk6IHZvaWQge31cblxuICAvKipcbiAgICogRXhjbHVkZSB0aGUgYXBwIGZyb20gdGhlIHJlY2VudCB0YXNrIGxpc3QuIFdvcmtzIG9uIEFuZHJvaWQgNS4wKy5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIGV4Y2x1ZGVGcm9tVGFza0xpc3QoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgc2NyZWVuIGlzIG9mZi5cbiAgICogQHBhcmFtIGZuIHtmdW5jdGlvbn0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gaW52b2tlIHdpdGggYm9vbGVhbiBhcmcuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHBsYXRmb3JtczogWydBbmRyb2lkJ10sXG4gIH0pXG4gIGlzU2NyZWVuT2ZmKGZuOiAoYXJnMDogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQge31cblxuICAvKipcbiAgICogVHVybiBzY3JlZW4gb25cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIHdha2VVcCgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFR1cm4gc2NyZWVuIG9uIGFuZCBzaG93IGFwcCBldmVuIGxvY2tlZFxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHBsYXRmb3JtczogWydBbmRyb2lkJ10sXG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgdW5sb2NrKCk6IHZvaWQge31cblxuICAvKipcbiAgICogRGlzYWJsZXMgYmF0dGVyeSBvcHRpbWF6YXRpb24gbW9kZSBmb3IgdGhlIGFwcCAoYW5kcm9pZCBvbmx5KVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHBsYXRmb3JtczogWydBbmRyb2lkJ10sXG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgZGlzYWJsZUJhdHRlcnlPcHRpbWl6YXRpb25zKCk6IHZvaWQge31cblxuICAvKipcbiAgICogUmVxdWVzdHMgcGVybWlzc2lvbiB0byBcImRyYXcgb24gdG9wXCIgd2hpY2ggaXMgbmVjZXNzYXJ5IGZvciB0aGUgXCJtb3ZlVG9Gb3JlZ3JvdW5kXCIgbWV0aG9kIGluIEFuZHJvaWQgMTArXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnXSxcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICByZXF1ZXN0Rm9yZWdyb3VuZFBlcm1pc3Npb24oKTogdm9pZCB7fVxufVxuIl19