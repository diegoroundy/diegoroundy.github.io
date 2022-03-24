var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 50 },
                { "type": "sawblade", "x": 600, "y": groundY - 50 },
                { "type": "sawblade", "x": 900, "y": groundY - 50},

                { "type": "enemy", "x": 450, "y": groundY - 50 },
                { "type": "enemy", "x": 300, "y": groundY - 50 },
                { "type": "enemy", "x": 700, "y": groundY  - 50},

                { "type": "reward", "x": 500, "y": groundY - 50 },
                { "type": "reward", "x": 800, "y": groundY - 50},
                { "type": "reward", "x": 1000, "y": groundY- 50 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){
            var hitZoneSize = 25; // creates the size of the hitzone
            var damageFromObstacle = 10; // sets the damage of the obstacle 
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates the hitzone and stores it in sawBladeHitZone variable (Saw blade obstacle)
            sawBladeHitZone.x = x; // the x position of the hitzone
            sawBladeHitZone.y = y; // the y pos of the hitzone
            game.addGameItem(sawBladeHitZone);  // add the hitzone to the game   
        
            var obstacleImage = draw.bitmap('img/sawblade.png'); // drawing the image and storing it in the obstacleImage variable
            sawBladeHitZone.addChild(obstacleImage); // adding the image to the hitzone so we can see it 
            obstacleImage.x = -27; // tweaks the image 25 pixels to the left
            obstacleImage.y = -27; // tweaks the image 25 pixels up
            sawBladeHitZone.rotationalVelocity = 10;
        }
        

        function createReward(x, y){
            var reward = game.createGameItem('reward',25); // creating the game reward and storing it in the variable reward
            var blueSquare = draw.rect(50,50,'blue'); // creates triangle and stores as redSquare
            blueSquare.x = -25;
            blueSquare.y = -25;
            reward.addChild(blueSquare); // add the red square to the reward game item

            reward.x = x;
            reward.y = y;

            game.addGameItem(reward); // adds reward to the game

            reward.velocityX = -1; // causes the reward to move 1 pixel to the left on the x position
      
            reward.rotationalVelocity = 25;

        reward.onPlayerCollision = function() {
            console.log('The reward has hit Halle');
            game.changeIntegrity(10);
            game.increaseScore(5);
        };

        reward.onProjectileCollision = function() {
            console.log('The projectile has hit Halle');
            game.changeIntegrity(5);
            game.increaseScore(5);
            reward.fadeOut();
        };
        }
        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25); // creating the game enemy and storing it in the variable enemy
            var redSquare = draw.rect(25,25,'red'); // creates triangle and stores as redSquare
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare); // add the red square to the enemy game item

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy); // adds enemy to the game

            enemy.velocityX = -1; // causes the enemy to move 1 pixel to the left on the x position
      
            redSquare.rotationalVelocity = 25;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                
        };

            enemy.onProjectileCollision = function() {
                console.log('The projectile has hit Halle');
                game.changeIntegrity(5);
                game.increaseScore(5);
                enemy.fadeOut();
        };
        }
        for (var i = 0; i < levelData.gameItems.length; i++){
               var gameItem = levelData.gameItems[i];
        

            if (gameItem.type === "sawBlade"){
                    createSawBlade(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "enemy"){
                    createEnemy(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "reward"){
                    createReward(gameItem.x, gameItem.y);
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
