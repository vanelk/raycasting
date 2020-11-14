import Vector2D from './Vector2D.js';
var Player = /** @class */ (function () {
    function Player(position, angle) {
        if (angle === void 0) { angle = Math.PI / 2; }
        this.position = position;
        this.angle = angle;
        this.MOVE_SPEED = 3;
        this.ROT_SPEED = 3 * (Math.PI / 180);
        this.P_RAD = 3;
        this.move_direction = 0;
        this.rot_direction = 0;
    }
    Player.prototype.update = function (map) {
        var move_delta_x = Math.cos(this.angle) * this.MOVE_SPEED * this.move_direction;
        var move_delta_y = Math.sin(this.angle) * this.MOVE_SPEED * this.move_direction;
        var next_position = Vector2D.add(this.position, new Vector2D(move_delta_x, move_delta_y));
        this.angle += this.ROT_SPEED * this.rot_direction;
        if (!map.intersects(next_position))
            this.position = next_position;
    };
    Player.prototype.render = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#FF5400";
        ctx.arc(this.position.x, this.position.y, this.P_RAD, 0, 2 * Math.PI);
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo((this.position.x + Math.cos(this.angle) * 20), (this.position.y + Math.sin(this.angle) * 20));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    };
    return Player;
}());
export default Player;
//# sourceMappingURL=Player.js.map