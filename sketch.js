let topImages = [];
let bottomImages = [];
let topIndex = 0;
let bottomIndex = 0;
let buttonImage;
let backgroundImage;

let topButtonX = 550, topButtonY = 300, buttonWidth = 350, buttonHeight = 200;
let bottomButtonX = 550, bottomButtonY = 550;

let topX = 150, topY = 190, topWidth = 400, topHeight = 400;
let bottomX = 150, bottomY = 500, bottomWidth = 400, bottomHeight = 500;

let topButtonShrink = false;
let bottomButtonShrink = false;
let shrinkFactor = 0.8;
let shrinkDuration = 200;

function preload() {
    topImages = [
        loadImage('images/girl.png'),
        loadImage('images/reindeer.png'),
      loadImage('images/gingerbread.png'),
      loadImage('images/snowman.png'),
        loadImage('images/santa.png')
    ];
    bottomImages = [
        loadImage('images/santa_body.png'),
        loadImage('images/girl_body.png'),
      loadImage('images/gingerbread_body.png'),
      loadImage('images/snowman_body.png'),
        loadImage('images/reindeer_body.png')
    ];
    buttonImage = loadImage('images/pil.png');
    backgroundImage = loadImage('images/background.png');
}

function setup() {
    createCanvas(1024, 1024);
    noSmooth();
    
    // Disable default touch behavior
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('touchstart', function(event) {
        event.preventDefault();
    }, { passive: false });
}

function draw() {
    image(backgroundImage, 0, 0, 1024, 1024);
    image(bottomImages[bottomIndex], bottomX, bottomY, bottomWidth, bottomHeight);
    image(topImages[topIndex], topX, topY, topWidth, topHeight);

    if (topButtonShrink) {
        image(buttonImage, topButtonX, topButtonY, buttonWidth * shrinkFactor, buttonHeight * shrinkFactor);
    } else {
        image(buttonImage, topButtonX, topButtonY, buttonWidth, buttonHeight);
    }

    if (bottomButtonShrink) {
        image(buttonImage, bottomButtonX, bottomButtonY, buttonWidth * shrinkFactor, buttonHeight * shrinkFactor);
    } else {
        image(buttonImage, bottomButtonX, bottomButtonY, buttonWidth, buttonHeight);
    }
}

function mousePressed() {
    handleInteraction(mouseX, mouseY);
}

function touchStarted() {
    // Get the first touch point
    if (touches.length > 0) {
        handleInteraction(touches[0].x, touches[0].y);
    }
    return false; // Prevent default
}

function handleInteraction(x, y) {
    // Top button check
    if (x > topButtonX && x < topButtonX + buttonWidth && 
        y > topButtonY && y < topButtonY + buttonHeight) {
        topIndex = (topIndex + 1) % topImages.length;
        triggerButtonShrink('top');
    }
    
    // Bottom button check
    if (x > bottomButtonX && x < bottomButtonX + buttonWidth && 
        y > bottomButtonY && y < bottomButtonY + buttonHeight) {
        bottomIndex = (bottomIndex + 1) % bottomImages.length;
        triggerButtonShrink('bottom');
    }
}

function triggerButtonShrink(button) {
    if (button === 'top') {
        topButtonShrink = true;
        setTimeout(() => {
            topButtonShrink = false;
        }, shrinkDuration);
    } else if (button === 'bottom') {
        bottomButtonShrink = true;
        setTimeout(() => {
            bottomButtonShrink = false;
        }, shrinkDuration);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    adjustLayout();
}

function adjustLayout() {
    // Add responsive layout adjustments here if needed
}