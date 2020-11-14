var Renderer = /** @class */ (function () {
    function Renderer(canvas) {
        if (canvas === void 0) { canvas = document.getElementById("canvas"); }
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
    Renderer.prototype.renderAll = function (scene) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var _i = 0, scene_1 = scene; _i < scene_1.length; _i++) {
            var elem = scene_1[_i];
            elem.render(this.ctx);
        }
    };
    Renderer.prototype.setSize = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    return Renderer;
}());
export default Renderer;
//# sourceMappingURL=Renderer.js.map