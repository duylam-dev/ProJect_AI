class Road{
    constructor(x, width, laneCount = 3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        
        this.left = x - width/2;
        this.right = x + width/2;
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x:this.left,y: this.top};
        const topRight = {x:this.right,y:this.top};
        const bottomLeft = {x:this.left,y: this.bottom};
        const bottomRight = {x:this.right,y: this.bottom};
        this.borders = [[topLeft, bottomLeft],[topRight, bottomRight]];
    }
    //set vi tri xe tren duong
    getLaneCenter(laneIndex){
        const lanewidth = this.width/this.laneCount;
        return this.left + lanewidth/2 + 
            Math.min(laneIndex, this.laneCount-1)*lanewidth;
    }
    draw(ctx){
        ctx.linewidth = 5;
        ctx.strokeStyle = "white";
        //ve lan duong
        for(let i = 0; i <= this.laneCount - 1; i++){
            const x = lerp(
                this.left, 
                this.right,
                i/(this.laneCount)
            );

            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.borders.forEach(b => {
            ctx.beginPath();
            ctx.moveTo(b[0].x, b[0].y);
            ctx.lineTo(b[1].x, b[1].y);
            ctx.stroke();
        })
        
    }
    
}