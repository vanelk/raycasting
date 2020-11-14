export default class Vector2D{
    constructor(public x:number, public y:number){    }
    public static add(vec1: Vector2D, vec2: Vector2D): Vector2D {
		return new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y)
	}
	
	public static equals(vec1: Vector2D, vec2: Vector2D): boolean {
		return vec1.x === vec2.x && vec1.y === vec2.y
    }
    public static distance(vec1: Vector2D, vec2: Vector2D): number {
		const delta_y = vec2.y - vec1.y
		const delta_x = vec2.x - vec1.x
		return Math.sqrt((delta_y * delta_y) + (delta_x * delta_x))
	}


}