#pragma strict

//variables for spawning units
	
var xAxisAI : float;
var aiUnitSpawnPositionZ : float;
var spawnMinX : float;
var spawnMaxX : float;
var spawnMinXlvl8 : int;
var spawnMaxXlvl8 : int;
var lastCounter : float;
//variables for unit counter
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
var marineBlueCountb : float; 
var sniperBlueCountb : float; 
var cannoneerBlueCountb : float; 
var dozerBlueCountb : float; 
var strikerBlueCountb : float; 
var titanBlueCountb : float; 
static var redUnitCounter : int;
static var blueUnitCounter : int;
//variables for setting level
var isLevel1 : boolean;
var isLevel2 : boolean;
var isLevel3 : boolean;
var isLevel4 : boolean;
var isLevel5 : boolean;
var isLevel6 : boolean;
var isLevel7 : boolean;
var isLevel8 : boolean;
//variables for money
var incomePerSecAI : int;
static var currentMoneyAI : int;
var timeLastAI : float;
//variables for setting difficuly
var hard : boolean;
var easy : boolean;
var normal : boolean;
//var blue units
var marineBLUE : UnityEngine.GameObject;
var sniperBLUE : UnityEngine.GameObject;
var cannoneerBLUE : UnityEngine.GameObject;
var dozerBLUE : UnityEngine.GameObject;
var strikerBLUE : UnityEngine.GameObject;
var titanBLUE : UnityEngine.GameObject;
//variable for setting the AI to the proper race
var alien : boolean;
//variables for knowing xAxisAI depending on level
var aiDirection2 : int;
var directionTimer2 : float;
//variables for Nuke
var randomNuke : int;
var nukeBlueX : boolean;
var nukeBluePF : GameObject;
static var lowBaseLife : boolean;
var nukeExplosion : UnityEngine.GameObject;
var nukeSplashBlueManager : GameObject;
//variables for first send
var firstSend : boolean;
var gameTimer : float;
var sendTimer : float;
//variables for upgrades
var upgradeCounter : int;
//variables for campaign
var campaign : boolean;
var easySendTimer : float;




function Start () {

	randomNuke = 0;
	lowBaseLife = false;
	nukeBlueX = false;
	upgradeCounter = 0;
	firstSend = false;
	aiDirection2 = 2;
	nukeBlueX = false;
//Sets the difficulty level 
	if(GameObject.Find("Easy(Clone)")){
	easy = true;
	normal = false;
	hard = false;
	}
	else if(GameObject.Find("Normal(Clone)")){
	normal = true;
	easy = false;
	hard = false;
	}
	else if(GameObject.Find("Hard(Clone)")){
	hard = true;
	normal = false;
	easy = false;
	}
//Sets whether or not you are playing the campaign
	if(GameObject.Find("Campaign")){
		campaign = true;
	}
	else{
		campaign = false;
	}
//Sets the difficuly 
	if(campaign == true){
		if((PlayerPrefs.GetInt("levelsBeaten") == 0) && isLevel8 == false){
		easy = true;
		normal = false;
		hard = false;
		}
		else if((PlayerPrefs.GetInt("levelsBeaten") == 1 || PlayerPrefs.GetInt("levelsBeaten") == 2) && isLevel8 == false){
		normal = true;
		easy = false;
		hard = false;
		}
		else if(PlayerPrefs.GetInt("levelsBeaten") == 3 || PlayerPrefs.GetInt("levelsBeaten") == 4 || PlayerPrefs.GetInt("levelsBeaten") == 5 || PlayerPrefs.GetInt("levelsBeaten") == 6 || PlayerPrefs.GetInt("levelsBeaten") == 7 || PlayerPrefs.GetInt("levelsBeaten") == 8 || isLevel8 == true){
		hard = true;
		normal = false;
		easy = false;
		}
	}
//Sets the computers starting money and income per sec
	if(easy == true){
	currentMoneyAI = 450;
	incomePerSecAI = 15;
	}
	else if(normal == true){
	currentMoneyAI = 750;
	incomePerSecAI = 20;
	}
	else if(hard == true){
	currentMoneyAI = 1000;
	incomePerSecAI = 30;
	}
//Sets the level
	if(GameObject.Find("LevelOne")){
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
	}
//Sets the race for the AI
	if(GameObject.Find("AlienSingle(Clone)") || GameObject.Find("AlienSingle")){
	alien = true;
	}
	else if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("HumanSingle")){
	alien = false;
	}
	
	

}


