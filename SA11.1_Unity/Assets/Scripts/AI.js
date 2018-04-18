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
var drudgeBlueCountb : float; 
var grieferBlueCountb : float; 
var squallerBlueCountb : float; 
var warderBlueCountb : float; 
var disrupterBlueCountb : float; 
var arbiterBlueCountb : float;
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
//variables for setting the AI to the proper race
var alien : boolean;


function Start () {
//Sets the computers starting money and income per sec
	currentMoneyAI = 500;
	incomePerSecAI = 35;
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
	if(GameObject.Find("AlienSingle")){
	alien = true;
	}
	else if(GameObject.Find("HumanSingle")){
	alien = false;
	}
	
	

}

function Update () {

	print(currentMoneyAI);
	Income();
//Run a unit counter every _ seconds depending on what units are on the battlefield
	if(lastCounter + 1.2 <= Time.time){
		UnitCounter();
		if(alien == false){
			if(marineRedCountb != 0){
				CounterMarine(marineRedCountb);
			}
			if(sniperRedCountb != 0){
				CounterSniper(sniperRedCountb);
			}
			if(cannoneerRedCountb != 0){
				CounterCannoneer(cannoneerRedCountb);
			}
			if(dozerRedCountb != 0){
				CounterDozer(dozerRedCountb);
			}
			if(strikerRedCountb != 0){
				CounterStriker(strikerRedCountb);
			}
			if(titanRedCountb != 0){
				CounterTitan(titanRedCountb);
			}
		}
		else{
			if(drudgeRedCountb != 0){
				CounterMarine(drudgeRedCountb);
			}
			if(squallerRedCountb != 0){
				CounterSniper(squallerRedCountb);
			}
			if(grieferRedCountb != 0){
				CounterCannoneer(grieferRedCountb);
			}
			if(warderRedCountb != 0){
				CounterDozer(warderRedCountb);
			}
			if(disrupterRedCountb != 0){
				CounterStriker(disrupterRedCountb);
			}
			if(arbiterRedCountb != 0){
				CounterTitan(arbiterRedCountb);
			}
		}
	lastCounter = Time.time;
	}
	
}
//How the AI counters marines
function CounterMarine(redMarine : int){
	var unitSeperation = Random.Range(.5,1);
	switch(redMarine){
		case 0:
		break;
		case 1:
			if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
		break;
		case 2:
			if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 3:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 4:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 5:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 2){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 6:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 2){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;

		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
	  		else if(titanBlueCountb == 0){
				if(currentMoneyAI >= 400){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 400;
				}
			}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
		break;
	}
}
//How the AI counters snipers
function CounterSniper(redSniper : int){
	var unitSeperation = Random.Range(.1,.3);
	switch(redSniper){
		case 0:
		break;
		case 1:
			if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
		break;
		case 2:
			if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 3:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 4:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 5:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 2){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;

		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
		break;
	}
}

//How the AI counters cannoneers
function CounterCannoneer(redCannoneer : int){
	var unitSeperation = Random.Range(.1,.3);
	switch(redCannoneer){
		case 0:
		break;
		case 1:
			if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
		break;
		case 2:
			if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 3:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 4:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 5:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 2){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;

		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
		break;
	}
}
//How the AI counters dozers
function CounterDozer(redDozer : int){
	var unitSeperation = Random.Range(.1,.5);
	switch(redDozer){
		case 0:
		break;
		case 1:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}
	  		
		break;
		case 2:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 3:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}	
		break;
		case 4:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}	
		break;
		

		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
	  		else if(strikerBlueCountb == 0){
				if(currentMoneyAI >= 300){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
		break;
	}
}
//How the AI counters strikers
function CounterStriker(redStriker : int){
	var unitSeperation = Random.Range(.1,.5);
	switch(redStriker){
		case 0:
		break;
		case 1:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}
	  		
		break;
		case 2:
			if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
				
	  		}
			else if(marineBlueCountb == 0){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}	
		break;
		case 3:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}	
		break;
		case 4:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}	
		break;

		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
	  		else if(strikerBlueCountb == 0){
				if(currentMoneyAI >= 300){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
	  		else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				
	  		}
		break;
	}
}
//How the AI counters titans
function CounterTitan(redTitan : int){
	var unitSeperation = Random.Range(.1,.5);
	switch(redTitan){
		case 0:
		break;
		case 1:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
				
	  		}
	  		
		break;
		case 2:
			if(dozerBlueCountb == 0){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
	  		else if(dozerBlueCountb == 1){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
			else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 100;
				}
				
	  		}	
		break;
		default:
			if(dozerBlueCountb <= 1){
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				if(currentMoneyAI >= 200){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(dozerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 200;
				}
				
	  		}
	  		else if(strikerBlueCountb == 0){
				if(currentMoneyAI >= 300){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 300;
				}
				
	  		}
	  		else if(sniperBlueCountb == 0){
				if(currentMoneyAI >= 100){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);					
					currentMoneyAI = currentMoneyAI - 100;
				}
			}
			else if(marineBlueCountb <= 3){
				if(currentMoneyAI >= 50){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 50;
				}
				
	  		}
	  		else if(cannoneerBlueCountb == 0){
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
				}
				if(currentMoneyAI >= 150){
					xAxisAI = Random.Range(spawnMinX, spawnMaxX);
					yield WaitForSeconds(unitSeperation);
					Instantiate(marineBLUE,  Vector3(xAxisAI, 0 ,aiUnitSpawnPositionZ), transform.rotation);						
					currentMoneyAI = currentMoneyAI - 150;
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
		if(incomePerSecAI >= 45){
		incomePerSecAI = 45;
		}
	}
	else if(easy == true){
		if(currentMoneyAI >= 1000){
		currentMoneyAI = 1000;
		}
		if(incomePerSecAI >= 45){
		incomePerSecAI = 45;
		}
	}
	else{
		if(currentMoneyAI >= 1500){
		currentMoneyAI = 1500;
		}
		if(incomePerSecAI >= 55){
		incomePerSecAI = 55;
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
  blueUnitCounter = (marineBlueCount + drudgeBlueCount + sniperBlueCount + squallerBlueCount + cannoneerBlueCount + grieferBlueCount + dozerBlueCount + warderBlueCount + strikerBlueCount + disrupterBlueCount + titanBlueCount + arbiterBlueCount); 
  redUnitCounter = (marineRedCount + drudgeRedCount + sniperRedCount + squallerRedCount + cannoneerRedCount + grieferRedCount + dozerRedCount + warderRedCount + strikerRedCount + disrupterRedCount + titanRedCount + arbiterRedCount); 	

}	