//jshint esversion: 6
class Scene2 extends Phaser.Scene {
	constructor() {
		super("screenPlay1");
		var status;
	} 

	create() {
		//background
		this.background = this.add.image(106, 30, "khungtrang");
		this.background.setOrigin(0, 0);
		// header
		this.add.text(420, 85, "Place the ball on the number line", {
			color: '#000000',
			fontSize: '30px',
			stroke: '#000',
			strokeThickness: 3 
		});
		//back button
		this.backButton = this.add.sprite(155, 50, "buttonback").setInteractive({cursor: 'pointer'});
		this.backButton.on('pointerover', () => this.backButton.setFrame(1));
		this.backButton.on('pointerout', () => this.backButton.setFrame(0));
		this.backButton.on('pointerdown', () => this.scene.start("screenMain"));
		//bar
		this.bar = this.add.image(400, 30, "thanhbar").setScale(0.5);
		this.bar.setOrigin(0, 0);
		this.greenBall1 = this.add.image(402, 33 , "greenball").setScale(0.5);
		this.greenBall1.setOrigin(0, 0);
		this.greenBall2 = this.add.image(446, 33 , "greenball").setScale(0.5);
		this.greenBall2.setOrigin(0, 0);
		this.greenBall3 = this.add.image(490, 33 , "greenball").setScale(0.5);
		this.greenBall3.setOrigin(0, 0);
		this.greenBall4 = this.add.image(534, 33 , "greenball").setScale(0.5);
		this.greenBall4.setOrigin(0, 0);
		// status green ball
		this.greenBall4.statusRight = true;
		this.greenBall3.statusRight = false;
		this.greenBall2.statusRight = false;
		this.greenBall1.statusRight = false;
		this.greenBall4.statusLeft = false;
		this.greenBall3.statusLeft = false;
		this.greenBall2.statusLeft = false;
		this.greenBall1.statusLeft = false;
		// sound
		this.initSpeaker();
		// init
		this.initial();

		//
		this.time.addEvent({
			delay: 0,
			callback: () => {
				this.trainBody1.disableInteractive();
				this.trainBody2.disableInteractive();
				this.trainBody3.disableInteractive();
				this.trainBody4.disableInteractive();
				this.trainBody5.disableInteractive();
				this.speaker.disableInteractive();
			}
		});
		
		// start button
		this.time.addEvent({
			delay: 0,
			callback: () => {
				this.startBackground = this.add.image(106, 85, "start");
				this.startBackground.setOrigin(0, 0);
				this.startButton = this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, "buttonstart").setInteractive({cursor: 'pointer'});
				this.startButton.on('pointerover', () => this.startButton.setFrame(1));
				this.startButton.on('pointerout', () => this.startButton.setFrame(0));
				this.startButton.on('pointerdown', () => {
					this.startBackground.destroy();
					this.startButton.destroy();
					this.trainBody1.setInteractive({cursor: 'pointer'});
					this.trainBody2.setInteractive({cursor: 'pointer'});
					this.trainBody3.setInteractive({cursor: 'pointer'});
					this.trainBody4.setInteractive({cursor: 'pointer'});
					this.trainBody5.setInteractive({cursor: 'pointer'});
					this.speaker.setInteractive({cursor: 'pointer'});
				});
			}
		});

