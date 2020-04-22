//jshint esversion: 6
class Scene5 extends Phaser.Scene {
	constructor(){
		super("screenStart3");
	}
	
	create() {
		//header
		this.add.bitmapText(config.width/3+90, config.height/4, "pixelFont", "Build up the train", 50);

		//start button
		this.startButton = this.add.sprite(config.width/2, config.height/2, "buttonstart").setInteractive({cursor:'pointer'});
		this.startButton.on('pointerover', () => this.startButton.setFrame(1));
		this.startButton.on('pointerout', () => this.startButton.setFrame(0));
		this.startButton.on('pointerdown', () => this.scene.start("screenPlay3"));

		//back button
		this.backButton = this.add.sprite(40, 20, "buttonback").setInteractive({cursor:'pointer'});
		this.backButton.on('pointerover', () => this.backButton.setFrame(1));
		this.backButton.on('pointerout', () => this.backButton.setFrame(0));
		this.backButton.on('pointerdown', () => this.scene.start("screenMain"));
	}

}