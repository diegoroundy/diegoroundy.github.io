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
            var hitZoneSize = 21; // creates the size of the hitzone
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
            blueSquare.x = -25; // sets the x position of the reward to -25 pixels.
            blueSquare.y = -25; // sets the y position of the reward to -25 pixels.
            reward.addChild(blueSquare); // add the red square to the reward game item

            reward.x = x; // sets the x pos of the reward to x
            reward.y = y; // sets the y pos of the reward to y

            game.addGameItem(reward); // adds reward to the game

            reward.velocityX = -1; // causes the reward to move 1 pixel to the left on the x position
      
            reward.rotationalVelocity = 25; // sets the rotating speed of the reward to 25.

        reward.onPlayerCollision = function() { // creates a function in which the reward will collide with the player.
            console.log('The reward has hit Halle'); // the console will log this message as sson as the reward collides with the player
            game.changeIntegrity(10); // the collision will add 10 health 
            game.increaseScore(5); // the collision will add 5 points.
        };

        reward.onProjectileCollision = function() { // this function will do something after the players projectile hits the reward.
            console.log('The projectile has hit Halle'); // the console will print this message after the projectile collides with the reward.
            game.changeIntegrity(5); // increases health by 5.
            game.increaseScore(5); // increases score by 5.
            reward.fadeOut(); // the reward will fade out upon collision.
        };
        }
        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25); // creating the game enemy and storing it in the variable enemy
            var redSquare = draw.rect(50,50,'red'); // creates triangle and stores as redSquare
            redSquare.x = -25; // the x position for the enemy is set to -25 pixels
            redSquare.y = -25; // the y position for the enemy is set to -25 pixels
            enemy.addChild(redSquare); // add the red square to the enemy game item

            enemy.x = x; // x pos of enemy is set to x
            enemy.y = y; // y pos of enemy is set to y

            game.addGameItem(enemy); // adds enemy to the game

            enemy.velocityX = -1; // causes the enemy to move 1 pixel to the left on the x position
      
            enemy.rotationalVelocity = 20; // rotating speed of the enemy is set to 25

            enemy.onPlayerCollision = function() { // function that will do something after the enemy collides with the player
                console.log('The enemy has hit Halle'); // the console will print this message after the enemy hits the player
                game.changeIntegrity(-10); // the player loses 10 health upon collision
                
        };

            enemy.onProjectileCollision = function() { // function that will do something after a projectile hits the enemy
                console.log('The projectile has hit Halle'); // the console will print this message upon collision
                game.changeIntegrity(5); // the player gains 5 health upon collision
                game.increaseScore(5); // score will increase by 5 upon collision
                enemy.fadeOut(); // enemy will fade out upon collison 
        };
        }
        for (var i = 0; i < levelData.gameItems.length; i++){ 
               var gameItem = levelData.gameItems[i];
        

            if (gameItem.type === "sawblade"){
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
