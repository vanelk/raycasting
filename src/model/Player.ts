import RMap from './RMap';
import Vector2D from './Vector2D.js';
export default class Player {
    private MOVE_SPEED = 3;
    private ROT_SPEED = 3 * (Math.PI / 180);
    private P_RAD = 3;
    public move_direction = 0;
    public rot_direction = 0;
    constructor(public position:Vector2D, public angle:number = Math.PI/2){ }

    public update(map:RMap):void {
        const move_delta_x = Math.cos(this.angle) * this.MOVE_SPEED * this.move_direction;
        const move_delta_y = Math.sin(this.angle) * this.MOVE_SPEED * this.move_direction;
        const next_position = Vector2D.add(this.position, new Vector2D(move_delta_x, move_delta_y));
        this.angle += this.ROT_SPEED * this.rot_direction;
        if(!map.intersects(next_position))
        this.position = next_position
    }

    public render(ctx:CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.fillStyle = "#FF5400";
        ctx.arc(this.position.x, this.position.y, this.P_RAD, 0, 2*Math.PI);
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo((this.position.x + Math.cos(this.angle) * 20), (this.position.y + Math.sin(this.angle) * 20));
        ctx.stroke()
        ctx.fill();
        ctx.closePath();
    }
}