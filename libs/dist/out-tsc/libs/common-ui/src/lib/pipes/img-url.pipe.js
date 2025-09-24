import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let ImgUrlPipe = class ImgUrlPipe {
    transform(value) {
        if (!value)
            return null;
        return `https://icherniakov.ru/yt-course/${value}`;
    }
};
ImgUrlPipe = __decorate([
    Pipe({
        name: 'imgUrl',
        standalone: true,
    })
], ImgUrlPipe);
export { ImgUrlPipe };
//# sourceMappingURL=img-url.pipe.js.map