		// drag object
		this.input.on('pointerdown', this.startDrag, this);
	}

	initial() {
		this.time.addEvent({
		    delay: 0,
		    callback: ()=>{
		    	// number of correct sentences
		    	this.countCorrect = 0;
		        // number line
				this.numberLine = this.add.image(100, 300, "numberline");
				this.numberLine.setOrigin(0, 0);
				//random number
				 this.randomNumber();
				//status
				this.statusLabel = this.add.bitmapText(config.width/2-100, config.height*3/4-25, "pixelFont", "STATUS: ", 30);
				this.end = false;
				
		    },
		    loop: false
		});
	}

	randomNumber() {
		if (this.countCorrect == 0) {
			let posX  = Phaser.Math.Between(100, config.width-100);
			do {
				this.number = Phaser.Math.Between(1,7);
			} while (this.number % 5 == 0);
			this.numberObj1 = this.add.sprite(posX, 250, "ball"+this.number).setFrame(0).setScale(1.5).setInteractive({cursor: 'pointer'});
		}
		if (this.countCorrect == 1) {
			let posX  = Phaser.Math.Between(100, config.width-100);
			do {
				this.number = Phaser.Math.Between(8,13);
			} while (this.number % 5 == 0);
			this.numberObj2 = this.add.sprite(posX, 250, "ball"+this.number).setFrame(0).setScale(1.5).setInteractive({cursor: 'pointer'});
		}
		if (this.countCorrect == 2) {
			let posX  = Phaser.Math.Between(100, config.width-100);
			do {
				this.number = Phaser.Math.Between(14,19);
			} while (this.number % 5 == 0);
			this.numberObj3 = this.add.sprite(posX, 250, "ball"+this.number).setFrame(0).setScale(1.5).setInteractive({cursor: 'pointer'});
		}
		
	}

	initSpeaker() {
		this.speaker = this.add.image(290, 60, "loa").setScale(0.2);
		this.speaker.setOrigin(0, 0);
		this.speaker.setInteractive({cursor: 'pointer'});
		this.music = this.sound.add('sound2');
		this.speaker.on('pointerdown', () => {
			this.music.play();
			this.speaker.destroy();
			this.time.addEvent({
				delay: 2000,
				callback: () => {
					this.initSpeaker();
				}
			});
		});
	}

	startDrag(pointer, targets) {
		this.input.off('pointerdown', this.startDrag, this);
		this.dragObj = targets[0];
		this.input.on('pointermove', this.doDrag, this);
		this.input.on('pointerup', this.stopDrag, this);
	}

	doDrag(pointer) {
		if (this.dragObj != null) {
			this.dragObj.setFrame(1);
			if (this.dragObj.x > 100 || this.dragObj.x < config.width - 100) {
				this.dragObj.x = pointer.x;
				this.dragObj.y = 250;
			}
			else {
				this.dragObj.x = 100;
				this.dragObj.y = 250;
			}
		}
	}

	stopDrag() {
		this.input.on('pointerdown', this.startDrag, this);
		this.input.off('pointermove', this.doDrag, this);
		this.input.off('pointerup', this.stopDrag, this);
		this.fillNumber();
		
	}

	fillNumber() {
		
		if (this.dragObj != null && this.dragObj != this.speaker) {
			// vi tri cua so 0
			if (this.dragObj.x > 155 && this.dragObj.x <= 200) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 1
			if (this.dragObj.x > 200 && this.dragObj.x <= 250) {
				this.check(this.number, 1);
			}
			// vi tri cua so 2
			if (this.dragObj.x > 250 && this.dragObj.x <= 300) {
				this.check(this.number, 2);	
			}
			// vi tri cua so 3
			if (this.dragObj.x > 300 && this.dragObj.x <= 350) {
				this.check(this.number, 3);	
			}
			// vi tri cua so 4
			if (this.dragObj.x > 350 && this.dragObj.x <= 400) {
				this.check(this.number, 4);	
			}
			// vi tri cua so 5
			if (this.dragObj.x > 400 && this.dragObj.x <= 450) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 6
			if (this.dragObj.x > 450 && this.dragObj.x <= 500) {
				this.check(this.number, 6);	
			}
			// vi tri cua so 7
			if (this.dragObj.x > 500 && this.dragObj.x <= 550) {
				this.check(this.number, 7);	
			}
			// vi tri cua so 8
			if (this.dragObj.x > 550 && this.dragObj.x <= 600) {
				this.check(this.number, 8);
			}
			// vi tri cua so 9
			if (this.dragObj.x > 600 && this.dragObj.x <= 650) {
				this.check(this.number, 9);	
			}
			// vi tri cua so 10
			if (this.dragObj.x > 650 && this.dragObj.x <= 700) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 11
			if (this.dragObj.x > 700 && this.dragObj.x <= 750) {
				this.check(this.number, 11);	
			}
			// vi tri cua so 12
			if (this.dragObj.x > 750 && this.dragObj.x <= 800) {
				this.check(this.number, 12);	
			}
			// vi tri cua so 13
			if (this.dragObj.x > 800 && this.dragObj.x <= 850) {
				this.check(this.number, 13);	
			}
			// vi tri cua so 14
			if (this.dragObj.x > 850 && this.dragObj.x <= 900) {
				this.check(this.number, 14);	
			}
			// vi tri cua so 15
			if (this.dragObj.x > 900 && this.dragObj.x <= 950) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 16
			if (this.dragObj.x > 950 && this.dragObj.x <= 1000) {
				this.check(this.number, 16);	
			}
			// vi tri cua so 17
			if (this.dragObj.x > 1000 && this.dragObj.x <= 1050) {
				this.check(this.number, 17);	
			}
			// vi tri cua so 18
			if (this.dragObj.x > 1050 && this.dragObj.x <= 1100) {
				this.check(this.number, 18);	
			}
			// vi tri cua so 19
			if (this.dragObj.x > 1100 && this.dragObj.x <= 1150) {
				this.check(this.number, 19);	
			}
			// vi tri cua so 20
			if (this.dragObj.x > 1150 && this.dragObj.x <= 1200) {
				this.wrongAnswer();
				return;
			}

		}
			
	}

	check(number, tmp) {
		if (number == tmp) {
			this.correctAnswer();
			return;
		} else {
			this.wrongAnswer();
			return;
		}
	}

	wrongAnswer() {
		if (this.countCorrect == 0) this.numberObj1.setFrame(3);
		if (this.countCorrect == 1) this.numberObj2.setFrame(3);
		if (this.countCorrect == 2) this.numberObj3.setFrame(3);
		status = "WRONG";
		this.statusLabel.text = "STATUS: "+status;
		
		
		if (this.greenBall4.statusLeft) {
			this.greenballMoveLeft(this.greenBall4, 4);
			this.greenBall4.statusLeft = false;
			this.greenBall3.statusRight = false;
			this.greenBall4.statusRight = true;
		}
		if (this.greenBall3.statusLeft) {
			this.greenballMoveLeft(this.greenBall3, 3);
			this.greenBall3.statusLeft = false;
			this.greenBall2.statusRight = false;
			this.greenBall4.statusLeft = true;
			this.greenBall3.statusRight = true;
		}
		if (this.greenBall2.statusLeft) {
			this.greenballMoveLeft(this.greenBall2, 2);
			this.greenBall2.statusLeft = false;
			this.greenBall1.statusRight = false;
			this.greenBall3.statusLeft = true;
			this.greenBall2.statusRight = true;
		}

		this.move = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (this.countCorrect == 0) {
					this.numberObj1.y -= 2;
					if (this.numberObj1.y < config.height/4-70) {
						this.move.remove();
					}
				}
				if (this.countCorrect == 1) {
					this.numberObj2.y -= 2;
					if (this.numberObj2.y < config.height/4-70) {
						this.move.remove();
					}
				}
				if (this.countCorrect == 2) {
					this.numberObj3.y -= 2;
					if (this.numberObj3.y < config.height/4-70) {
						this.move.remove();
					}
				}
				
			},
			loop: true
		});

		this.time.addEvent({
			delay: 1000,
			callback: () => {
				if (this.countCorrect == 0) {
					this.numberObj1.destroy();
				}
				if (this.countCorrect == 1) {
					this.numberObj1.destroy();
					this.numberObj2.destroy();
				}
				if (this.countCorrect == 2) {
					this.numberObj1.destroy();
					this.numberObj2.destroy();
					this.numberObj3.destroy();
				}				

				this.numberLine.destroy();
				this.initial();
			},
			loop: false
		});
		
	}

	correctAnswer() {
		if (this.countCorrect == 0) this.numberObj1.setFrame(2);
		if (this.countCorrect == 1) this.numberObj2.setFrame(2);
		if (this.countCorrect == 2) this.numberObj3.setFrame(2);
		this.countCorrect++;
		status = "CORRECT";
		this.statusLabel.text = "STATUS: "+status;

		this.move = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (this.countCorrect == 1) {
					this.numberObj1.y += 15;
					if (this.numberObj1.y > config.height/2+190) {
						this.move.remove();
						this.numberObj1.disableInteractive();
						this.numberObj1.y = config.height/2+190;
						this.numberObj1.x = 227 + 50*(this.number - 1);
						status = "";
						this.statusLabel.text = "STATUS: "+status;
					}
				}
				if (this.countCorrect == 2) {
					this.numberObj2.y += 15;
					if (this.numberObj2.y > config.height/2+190) {
						this.move.remove();
						this.numberObj2.disableInteractive();
						this.numberObj2.y = config.height/2+190;
						this.numberObj2.x = 227 + 50*(this.number - 1);
						status = "";
						this.statusLabel.text = "STATUS: "+status;
					}
				}
				if (this.countCorrect == 3) {
					this.numberObj3.y += 15;
					if (this.numberObj3.y > config.height/2+190) {
						this.move.remove();
						this.numberObj3.disableInteractive();
						this.numberObj3.y = config.height/2+190;
						this.numberObj3.x = 227 + 50*(this.number - 1);
						status = "";
						this.statusLabel.text = "STATUS: "+status;
					}
				}
				
			},
			loop: true
		});

		if (this.countCorrect == 3) {
			
			if (this.greenBall1.statusRight) {
				this.greenballMoveRight(this.greenBall1, 1);
				this.greenBall1.statusRight = false;
				this.greenBall1.statusLeft = true;

				this.end = true;
				this.time.addEvent({
					delay: 3000,
					callback: () => {
						this.finishScreen = this.add.image(0, 30, "khungfinish");
						this.finishScreen.setOrigin(0, 0);
						this.finishButton = this.add.sprite(770, 500, "finishbutton").setInteractive({cursor: 'pointer'});
						this.finishButton.on('pointerover', () => this.finishButton.setFrame(1));
						this.finishButton.on('pointerout', () => this.finishButton.setFrame(0));
						this.finishButton.on('pointerdown', () => this.scene.start("screenMain"));
					}
				});
			}
			if (this.greenBall2.statusRight) {
				this.greenballMoveRight(this.greenBall2, 2);
				this.greenBall2.statusRight = false;
				this.greenBall2.statusLeft = true;
				this.greenBall1.statusRight = true;
				this.greenBall3.statusLeft = false;
			}
			if (this.greenBall3.statusRight) {
				this.greenballMoveRight(this.greenBall3, 3);
				this.greenBall3.statusRight = false;
				this.greenBall3.statusLeft = true;
				this.greenBall2.statusRight = true;
				this.greenBall4.statusLeft = false;
			}
			if (this.greenBall4.statusRight) {
				this.greenballMoveRight(this.greenBall4, 4);
				this.greenBall4.statusRight = false;
				this.greenBall4.statusLeft = true;
				this.greenBall3.statusRight = true;
			}

			if (!this.end) {

				this.time.addEvent({
					delay: 1500,
					callback: () => {
						this.numberObj1.destroy();
						this.numberObj2.destroy();
						this.numberObj3.destroy();
						this.numberLine.destroy();
						this.initial();
					},
					loop: false
				});
			}

		}
		else {
			this.time.addEvent({
				delay: 1000,
				callback: () => {
					this.randomNumber();
				},
				loop: false
			});	
		}

	}

	greenballMoveRight(ball, i){
		var run = this.time.addEvent({
			delay: 0,
			callback: () => { 
				if (i == 4 || i == 3) {
					if (ball.x > 992 - (4-i)*50) run.remove();
				}
				else if (i == 2) {
					if (ball.x > 900) run.remove();
				}
				else if (i == 1) {
					if (ball.x > 860) run.remove();
				}
				ball.x += 10;
			},
			loop: true
		});
	}

	greenballMoveLeft(ball, i){
		var run = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (i == 4) {
					if (ball.x < 550) run.remove();
				}
				else if (i == 3) {
					if (ball.x < 510) run.remove();
				}
				else if (i == 2) {
					if (ball.x < 460) run.remove();
				}
				
				ball.x -= 10;
			},
			loop: true
		});
	}


}