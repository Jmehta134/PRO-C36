class Food{
    constructor(){
        this.foodStock
        this.lastFed
        this.image=loadImage("images/Milk.png");
        this.fedImg = false;
    }
    getFoodStock(){
        database.ref('food').on("value",function(data){
            foods = data.val();
        })
    }
    updateFoodStock(){
        database.ref('/').update({
            food:foods-1
        });
        fedTime = hour();
        database.ref('/').update({
            hour: fedTime
        });
    }
    deductFood(){
        database.ref('/').update({
            food:foods-1
        });
    }
    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        if (this.fedImg){
            image(this.image,670,300,70,70);
        }
        if (this.foods !== 0){
            for (var i = 0 ; i < foods ;i++){
                if (i%10 === 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }
}