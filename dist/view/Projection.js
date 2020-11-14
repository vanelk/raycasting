var Projection = /** @class */ (function () {
    function Projection(FOV, rays, SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE, STRIP_COL_WIDTH, player) {
        this.FOV = FOV;
        this.rays = rays;
        this.SCREEN_WIDTH = SCREEN_WIDTH;
        this.SCREEN_HEIGHT = SCREEN_HEIGHT;
        this.TILE_SIZE = TILE_SIZE;
        this.STRIP_COL_WIDTH = STRIP_COL_WIDTH;
        this.player = player;
        this.SCALE_FACTOR = 0.3;
    }
    Projection.prototype.update = function (rays) {
        this.rays = rays;
    };
    Projection.prototype.render = function (ctx) {
        var imgData = ctx.getImageData(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        ctx.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        var i = 0;
        var dist_player_plane = (this.SCREEN_WIDTH / 2) / Math.tan(this.FOV / 2);
        for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
            var ray = _a[_i];
            var projection_height = this.TILE_SIZE / (ray.distance * Math.cos(ray.angle - this.player.angle)) * dist_player_plane;
            ctx.beginPath();
            ctx.fillRect(i * this.STRIP_COL_WIDTH, this.SCREEN_HEIGHT / 2 - projection_height / 2, this.STRIP_COL_WIDTH, projection_height);
            ctx.closePath();
            i++;
        }
        var offsetCanvas = new OffscreenCanvas(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        var offsetCtx = offsetCanvas.getContext("2d");
        offsetCtx.putImageData(imgData, 0, 0);
        offsetCtx.scale(this.SCALE_FACTOR, this.SCALE_FACTOR);
        ctx.drawImage(offsetCanvas, 0, 0, this.SCREEN_WIDTH * this.SCALE_FACTOR, this.SCREEN_HEIGHT * this.SCALE_FACTOR);
    };
    return Projection;
}());
export default Projection;
//# sourceMappingURL=Projection.js.map