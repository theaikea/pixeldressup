let topImages = [];
let bottomImages = [];
let topIndex = 0;
let bottomIndex = 0;

let buttonImage;
let backgroundImage; // Declare a variable for the background image
let topButtonX = 550, topButtonY = 300, buttonWidth = 350, buttonHeight = 200;
let bottomButtonX = 550, bottomButtonY = 550;

// Positions and sizes for images
let topX = 150, topY = 190, topWidth = 400, topHeight = 400;
let bottomX = 150, bottomY = 500, bottomWidth = 400, bottomHeight = 400;

// Variables for button shrinking
let topButtonShrink = false;
let bottomButtonShrink = false;
let shrinkFactor = 0.8; // Scale factor for the shrinking effect
let shrinkDuration = 200; // Shrinking effect duration in milliseconds

function preload() {
  // Load images
  topImages = [
    loadImage('images/rensdyr.png'),
    loadImage('images/nissepige.png'),
    loadImage('images/julemand.png')
  ];
  
  bottomImages = [
    loadImage('images/rensdyr_krop.png'),
    loadImage('images/nissepige_krop.png'),
    loadImage('images/julemand_krop.png')
  ];
  
  buttonImage = loadImage('images/pil.png'); // Load the image for the buttons
  backgroundImage = loadImage('images/background.png'); // Load the background image
}

function setup() {
  createCanvas(1024, 1024);
}

function draw() {
  // Draw the background image
  image(backgroundImage, 0, 0, width, height);

  // Draw bottom image first (lower z-index)
  image(bottomImages[bottomIndex], bottomX, bottomY, bottomWidth, bottomHeight);

  // Draw top image second (higher z-index)
  image(topImages[topIndex], topX, topY, topWidth, topHeight);

  // Draw the button images
  if (topButtonShrink) {
    image(
      buttonImage,
      topButtonX,
      topButtonY,
      buttonWidth * shrinkFactor,
      buttonHeight * shrinkFactor
    );
  } else {
    image(buttonImage, topButtonX, topButtonY, buttonWidth, buttonHeight);
  }

  if (bottomButtonShrink) {
    image(
      buttonImage,
      bottomButtonX,
      bottomButtonY,
      buttonWidth * shrinkFactor,
      buttonHeight * shrinkFactor
    );
  } else {
    image(buttonImage, bottomButtonX, bottomButtonY, buttonWidth, buttonHeight);
  }
}

function mousePressed() {
  handleInteraction(mouseX, mouseY);
}

function touchStarted() {
  handleInteraction(touchX, touchY);
  return false; // Prevent default touch behavior
}

function handleInteraction(x, y) {
  // Check if the x, y coordinates are within the bounds of the top button
  if (
    x > topButtonX && x < topButtonX + buttonWidth &&
    y > topButtonY && y < topButtonY + buttonHeight
  ) {
    topIndex = floor(random(topImages.length));
    triggerButtonShrink('top');
  }
  
  // Check if the x, y coordinates are within the bounds of the bottom button
  if (
    x > bottomButtonX && x < bottomButtonX + buttonWidth &&
    y > bottomButtonY && y < bottomButtonY + buttonHeight
  ) {
    bottomIndex = floor(random(bottomImages.length));
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
