import Player from './model/Player.js';
import Vector2D from './model/Vector2D.js';
import RMap from './model/RMap.js';
import Ray from './model/Ray.js';
import Renderer from './view/Renderer.js';
import Projection from './view/Projection.js';
let canvas = document.getElementById("canvas") as HTMLCanvasElement;
const MAP_NUM_ROWS = 15;
const MAP_NUM_COLS = 15;
const MAP_TILE_SIZE = 32;
const FOV = Math.PI/3;
const STRIP_COL_WIDTH =1;
const map:RMap = new RMap( 
    [
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
      ], MAP_TILE_SIZE
);
const WINDOW_WIDTH = MAP_NUM_COLS * MAP_TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * MAP_TILE_SIZE;

const renderer:Renderer = new Renderer(canvas);
const player:Player = new Player(new Vector2D(WINDOW_WIDTH/2, WINDOW_HEIGHT/2));
renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

const rays = [];
const projection = new Projection(FOV, rays, WINDOW_WIDTH, WINDOW_HEIGHT, MAP_TILE_SIZE, STRIP_COL_WIDTH, player);
document.addEventListener("keydown", function (e) {
    switch(e.code){
        case "ArrowUp":
            player.move_direction = 1
            break
        case "ArrowDown":
            player.move_direction = -1
            break
        case "ArrowLeft":
            player.rot_direction = -1
            break
        case "ArrowRight":
            player.rot_direction = 1
    }
    
});
document.addEventListener("keyup", function (e) {
    switch(e.code){
        case "ArrowUp":
            player.move_direction = 0
            break
        case "ArrowDown":
            player.move_direction = 0
            break
        case "ArrowLeft":
            player.rot_direction = 0
            break
        case "ArrowRight":
            player.rot_direction = 0
    }
});
let btn = document.getElementById("randomize");
btn.addEventListener("click", (e)=>{
    let m:Array<Array<number>> = [];
    for(let i = 0; i< MAP_NUM_ROWS; i++) {
        m[i] = [];
        for(let j = 0; j< MAP_NUM_COLS; j++){
            m[i][j] = Math.round(Math.random());
        }
    }
    map.update(m);
})
function updateLoop(){
    player.update(map);
    let current_angle = player.angle - FOV/2;
    for(let i = 0; i < WINDOW_WIDTH/STRIP_COL_WIDTH; i++){
        rays[i] = (new Ray(player.position, current_angle));
        current_angle += FOV /(WINDOW_WIDTH/STRIP_COL_WIDTH);
        rays[i].update(player.position, current_angle)
        rays[i].cast(map);
    }
    renderer.renderAll([map, ...rays, player, projection]);
    requestAnimationFrame(updateLoop);
}
updateLoop();
