import Ray from '../model/Ray.js';
import Player from '../model/Player.js';
class Projection{
    private SCALE_FACTOR = 0.3;
    constructor(public FOV:number, public rays:Array<Ray>, public SCREEN_WIDTH: number, public SCREEN_HEIGHT: number, public TILE_SIZE:number, public STRIP_COL_WIDTH, public player:Player){

    }
    public update( rays:Array<Ray>){
        this.rays = rays;
    }
    public render(ctx: CanvasRenderingContext2D){
        const imgData = ctx.getImageData(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        ctx.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        let i = 0;
        let dist_player_plane =  (this.SCREEN_WIDTH/2)/ Math.tan(this.FOV/2);
        for(let ray of this.rays){ 
            let projection_height = this.TILE_SIZE/(ray.distance * Math.cos(ray.angle - this.player.angle)) * dist_player_plane;
            ctx.beginPath();
            ctx.fillRect(i*this.STRIP_COL_WIDTH, this.SCREEN_HEIGHT/2 - projection_height/2, this.STRIP_COL_WIDTH, projection_height);
            ctx.closePath();
            i++;
        }
        const offsetCanvas = new OffscreenCanvas(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        const offsetCtx = offsetCanvas.getContext("2d");
        offsetCtx.putImageData(imgData, 0, 0);
        offsetCtx.scale(this.SCALE_FACTOR, this.SCALE_FACTOR);
        ctx.drawImage(offsetCanvas, 0, 0, this.SCREEN_WIDTH* this.SCALE_FACTOR, this.SCREEN_HEIGHT * this.SCALE_FACTOR);
    }
}
export default Projection;