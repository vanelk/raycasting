import Vector2D from './Vector2D.js';
import RMAP from './RMap.js'
class Ray{
    public distance = 0;
    public intersect: Vector2D;
    private isFacingDown:boolean;
    private isFacingLeft:boolean;
    constructor(public position:Vector2D, public angle:number){
        this.isFacingDown =  this.angle > 0 && this.angle < Math.PI;
        this.isFacingLeft = !(this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI);
    }
    public update(position:Vector2D, angle:number){
        this.position = position;
        this.angle = this.normalizeAngle(angle);
        this.isFacingDown =  this.angle > 0 && this.angle < Math.PI;
        this.isFacingLeft = !(this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI);
    }
    public cast(map:RMAP){
        // horizontal intercept
        let ay = Math.floor(this.position.y/map.TILE_SIZE) * map.TILE_SIZE + (this.isFacingDown ? map.TILE_SIZE : 0) ;
        let ax = this.position.x + (ay - this.position.y) / Math.tan(this.angle);
        let ystep = (this.isFacingDown ? 1 : -1) * map.TILE_SIZE;
        let xstep = map.TILE_SIZE / Math.tan(this.angle); 
        xstep *= (this.isFacingLeft && xstep > 0) ? -1 : 1;
        xstep *= (!this.isFacingLeft && xstep < 0) ? -1 : 1;

        let foundHorzHit = false;
        let nextHoriz = new Vector2D(ax, ay);
        while(nextHoriz.x>= 0 && nextHoriz.y <= map.WIDTH && nextHoriz.x >= 0 && nextHoriz.x <= map.HEIGHT && !foundHorzHit){
            if (map.intersects(Vector2D.add(nextHoriz, new Vector2D(0, - (this.isFacingDown ? 0 : 1))))) {
                foundHorzHit = true;
                break;
            } else {
                nextHoriz.x += xstep;
                nextHoriz.y += ystep;
            }
        }
        
        // vertical intercept
        let foundVertHit = false;
        ax = Math.floor(this.position.x / map.TILE_SIZE) * map.TILE_SIZE;
        ax += !this.isFacingLeft ? map.TILE_SIZE : 0;
        ay = this.position.y + (ax - this.position.x) * Math.tan(this.angle);

        xstep = map.TILE_SIZE;
        xstep *= this.isFacingLeft ? -1 : 1;
        ystep = map.TILE_SIZE * Math.tan(this.angle);
        ystep *= (!this.isFacingDown && ystep > 0) ? -1 : 1;
        ystep *= (this.isFacingDown && ystep < 0) ? -1 : 1;

        let nextVert = new Vector2D(ax , ay);
        while (nextVert.x >= 0 && nextVert.x <= map.WIDTH && nextVert.y >= 0 && nextVert.y <= map.HEIGHT) {
            if (map.intersects(Vector2D.add(nextVert, new Vector2D( - (this.isFacingLeft ? 1 : 0), 0) ))) {
                foundVertHit = true;
                break;
            } else {
                nextVert.x += xstep;
                nextVert.y += ystep;
            }
        }
        
        let actualHit: Vector2D;
        const horzDistance = Vector2D.distance(nextHoriz, this.position);
        const vertDistance = Vector2D.distance(nextVert, this.position)
        if(foundVertHit && foundVertHit){
            if(horzDistance < vertDistance){
                actualHit = nextHoriz;
                this.distance = horzDistance;
            }else{
                actualHit = nextVert;
                this.distance = vertDistance;
            }
        }else if(foundVertHit){
            actualHit = nextVert;
            this.distance = vertDistance;
        }else{
            actualHit = nextHoriz;
            this.distance = horzDistance;
        }
        this.intersect = actualHit;
    }

    private normalizeAngle(angle:number){
        angle = angle % (2 * Math.PI);
        if (angle < 0) {
            angle = (2 * Math.PI) + angle;
        }
        return angle;
    }
    public render(ctx:CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.intersect.x, this.intersect.y);
        ctx.strokeStyle = "#ff840031";
        ctx.stroke();
        ctx.closePath();
    }
}
export default Ray;