import Vector2D from "./Vector2D";

export default class RMap{
    public WIDTH:number;
    public HEIGHT:number;
    constructor(public mat:Array<Array<number>>,public TILE_SIZE:number){
        this.WIDTH = this.TILE_SIZE * this.mat[0].length;
        this.HEIGHT =  this.TILE_SIZE * this.mat.length;
    }

    public intersects(vec: Vector2D){
        if (vec.x < 0 || vec.x > this.WIDTH  || vec.y < 0 || vec.y > this.HEIGHT) {
            return true;
        }
        var mapGridIndexX = Math.floor(vec.x / this.TILE_SIZE);
        var mapGridIndexY = Math.floor(vec.y / this.TILE_SIZE);
        return this.mat[mapGridIndexY][mapGridIndexX] !== 0;
    }
    update(mat:Array<Array<number>>){
        this.mat = mat;
    }
    public render(ctx:CanvasRenderingContext2D){
        for (let x = 0; x < this.mat.length; x++){
            for (let y = 0; y < this.mat[0].length; y++){
                ctx.beginPath();
                ctx.strokeStyle = "#FFF";
                ctx.fillStyle = "#D3D3D3";
                    if (this.mat[x][y] > 0){
                        ctx.fillStyle = "#000000";
                    }
                    ctx.fillRect(y * this.TILE_SIZE, x * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
                ctx.stroke();
                ctx.closePath()
            }
        }
    }
}