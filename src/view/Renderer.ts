export default class Renderer{
    private ctx:CanvasRenderingContext2D;
    constructor (private canvas:HTMLCanvasElement = (document.getElementById("canvas") as HTMLCanvasElement)){
        this.ctx = canvas.getContext("2d");
    }

    public renderAll(scene){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for(let elem of scene){
            elem.render(this.ctx);
        }
    }

    public setSize(width:number, height:number){
        this.canvas.width = width;
        this.canvas.height = height;
    }
    
}