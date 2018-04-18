#pragma strict

var redunitTopb : float;
var redunitBottomb : float;	
var xAxisAI : float;
var aiUnitSpawnPositionZ : float;
var spawnMinX : float;
var spawnMaxX : float;
var spawnMinXlvl8 : int;
var spawnMaxXlvl8 : int;
var lastCounter : float;
var marineRedCountb : float; 
var sniperRedCountb : float; 
var cannoneerRedCountb : float; 
var dozerRedCountb : float; 
var strikerRedCountb : float; 
var titanRedCountb : float; 
var drudgeRedCountb : float; 
var grieferRedCountb : float; 
var squallerRedCountb : float; 
var warderRedCountb : float; 
var disrupterRedCountb : float; 
var arbiterRedCountb : float;  
var drudgeBlueCountb : float; 
var grieferBlueCountb : float; 
var squallerBlueCountb : float; 
var warderBlueCountb : float; 
var disrupterBlueCountb : float; 
var arbiterBlueCountb : float;
static var redUnitCounter : int;
static var blueUnitCounter : int;
var isLevel1 : boolean;
var isLevel2 : boolean;
var isLevel3 : boolean;
var isLevel4 : boolean;
var isLevel5 : boolean;
var isLevel6 : boolean;
var isLevel7 : boolean;
var isLevel8 : boolean;
var incomePerSecAI : int;
static var currentMoneyAI : int;
var timeLastAI : float;
var hard : boolean;
var easy : boolean;
var normal : boolean;
var drudgeBLUE : UnityEngine.GameObject;
var squallerBLUE : UnityEngine.GameObject;
var grieferBLUE : UnityEngine.GameObject;
var warderBLUE : UnityEngine.GameObject;
var disrupterBLUE : UnityEngine.GameObject;
var arbiterBLUE : UnityEngine.GameObject;
var alien : boolean;
static var aiDirection : int;
static var bothBasesAlive : boolean;
var directionTimer : float;
static var spawnBottom : int;
var randomMothership : int;
var mothershipBlueX : boolean;
var mothershipBluePF : GameObject;
static var lowBaseLife : boolean;
var mothershipSplashBlueManager : GameObject;
static var bottom : boolean = false;
var lvl8MothershipCounter : int;
var lvl8MothershipTop : UnityEngine.GameObject;
var lvl8MothershipBottom : UnityEngine.GameObject;
var mothershipsUsed : boolean = false;
var blueLvl3MothershipSpawn = Vector3(19,0,36);
var blueLvl8MothershipSpawnBottom = Vector3(14,0,28);
var blueLvl8MothershipSpawnTop = Vector3(-16,0,28);
var mothershipCount : int = 0;
var bMotherUsed : boolean;
var tMotherUsed : boolean;
var firstSend : boolean;
var gameTimer : float;
var sendTimer : float;
var upgradeCounter : int;
var campaign : boolean;
var unitlocationTimer : float = 0;
var forceCounterTop : boolean;
var forceCounterBottom : boolean;
var randomForce : int;
function Start () {
	randomForce = 3;
	unitlocationTimer = 0;
	forceCounterBottom = false;
	forceCounterTop = false;
	spawnBottom = 0;
	bothBasesAlive = true;
	mothershipCount = 0;
	upgradeCounter = 0;
	firstSend = false;
	aiDirection = 2;
	mothershipBlueX = false;
	lowBaseLife = false;
	randomMothership = 0;
	gameTimer = 0;
	sendTimer = 0;
	if(GameObject.Find("Easy(Clone)")){
	easy = true;
	normal = false;
	hard = false;
	}else if(GameObject.Find("Normal(Clone)")){
	normal = true;
	easy = false;
	hard = false;
	}else if(GameObject.Find("Hard(Clone)")){
	hard = true;
	normal = false;
	easy = false;
	}if(GameObject.Find("Campaign")){
		campaign = true;
	}else{
		campaign = false;
	}if(campaign == true){
		if((PlayerPrefs.GetInt("levelsBeaten") == 0 || PlayerPrefs.GetInt("levelsBeaten") == 1 || PlayerPrefs.GetInt("levelsBeaten") == 2) && isLevel8 == false){
		easy = true;
		normal = false;
		hard = false;
		}else if((PlayerPrefs.GetInt("levelsBeaten") == 3 || PlayerPrefs.GetInt("levelsBeaten") == 4 || PlayerPrefs.GetInt("levelsBeaten") == 5 || PlayerPrefs.GetInt("levelsBeaten") == 6) && isLevel8 == false){
		normal = true;
		easy = false;
		hard = false;
		}else if(PlayerPrefs.GetInt("levelsBeaten") == 7 || PlayerPrefs.GetInt("levelsBeaten") == 8 || isLevel8 == true){
		hard = true;
		normal = false;
		easy = false;
		}
	}if(easy == true){
	currentMoneyAI = 500;
	incomePerSecAI = 30;
	}else if(normal == true){
	currentMoneyAI = 750;
	incomePerSecAI = 30;
	}else if(hard == true){
	currentMoneyAI = 1000;
	incomePerSecAI = 30;
	}if(GameObject.Find("LevelOne")){
	isLevel1 = true;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	aiUnitSpawnPositionZ = 36.5;
	}else if(GameObject.Find("LevelTwo")){
	isLevel1 = false;
	isLevel2 = true;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	aiUnitSpawnPositionZ = 35.5;
	}else if(GameObject.Find("LevelThree")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = true;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = 13.8;
	spawnMaxX = 26;
	aiUnitSpawnPositionZ = 35.6;
	}else if(GameObject.Find("LevelFour")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = true;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	aiUnitSpawnPositionZ = 36.5;
	}else if(GameObject.Find("LevelFive")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = true;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	aiUnitSpawnPositionZ = 35.5;
	}else if(GameObject.Find("LevelSix")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = true;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = 13.8;
	spawnMaxX = 26;
	aiUnitSpawnPositionZ = 32.5;
	}else if(GameObject.Find("LevelSeven")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = true;
	isLevel8 = false;
	spawnMinX = 13.8;
	spawnMaxX = 26;
	aiUnitSpawnPositionZ = 32.5;
	}else if(GameObject.Find("LevelEight")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = true;
	spawnMinX = -5;
	spawnMaxX = 8.5;
	spawnMinXlvl8 = -19;
	spawnMaxXlvl8 = -11;
	aiUnitSpawnPositionZ = 29;
	}if(GameObject.Find("AlienSingle(Clone)") || GameObject.Find("AlienSingle")){
	alien = true;
	}else if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("HumanSingle")){
	alien = false;
	}
}


