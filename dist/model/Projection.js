var Projection = /** @class */ (function () {
    function Projection(FOV, rays, SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE, STRIP_WALL_WIDTH) {
        this.FOV = FOV;
        this.rays = rays;
        this.SCREEN_WIDTH = SCREEN_WIDTH;
        this.SCREEN_HEIGHT = SCREEN_HEIGHT;
        this.TILE_SIZE = TILE_SIZE;
        this.STRIP_WALL_WIDTH = STRIP_WALL_WIDTH;
    }
    Projection.prototype.render = function (ctx) {
        var dist_player_plane = (this.SCREEN_WIDTH / 2) / Math.tan(this.FOV / 2);
        var i = 0;
        for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
            var ray = _a[_i];
            var projection_height = this.TILE_SIZE / ray.intersect.length * dist_player_plane;
            ctx.rect(i * this.STRIP_WALL_WIDTH, this.SCREEN_HEIGHT / 2 - projection_height / 2, this.STRIP_WALL_WIDTH, projection_height);
        }
    };
    return Projection;
}());
export {};
//# sourceMappingURL=Projection.js.map