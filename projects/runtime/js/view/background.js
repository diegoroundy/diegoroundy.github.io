var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'gray');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            for (var i = 0; i < 100; i++){ // a for loop is created that stores 100 cirlces
                var circle = draw.circle(0.5,'white','yellow',2); // the variable circle is declared and it stores code to draw a circle
                circle.x = canvasWidth*Math.random(); // x position of the circle, multiplies canvasWidth by a random decimal between .1 and .99
                circle.y = groundY*Math.random(); // y position of the circle, multiplies groundY by a random decimal between .1 and .99
                background.addChild(circle);   // circle is drawn on the canvas
            }
            var moon = draw.bitmap('img/moon.png'); // created a variable called moon, draw.bitmap draws the image and stores it in the variable
            moon.x = canvasWidth - 300; // x position of the moon
            moon.y = groundY - 450;  // y position of the moon
            moon.scaleX = 0.5; // width of the moon
            moon.scaleY = 0.5; // height of the moon
            background.addChild(moon); // adds the moon to the canvas so we can see it
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i = 0; i < 10; i++) {  // a for loop is used to draw 5 buildings
                    var buildingHeight = 300; // the variable buildingHeight is declared and is assigned to the height of the building in pixels
                    var building = draw.rect(75,buildingHeight,'LightGray','Black',1); // the variable building is declared and it is assigned to the code for the buildings such as height and color.
                    building.x = 200 * i; // positions the x of each building 200 pixels from the next.
                    building.y = groundY - buildingHeight; // the y position of the building is groundY subtracted by the height.
                    background.addChild(building); // the building is added to the background so it can be seen
                    buildings.push(building); // the buildings are pushed to the array
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png'); // the variable tree is declared and it stores the image of the tree 
            tree.x = 600; // x position of the tree
            tree.y = groundY - 125; // y position of the tree, groundY is subtracted +
            tree.scaleX = 0.5;
            tree.scaleY = 0.5;
            background.addChild(tree);
            
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; // taking the value of tree.x (x position) and decreasing by 1 pixel every time the update function runs.Makes it move left.
            if(tree.x < -200) { // if the x position of the tree exeeds -200, then the x position of the tree will be reset to canvasWidth.
                tree.x = canvasWidth; // the x position of the tree is assigned to the canvasWidth.
            }
            
            // TODO 5: Part 2 - Parallax
            // loops the buildings and moves them to the left by .5 pixels
           for (var i = 0; i < buildings.length; i++){
               buildings[i].x = buildings[i].x - 0.5; // moves buildings x position by .5 pixels
                if(buildings[i].x < 0) { // checks to see if the buildings x pos is off the left side and if it is it resets 
                    buildings[i].x = canvasWidth;
                }
           }


        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
