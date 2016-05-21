/*!
  The Memory Game
  @name memory-game
  @author Michael Petruniak
  @version 1.0.1
  @date 06/09/2012
  @category Canvas game
  @copyright (c) 2012 (www.mikepetruniak.com)
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/

// Initialize the game canvas
window.onload = function () {

  // Set up game piece colors
  var green_on = '#00cd00', 
    green_off = '#008b45', 
    yellow_on = '#f3f315', 
    yellow_off = '#ff9912', 
    red_on = '#ee0000', 
    red_off = '#660000', 
    blue_on = '#0000ee', 
    blue_off = '#000060';

  // Set up game sounds
  var green_audio = new Audio(), 
    yellow_audio = new Audio(), 
    red_audio = new Audio(), 
    blue_audio = new Audio();

  green_audio.src = Modernizr.audio.ogg ? 'src/audio/simonSound1.ogg' : 
    Modernizr.audio.mp3 ? 'src/audio/simonSound1.mp3' : 'src/audio/simonSound1.m4a';

  yellow_audio.src = Modernizr.audio.ogg ? 'src/audio/simonSound2.ogg' : 
    Modernizr.audio.mp3 ? 'src/audio/simonSound2.mp3' : 'src/audio/simonSound2.m4a';

  red_audio.src = Modernizr.audio.ogg ? 'src/audio/simonSound3.ogg' : 
    Modernizr.audio.mp3 ? 'src/audio/simonSound3.mp3' : 'src/audio/simonSound3.m4a';

  blue_audio.src = Modernizr.audio.ogg ? 'src/audio/simonSound4.ogg' : 
    Modernizr.audio.mp3 ? 'src/audio/simonSound4.mp3' : 'src/audio/simonSound4.m4a';

  green_audio.preload = 'auto';
  yellow_audio.preload = 'auto';
  red_audio.preload = 'auto';
  blue_audio.preload = 'auto';

  // Stage
  var stage = new Kinetic.Stage({
    container:'game-board',
    width:500,
    height:500
  });

  // Layers
  game_board_layer = new Kinetic.Layer();
  text_layer = new Kinetic.Layer();
  image_layer = new Kinetic.Layer();

  // Center circle
  var center_circle = new Kinetic.Circle({
    x:(stage.getWidth() / 2) -3.5, // @TODO Offsets.  I messed up my math somewhere.
    y:(stage.getHeight() / 2) +3.5,
    radius:75,
    stroke:'#bbb',
    strokeWidth:1,
    fill:'#ddd'
  });

  // Green button
  var green_piece = new Kinetic.Shape({
    drawFunc: 
      function(context) {
        context.beginPath();
        context.moveTo(10, 245);
        context.quadraticCurveTo(40, 40, 245, 10); // right and up
        context.lineTo(245, 165); // down
        context.quadraticCurveTo(175, 175, 165, 245); // left and down
        context.lineTo(10, 245); // left
        context.closePath();
        context.fillStrokeShape(this);
      },
    fill:green_off,
    stroke:'#aaa',
    strokeWidth:1,
    listening:false
  });

  green_piece.on('mouseover', 
    function() {
      document.body.style.cursor = 'pointer';
    }
  );

  green_piece.on('mouseout', 
    function() {
      document.body.style.cursor = 'default';
    }
  );

  green_piece.on('click touchstart', 
    function() {
      this.setFill(green_on);
      objGamePieces[0]['audio'].play();
      game_board_layer.draw();

      setTimeout(function () {
        green_piece.setFill(green_off);
        game_board_layer.draw();
        addUserSequence(0);
      }, 200); 
    }
  );

  // Rotate 45 degrees and move appropriately
  green_piece.rotate(Math.PI / 4);
  green_piece.move(250, -104);

  // Yellow button
  var yellow_piece = new Kinetic.Shape({
    drawFunc: 
      function(context) {
        context.beginPath();
        context.moveTo(255, 10);
        context.quadraticCurveTo(460, 40, 490, 245); // right and down
        context.lineTo(335, 245); // left
        context.quadraticCurveTo(325, 175, 255, 165); // left and up
        context.lineTo(255, 165); // up
        context.closePath();
        context.fillStrokeShape(this);
      },
    fill:yellow_off,
    stroke:'#aaa',
    strokeWidth:1,
    listening:false
  });

  yellow_piece.on('mouseover', 
    function() {
      document.body.style.cursor = 'pointer';
    }
  );

  yellow_piece.on('mouseout', 
    function() {
      document.body.style.cursor = 'default';
    }
  );

  yellow_piece.on('click touchstart', 
    function() {
      this.setFill(yellow_on);
      objGamePieces[1]['audio'].play();
      game_board_layer.draw();

      setTimeout(function () {
        yellow_piece.setFill(yellow_off);
        game_board_layer.draw();
        addUserSequence(1);
      }, 200); 
    }
  );  	

  // Rotate 45 degrees and move appropriately
  yellow_piece.rotate(Math.PI / 4);
  yellow_piece.move(250, -105);

  // Red button
  var red_piece = new Kinetic.Shape({
    drawFunc: 
      function(context) {
        context.beginPath();
        context.moveTo(490, 255);
        context.quadraticCurveTo(465, 465, 255, 490); // down and left 
        context.lineTo(255, 335); // up
        context.quadraticCurveTo(325, 325, 335, 255); // right and up
        context.lineTo(490, 255); // right
        context.closePath();
        context.fillStrokeShape(this);
      },
    fill:red_off,
    stroke:'#aaa',
    strokeWidth:1,
    listening:false
  });

  red_piece.on('mouseover', 
    function() {
      document.body.style.cursor = 'pointer';
    }
  );

  red_piece.on('mouseout', 
    function() {
      document.body.style.cursor = 'default';
    }
  );

  red_piece.on('click touchstart', 
    function() {
      this.setFill(red_on);
      objGamePieces[2]['audio'].play();
      game_board_layer.draw();

      setTimeout(function () {
        red_piece.setFill(red_off);
        game_board_layer.draw();
        addUserSequence(2);
      }, 200); 
    }
  ); 

  // Rotate 45 degrees and move appropriately
  red_piece.rotate(Math.PI / 4);
  red_piece.move(250, -104);     

  // Blue button
  var blue_piece = new Kinetic.Shape({
    drawFunc: 
      function(context) {
        context.beginPath();
        context.moveTo(245, 335);
        context.lineTo(245, 490); // down
        context.quadraticCurveTo(40, 460, 10, 255); // left and up
        context.lineTo(165, 255); // right
        context.quadraticCurveTo(175, 325, 245, 335); // down and right
        context.closePath();
        context.fillStrokeShape(this);
      },
    fill:blue_off,
    stroke:'#aaa',
    strokeWidth:1,
    listening:false
  });

  blue_piece.on('mouseover', 
    function() {
      document.body.style.cursor = 'pointer';
    }
  );

  blue_piece.on('mouseout', 
    function() {
      document.body.style.cursor = 'default';
    }
  );

  blue_piece.on('click touchstart', 
    function() {
      this.setFill(blue_on);
      objGamePieces[3]['audio'].play();
      game_board_layer.draw();

      setTimeout(function () {
        blue_piece.setFill(blue_off);
        game_board_layer.draw();
        addUserSequence(3);
      }, 200);
    }
  ); 

	// Rotate 45 degrees and move appropriately
	blue_piece.rotate(Math.PI / 4);
	blue_piece.move(250, -105);  

  // Start game button
  var start_button = new Kinetic.Shape({
    drawFunc: 
      function(context) {
        context.beginPath();
        context.moveTo(70, 460);
        context.quadraticCurveTo(85, 475, 70, 490); // right and down
        context.lineTo(15, 490); // left
        context.quadraticCurveTo(0, 475, 15, 460); // left and up
        context.lineTo(70, 460); // right
        context.closePath();
        context.fillStrokeShape(this);
      },
    fill:'#eee',
    stroke:'#777',
    strokeWidth:1
  });

  start_button.on('mouseover', 
    function() {
      document.body.style.cursor = 'pointer';
    }
  );

  start_button.on('mouseout', 
    function() {
      document.body.style.cursor = 'default';
    }
  );

  start_button.on('click touchstart', 
    function() {
      startGame();
    }
  ); 

  // Text in the start button
  var button_text = new Kinetic.Text({
    x:19.5,
    y:468.5,
    text:'START',
    fontSize:15,
    fill:'#343434',
    fontFamily:'Arial'
  }); 

  // Same as start button shape
  button_text.on('mouseover', 
    function() {
      document.body.style.cursor = 'pointer';
    }
  );

  button_text.on('mouseout', 
    function() {
      document.body.style.cursor = 'default';
    }
  );

  button_text.on('click touchstart', 
    function() {
      startGame();
    }
  ); 

  // Score
  var score_text = new Kinetic.Text({
    x:stage.getWidth() -27,
    y:stage.getHeight() -27,
    text:'0',
    fontSize:20,
    fontFamily:'Arial',
    fill:'#000'
  });

  score_text.hide();

  // Game over text
  var game_over_text = new Kinetic.Text({
    x:(stage.getWidth() / 2) -49,
    y:(stage.getHeight() / 2) +44,
    text:'GAME OVER',
    fontSize:15,
    fontFamily:'Arial',
    fill:'#f00',
  });

  game_over_text.hide();

  // HTML5 official badge
  var obj_image = new Image();
  obj_image.onload = function () {
    var html5_logo = new Kinetic.Image({
      x:(stage.getWidth() / 2) -35,
      y:(stage.getHeight() / 2) -27,
      image:obj_image,
      width:64,
      height:64
    });

    // Add the images to the images layer
    image_layer.add(html5_logo);

    // Add the image layer to the stage
    stage.add(image_layer);
  };
  obj_image.src = 'src/img/HTML5_Badge_64.png';

  // Add the shapes to the game layer
  game_board_layer.add(center_circle);
  game_board_layer.add(green_piece);
  game_board_layer.add(yellow_piece);
  game_board_layer.add(red_piece);
  game_board_layer.add(blue_piece);
  game_board_layer.add(start_button);

  // Add the text to the text layer
  text_layer.add(button_text);
  text_layer.add(score_text);
  text_layer.add(game_over_text);

  // Add the layers to the stage
  stage.add(game_board_layer);
  stage.add(text_layer);

  // Set up object to encapsulate all game piece attributes
  var objGamePieces = {
    0: // Green
    {
      'game_piece':green_piece,
      'audio':green_audio,
      'color_on':green_on,
      'color_off':green_off
    },
    1: // Yellow
    {
      'game_piece':yellow_piece,
      'audio':yellow_audio,
      'color_on':yellow_on,
      'color_off':yellow_off
    },
    2: // Red
    {
      'game_piece':red_piece,
      'audio':red_audio,
      'color_on':red_on,
      'color_off':red_off
    },
    3: // Blue
    {
      'game_piece':blue_piece,
      'audio':blue_audio,
      'color_on':blue_on,
      'color_off':blue_off
    }
  }; 

  /**
   * Starts a new instance of the game
  **/
  function startGame () {

    // Toggle form controls
    start_button.hide();
    button_text.hide();
    game_over_text.hide();
    score_text.show();
    game_board_layer.draw();
    text_layer.draw();

    // Init some game variables and closures
    var game_sequence = new Array(), user_sequence = new Array();

    /**
     * Randomly assigns another game piece to the game sequence
    **/
    addGameSequence = function () {
      game_sequence.push(Math.floor(Math.random() * 4)); // Random game piece
      showGameSequence(game_sequence);
      enableGamePieces();
    }

    /**
     * Assigns the appropriate game piece to the user sequence
     *
     * @param {Number} The user's game piece guess; represented by a number 0 - 3
    **/
    addUserSequence = function (input) {
      user_sequence.push(input); // Add user inputs
      compareSequences(); // Check it against the game sequence
    }

    /**
     * Checks to make sure each user input matches the game sequence at the appropriate sequence (array) spots
    **/
    compareSequences = function () {
      var user_sequence_location = user_sequence.length -1; // Sequence location (1st, 2nd, 4th, etc.)

      if (game_sequence[user_sequence_location] === user_sequence[user_sequence_location]) { // Technically do nothing
        
        if (user_sequence.length === game_sequence.length) { // Add another game piece to the sequence
          disableGamePieces();
          updateScore(user_sequence.length);
          resetUserSequence();
          addGameSequence();
        }
      }
      else {
        endGame(game_sequence[user_sequence_location]);
      }
    }

    /**
     * Resets the sequence the user inputted
    **/
    resetUserSequence = function () {
      user_sequence = [];
    }

    /**
     * Add one to the score of sequences memorized
     *
     * @param {String} The score text   
    **/
    updateScore = function (s) {
      score_text.setText(s);
      text_layer.draw();
    }

    // And finally- start the game with a single game piece instance
    updateScore(0);
    addGameSequence();
  }

  /**
   * Ends the current instance of the game and pops up a modal Top 10 score form
   *
   * @param {Object} The game piece that should have been
  **/
  function endGame (g) {
    disableGamePieces();
    document.body.style.cursor = 'default';
    objGamePieces[g]['game_piece'].setFill(objGamePieces[g]['color_on']); // Light up the piece the user should have selected

    // Toggle form controls
    start_button.show();
    button_text.show();
    game_over_text.show();
    game_board_layer.draw();
    text_layer.draw();

    var final_score = score_text.getText();

    /**
     * Closure to provide access to final score variable for Top 10 score form
    **/
    getFinalScore = function () {
      return final_score;
    }
  }

  /**
   * Enable all game piece event handlers
  **/
  function enableGamePieces () {

    for (var key in objGamePieces) {
      objGamePieces[key]['game_piece'].listening(true);
      objGamePieces[key]['game_piece'].setFill(objGamePieces[key]['color_off']);
      game_board_layer.draw();
    }
  }   

  /**
   * Disable all game piece event handlers
  **/
  function disableGamePieces () {

    for (var key in objGamePieces) {
      objGamePieces[key]['game_piece'].listening(false);
    }
  }

  /**
   * Light up game piece and play a sound- then turn if off
   *
   * @param {Object} key value pairs of game piece attributes
  **/
  function showGamePiece (objGamePiece) {

    objGamePiece.game_piece.setFill(objGamePiece.color_on); 
    game_board_layer.draw();

    objGamePiece.audio.play();

    setTimeout(function () { 
      objGamePiece.game_piece.setFill(objGamePiece.color_off); 
      game_board_layer.draw(); 
    }, 500);
  }

  /**
   * Play the most current game sequence
   *
   * @param {Array} numeric array of game piece sequence
  **/
  function showGameSequence (arraySequence) {

    var count = 0, seqInterator = setInterval(function () {

      showGamePiece(objGamePieces[arraySequence[count]]);
      ++count;

      if (count === arraySequence.length) {
        clearInterval(seqInterator);
      }
    }, 750);
  }  
}