var RMap = /** @class */ (function () {
    function RMap(mat, TILE_SIZE) {
        this.mat = mat;
        this.TILE_SIZE = TILE_SIZE;
        this.WIDTH = this.TILE_SIZE * this.mat[0].length;
        this.HEIGHT = this.TILE_SIZE * this.mat.length;
    }
    RMap.prototype.intersects = function (vec) {
        if (vec.x < 0 || vec.x > this.WIDTH || vec.y < 0 || vec.y > this.HEIGHT) {
            return true;
        }
        var mapGridIndexX = Math.floor(vec.x / this.TILE_SIZE);
        var mapGridIndexY = Math.floor(vec.y / this.TILE_SIZE);
        return this.mat[mapGridIndexY][mapGridIndexX] !== 0;
    };
    RMap.prototype.update = function (mat) {
        this.mat = mat;
    };
    RMap.prototype.render = function (ctx) {
        for (var x = 0; x < this.mat.length; x++) {
            for (var y = 0; y < this.mat[0].length; y++) {
                ctx.beginPath();
                ctx.strokeStyle = "#FFF";
                ctx.fillStyle = "#D3D3D3";
                if (this.mat[x][y] > 0) {
                    ctx.fillStyle = "#000000";
                }
                ctx.fillRect(y * this.TILE_SIZE, x * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
                ctx.stroke();
                ctx.closePath();
            }
        }
    };
    return RMap;
}());
export default RMap;
//# sourceMappingURL=RMap.js.map