function Update () {

	if(easy){
		if(incomePerSecAI>20){
			incomePerSecAI=20;
		}else{}
	}else if (normal){
		if(incomePerSecAI>30){
			incomePerSecAI=30;
		}else{}
	}else if(hard){
		if(incomePerSecAI>35){
			incomePerSecAI=35;
		}else{}
	}else{}


	easySendTimer = Time.deltaTime + easySendTimer;
	Income();
//Run a unit counter every _ seconds depending on what units are on the battlefield
	if(lastCounter + 2 <= Time.time){
		UnitCounter();
		if(!easy){
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
		}else{
			if(easySendTimer >= Random.Range(3,11)){
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
				easySendTimer=0;
			}
		}
	lastCounter = Time.time;
	}
//Sets a Timer spawn locations for lvl8 **Also used to check for random nuke
	directionTimer2 = Time.deltaTime + directionTimer2;
	if(directionTimer2 >= 2){
		aiDirection2 = Random.Range(1,3);
		if(redUnitCounter > 6 && nukeBlueX == false){
			randomNuke = Random.Range(1,10);
		}
		directionTimer2 = 0;
	}
//Use a nuke randomly or when base life is low
	if((randomNuke == 1 || lowBaseLife == true)){		
		if(nukeBlueX == false){
			nukeBlueX = true;
			Instantiate(nukeBluePF, Vector3(0,0,0), Quaternion(0,0,0,0));
			Instantiate(nukeSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
			Instantiate(nukeExplosion, Vector3(0,10,0), Quaternion(0,0,0,0));						
			randomNuke = 0;
			lowBaseLife = false;
		}
	
	}
//Timer to send units if 20 seconds goes and money is over 1000
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
	
//Timer to run SubtractUpgrades();
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
	}else if(easy == true){
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
//Subtract Money for upgrades
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
//Nuke
static function LowBaseLife(lowLifex : boolean){
	lowBaseLife = true;	
}
//Send every 20 seconds if money is over 1000
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
			switch(marineBlueCountb){
				case 0:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}switch(dozerBlueCountb){
				case 0:				
					if(currentMoneyAI >= 200){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 200;
						incomePerSecAI = incomePerSecAI + 4;
					}
				break;
			}switch(strikerBlueCountb){
				case 0:
					if(currentMoneyAI >= 300){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
						yield WaitForSeconds(unitSeperation);
						Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 300;
						incomePerSecAI = incomePerSecAI + 5;
					}
				break;
			}switch(marineBlueCountb){
				case 2:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 3:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}
		break;
		case 2:
			switch(marineBlueCountb){
				case 0:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 1:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 2:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}switch(titanBlueCountb){
				case 0:
					if(currentMoneyAI >= 400){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 400;
						incomePerSecAI = incomePerSecAI + 6;
					}
				break;
			}switch(marineBlueCountb){
				case 3:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 4:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 5:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}
		break;
		case 1:
			switch(marineBlueCountb){
				case 0:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
				case 1:
					if(currentMoneyAI >= 50){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 50;
						incomePerSecAI = incomePerSecAI + 1;
					}
				break;
			}switch(strikerBlueCountb){
				case 0:
					if(currentMoneyAI >= 300){
						if(isLevel8){
							xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
							}
						else{
							xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
						yield WaitForSeconds(unitSeperation);
						Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
						currentMoneyAI = currentMoneyAI - 300;
						incomePerSecAI = incomePerSecAI + 5;
					}
				break;
			}
		break;
	}
			
			

}
//How the AI counters marines
function CounterTier1(redt1 : int){
	var unitSeperation = Random.Range(.5,1);
	var randomCounter : int;
	if(hard == true){
		randomCounter = Random.Range(1,4);
	}
	else if(normal == true){
		randomCounter = Random.Range(1,3);
	}
	else if(easy == true){
		randomCounter = 1;
	}
	//print(randomCounter);
	if(isLevel8){
		if(aiDirection2 != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection2 == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}
	}
	switch(redt1/10){
		case 0:
		break;
		case 1:
			switch(titanBlueCountb){
				case 0:
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
							}
					yield WaitForSeconds(unitSeperation);
					Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					titanBlueCountb = titanBlueCountb + 1;
				break;
			}
		break;
	}

	switch(redt1){

		case 0:
		break;
		// One t1 unit
		case 1:			
			switch(randomCounter){
				case 1:
				switch(marineBlueCountb){
					case 0:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
					randomCounter = 0;
					break;
				}
				break;									  
		  		case 2: 	
		  		switch(marineBlueCountb){
		  			case 0:
			  			if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
					randomCounter = 0;
					break;
					case 1:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
					randomCounter = 0;
					break;
		  		}
		  		switch(sniperBlueCountb){
		  			case 0:
			  			if(currentMoneyAI >= 100){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 100;
							incomePerSecAI = incomePerSecAI + 2;
							sniperBlueCountb = sniperBlueCountb + 1;
						}
					randomCounter = 0;
					break;
		  		}
		  		break;
		  		case 3:
		  		switch(marineBlueCountb){
		  			case 0:
			  			if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						randomCounter = 0;
					break;
					case 1:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
					randomCounter = 0;
					break;
					case 2:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
					randomCounter = 0;
					break;
					case 3:
						if(currentMoneyAI >= 50){
							if(isLevel8){
								xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
								}
							else{
								xAxisAI = Random.Range(spawnMinX, spawnMaxX);
								}
							yield WaitForSeconds(unitSeperation);
							Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 50;
							incomePerSecAI = incomePerSecAI + 1;
							marineBlueCountb = marineBlueCountb + 1;
						}
					randomCounter = 0;
					break;
		  		}
		  		break;
		  	}
		break;
		//2 t1 units
		case 2:
			switch(randomCounter){
				case 1: 
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;	
					}				
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 2:
			  		switch(sniperBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}	
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb =  marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  	break;
			  	case 3:	
			  		switch(dozerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
										}
							yield WaitForSeconds(unitSeperation);
							Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
							currentMoneyAI = currentMoneyAI - 200;
							incomePerSecAI = incomePerSecAI + 4;
							dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
				
	  				}
	  				switch(sniperBlueCountb){
	  					case 0:
		  					if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
	  			break;		
			}	
		break;
		//3 t1 units
		case 3:
			switch(randomCounter){
				case 1:
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  		switch(marineBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 2:
		  			
			  		switch(marineBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					
		  			}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
				}	
		break;
		//4 t1 units
		case 4:
			switch(randomCounter){
				case 1:
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
							case 1:
								if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 2:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
												
			  		}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
												
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
					}
				break;	
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;												
			  		}
			  		switch(titanBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}
						randomCounter = 0;
						break;												
			  		}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
												
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;			
		  	}	
		break;
		//5 t1 units
		case 5:
			switch(randomCounter){
				case 1:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 2: 
			  		switch(dozerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 3:
			  		switch(dozerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			}	
		break;
		//6 t1 units
		case 6:
			switch(randomCounter){
				case 1:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}					
			  	break;
			  	case 2:
			  		switch(dozerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;						
			  		}
			  		switch(titanBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}
							randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}	
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;					
			  		}
			  		switch(titanBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}
							randomCounter = 0;
						break;
						
			  		}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
			}	
		break;
		// more than 6 units
		default:
			switch(randomCounter){
				case 1:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  		switch(titanBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}
							randomCounter = 0;
						break;
					}			  		
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 2:
			  		switch(dozerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}					
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  		switch(titanBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
			  		switch(sniperBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 3:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 3:
			  		switch(dozerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}	
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}	
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						break;
						case 2:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						break;
						
			  		}
			  		switch(titanBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}
							randomCounter = 0;
						break;
					}
			  		switch(sniperBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						case 3:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;							
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			}
		break;
	}
}
//How the AI counters snipers
function CounterTier2(redt2 : int){
	var unitSeperation = Random.Range(.1,.3);
	var randomCounter : int;
	if(hard == true){
		randomCounter = Random.Range(1,4);
	}
	else if(normal == true){
		randomCounter = Random.Range(1,3);
	}
	else if(easy == true){
		randomCounter = 1;
	}
	//print(randomCounter);
	if(isLevel8){
		if(aiDirection2 != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection2 == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}		
	}
	
	switch(redt2){
		case 0:
		break;
		//1 t2 unit
		case 1:
			switch(randomCounter){
				case 1:
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}			  	
			  	break;
			  	case 2:
			  		switch(marineBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}			  	
			  	break;
			  	case 3:
			  		switch(marineBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}			  	
			  	break;
			}
		break;
		//2 t2 units
		case 2:
			switch(randomCounter){
				case 1:
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 2:
			  		switch(dozerBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(marineBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  	break;
			  	case 3:
			  		switch(dozerBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(sniperBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		break;
			  	break;
			}	
		break;
		//3 t2 units
		case 3:
			switch(randomCounter){
				case 1:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
			  	break;
			  	case 2:
			  		switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 2;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
				break;
			}	
		break;
		//4 t2 units
		case 4:
			switch(randomCounter){
				case 1:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	
			  	break;
			  	case 2:
			  		switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  		switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}

						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}

						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 3:
			  		switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  		switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}

						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}

						randomCounter = 0;
						break;
						case 2: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}

						randomCounter = 0;
						break;
			  		}

			}	
		break;
		//5 t2 units
		case 5:
			randomCounter = 1;
			switch(randomCounter){
				case 1:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
							}
						randomCounter = 0;
						break;
						
			  		}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	
			  	break;
			}	
		break;
		//more than 5 t2 units
		default:
			switch(randomCounter){
				case 1:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  		switch(strikerBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 300){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 300;
								incomePerSecAI = incomePerSecAI + 6;
								strikerBlueCountb = strikerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
			  		switch(sniperBlueCountb){
			  			case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  
			  	break;
			  	case 2:
			  		switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 3:
			  		switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1: 
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(titanBlueCountb){
						case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  		switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			}
		break;
	}
}

//How the AI counters cannoneers
function CounterTier3(redt3 : int){
	var unitSeperation = Random.Range(.1,.3);
	var randomCounter : int;
	if(hard == true){
		randomCounter = Random.Range(1,4);
	}
	else if(normal == true){
		randomCounter = Random.Range(1,3);
	}
	else if(easy == true){
		randomCounter = 1;
	}
	//print(randomCounter);
	if(isLevel8){
		if(aiDirection2 != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection2 == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}
		
	}
	
	switch(redt3){
		case 0:
		break;
		case 1:
			switch(randomCounter){
				case 1:
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 2:
			  		switch(sniperBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						
			  		}
			  	break;
			  	case 3:
			  		switch(sniperBlueCountb){
			  			case 0:
			  				if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
			  		}
			  		switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
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
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
						randomCounter = 0;
						break;
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 2:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
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
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 2:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
				break;
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}	
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}					
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}					
						randomCounter = 0;
						break;
						case 2:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
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
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}	
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}											
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}												
						randomCounter = 0;
						break;
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}														
						randomCounter = 0;
						break;											
					}
				break;
				case 2:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;						
					}
				break;
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;						
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
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
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;						
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}														
						randomCounter = 0;
						break;												
					}
				break;
				case 2:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}	
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}						
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;
						case 2:		
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}							
						randomCounter = 0;
						break;				
					}
					switch(marineBlueCountb){
						case 0:
							if(currentMoneyAI >= 50){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 50;
								incomePerSecAI = incomePerSecAI + 1;
								marineBlueCountb = marineBlueCountb + 1;
							}														
						randomCounter = 0;
						break;												
					}
				break;
				case 3:
					switch(dozerBlueCountb){
						case 0:
							if(currentMoneyAI >= 200){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 200;
								incomePerSecAI = incomePerSecAI + 4;
								dozerBlueCountb = dozerBlueCountb + 1;
							}						
						randomCounter = 0;
						break;						
					}
					switch(sniperBlueCountb){
						case 0:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}													
						randomCounter = 0;
						break;
						case 1:
							if(currentMoneyAI >= 100){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 100;
								incomePerSecAI = incomePerSecAI + 2;
								sniperBlueCountb = sniperBlueCountb + 1;
							}														
						randomCounter = 0;
						break;										
					}
					switch(titanBlueCountb){
						case 0:
							if(currentMoneyAI >= 400){
								if(isLevel8){
									xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
									}
								else{
									xAxisAI = Random.Range(spawnMinX, spawnMaxX);
									}
								yield WaitForSeconds(unitSeperation);
								Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
								currentMoneyAI = currentMoneyAI - 400;
								incomePerSecAI = incomePerSecAI + 6;
								titanBlueCountb = titanBlueCountb + 1;
							}														
						randomCounter = 0;
						break;												
					}
				break;
			}			
		break;
	}
}
//How the AI counters dozers
function CounterTier4(redt4 : int){
	var unitSeperation = Random.Range(.1,.5);
	if(isLevel8){
		if(aiDirection2 != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection2 == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}		
	}
	
	switch(redt4){
		case 0:
		break;
		case 1:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
	  		
		break;
		case 2:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}	
		break;
		case 3:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;
		case 4:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;
		

		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(strikerBlueCountb == 0){
				if(currentMoneyAI >= 300){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
	if(isLevel8){
		if(aiDirection2 != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection2 == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}		
	}
	
	switch(redt5){
		case 0:
		break;
		case 1:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
	  		
		break;
		case 2:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
				
	  		}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}	
		break;
		case 3:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;
		case 4:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
					incomePerSecAI = incomePerSecAI + 3;
				}
				
	  		}	
		break;

		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(strikerBlueCountb == 0){
				if(currentMoneyAI >= 300){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
					incomePerSecAI = incomePerSecAI + 5;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}
	  		else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
	if(isLevel8){
		if(aiDirection2 != 2){
			spawnMinXlvl8 = -19;
			spawnMaxXlvl8 = -11;
		}else if(aiDirection2 == 2){
			spawnMinXlvl8 = 18.1;
			spawnMaxXlvl8 = 9.1;
		}	
	}
	
	switch(redt6){
		case 0:
		break;
		case 1:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
				
	  		}
	  		
		break;
		case 2:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(dozerBlueCountb == 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
				
	  		}	
		break;
		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
					incomePerSecAI = incomePerSecAI + 4;
				}
				
	  		}
	  		else if(strikerBlueCountb == 0){
				if(currentMoneyAI >= 300){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
					incomePerSecAI = incomePerSecAI + 5;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
					incomePerSecAI = incomePerSecAI + 2;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
					incomePerSecAI = incomePerSecAI + 1;
				}
				
	  		}
	  		else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					if(isLevel8){
						xAxisAI = Random.Range(spawnMinXlvl8, spawnMaxXlvl8);	
						}
					else{
						xAxisAI = Random.Range(spawnMinX, spawnMaxX);
						}
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
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
		if(currentMoneyAI >= 1500){
		currentMoneyAI = 1500;
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
	var marineBlueCount : float; 
    var sniperBlueCount : float; 
    var cannoneerBlueCount : float; 
    var dozerBlueCount : float; 
    var strikerBlueCount : float; 
    var titanBlueCount : float; 
    var drudgeBlueCount : float; 
    var grieferBlueCount : float; 
    var squallerBlueCount : float; 
    var warderBlueCount : float; 
    var disrupterBlueCount : float; 
    var arbiterBlueCount : float;
    //Blue Units
	marineBlueCountb = marineBlueCount;
	sniperBlueCountb = sniperBlueCount;
	cannoneerBlueCountb = cannoneerBlueCount;
	dozerBlueCountb = dozerBlueCount;
	strikerBlueCountb = strikerBlueCount;
	titanBlueCountb = titanBlueCount;
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
    	}
    	if (redu.transform.name.Contains("Sniper")){
    	sniperRedCount = sniperRedCount + 1;
    	sniperRedCountb = sniperRedCount;
    	}
    	if (redu.transform.name.Contains("Cannon")){
    	cannoneerRedCount = cannoneerRedCount + 1;
    	cannoneerRedCountb = cannoneerRedCount;
    	}
    	if (redu.transform.name.Contains("Dozer")){
    	dozerRedCount = dozerRedCount + 1;
    	dozerRedCountb = dozerRedCount;
    	}
    	if (redu.transform.name.Contains("Striker")){
    	strikerRedCount = strikerRedCount + 1;
    	strikerRedCountb = strikerRedCount;
    	}
    	if (redu.transform.name.Contains("Titan")){
    	titanRedCount = titanRedCount + 1;
    	titanRedCountb = titanRedCount;
    	}
    	if (redu.transform.name.Contains("Drudge")){
    	drudgeRedCount = drudgeRedCount + 1;
    	drudgeRedCountb = drudgeRedCount;
    	}
    	if (redu.transform.name.Contains("Griefer")){
    	grieferRedCount = grieferRedCount + 1;
    	grieferRedCountb = grieferRedCount;
    	}
    	if (redu.transform.name.Contains("Squaller")){
    	squallerRedCount = squallerRedCount + 1;
    	squallerRedCountb = squallerRedCount;
    	}
    	if (redu.transform.name.Contains("Warder")){
    	warderRedCount = warderRedCount + 1;
    	warderRedCountb = warderRedCount;
    	}
    	if (redu.transform.name.Contains("Disrupter")){
    	disrupterRedCount = disrupterRedCount + 1;
    	disrupterRedCountb = disrupterRedCount;
    	}
    	if (redu.transform.name.Contains("Arbiter")){
    	arbiterRedCount = arbiterRedCount + 1;
    	arbiterRedCountb = arbiterRedCount;
    	}
    }
    	
    //Start of Blue unit counter array	
    var gos2 : GameObject[]; 
    gos2 = GameObject.FindGameObjectsWithTag("blue");	
    for (var blueu : GameObject in gos2){ 
    	if (blueu.transform.name.Contains("Marine")){
    	marineBlueCount = marineBlueCount + 1;
    	marineBlueCountb = marineBlueCount;
    	}
    	if (blueu.transform.name.Contains("Sniper")){
    	sniperBlueCount = sniperBlueCount + 1;
    	sniperBlueCountb = sniperBlueCount;
    	}
    	if (blueu.transform.name.Contains("Cannon")){
    	cannoneerBlueCount = cannoneerBlueCount + 1;
    	cannoneerBlueCountb = cannoneerBlueCount;
    	}
    	if (blueu.transform.name.Contains("Dozer")){
    	dozerBlueCount = dozerBlueCount + 1;
    	dozerBlueCountb = dozerBlueCount;
    	}
    	if (blueu.transform.name.Contains("Striker")){
    	strikerBlueCount = strikerBlueCount + 1;
    	strikerBlueCountb = strikerBlueCount;
    	}
    	if (blueu.transform.name.Contains("Titan")){
    	titanBlueCount = titanBlueCount + 1;
    	titanBlueCountb = titanBlueCount;
    	}
    } 

  //Math for total amount of units
  blueUnitCounter = (marineBlueCount + sniperBlueCount + cannoneerBlueCount + dozerBlueCount + strikerBlueCount + titanBlueCountb); 
  redUnitCounter = (marineRedCount + drudgeRedCount + sniperRedCount + squallerRedCount + cannoneerRedCount + grieferRedCount + dozerRedCount + warderRedCount + strikerRedCount + disrupterRedCount + titanRedCount + arbiterRedCount); 	

}	