function Update (){	
	
	Income();
	if(lastCounter + 1.2 <= Time.time){
		UnitCounter();
		if(alien == false){
			if(marineRedCountb != 0){
				CounterTier1(marineRedCountb);
			}if(sniperRedCountb != 0){
				CounterTier2(sniperRedCountb);
			}if(cannoneerRedCountb != 0){
				CounterTier3(cannoneerRedCountb);
			}if(dozerRedCountb != 0){
				CounterTier4(dozerRedCountb);
			}if(strikerRedCountb != 0){
				CounterTier5(strikerRedCountb);
			}if(titanRedCountb != 0){
				CounterTier6(titanRedCountb);
			}
		}else{
			if(drudgeRedCountb != 0){
				CounterTier1(drudgeRedCountb);
			}if(squallerRedCountb != 0){
				CounterTier2(squallerRedCountb);
			}if(grieferRedCountb != 0){
				CounterTier3(grieferRedCountb);
			}if(warderRedCountb != 0){
				CounterTier4(warderRedCountb);
			}if(disrupterRedCountb != 0){
				CounterTier5(disrupterRedCountb);
			}if(arbiterRedCountb != 0){
				CounterTier6(arbiterRedCountb);
			}
		}
	lastCounter = Time.time;
	}if(bothBasesAlive == true){
		directionTimer = Time.deltaTime + directionTimer;
		if(redunitTopb > redunitBottomb){
			randomForce = Random.Range(1,4);
			// unitlocationTimer = 0;
/*			forceCounterTop = true;
*/		}else if(redunitBottomb > redunitTopb){
			randomForce = Random.Range(1,4);
			// unitlocationTimer = 0;
/*			forceCounterBottom = true;
*/		}else{
			randomForce = Random.Range(1,4);
		}if(/*forceCounterTop == true && */randomForce == 1){
			print("Top");
			aiDirection = 1;
/*			forceCounterTop = false;
*/
		}else if(/*forceCounterBottom == true && */randomForce == 2){
			print("Bottom");
			aiDirection = 2;
/*			forceCounterBottom = false;
*/		}else if(randomForce == 3){
			 if(directionTimer >= 1.5 && forceCounterTop == false && forceCounterBottom == false){
			 	if(redUnitCounter > 8 && mothershipBlueX == false){
					randomMothership = Random.Range(1,10);
				}
			 }
			print("Random");
			aiDirection = Random.Range(1,3);
			directionTimer = 0;	 	
		}

		
		
	}if(spawnBottom == 2){
		aiDirection = 1;
	}else if(spawnBottom == 1){
		aiDirection = 2;
	}if(aiDirection == 1){
		spawnMinXlvl8 = -19;
		spawnMaxXlvl8 = -11;
	}else if(aiDirection == 2){
		spawnMinXlvl8 = 18.1;
		spawnMaxXlvl8 = 9.1;
	}if((randomMothership == 1 || lowBaseLife == true)){	
		AIMothership();		
		randomMothership = 0;		
	}
	sendTimer = Time.deltaTime + sendTimer;
	if(hard == true){
		if(sendTimer >= 15 && currentMoneyAI >= 1000){		
			FirstSend();
			sendTimer = 0;		
		}
	}else if(normal == true && currentMoneyAI >= 600){
		if(sendTimer >= 20){		
			FirstSend();
			sendTimer = 0;		
		}
	}else if(easy == true && currentMoneyAI >= 300){
		if(sendTimer >= 25){		
			FirstSend();
			sendTimer = 0;		
		}
	}
	gameTimer = gameTimer + Time.deltaTime;
	if(hard == true){
		if(gameTimer >= 15 && upgradeCounter == 0){
			SubtractUpgrades(1);
		}else if(gameTimer >= 35 && upgradeCounter == 1){
			SubtractUpgrades(2);
		}else if(gameTimer >= 65 && upgradeCounter == 2){
			SubtractUpgrades(3);
		}else if(gameTimer >= 85 && upgradeCounter == 3){
			SubtractUpgrades(4);
		}else if(gameTimer >= 105 && upgradeCounter == 4){
			SubtractUpgrades(5);
		}
	}else if(normal == true){
		if(gameTimer >= 25 && upgradeCounter == 0){
			SubtractUpgrades(1);
		}else if(gameTimer >= 45 && upgradeCounter == 1){
			SubtractUpgrades(2);
		}else if(gameTimer >= 75 && upgradeCounter == 2){
			SubtractUpgrades(3);
		}else if(gameTimer >= 95 && upgradeCounter == 3){
			SubtractUpgrades(4);
		}else if(gameTimer >= 115 && upgradeCounter == 4){
			SubtractUpgrades(5);
		}
	}else{
		if(gameTimer >= 45 && upgradeCounter == 0){
			SubtractUpgrades(1);
		}else if(gameTimer >= 65 && upgradeCounter == 1){
			SubtractUpgrades(2);
		}else if(gameTimer >= 85 && upgradeCounter == 2){
			SubtractUpgrades(3);
		}else if(gameTimer >= 105 && upgradeCounter == 3){
			SubtractUpgrades(4);
		}else if(gameTimer >= 135 && upgradeCounter == 4){
			SubtractUpgrades(5);
		}
	}
}
static function BlueBonus( moneyAdd : int){		
	currentMoneyAI = currentMoneyAI + moneyAdd;
}
function SubtractUpgrades(timesRun : int){
	switch(timesRun){
		case 1:
			if(upgradeCounter == 0){
				currentMoneyAI = currentMoneyAI - 300;
				upgradeCounter = upgradeCounter + 1;
			}
		break;
		case 2:
			if(upgradeCounter == 1){
				currentMoneyAI = currentMoneyAI - 300;
				upgradeCounter = upgradeCounter + 1;
			}
		break;
		case 3:
			if(upgradeCounter == 2){
				currentMoneyAI = currentMoneyAI - 300;
				upgradeCounter = upgradeCounter + 1;
			}
		break;
		case 4:
			if(upgradeCounter == 3){
				currentMoneyAI = currentMoneyAI - 300;
				upgradeCounter = upgradeCounter + 1;
			}
		break;
		case 5:
			if(upgradeCounter == 4){
				currentMoneyAI = currentMoneyAI - 300;
				upgradeCounter = upgradeCounter + 1;
			}
		break;
	}
}
//Nukes if base has lowlife
static function LowBaseLife(bottomx : boolean){
	lowBaseLife = true;
	if(bottomx == true){
	bottom = true;
	}else if(bottomx == false){
	bottom = false;
	}
}
function AIMothership(){
	if(isLevel1 || isLevel2 || isLevel4 || isLevel5){						
		if(mothershipBlueX == false){
		Instantiate(mothershipBluePF, Vector3(0 , 0, 37), Quaternion(0.0,0.0,0.0,0.0));
		Instantiate(mothershipSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
		mothershipBlueX = true;
		lowBaseLife = false;
		}
						
	}else if(isLevel3 || isLevel6 || isLevel7){
		if(mothershipBlueX == false){
			Instantiate(mothershipBluePF, blueLvl3MothershipSpawn, Quaternion(0.0,0.0,0.0,0.0));
			Instantiate(mothershipSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
			mothershipBlueX = true;
			lowBaseLife = false;
		}
	}
	else if(isLevel8){
		if(mothershipsUsed == false){	
			if(mothershipCount < 2){
				if(bottom == true && lowBaseLife == true && bMotherUsed == false){
				lowBaseLife = false;
				bMotherUsed = true;				
				Instantiate(lvl8MothershipBottom, blueLvl8MothershipSpawnBottom, Quaternion(0.0,0.0,0.0,0.0));
				Instantiate(mothershipSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
				mothershipCount = mothershipCount + 1;
				}else if(bottom == false && lowBaseLife == true && tMotherUsed == false){
				Instantiate(lvl8MothershipTop, GameObject.Find("MothershipTopSpawn").transform.position, Quaternion(0.0,0.0,0.0,0.0));
				Instantiate(mothershipSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
				lowBaseLife = false;
				tMotherUsed = true;
				mothershipCount = mothershipCount + 1;
				}else if(lowBaseLife == false){								
					if(!GameObject.Find("Mothership_Blue_PF(Clone)")){
						if(aiDirection != 2 && bMotherUsed == false){
						Instantiate(lvl8MothershipBottom, blueLvl8MothershipSpawnBottom, Quaternion(0.0,0.0,0.0,0.0));
						Instantiate(mothershipSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
						mothershipCount = mothershipCount + 1;
						bMotherUsed = true;								
						}else if(aiDirection == 2 && tMotherUsed == false){
						Instantiate(lvl8MothershipTop, GameObject.Find("MothershipTopSpawn").transform.position, Quaternion(0.0,0.0,0.0,0.0));
						Instantiate(mothershipSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
						mothershipCount = mothershipCount + 1;
						tMotherUsed = true;										
						}									
					}
				}					
			}else if(mothershipCount >=2){
			mothershipsUsed = true;
			lowBaseLife = false;
			}				
		}
	}						
}
static function BaseDead(location : String){
	if(location == "Top"){		
		spawnBottom = 1;
		Destroy(GameObject.Find("BlueTurretUpper2"));
		Destroy(GameObject.Find("BlueTurretUpper3"));
		Destroy(GameObject.Find("Alien_cylinder_upper"));
		Destroy(GameObject.Find("Alien_cylinder_upper2")); 
	}else if(location == "Bottom"){
		spawnBottom = 2;
		Destroy(GameObject.Find("BlueTurretLower2"));
		Destroy(GameObject.Find("BlueTurretLower3"));
		Destroy(GameObject.Find("Alien_cylinder_lower"));
		Destroy(GameObject.Find("Alien_cylinder_lower2"));
	}
	bothBasesAlive = false;
}
function FirstSend(){
	var randomCounter2 : int;
	if(hard == true){
		randomCounter2 = Random.Range(1,4);
	}else if(normal == true){
		randomCounter2 = Random.Range(1,3);
	}else if(easy == true){
		randomCounter2 = 1;
	}
	var unitSeperation = Random.Range(.5,1);
	switch(randomCounter2){
		case 3:
			switch(drudgeBlueCountb){
				case 0:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 1:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}switch(warderBlueCountb){
				case 0:				
					if(currentMoneyAI >= 200){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 200;
						incomePerSecAI = incomePerSecAI + 4;
					}
				break;
			}switch(disrupterBlueCountb){
				case 0:
					if(currentMoneyAI >= 300){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(disrupterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 300;
						incomePerSecAI = incomePerSecAI + 5;
					}
				break;
			}switch(drudgeBlueCountb){
				case 2:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 3:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}
		break;
		case 2:
			switch(drudgeBlueCountb){
				case 0:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 1:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 2:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}switch(arbiterBlueCountb){
				case 0:
					if(currentMoneyAI >= 400){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 400;
						incomePerSecAI = incomePerSecAI + 6;
					}
				break;
			}switch(drudgeBlueCountb){
				case 3:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 4:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 5:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}
		break;
		case 1:
			switch(drudgeBlueCountb){
				case 0:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 1:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}switch(disrupterBlueCountb){
				case 0:
					if(currentMoneyAI >= 300){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(disrupterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 300;
						incomePerSecAI = incomePerSecAI + 5;
					}
				break;
			}
		break;
	}
}
function CounterTier1(redt1 : int){
	var unitSeperation = Random.Range(.5,1);
	var randomCounter : int;
	if(hard == true){
		randomCounter = Random.Range(1,4);
	}else if(normal == true){
		randomCounter = Random.Range(1,3);
	}else if(easy == true){
		randomCounter = 1;
	}
	if(isLevel8){
		if(aiDirection != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}
	}switch(redt1/10){
		case 0:
		break;
		case 1:
			switch(warderBlueCountb){
				case 0:
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
					}else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					warderBlueCountb = warderBlueCountb + 1;
				break;
			}
		break;
	}switch(redt1){
		case 0:
		break;
		case 1:			
			switch(randomCounter){
				case 1:
				switch(drudgeBlueCountb){
					case 0:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}
					randomCounter = 0;
					break;
				}
				break;									  
		  		case 2: 	
		  		switch(drudgeBlueCountb){
		  			case 0:
			  			if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}
					randomCounter = 0;
					break;
					case 1:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}
					randomCounter = 0;
					break;
		  		}
		  		switch(squallerBlueCountb){
		  			case 0:
			  			if(currentMoneyAI >= 100){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 100;
							incomePerSecAI = incomePerSecAI + 2;
							squallerBlueCountb = squallerBlueCountb + 1;
						}
					randomCounter = 0;
					break;
		  		}
		  		break;
		  		case 3:
		  		switch(drudgeBlueCountb){
		  			case 0:
			  			if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}
						randomCounter = 0;
					break;
					case 1:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}
					randomCounter = 0;
					break;
					case 2:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}
					randomCounter = 0;
					break;
					case 3:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
							yield WaitForSeconds(unitSeperation);
							Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							drudgeBlueCountb = drudgeBlueCountb + 1;
						}
					randomCounter = 0;
					break;
		  		}
		  		break;
		  	}
		break;
		case 2:
			switch(randomCounter){
				case 1: 
					switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;	
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 2:
			  		switch(squallerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb =  drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 3:	
			  		switch(warderBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 200;
							incomePerSecAI = incomePerSecAI + 4;
							warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
				
	  				}switch(squallerBlueCountb){
	  					case 0:
		  					if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
	  			break;		
			}	
		break;
		case 3:
			switch(randomCounter){
				case 1:
					switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(drudgeBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  	break;
			  	case 2:
			  		switch(drudgeBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
		  			}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
				}	
		break;
		case 4:
			switch(randomCounter){
				case 1:
					switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 2:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;												
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;												
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
					}
				break;	
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;												
			  		}switch(arbiterBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}
						randomCounter = 0;
						break;												
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;												
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;			
		  	}	
		break;
		case 5:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 2: 
			  		switch(warderBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 3:
			  		switch(warderBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			}	
		break;
		case 6:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;					
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}					
			  	break;
			  	case 2:
			  		switch(warderBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(arbiterBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}
							randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;					
			  		}switch(arbiterBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}
							randomCounter = 0;
						break;						
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
			}	
		break;		
		default:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(arbiterBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}
							randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 2:
			  		switch(warderBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(arbiterBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(squallerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 3:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 3:
			  		switch(warderBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						break;
						case 2:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						break;
						
			  		}switch(arbiterBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}
							randomCounter = 0;
						break;
					}switch(squallerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 3:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;							
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			}
		break;
	}
}
function CounterTier2(redt2 : int){
	var unitSeperation = Random.Range(.1,.3);
	var randomCounter : int;
	if(hard == true){
		randomCounter = Random.Range(1,4);
	}else if(normal == true){
		randomCounter = Random.Range(1,3);
	}else if(easy == true){
		randomCounter = 1;
	}if(isLevel8){
		if(aiDirection != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}		
	}
	
	switch(redt2){
		case 0:
		break;
		case 1:
			switch(randomCounter){
				case 1:
					switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}			  	
			  	break;
			  	case 2:
			  		switch(drudgeBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}			  	
			  	break;
			  	case 3:
			  		switch(drudgeBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}			  	
			  	break;
			}
		break;
		case 2:
			switch(randomCounter){
				case 1:
					switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 2:
			  		switch(warderBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(drudgeBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  	break;
			  	case 3:
			  		switch(warderBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(squallerBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		break;
			  	break;
			}	
		break;
		case 3:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
			  	break;
			  	case 2:
			  		switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
			}	
		break;
		case 4:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}			  	
			  	break;
			  	case 2:
			  		switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 3:
			  		switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  		switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			}	
		break;
		case 5:
			randomCounter = 1;
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
							}
						randomCounter = 0;
						break;						
			  		}			  	
			  	break;
			}	
		break;
		default:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(squallerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(disrupterBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 300){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(disrupterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 300;
								incomePerSecAI = incomePerSecAI + 5;
								disrupterBlueCountb = disrupterBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}			  
			  	break;
			  	case 2:
			  		switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 3:
			  		switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(arbiterBlueCountb){
						case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			}
		break;
	}
}
function CounterTier3(redt3 : int){
	var unitSeperation = Random.Range(.1,.3);
	var randomCounter : int;
	if(hard == true){
		randomCounter = Random.Range(1,4);
	}else if(normal == true){
		randomCounter = Random.Range(1,3);
	}else if(easy == true){
		randomCounter = 1;
	}if(isLevel8){
		if(aiDirection != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}
		
	}switch(redt3){
		case 0:
		break;
		case 1:
			switch(randomCounter){
				case 1:
					switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 2:
			  		switch(squallerBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 3:
			  		switch(squallerBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			}
		break;
		case 2:
			switch(randomCounter){
				case 1:
					switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 2:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
			}				
		break;
		case 3:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 2:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}					
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}					
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}					
						randomCounter = 0;
						break;						
					}
				break;
			}	
		break;
		case 4:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}											
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}												
						randomCounter = 0;
						break;
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}														
						randomCounter = 0;
						break;											
					}
				break;
				case 2:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;						
					}
				break;
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;						
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}							
						randomCounter = 0;
						break;						
					}
				break;
			}
		break;		
		default:
			switch(randomCounter){
				case 1:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;						
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}														
						randomCounter = 0;
						break;												
					}
				break;
				case 2:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 2:		
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}							
						randomCounter = 0;
						break;				
					}switch(drudgeBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								drudgeBlueCountb = drudgeBlueCountb + 1;
							}														
						randomCounter = 0;
						break;												
					}
				break;
				case 3:
					switch(warderBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								warderBlueCountb = warderBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}switch(squallerBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}													
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								squallerBlueCountb = squallerBlueCountb + 1;
							}														
						randomCounter = 0;
						break;										
					}switch(arbiterBlueCountb){
						case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
								yield WaitForSeconds(unitSeperation);
								Instantiate(arbiterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								arbiterBlueCountb = arbiterBlueCountb + 1;
							}														
						randomCounter = 0;
						break;												
					}
				break;
			}			
		break;
	}
}
function CounterTier4(redt4 : int){
	var unitSeperation = Random.Range(.1,.5);
	// if(isLevel8){
	// 	if(aiDirection != 2){
	// 		spawnMinXlvl8 = -19;
	// 		spawnMaxXlvl8 = -11;
	// 	}else if(aiDirection == 2){
	// 		spawnMinXlvl8 = 18.1;
	// 		spawnMaxXlvl8 = 9.1;
	// 	}		
	// }
	
	switch(redt4){
		case 0:
		break;
		case 1:
			if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
	  		
		break;
		case 2:
			if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
			else if(drudgeBlueCountb == 0){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}	
		break;
		case 3:
			if(warderBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;
		case 4:
			if(warderBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;
		

		default:
			if(warderBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(disrupterBlueCountb == 0){
				if(currentMoneyAI >= 300){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(disrupterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(drudgeBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}
		break;
	}
}
//How the AI counters strikers
function CounterTier5(redt5 : int){
	var unitSeperation = Random.Range(.1,.5);
	// if(isLevel8){
	// 	if(aiDirection != 2){
	// 		spawnMinXlvl8 = -19;
	// 		spawnMaxXlvl8 = -11;
	// 	}else if(aiDirection == 2){
	// 		spawnMinXlvl8 = 18.1;
	// 		spawnMaxXlvl8 = 9.1;
	// 	}		
	// }
	
	switch(redt5){
		case 0:
		break;
		case 1:
			if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
	  		
		break;
		case 2:
			if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
	  		else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
				
	  		}
			else if(drudgeBlueCountb == 0){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}	
		break;
		case 3:
			if(warderBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;
		case 4:
			if(warderBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;

		default:
			if(warderBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(disrupterBlueCountb == 0){
				if(currentMoneyAI >= 300){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(disrupterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
					incomePerSecAI = incomePerSecAI + 5;
				}
				
	  		}
	  		else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(drudgeBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}
	  		else if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
		break;
	}
}
//How the AI counters titans
function CounterTier6(redt6 : int){
	var unitSeperation = Random.Range(.1,.5);
	// if(isLevel8){
	// 	if(aiDirection != 2){
	// 		spawnMinXlvl8 = -19;
	// 		spawnMaxXlvl8 = -11;
	// 	}else if(aiDirection == 2){
	// 		spawnMinXlvl8 = 18.1;
	// 		spawnMaxXlvl8 = 9.1;
	// 	}	
	// }
	
	switch(redt6){
		case 0:
		break;
		case 1:
			if(warderBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
				
	  		}
	  		
		break;
		case 2:
			if(warderBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(warderBlueCountb == 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;

				}
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
				
	  		}	
		break;
		default:
			if(warderBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(warderBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(disrupterBlueCountb == 0){
				if(currentMoneyAI >= 300){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(disrupterBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
					incomePerSecAI = incomePerSecAI + 5;
				}
				
	  		}
	  		else if(squallerBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(squallerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(drudgeBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}
	  		else if(grieferBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(drudgeBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
		break;
	}
}
//Sets AI money and income
function Income(){
	
	if(timeLastAI + .5 <= Time.time){
	currentMoneyAI = currentMoneyAI + incomePerSecAI;
	timeLastAI = Time.time;
	}
	if(normal == true){
		if(currentMoneyAI >= 1250){
		currentMoneyAI = 1250;
		}
		if(incomePerSecAI >= 40){
		incomePerSecAI = 40;
		}
	}
	else if(easy == true){
		if(currentMoneyAI >= 1000){
		currentMoneyAI = 1000;
		}
		if(incomePerSecAI >= 35){
		incomePerSecAI = 35;
		}
	}
	else{
		if(campaign == false){
			if(currentMoneyAI >= 1500){
			currentMoneyAI = 1500;
			}
		}else{
			if(currentMoneyAI >= 2500){
			currentMoneyAI = 2500;
			}
		}
		if(incomePerSecAI >= 48){
		incomePerSecAI = 48;
		}
	}
	if(currentMoneyAI < 0){
	currentMoneyAI = 0;
	}
}

function UnitCounter(){

	//VARIABLES FOR ARRAY UNIT COUNTER
	var redunitTop : float;
    var redunitBottom : float;
	//Red units
	var marineRedCount : float; 
    var sniperRedCount : float; 
    var cannoneerRedCount : float; 
    var dozerRedCount : float; 
    var strikerRedCount : float; 
    var titanRedCount : float; 
    var drudgeRedCount : float; 
    var grieferRedCount : float; 
    var squallerRedCount : float; 
    var warderRedCount : float; 
    var disrupterRedCount : float; 
    var arbiterRedCount : float; 
    //Blue Units
    var arbiterBLUECount : float; 
    var drudgeBlueCount : float; 
    var grieferBlueCount : float; 
    var squallerBlueCount : float; 
    var warderBlueCount : float; 
    var disrupterBlueCount : float; 
    var arbiterBlueCount : float;
   
   redunitBottomb = redunitBottom;
   redunitTopb = redunitTop;
    //Blue Units
	arbiterBlueCountb = arbiterBLUECount;
	drudgeBlueCountb = drudgeBlueCount;
	squallerBlueCountb = squallerBlueCount;
	grieferBlueCountb = grieferBlueCount;
	warderBlueCountb = warderBlueCount;
	disrupterBlueCountb = disrupterBlueCount;
	arbiterBlueCountb = arbiterBlueCount;
	//Red Units
	marineRedCountb = marineRedCount;
	sniperRedCountb = sniperRedCount;
	cannoneerRedCountb = cannoneerRedCount;
	dozerRedCountb = dozerRedCount;
	strikerRedCountb = strikerRedCount;
	titanRedCountb = titanRedCount;
	drudgeRedCountb = drudgeRedCount;
	squallerRedCountb = squallerRedCount;
	grieferRedCountb = grieferRedCount;
	warderRedCountb = warderRedCount;
	disrupterRedCountb = disrupterRedCount;
	arbiterRedCountb = arbiterRedCount;

	//Start of Red Unit Counter Array
    var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("red");
    //Determines amount of each unit on field
    for (var redu : GameObject in gos){ 
    	if (redu.transform.name.Contains("Marine")){
    	marineRedCount = marineRedCount + 1;
    	marineRedCountb = marineRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
  					redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}	
    	}
    	if (redu.transform.name.Contains("Sniper")){
    	sniperRedCount = sniperRedCount + 1;
    	sniperRedCountb = sniperRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Cannon")){
    	cannoneerRedCount = cannoneerRedCount + 1;
    	cannoneerRedCountb = cannoneerRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Dozer")){
    	dozerRedCount = dozerRedCount + 1;
    	dozerRedCountb = dozerRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Striker")){
    	strikerRedCount = strikerRedCount + 1;
    	strikerRedCountb = strikerRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Titan")){
    	titanRedCount = titanRedCount + 1;
    	titanRedCountb = titanRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Drudge")){
    	drudgeRedCount = drudgeRedCount + 1;
    	drudgeRedCountb = drudgeRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Griefer")){
    	grieferRedCount = grieferRedCount + 1;
    	grieferRedCountb = grieferRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Squaller")){
    	squallerRedCount = squallerRedCount + 1;
    	squallerRedCountb = squallerRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Warder")){
    	warderRedCount = warderRedCount + 1;
    	warderRedCountb = warderRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Disrupter")){
    	disrupterRedCount = disrupterRedCount + 1;
    	disrupterRedCountb = disrupterRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    	if (redu.transform.name.Contains("Arbiter")){
    	arbiterRedCount = arbiterRedCount + 1;
    	arbiterRedCountb = arbiterRedCount;
    		if(isLevel8){
    			if(redu.transform.position.x < -7){
    				redunitTop = redunitTop + 1;
    				redunitTopb = redunitTop;
    			}else if(redu.transform.position.x > 8){
    				redunitBottom = redunitBottom + 1;
    				redunitBottomb = redunitBottom;
    			}
    		}
    	}
    }
    	
    //Start of Blue unit counter array	
    var gos2 : GameObject[]; 
    gos2 = GameObject.FindGameObjectsWithTag("blue");	
    for (var blueu : GameObject in gos2){ 
    	if (blueu.transform.name.Contains("Drudge")){
    	drudgeBlueCount = drudgeBlueCount + 1;
    	drudgeBlueCountb = drudgeBlueCount;
    	}
    	if (blueu.transform.name.Contains("Griefer")){
    	grieferBlueCount = grieferBlueCount + 1;
    	grieferBlueCountb = grieferBlueCount;
    	}
    	if (blueu.transform.name.Contains("Squaller")){
    	squallerBlueCount = squallerBlueCount + 1;
    	squallerBlueCountb = squallerBlueCount;
    	}
    	if (blueu.transform.name.Contains("Warder")){
    	warderBlueCount = warderBlueCount + 1;
    	warderBlueCountb = warderBlueCount;
    	}
    	if (blueu.transform.name.Contains("Disrupter")){
    	disrupterBlueCount = disrupterBlueCount + 1;
    	disrupterBlueCountb = disrupterBlueCount;
    	}
    	if (blueu.transform.name.Contains("Arbiter")){
    	arbiterBlueCount = arbiterBlueCount + 1;
    	arbiterBlueCountb = arbiterBlueCount;
    	}
    } 

  //Math for total amount of units
  blueUnitCounter = (drudgeBlueCount + squallerBlueCount + grieferBlueCount + warderBlueCount + disrupterBlueCount + arbiterBlueCount); 
  redUnitCounter = (marineRedCount + drudgeRedCount + sniperRedCount + squallerRedCount + cannoneerRedCount + grieferRedCount + dozerRedCount + warderRedCount + strikerRedCount + disrupterRedCount + titanRedCount + arbiterRedCount); 	

}	