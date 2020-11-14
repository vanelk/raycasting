var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2D.add = function (vec1, vec2) {
        return new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y);
    };
    Vector2D.equals = function (vec1, vec2) {
        return vec1.x === vec2.x && vec1.y === vec2.y;
    };
    Vector2D.distance = function (vec1, vec2) {
        var delta_y = vec2.y - vec1.y;
        var delta_x = vec2.x - vec1.x;
        return Math.sqrt((delta_y * delta_y) + (delta_x * delta_x));
    };
    return Vector2D;
}());
export default Vector2D;
//# sourceMappingURL=Vector2D.js.map