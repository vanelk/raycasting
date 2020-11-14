var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import Player from './model/Player.js';
import Vector2D from './model/Vector2D.js';
import RMap from './model/RMap.js';
import Ray from './model/Ray.js';
import Renderer from './view/Renderer.js';
import Projection from './view/Projection.js';
var canvas = document.getElementById("canvas");
var MAP_NUM_ROWS = 15;
var MAP_NUM_COLS = 15;
var MAP_TILE_SIZE = 32;
var FOV = Math.PI / 3;
var STRIP_COL_WIDTH = 1;
var map = new RMap([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
], MAP_TILE_SIZE);
var WINDOW_WIDTH = MAP_NUM_COLS * MAP_TILE_SIZE;
var WINDOW_HEIGHT = MAP_NUM_ROWS * MAP_TILE_SIZE;
var renderer = new Renderer(canvas);
var player = new Player(new Vector2D(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2));
renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
var rays = [];
var projection = new Projection(FOV, rays, WINDOW_WIDTH, WINDOW_HEIGHT, MAP_TILE_SIZE, STRIP_COL_WIDTH, player);
document.addEventListener("keydown", function (e) {
    switch (e.code) {
        case "ArrowUp":
            player.move_direction = 1;
            break;
        case "ArrowDown":
            player.move_direction = -1;
            break;
        case "ArrowLeft":
            player.rot_direction = -1;
            break;
        case "ArrowRight":
            player.rot_direction = 1;
    }
});
document.addEventListener("keyup", function (e) {
    switch (e.code) {
        case "ArrowUp":
            player.move_direction = 0;
            break;
        case "ArrowDown":
            player.move_direction = 0;
            break;
        case "ArrowLeft":
            player.rot_direction = 0;
            break;
        case "ArrowRight":
            player.rot_direction = 0;
    }
});
var btn = document.getElementById("randomize");
btn.addEventListener("click", function (e) {
    var m = [];
    for (var i = 0; i < MAP_NUM_ROWS; i++) {
        m[i] = [];
        for (var j = 0; j < MAP_NUM_COLS; j++) {
            m[i][j] = Math.round(Math.random());
        }
    }
    map.update(m);
});
function updateLoop() {
    player.update(map);
    var current_angle = player.angle - FOV / 2;
    for (var i = 0; i < WINDOW_WIDTH / STRIP_COL_WIDTH; i++) {
        rays[i] = (new Ray(player.position, current_angle));
        current_angle += FOV / (WINDOW_WIDTH / STRIP_COL_WIDTH);
        rays[i].update(player.position, current_angle);
        rays[i].cast(map);
    }
    renderer.renderAll(__spreadArrays([map], rays, [player, projection]));
    requestAnimationFrame(updateLoop);
}
updateLoop();
//# sourceMappingURL=main.js.map