#pragma strict

//Tutorial



var styleGearMenu : UnityEngine.GUIStyle;
var gearMenu : boolean;
var gearButton : UnityEngine.GUIStyle;
var mmButton : UnityEngine.GUIStyle;

var nukeExplosion : UnityEngine.GameObject;
var guiSingle : GameObject;
var easy : GameObject;
var singlePlayer : GameObject;
var humanSingle : GameObject;
var alienAI : GameObject;
var baseLifeManager : GameObject;



var styleTutorial : UnityEngine.GUIStyle;

var styleArrowUp : UnityEngine.GUIStyle;
var styleArrowRight : UnityEngine.GUIStyle;
var styleArrowDown : UnityEngine.GUIStyle;
var styleArrow45 : UnityEngine.GUIStyle;
var nextButton : UnityEngine.GUIStyle;

var textureWelcome : UnityEngine.Texture;
var textureIncome : UnityEngine.Texture;
var textureUSK : UnityEngine.Texture;
var textureUnitInterface : UnityEngine.Texture;
var textureUpgradePanel : UnityEngine.Texture;
var textureSpecialPanel : UnityEngine.Texture;
var textureSendMarine : UnityEngine.Texture;
var textureArmorDamage : UnityEngine.Texture;
var textureTank : UnityEngine.Texture;
var textureSpeedUpgrade : UnityEngine.Texture;
var textureSpeedTest : UnityEngine.Texture;
var textureNuke : UnityEngine.Texture;
var textureMultipleLanes : UnityEngine.Texture;
var textureArrows : UnityEngine.Texture;
var textureBaseDamage : UnityEngine.Texture;
var texturePlayGame : UnityEngine.Texture;
var tutorialPage : int = 1;
var drudgeTutorial : UnityEngine.GameObject;
var grieferTutorial : UnityEngine.GameObject;
var tutorialDummy1 : UnityEngine.GameObject;
var tutorialDummy2 : UnityEngine.GameObject;
var speedDummy : UnityEngine.GameObject;
//Variables for buttons
var marineclicked : boolean = false;
var currentTexture : UnityEngine.Texture;
var startTexture : UnityEngine.Texture;
var endTexture : UnityEngine.Texture;
var button1 : UnityEngine.GUIStyle;
var button2 : UnityEngine.GUIStyle;
var button3 : UnityEngine.GUIStyle;
var button4 : UnityEngine.GUIStyle;
var button5 : UnityEngine.GUIStyle;
var button6 : UnityEngine.GUIStyle;
var button1b : UnityEngine.Texture;
var button2b : UnityEngine.Texture;
var button3b : UnityEngine.Texture;
var button4b : UnityEngine.Texture;
var button5b : UnityEngine.Texture;
var button6b : UnityEngine.Texture;
var button1a : UnityEngine.Texture;
var button2a : UnityEngine.Texture;
var button3a : UnityEngine.Texture;
var button4a : UnityEngine.Texture;
var button5a : UnityEngine.Texture;
var button6a : UnityEngine.Texture;
//alien buttons
var button1d : UnityEngine.GUIStyle;
var button2d: UnityEngine.GUIStyle;
var button3d : UnityEngine.GUIStyle;
var button4d : UnityEngine.GUIStyle;
var button5d : UnityEngine.GUIStyle;
var button6d : UnityEngine.GUIStyle;
var button1e : UnityEngine.Texture;
var button2e : UnityEngine.Texture;
var button3e : UnityEngine.Texture;
var button4e : UnityEngine.Texture;
var button5e : UnityEngine.Texture;
var button6e : UnityEngine.Texture;
var button1f : UnityEngine.Texture;
var button2f : UnityEngine.Texture;
var button3f : UnityEngine.Texture;
var button4f : UnityEngine.Texture;
var button5f : UnityEngine.Texture;
var button6f : UnityEngine.Texture;
//pwrup
var pwrup : UnityEngine.GUIStyle;
//Variables for popoutbuttons
var pwrposwide: float;
var upgposwide: float;
var upgbutwide : float;
var pwrbutwide : float;
//Styles for upgrade buttons 
var blankbutton : UnityEngine.GUIStyle;
var pwrbutton1 : UnityEngine.GUIStyle;
var pwrbutton1a : UnityEngine.Texture;
var pwrbutton1Original : UnityEngine.Texture;
var mothershipButton : UnityEngine.GUIStyle;
var mothershipButtonA : UnityEngine.Texture;
//var pwrbutton2 : UnityEngine.GUIStyle;
//var pwrbutton3 : UnityEngine.GUIStyle;
var upgbutton1 : UnityEngine.GUIStyle;
var upgbutton2 : UnityEngine.GUIStyle;
var upgbutton3 : UnityEngine.GUIStyle;
var upgbutton4 : UnityEngine.GUIStyle;
var upgbutton1a : UnityEngine.Texture;
var upgbutton2a : UnityEngine.Texture;
var upgbutton21 : UnityEngine.Texture;
var upgbutton22 : UnityEngine.Texture;
var upgbutton23 : UnityEngine.Texture;
var upgbutton24 : UnityEngine.Texture;
var upgbutton25 : UnityEngine.Texture;
var upgbutton21a : UnityEngine.Texture;
var upgbutton22a : UnityEngine.Texture;
var upgbutton23a : UnityEngine.Texture;
var upgbutton24a : UnityEngine.Texture;
var upgbutton25a : UnityEngine.Texture;
var upgbutton3a : UnityEngine.Texture;
var upgbutton4a : UnityEngine.Texture;
var upgbutton1Original : UnityEngine.Texture;
var upgbutton2Original : UnityEngine.Texture;
var upgbutton3Original : UnityEngine.Texture;
var upgbutton4Original : UnityEngine.Texture;
//-------------Don't know if this variable is needed-------------//
var upg : UnityEngine.GUIStyle;
//-------------<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>-------------//
//Texture for upgrade buttons to swap to when used once
var upgused : Texture;
var pwrclicked : boolean;
var upgclicked : boolean;
var overlayStyle : GUIStyle;
//Variables for sounds
var buttonsound : AudioClip;
var errorsound : AudioClip;

//These will be the PREFABS that are spawned
//MARINE
var marineRED : UnityEngine.GameObject;
//var marineBLUE : UnityEngine.GameObject;
//SNIPER
var sniperRED : UnityEngine.GameObject;
//var sniperBLUE : UnityEngine.GameObject;
//ROCKETEER
var cannoneerRED : UnityEngine.GameObject;
//var cannoneerBLUE : UnityEngine.GameObject;
//DOZER
var dozerRED : UnityEngine.GameObject;
//var dozerBLUE : UnityEngine.GameObject;
//STRIKER
var strikerRED : UnityEngine.GameObject;
//var strikerBLUE : UnityEngine.GameObject;
//TITAN
var titanRED : UnityEngine.GameObject;
//var titanBLUE : UnityEngine.GameObject;
//FIRST ALIEN
//var drudgeRED : UnityEngine.GameObject;
var drudgeBLUE : UnityEngine.GameObject;
//SECOND ALIEN
//var squallerRED : UnityEngine.GameObject;
var squallerBLUE : UnityEngine.GameObject;
//THIRD ALIEN
//var grieferRED : UnityEngine.GameObject;
var grieferBLUE : UnityEngine.GameObject;
//FOURTH ALIEN
//var warderRED : UnityEngine.GameObject;
var warderBLUE : UnityEngine.GameObject;
//FIFTH ALIEN
//var disrupterRED : UnityEngine.GameObject;
var disrupterBLUE : UnityEngine.GameObject;
//SIXTH ALIEN 
//var arbiterRED : UnityEngine.GameObject;
var arbiterBLUE : UnityEngine.GameObject;
//HUMAN TURRET
var humanTurretRED : UnityEngine.GameObject;
//var humanTurretBLUE : UnityEngine.GameObject;
//ALIEN TURRET
//var alienTurretRED : UnityEngine.GameObject;
var alienTurretBLUE : UnityEngine.GameObject;
//Styles for nuke splash screen
var blankmap : Texture;
var nukeSplashRedManager : GameObject;
var nukeSplashBlueManager : GameObject;
//Variables for Nuke
static var nukesound : AudioClip;
var nukesoundtimer : float;

//Variable for spawning units with different identities
var nextNameNumber : float = 1;
//Variables for screen height and width
var wide = Screen.width;
var tall = Screen.height;
//Variables for AI income
var startingMoneyAI : int = 1000;
var incomePerSecAI : int;
var maxIncomeAI : int = 1000;
static var currentMoneyAI : int;
var timeLastAI : float;
//Variables for Money
var startingMoney : int = 100;
var incomePerSec : int = 4;
var maxIncome : int = 1000;
static var currentMoney : int;
var timeLast : float;
var textstyle : GUIStyle;
var textstylered : GUIStyle;
var textstyleblue : GUIStyle;
//Variables for unit spawn locations
var redSpawn1 :	GameObject;
var redSpawn2 : GameObject;
var blueSpawn1 :GameObject;
var blueSpawn2 : GameObject;

var humanTurretSpawnRed1 : GameObject;
var humanTurretSpawnRed2 : GameObject;
var humanTurretSpawnBlue1 : GameObject;
var humanTurretSpawnBlue2 : GameObject;
var alienTurretSpawnRed : GameObject;
var alienTurretSpawnBlue : GameObject;


var spawnSwitch : boolean = false; 
var spawnSwitchAI : boolean = false;

//Score Variables
static var currentScoreRed : int = 0;
static var currentKillsRed : int = 0;
static var currentScoreBlue : int = 0;
static var currentKillsBlue : int = 0;
//Variables for Simple Single player
var spawnDelay : float = 0;
var spawnDelaySniper : float = 0;
//Variable for Speed Upgrade Counter
var speedStackerRed : int = 0;
var speedStackerBlue : int = 0;
var speedStackerX : int;
var speedStackerStars : String;
var speedPrefab : GameObject;
//Variables for Damage Upgrade Counter
var damageStackerRed : int = 0;
var damageStackerBlue : int = 0;
var damageStackerX : int;
var damageStackerStars : String;
//Variables for Health
var healthStackerRed : int = 0;
var healthStackerBlue : int = 0;
var healthStackerX : int;
var healthStackerStars : String;

var gameguiNetworkview : NetworkView;
var baseMgr : GameObject;
var aiAlien : boolean;


//AI variables Human
var aiCounter : String;

static var redUnitCounter : int;
static var unitCounterLight : float;
static var blueUnitCounterLight : float;
static var unitCounterHeavy : float;
static var blueUnitCounterHeavy : float;
static var cannoneerCount : float;

var timerAISpawn : float;
var timerAINuke : float;
var counterAI : String;


var xAxis : float;
var xAxisAI : float;
var zAxisAI : float;
var spawnAITimer : float;
var tutorialNuke : boolean = false;


//Vars for new nuke 2513
var nukeRedPF : GameObject;
var nukeBluePF : GameObject;
var nukeRed : boolean = false;
var nukeBlue : boolean = false;

var motherShipRed : GameObject;
var turret : boolean = false;

var tutorialTimer : float;
var sec : float;

var income : boolean = false;
var score : boolean = false;
var unitInterface : boolean = false;
var upgrade : boolean = false;
var special : boolean = false;
var sendMarine : boolean = false;
var sendTank : boolean = false;
var speedUpgrade : boolean = false;

var playGame : boolean;
var nextButtonOn : boolean = true;
var drudgesSpawned : boolean = false;
var targetRing : UnityEngine.GameObject;
var targetRingGriefer : UnityEngine.GameObject;
var targetRingUp : UnityEngine.GameObject;
var targetRingDown : UnityEngine.GameObject;
var level1 : UnityEngine.GameObject;



function Awake(){


	currentTexture = startTexture;
}



//*********************Tenadore, use comments when coding so I don't have to literally read the entire script


function Start () {
	
	
	
	
	tutorialPage = 1;
	
	playGame = false;

	if(GameObject.Find("Tutorial")){
	//Destroy(GameObject.Find("Base_Manager_Blue"));
		GameObject.Find("Base_Manager_Blue").transform.tag = "Untagged";
	}
	if(GameObject.Find("AlienAI")){
	aiAlien = true;
	}
	if(GameObject.Find("HumanAI")){
	aiAlien = false;
	}

	
	speedStackerRed = 0;
	speedStackerBlue = 0;
	damageStackerRed = 0;
	damageStackerBlue = 0;
	healthStackerRed = 0;
	healthStackerBlue = 0;
	
	nukeRed = false;
	nukeBlue = false;	
	
	currentMoney = startingMoney;
	currentMoneyAI = startingMoneyAI;
	
	timeLast = Time.time;
	timerAISpawn = Time.time;
	
	
	pwrclicked = false;	
	pwrposwide = .951;
	upgposwide = .951;
	
	upgclicked = false;
	upgbutwide = 10;
	pwrbutwide = 10;


	//gameguiNetworkview = this.GetComponent(NetworkView);
	//var viewID = Network.AllocateViewID();
	//Run script that puts both players bases on the map
	
	
	Instantiate(baseMgr, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
	
}

function Update (){
 if(currentMoneyAI>200){
 	currentMoneyAI=200;
 }

	//Debug.Log(sec);
	var gos : GameObject[];
	gos = GameObject.FindGameObjectsWithTag("blue");
	if(gos.Length<4){
		///SpawnAI();
	}else{}
	sec = Time.deltaTime + sec;
	if (sec >= 1){
	sec = 0;
	UnitCounter();
}

	tutorialTimer = tutorialTimer + Time.deltaTime;
	switch(tutorialPage){
		case 0 : 
		styleTutorial.normal.background = blankmap;
		break;
		case 1 : 
		styleTutorial.normal.background = textureWelcome;
		break;
		case 2 : 
		styleTutorial.normal.background = textureIncome;
		income = true;
		break;
		case 3 : 
		styleTutorial.normal.background = textureUSK;
		income = false;
		score = true;
		break;
		case 4 : 
		styleTutorial.normal.background = textureUpgradePanel;
		score = false;
		upgrade = true;
		break;
		case 5 : 
		styleTutorial.normal.background = textureSpecialPanel;
		upgrade = false;
		special = true;
		break;
		case 6 : 
		styleTutorial.normal.background = textureUnitInterface;
		special = false;
		unitInterface = true;
		break;
		case 7 : 
		styleTutorial.normal.background = textureSendMarine;
		unitInterface = false;
		sendMarine = true;
			if(!GameObject.Find("TargetRingX(Clone)")){
			//Instantiate(targetRing, GameObject.Find("RingSpawnLvl1").transform.position, GameObject.Find("RingSpawnLvl1").transform.rotation);
			}
			if(!GameObject.Find("Drudge_Tutorial(Clone)")){
			Instantiate(drudgeTutorial, drudgeTutorial.transform.position, drudgeTutorial.transform.rotation);
			Instantiate(tutorialDummy1, tutorialDummy1.transform.position, tutorialDummy1.transform.rotation);
			}
		break;
		case 8 : 
		
			styleTutorial.normal.background = blankmap;
			nextButtonOn = false;
			tutorialPage = tutorialPage + 1;
			Destroy(GameObject.Find("TargetRingX(Clone)"));
					
		break;
		case 9 : 
		styleTutorial.normal.background = textureArmorDamage;
		nextButtonOn = true;
		break;
		case 10 : 
		styleTutorial.normal.background = textureTank;
		sendTank = true;
			if(!GameObject.Find("TargetRingGriefer(Clone)")){
			//Instantiate(targetRingGriefer, GameObject.Find("RingSpawnLvl1").transform.position, GameObject.Find("RingSpawnLvl1").transform.rotation);
			}
			if(!GameObject.Find("Griefer_Tutorial(Clone)")){
			Instantiate(grieferTutorial, grieferTutorial.transform.position, grieferTutorial.transform.rotation);
			Instantiate(tutorialDummy2, tutorialDummy2.transform.position, tutorialDummy2.transform.rotation);
			
			}
		break;
		case 11 : 
			
			styleTutorial.normal.background = blankmap;
			nextButtonOn = false;
			tutorialPage = tutorialPage + 1;
			Destroy(GameObject.Find("TargetRingGriefer(Clone)"));
			
		break;
		case 12 : 
		styleTutorial.normal.background = textureSpeedUpgrade;
		upgrade = true;
			if(speedStackerRed == 5 && !GameObject.Find("Speed_Tutorial(Clone)")){
			Instantiate(speedDummy, speedDummy.transform.position, speedDummy.transform.rotation);
			}
		break;
		case 13 : 
		styleTutorial.normal.background = textureSpeedTest;
			if(tutorialTimer >= 1){
			sendMarine = true;
			}
		break;
		case 14 : 
			if(GameObject.Find("RedMarine(Clone)")){
			styleTutorial.normal.background = blankmap;
			tutorialNuke = true;
			}
			if(!GameObject.Find("RedMarine(Clone)") && nukeRed == false){
			styleTutorial.normal.background = textureNuke;
			special = true;
				if(tutorialNuke == true){
				xAxisAI = Random.Range(5.0, -5.0);
				zAxisAI = Random.Range(40.0, 48.0);
				Instantiate(grieferTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
				xAxisAI = Random.Range(5.0, -5.0);
				zAxisAI = Random.Range(40.0, 48.0);
				Instantiate(grieferTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
				xAxisAI = Random.Range(5.0, -5.0);
				zAxisAI = Random.Range(40.0, 48.0);
				Instantiate(grieferTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
				xAxisAI = Random.Range(5.0, -5.0);
				zAxisAI = Random.Range(40.0, 48.0);
				Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
				xAxisAI = Random.Range(5.0, -5.0);
				zAxisAI = Random.Range(40.0, 48.0);
				Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
				xAxisAI = Random.Range(5.0, -5.0);
				zAxisAI = Random.Range(40.0, 48.0);
				Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
				xAxisAI = Random.Range(5.0, -5.0);
				zAxisAI = Random.Range(40.0, 48.0);
				Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
				tutorialNuke = false;
				}
			}	
		break;
		case 15 : 
			//These if statements move the camera up, then right, then, when in position, moves the tutorial forward
			if(GameObject.Find("Main Camera").transform.position.y < 160){
			nextButtonOn = false;
			GameObject.Find("Main Camera").transform.Translate(0,0,-Time.deltaTime*25);
			}
			else if(GameObject.Find("Main Camera").transform.position.y >= 160 && GameObject.Find("Main Camera").transform.position.z < 225){
			GameObject.Find("Main Camera").transform.Translate(Time.deltaTime*35,0,0);
			tutorialTimer = 0;
			nextButtonOn = false;
			}
			if(GameObject.Find("Main Camera").transform.position.z >= 225){
			styleTutorial.normal.background = textureMultipleLanes;
			nextButtonOn = true;
				//!! Why use a timer here and not the next button?
				
				//if(tutorialTimer >= 6){
				//tutorialPage = tutorialPage + 1;
				//}
			}
			
			
		
		break;
		case 16 : 
			if(nextButtonOn == true){	
			styleTutorial.normal.background = textureArrows;
			}
			else if(nextButtonOn == false){
			styleTutorial.normal.background = blankmap;
			}
			if(!GameObject.Find("TargetRingUp(Clone)")){
			//Instantiate(targetRingUp, GameObject.Find("RingSpawnLvl2Up").transform.position, GameObject.Find("RingSpawnLvl2Up").transform.rotation);
			}
			if(!GameObject.Find("TargetRingDown(Clone)")){
			//Instantiate(targetRingDown, GameObject.Find("RingSpawnLvl2Down").transform.position, GameObject.Find("RingSpawnLvl2Down").transform.rotation);
			}
			if(drudgesSpawned == false){
				Instantiate(drudgeTutorial, GameObject.Find("DrudgeSpawn_Top").transform.position, GameObject.Find("DrudgeSpawn_Top").transform.rotation);
				Instantiate(drudgeTutorial, GameObject.Find("DrudgeSpawn_Bottom").transform.position, GameObject.Find("DrudgeSpawn_Bottom").transform.rotation);
				drudgesSpawned = true;
			}
			
			// ??
			if(GameObject.Find("CameraBlocker")){
			Destroy(GameObject.Find("CameraBlocker"));
			}
			if(!GameObject.Find("Drudge_Tutorial(Clone)")){
			//Destroy(GameObject.Find("TargetRingUp(Clone)"));
			//Destroy(GameObject.Find("TargetRingDown(Clone)"));
			tutorialPage = tutorialPage + 1;
			}
			// ??
		break;
		case 17 :
			
			if(GameObject.Find("Main Camera").transform.position.z < 225 && GameObject.Find("Main Camera").transform.position.y > 0){
			styleTutorial.normal.background = blankmap;
			} 
			if(GameObject.Find("Main Camera").transform.position.z >= 0){
			nextButtonOn = false;
			GameObject.Find("Main Camera").transform.Translate(-Time.deltaTime*35,0,0);
			}
			else if(GameObject.Find("Main Camera").transform.position.y > 104 && GameObject.Find("Main Camera").transform.position.z <= 0){
			GameObject.Find("Main Camera").transform.Translate(0,0,Time.deltaTime*25);
			nextButtonOn = false;
			tutorialTimer = 0;
			}
			if(GameObject.Find("Main Camera").transform.position.y <= 104){
			nextButtonOn = true;
			tutorialPage = tutorialPage + 1;
			}
			
		break;
		case 18 : 
		styleTutorial.normal.background = textureBaseDamage;
		break;
		case 19 : 
		
//		var destroyAllGameObjects:GameObject[] = FindObjectsOfType(GameObject);
//		for(var iGO:int = 0; iGO < destroyAllGameObjects.length; iGO++)
//		{
//		destroyAllGameObjects[iGO].GetType();       //always GameObject :(
//   	destroyAllGameObjects[iGO].GetType("Name"); //always GameObject :(
//   		
//     	Destroy(destroyAllGameObjects[iGO]);     //Destroys EVERYTHING =((((
//     	}
		Destroy(GameObject.Find("Human_Base_Red"));
		Destroy(GameObject.Find("Human_Base_Red(Clone)"));
		Destroy(GameObject.Find("Level2_V1"));
		Destroy(GameObject.Find("Base_Mgr(Clone)"));
		Destroy(GameObject.Find("KillUnits(Clone)"));
		Destroy(GameObject.Find("BaseHealth_Red(Clone)"));
		Destroy(GameObject.Find("ArrowT1"));
		Destroy(GameObject.Find("HealthBarBlue"));
		Destroy(GameObject.Find("HealthBarRed"));
		Destroy(GameObject.Find("Tutorial"));
		Destroy(GameObject.Find("GUI_GameManager_Tutorial(Clone)"));
		Instantiate(level1, level1.transform.position, level1.transform.rotation);
		Instantiate(easy, easy.transform.position, easy.transform.rotation);
		Instantiate(humanSingle, humanSingle.transform.position, humanSingle.transform.rotation);
		Instantiate(alienAI, alienAI.transform.position, alienAI.transform.rotation);
		Instantiate(singlePlayer, singlePlayer.transform.position, singlePlayer.transform.rotation);
		Instantiate(baseLifeManager, baseLifeManager.transform.position, baseLifeManager.transform.rotation);
		Instantiate(baseMgr, baseMgr.transform.position, baseMgr.transform.rotation);
		Instantiate(guiSingle, guiSingle.transform.position, guiSingle.transform.rotation);
		
		

		break;
		
	}
	
	
	

	//tutorialTimer = tutorialTimer + Time.deltaTime;
	
//	if(tutorialPage == 0){
//	styleTutorial.normal.background = blankmap;
//	}
//	if(tutorialPage == 1){
//	styleTutorial.normal.background = textureWelcome;
//	
//	}
//	if(tutorialPage == 2){
//	styleTutorial.normal.background = textureIncome;
//	income = true;
//	}
//	if(tutorialPage == 3){
//	styleTutorial.normal.background = textureUSK;
//	income = false;
//	score = true;
//	}
//	if(tutorialPage == 4){
//	styleTutorial.normal.background = textureUpgradePanel;
//	score = false;
//	unitInterface = true;
//	}
//	if(tutorialPage == 5){
//	styleTutorial.normal.background = textureSpecialPanel;
//	unitInterface = false;
//	upgrade = true;
//	}
//	if(tutorialPage == 6){
//	styleTutorial.normal.background = textureUnitInterface;
//	upgrade = false;
//	special = true;
//	}
//	if(tutorialPage == 7){
//	styleTutorial.normal.background = textureSendMarine;
//	special = false;
//	sendMarine = true;
//		if(!GameObject.Find("Drudge_Tutorial(Clone)")){
//		Instantiate(drudgeTutorial, drudgeTutorial.transform.position, drudgeTutorial.transform.rotation);
//		Instantiate(tutorialDummy1, tutorialDummy1.transform.position, tutorialDummy1.transform.rotation);
//		}
//	
//	}
//	if(tutorialPage == 8 && tutorialTimer >= 1){
//	styleTutorial.normal.background = textureArmorDamage;
//	
//	}
//	if(tutorialPage == 9){
//	styleTutorial.normal.background = textureTank;
//	}
//	if(tutorialPage == 10){
//	styleTutorial.normal.background = textureSpeedUpgrade;
//	sendCannoneer = true;
//		if(!GameObject.Find("Griefer_Tutorial(Clone)")){
//		Instantiate(grieferTutorial, grieferTutorial.transform.position, grieferTutorial.transform.rotation);
//		Instantiate(tutorialDummy2, tutorialDummy2.transform.position, tutorialDummy2.transform.rotation);
//		}
//	}
//	if(tutorialPage == 11 && tutorialTimer >= 1){
//	styleTutorial.normal.background = textureSpeedTest;
//	}
//	if(tutorialPage == 12){
//	styleTutorial.normal.background = textureNuke;
//		upgrade = true;
//		if(speedStackerRed == 5 && !GameObject.Find("Speed_Tutorial(Clone)")){
//		Instantiate(speedDummy, speedDummy.transform.position, speedDummy.transform.rotation);
//		}
//	}
//	if(tutorialPage == 13 && !GameObject.Find("RedMarine(Clone)") && tutorialTimer >= 1){
//	styleTutorial.normal.background = textureMultipleLanes;
//	sendMarine = true;
//	}
//	if(tutorialPage == 14 && GameObject.Find("RedMarine(Clone)")){
//	styleTutorial.normal.background = blankmap;
//	tutorialNuke = true;
//	}	
//	if(tutorialPage == 14 && !GameObject.Find("RedMarine(Clone)") && nukeRed == false){
//	styleTutorial.normal.background = textureNuke;
//	special = true;
//		if(tutorialNuke == true){
//		xAxisAI = Random.Range(5.0, -5.0);
//		zAxisAI = Random.Range(40.0, 48.0);
//		Instantiate(grieferTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
//		xAxisAI = Random.Range(5.0, -5.0);
//		zAxisAI = Random.Range(40.0, 48.0);
//		Instantiate(grieferTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
//		xAxisAI = Random.Range(5.0, -5.0);
//		zAxisAI = Random.Range(40.0, 48.0);
//		Instantiate(grieferTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
//		xAxisAI = Random.Range(5.0, -5.0);
//		zAxisAI = Random.Range(40.0, 48.0);
//		Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
//		xAxisAI = Random.Range(5.0, -5.0);
//		zAxisAI = Random.Range(40.0, 48.0);
//		Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
//		xAxisAI = Random.Range(5.0, -5.0);
//		zAxisAI = Random.Range(40.0, 48.0);
//		Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
//		xAxisAI = Random.Range(5.0, -5.0);
//		zAxisAI = Random.Range(40.0, 48.0);
//		Instantiate(drudgeTutorial, Vector3(xAxisAI, 0 , zAxisAI), transform.rotation);
//		tutorialNuke = false;
//		}
//	}
//	if(tutorialPage == 15){
//	styleTutorial.normal.background = textureMultipleLanes;
//	}
//	if(tutorialPage == 16){
//	playGame = true;
//	}
	
	
	if(!GameObject.Find("Drudge_Tutorial(Clone)") && !GameObject.Find("Tutorial_Dummy_2(Clone)") && GameObject.Find("Tutorial_Dummy_1(Clone)") && tutorialPage < 8){
	tutorialTimer = 0;
	tutorialPage = 8;
	
	}
	if(!GameObject.Find("Griefer_Tutorial(Clone)") && !GameObject.Find("Speed_Tutorial(Clone)") && GameObject.Find("Tutorial_Dummy_2(Clone)") && tutorialPage < 11){
	tutorialTimer = 0;
	tutorialPage = 11;
	}
	if(speedStackerRed == 5 && GameObject.Find("Speed_Tutorial(Clone)") && tutorialPage < 13){
	tutorialPage = 13;
	}
	if(tutorialPage == 14 && nukeRed == true && tutorialTimer >= 1.5){
	tutorialPage = 15;
	}
	if(upgclicked == true || speedStackerRed == 5){
	upgrade = false;
	}
	if(pwrclicked == true || nukeRed == true){
	special = false;
	}
	
	if(GameObject.Find("Tutorial")){
	button2.normal.background = button2a;
	button4.normal.background = button4a;
	button5.normal.background = button5a;
	button6.normal.background = button6a;
	upgbutton1.normal.background = upgbutton1a;
	upgbutton1.active.background = upgbutton1a;
	upgbutton3.normal.background = upgbutton3a;
	upgbutton3.active.background = upgbutton3a;
	upgbutton4.normal.background = upgbutton4a;
	upgbutton4.active.background = upgbutton4a;
	}
	if(tutorialPage == 7 || tutorialPage == 13 || (tutorialPage == 16 && nextButtonOn == false)){
	button1.normal.background = button1b;
	}
	else{
	button1.normal.background = button1a;
	}
	if(tutorialPage == 10){
	button5.normal.background = button5b;
	}
	else{
	button3.normal.background = button3a;
	}
	if(tutorialPage != 12){
	upgbutton2.normal.background = upgbutton2a;
	upgbutton2.active.background = upgbutton2a;
	}
	else if(tutorialPage == 12){
	upgbutton2.normal.background = upgbutton2Original;
	upgbutton2.active.background = upgbutton2Original;
	}
	
	if(speedStackerRed == 1){
	upgbutton2.normal.background = upgbutton21a;
	upgbutton2.active.background = upgbutton21a;
	}
	else if(speedStackerRed == 2){
	upgbutton2.normal.background = upgbutton22a;
	upgbutton2.active.background = upgbutton22a;
	}
	else if(speedStackerRed == 3){
	upgbutton2.normal.background = upgbutton23a;
	upgbutton2.active.background = upgbutton23a;
	}
	else if(speedStackerRed == 4){
	upgbutton2.normal.background = upgbutton24a;
	upgbutton2.active.background = upgbutton24a;
	}
	else if(speedStackerRed == 5){
	upgbutton2.normal.background = upgbutton25a;
	upgbutton2.active.background = upgbutton25a;
	}
	
	if(tutorialPage == 14){
	pwrbutton1.normal.background = pwrbutton1Original;
	pwrbutton1.active.background = pwrbutton1Original;
	}
	else{
	pwrbutton1.normal.background = pwrbutton1a;
	pwrbutton1.active.background = pwrbutton1a;
	}
	
	
	
	
	
	if(nukeRed == true){
	pwrbutton1.normal.background = pwrbutton1a;
	pwrbutton1.active.background = pwrbutton1a;
	}


//	if(currentMoney < 100){
//	upgbutton1.normal.background = upgbutton1a;
//	upgbutton1.active.background = upgbutton1a;
//	upgbutton2.normal.background = upgbutton2a;
//	upgbutton2.active.background = upgbutton2a;
//	upgbutton3.normal.background = upgbutton3a;
//	upgbutton3.active.background = upgbutton3a;
//	}
//	else{
//	upgbutton1.normal.background = upgbutton1Original;
//	upgbutton1.active.background = upgbutton1Original;
//	upgbutton2.normal.background = upgbutton2Original;
//	upgbutton2.active.background = upgbutton2Original;
//	upgbutton3.normal.background = upgbutton3Original;
//	upgbutton3.active.background = upgbutton3Original;
//	}
	
//	if(currentMoney < 300){
//	upgbutton4.normal.background = upgbutton4a;
//	upgbutton4.active.background = upgbutton4a;
//	}
//	else{
//	upgbutton4.normal.background = upgbutton4Original;
//	upgbutton4.active.background = upgbutton4Original;
//	}
	//Sets text for stacking power up buttons correctly over the network
	if(speedStackerX == 1){
	upgbutton2.normal.background = upgbutton21;
	}
	else if(speedStackerX == 2){
	upgbutton2.normal.background = upgbutton22;
	}
	else if(speedStackerX == 3){
	upgbutton2.normal.background = upgbutton23;
	}
	else if(speedStackerX == 4){
	upgbutton2.normal.background = upgbutton24;
	}
	else if(speedStackerX == 5){

	upgbutton2.normal.background = upgbutton25;
	
	}
//	if(damageStackerX == 1){
//	damageStackerStars = "a";
//	}
//	else if(damageStackerX == 2){
//	damageStackerStars = "aa";
//	}
//	else if(damageStackerX == 3){
//	damageStackerStars = "aaa";
//	}
//	else if(damageStackerX == 4){
//	damageStackerStars = "aaaa";
//	}
//	else if(damageStackerX == 5){
//	damageStackerStars = "aaaaa";
//	upgbutton1.normal.background = upgbutton1a;
//	upgbutton1.active.background = upgbutton1a;
//	}
//	if(healthStackerX == 1){
//	healthStackerStars = "a";
//	}
//	else if(healthStackerX == 2){
//	healthStackerStars = "aa";
//	}
//	else if(healthStackerX == 3){
//	healthStackerStars = "aaa";
//	}
//	else if(healthStackerX == 4){
//	healthStackerStars = "aaaa";
//	}
//	else if(healthStackerX == 5){
//	healthStackerStars = "aaaaa";
//	upgbutton3.normal.background = upgbutton3a;
//	upgbutton3.active.background = upgbutton3a;
//	}
	if(turret == true){
	upgbutton4.normal.background = upgbutton4a;
	upgbutton4.active.background = upgbutton4a;
	}
	
	speedStackerX = speedStackerRed;
	damageStackerX = damageStackerRed;
	healthStackerX = healthStackerRed;
	
	Income();
	//Sets a cap for money
	if (currentMoney >= 1000){
	currentMoney = 1000;
	}
	if(currentMoneyAI >= 300){
	currentMoneyAI = 300;
	}
	

//	
//	if(currentMoney < 50){
//	button1.normal.background = button1a;
//	}
//	else{
//	button1.normal.background = button1b;
//	}
//	if(currentMoney < 100){
//	button2.normal.background = button2a;
//	}
//	else{
//	button2.normal.background = button2b;
//	}
//	if(currentMoney < 150){
//	button3.normal.background = button3a;
//	}
//	else{
//	button3.normal.background = button3b;
//	}
//	if(currentMoney < 200){
//	button4.normal.background = button4a;
//	}
//	else{
//	button4.normal.background = button4b;
//	}
//	if(currentMoney < 300){
//	button5.normal.background = button5a;
//	}
//	else{
//	button5.normal.background = button5b;
//	}
//	if(currentMoney < 400){
//	button6.normal.background = button6a;
//	}
//	else{
//	button6.normal.background = button6b;
//	}



}


function Income(){
	

	//Adds income over time
	if (timeLast + .5 <= Time.time){
	currentMoney = currentMoney + incomePerSec;
	timeLast = Time.time;
	}
	if(timeLastAI + .5 <= Time.time){
	currentMoneyAI = currentMoneyAI + incomePerSecAI;
	timeLastAI = Time.time;
	}
	if(incomePerSecAI >= 10){
	incomePerSecAI = 10;
	}
	


}


function OnGUI(){

	GUI.depth = 0;
	var wide = Screen.width;
	var tall = Screen.height;

	if (GUI.Button (new Rect ((wide/30) - (wide/6), tall/3.7, tall/2.5, tall/2.5),"", gearButton))  {
		if(gearMenu == true){
			gearMenu = false;
		}
		else{
			gearMenu = true;
		}
	}
	if(gearMenu == true){
	GUI.Label (new Rect( (wide/5.5), (tall/4.5), wide/1.6, tall/2.2), "", styleGearMenu);
		
			if (GUI.Button (new Rect( (wide/2)-(wide/4.78), (tall/2.65), wide/2.5, tall/6.5), "", mmButton)){
				
				Destroy(GameObject.Find("Easy(Clone)"));
				Destroy(GameObject.Find("Normal(Clone)"));
				Destroy(GameObject.Find("Hard(Clone)"));
				
					// if(randomLoadScreen == 1){
					// 	bgloading = loadingScreen1;
					// }
					// else if(randomLoadScreen == 2){
					// 	bgloading = loadingScreen2;
					// }
					// else if(randomLoadScreen == 3){
					// 	bgloading = loadingScreen3;
					// }
					// else if(randomLoadScreen == 4){
					// 	bgloading = loadingScreen4;
					// }
					// else{
					// 	bgloading = loadingScreen4;
					// }
				// bgstyle.normal.background = bgloading;
				// bgstyle.active.background = bgloading;
				Application.LoadLevel("MainMenu");
				
			}
		

	}
	//Upgrade Internal buttons
	if (GUI.Button (new Rect(wide*upgbutwide, tall/7.7, (.25)*tall, (.06)*tall),damageStackerStars, upgbutton1)){
		if (currentMoney >= 100){
			if(damageStackerRed < 5){
//			var allRed2 : GameObject[] = GameObject.FindGameObjectsWithTag("Upgrade");
//				for (var singleRed2 : GameObject in allRed2){
//				singleRed2.GetComponent(Unitcontroller);
//				Unitcontroller.DamageUpgradeRed();
//				}
			damageStackerRed = damageStackerRed + 1;
			currentMoney = currentMoney - 100;	
			}
		}
	}
	if (GUI.Button (new Rect (  wide*upgbutwide, tall/3.9 , (.25)*tall, (.06)*tall),speedStackerStars, upgbutton2 )){
		if(currentMoney >= 100){
			if(tutorialPage == 12){
				if(speedStackerRed < 5){
				Instantiate(speedPrefab, speedPrefab.transform.position, speedPrefab.transform.rotation);
	//			var allRed : GameObject[] = GameObject.FindGameObjectsWithTag("Upgrade");
	//				for (var singleRed : GameObject in allRed){
	//				singleRed.GetComponent(Unitcontroller2);
	//				Unitcontroller2.Speedupgradered();
	//				}
				speedStackerRed = speedStackerRed + 1;
				currentMoney = currentMoney - 100;
				}	
			}
		}
	
	}
	if (GUI.Button (new Rect (  wide*upgbutwide, tall/2.65 , (.25)*tall, (.06)*tall),healthStackerStars, upgbutton3 )){
		if(currentMoney >= 100){
			if(healthStackerRed < 5){
//			var allRed3 : GameObject[] = GameObject.FindGameObjectsWithTag("Upgrade");
//				for(var singleRed3 : GameObject in allRed3){
//				singleRed3.GetComponent(Unitcontroller);
//				Unitcontroller.HealthUpgradeRed();
//				}
			healthStackerRed = healthStackerRed + 1;
			currentMoney = currentMoney - 100;
			}
		}
	
	}
	if (GUI.Button (new Rect (  wide*upgbutwide, tall/2 , (.25)*tall, (.06)*tall),"", upgbutton4 )){
		if(GameObject.Find("HumanSingle")){
			if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
				Instantiate(humanTurretRED, humanTurretSpawnRed1.transform.position, humanTurretSpawnRed1.transform.rotation);
				Instantiate(humanTurretRED, humanTurretSpawnRed2.transform.position, humanTurretSpawnRed2.transform.rotation);
				currentMoney = currentMoney - 300;
				turret = true;
			}
		}
		else if(GameObject.Find("AlienSingle")){
			if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
//				Instantiate(alienTurretRED, alienTurretSpawnRed.transform.position, alienTurretSpawnRed.transform.rotation);
				currentMoney = currentMoney - 300;
				turret = true;
			}
		}
	}


	//Power up internal buttons
	if (GUI.Button (new Rect (  wide*pwrbutwide,(tall/1.5) , (.25)*tall, (.25)*tall),"", pwrbutton1)){
		if(nukeRed == false){
		nukeRed = true;
		styleTutorial.normal.background = blankmap;
		Instantiate(nukeRedPF, Vector3(0,0,0), Quaternion(0,0,0,0));
		Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
		Instantiate(nukeExplosion, Vector3(0,10,0), Quaternion(0,0,0,0));
		tutorialTimer = 0;
		
			
//		tutorialPage = 15;
		
		}
		else if(nukeRed == false && (GameObject.Find("AlienSingle"))){
		
		Instantiate(motherShipRed, Vector3(xAxis,0,-42), Quaternion(0.0,0.0,0.0,0.0));
		Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
		nukeRed=true;

		}
	}

	//These are the menus for Power Ups and Unit Upgrades
	//Popout Power up button
	if (GUI.Button (new Rect (  wide*pwrposwide, tall-(tall/2.5) , (.4)*tall, (.4)*tall),"", pwrup )){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if (pwrclicked == false){
		pwrbutwide = .86;
		pwrposwide = .81;
		pwrclicked = true;
		
		}
		else{
		pwrbutwide = 10;
		pwrposwide = .951;
		pwrclicked = false;
		}
	}
	//Popout upgrade button
	if (GUI.Button (new Rect (  wide*upgposwide, tall-(tall/1.11) , (.4)*tall, (.5)*tall),"", upg )){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
				
		if (upgclicked == false){
		upgbutwide = .86;
		upgposwide = .81;
		upgclicked = true;
		
		}
		else{
		upgposwide = .951;
		upgbutwide = 10;
		upgclicked = false;
		
		}
	}
	//Overlay
	GUI.depth = 5;
	GUI.Label (Rect(0,0,wide,tall), "" , overlayStyle);
	//Creates a button with placement based on a resolution percentage, making sure the button is placed correctly on mutliple devices of multiple resolutions
	//Marine
	if (GUI.Button (new Rect ( ( ((wide/22)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button1 )){
	
		if(tutorialPage != 17 && tutorialPage != 15){
		
			if(tutorialPage == 7 || tutorialPage == 13 ){
			ClickMarine();
			tutorialPage = 0;
			}
			else if(tutorialPage == 16){
			ClickMarine2();
			}
			sendMarine = false;
			if(speedStackerRed == 5 && tutorialPage != 16){
	//		Destroy(GameObject.Find("Speed_Tutorial(Clone)"));
			tutorialPage = 14;
			}
		}
		
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//Sniper
	if (GUI.Button (new Rect ( ( ((wide/7)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button2 )){
	
	
		if(GameObject.Find("HumanSingle")){
		ClickSniper();
		}
		if(GameObject.Find("AlienSingle")){
		ClickSqualler();
		}		
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//Rocketeer
	if (GUI.Button (new Rect ( ( ((wide/4.15)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button3 )){
	
		
		
			
	
		
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//Dozer
	if (GUI.Button (new Rect ( ( ((wide/2.95)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button4 )){
	
	
		if(GameObject.Find("HumanSingle")){
		ClickDozer();
		}
		if(GameObject.Find("AlienSingle")){
		ClickWarder();
		}	
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//Tank
	if (GUI.Button (new Rect ( ( ((wide/2.3)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button5 )){
	
	
		
		if(tutorialPage == 10){
		sendTank = false;
		ClickStriker();
		tutorialPage = 0;
		}
		
		//tutorialPage = 11;
		
//		if(GameObject.Find("HumanSingle")){
//		ClickStriker();
//		}
//		if(GameObject.Find("AlienSingle")){
//		ClickDisrupter();
//		}
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//Heavy Tank
	if (GUI.Button (new Rect ( ( ((wide/1.878)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button6 )){
	
	
		if(GameObject.Find("HumanSingle")){
		ClickTitan();
		}
		if(GameObject.Find("AlienSingle")){
		ClickArbiter();
		}
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//Tutorial
	//^^^^^^^^^^Main Tutorial Next Button^^^^^^^^^^^^^^^^^^^^^^^//
	if(tutorialTimer >= 1 && tutorialPage != 7  && tutorialPage != 10 && tutorialPage != 0 && tutorialPage != 12 && tutorialPage != 13 && tutorialPage != 14  && nextButtonOn == true && gearMenu == false){
		
		if(GUI.Button (new Rect( (wide/1.5), (tall/1.2) - (tall/7), wide/7, tall/12), "", nextButton)){
			if(tutorialPage != 16){
			tutorialPage = tutorialPage + 1;
			}
			else if(tutorialPage == 16){
			GameObject.Find("Base_Manager_Blue").transform.tag = "blue";
			nextButtonOn = false;
			}
		}
	}
	if(gearMenu == false){
	GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", styleTutorial);
	}
	if(income == true && gearMenu == false){
	GUI.Label (new Rect( (wide/1.2), (tall/10), wide/20, wide/20), "", styleArrowUp);
	}
	if(score == true && gearMenu == false){
	GUI.Label (new Rect( (wide/8), (tall/9.5), wide/25, wide/25), "", styleArrowUp);
	GUI.Label (new Rect( (wide/3), (tall/9.5), wide/25, wide/25), "", styleArrowUp);
	GUI.Label (new Rect( (wide/20), (tall/9.5), wide/25, wide/25), "", styleArrowUp);
	}
	if(unitInterface == true && gearMenu == false){
	GUI.Label (new Rect( (wide/3.35), (tall/1.45), wide/20, wide/20), "", styleArrowDown);
	}
	if(upgrade == true && gearMenu == false){
	GUI.Label (new Rect( (wide/1.15), (tall/3.5), wide/20, wide/20), "", styleArrowRight);
	}
	if(special == true && gearMenu == false){
	GUI.Label (new Rect( (wide/1.15), (tall/1.35), wide/20, wide/20), "", styleArrowRight);
	}
	if(sendMarine == true && gearMenu == false){
	GUI.Label (new Rect( (wide/17), (tall/1.45), wide/20, wide/20), "", styleArrowDown);
	}
	if(sendTank == true && gearMenu == false){
	GUI.Label (new Rect( (wide/2.25), (tall/1.45), wide/20, wide/20), "", styleArrowDown);
	}
	GUI.depth = 0;
	//This is the Money Text Field
	GUI.Label (Rect ((wide)-(wide/5), (tall/17), 500, 50), "cash: " + currentMoney.ToString(), textstyle);
	//These are the score fields for Red/Blue
	//Blue
	GUI.Label (Rect ( ( ((wide/60)) ), tall/12 , 50, 50), "Username", textstyleblue);
	GUI.Label (Rect ( ( ((wide/8)) ), tall/12 , 50, 50), "Score: " + currentScoreRed.ToString(), textstyle);
	GUI.Label (Rect ( ( ((wide/3)) ), tall/12 , 50, 50), "Kills: " + currentKillsRed.ToString(), textstyle);
	//Red
	GUI.Label (Rect ( ( ((wide/60)) ), tall/24 , 50, 50), "Username", textstylered);
	GUI.Label (Rect ( ( ((wide/8)) ), tall/24 , 50, 50), "Score: " + currentScoreBlue.ToString(), textstyle);
	GUI.Label (Rect ( ( ((wide/3)) ), tall/24 , 50, 50), "Kills: " + currentKillsBlue.ToString(), textstyle);

}


//-------------------------------FUNCTION FOR SINGLE PLAYER AI-------------------------------//




//----------------------------------END OF FUNCTION FOR SINGLE PLAYER AI------------------------------//

function ClickDrudge(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 50){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	

//	Instantiate(drudgeRED, Vector3(xAxis, 0, -42), transform.rotation);
		
	currentMoney = currentMoney - 50;
	
		if(incomePerSec < 15){
		incomePerSec++;
		}
	//unitCounterLight = unitCounterLight++;
	}
	
}


function ClickSqualler(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 150){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	
		
//	Instantiate(squallerRED, Vector3(xAxis, 0, -42), transform.rotation);
		
	currentMoney = currentMoney - 150;
	//unitCounterLight++;
		if(incomePerSec < 15){
		incomePerSec++;
		}
		
	}
}



function ClickGriefer(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 100){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	
		
//	Instantiate(grieferRED, Vector3(xAxis, 0, -42), transform.rotation);
			
	currentMoney = currentMoney - 100;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	//unitCounterHeavy = unitCounterHeavy + 1;
	}
}





function ClickWarder(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 200){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	
		
//	Instantiate(warderRED, Vector3(xAxis, 0, -42), transform.rotation);
			
	currentMoney = currentMoney - 200;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	//unitCounterHeavy = unitCounterHeavy + 2;
	}
}


function ClickDisrupter(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 300){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	
	
//	Instantiate(disrupterRED, Vector3(xAxis, 0, -42), transform.rotation);
				
	currentMoney = currentMoney - 300;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	//unitCounterLight = unitCounterLight + 3;
	}
}



function ClickArbiter(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 400){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	
		
//	Instantiate(arbiterRED, Vector3(xAxis, 0, -42) , transform.rotation);
	
	
	currentMoney = currentMoney - 400;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	//unitCounterLight = unitCounterLight + 4;
	}
}

function ClickMarine(){
	
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 50){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();		
	//UnitCounter();
	Instantiate(marineRED, Vector3(xAxis, 0, -42), transform.rotation);
	
					
	currentMoney = currentMoney - 50;
	//unitCounterLight++;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	}
}
function ClickMarine2(){
	
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 50){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();		
	//UnitCounter();
	Instantiate(marineRED, Vector3(xAxis, 0, 180), transform.rotation);
	
					
	currentMoney = currentMoney - 50;
	//unitCounterLight++;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	}
}


function ClickSniper(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 100){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();			

		
	Instantiate(sniperRED, Vector3(xAxis, 0, -42), transform.rotation);
		
		
	currentMoney = currentMoney - 100;
	//unitCounterLight = unitCounterLight + 2;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	}	
}


function ClickCannoneer(){
	
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 150){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	//UnitCounter();
	
	Instantiate(cannoneerRED, Vector3(xAxis, 0, -42), transform.rotation);
		
		
	currentMoney = currentMoney - 150;
	//unitCounterLight = unitCounterLight + 1;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	}	
}


function ClickDozer(){
	
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 200){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	//UnitCounter();
	
	Instantiate(dozerRED, Vector3(xAxis, 0, -42), transform.rotation);
	
	
	currentMoney = currentMoney - 200;
	//unitCounterHeavy = unitCounterHeavy +1;
		if(incomePerSec < 15){
		incomePerSec++;
		}
	}	
}


function ClickStriker(){
	//UnitCounter();
	
		xAxis = Random.Range(-5.0, 5.0);
		if(currentMoney >= 400){
		GetComponent.<AudioSource>().clip = buttonsound;
		GetComponent.<AudioSource>().Play();
	
			
		Instantiate(strikerRED, Vector3(xAxis, 0, -42), transform.rotation);
		
		if(tutorialPage != 10){
		currentMoney = currentMoney - 400;
		}
		//unitCounterHeavy = unitCounterHeavy + 2;
			if(incomePerSec < 15){
			incomePerSec = incomePerSec + 3;
			}
		}
		
}


function ClickTitan(){
	//UnitCounter();
	xAxis = Random.Range(-5.0, 5.0);
	if(currentMoney >= 300){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();

	
	Instantiate(titanRED, Vector3(xAxis, 0, -42), transform.rotation);
	
	currentMoney = currentMoney - 300;
	//unitCounterLight = unitCounterLight + 4;
		if(incomePerSec < 15){
		incomePerSec = incomePerSec + 2;
		}
	}	
}




//Adds score and kills for server						
static function ScoreRed(scoreAdd : int){
	
	currentScoreRed = currentScoreRed + scoreAdd;
	currentKillsRed ++;	
}			

//Adds money for kills for server
static function RedBonus( moneyAdd : int){
		
	currentMoney = currentMoney + moneyAdd;
}
	
//Adds money for kills for client	
static function BlueBonus( moneyAdd : int){
		
	currentMoneyAI = currentMoneyAI + moneyAdd;
}

//Adds score and kills for client
static function ScoreBlue(scoreAdd : int){

	currentScoreBlue = currentScoreBlue + scoreAdd;
	currentKillsBlue ++;	
}	





function SpawnAI(){
//HUMAN AI
	if(aiAlien == false){
	//AI NUKE TBD
//		if(redUnitCounter >= 7){
//			if(nukeBlue == false){
//			var redNuke : GameObject[] = GameObject.FindGameObjectsWithTag("red");
//				for (var redDeath : GameObject in redNuke){
//				redDeath.GetComponent(Unitcontroller);
//				Unitcontroller.NukeBlue();
//				}
//			Instantiate(nukeSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
//			nukeBlue = true;
//			timerAINuke = Time.time;
//			}
//		}
		if(GameObject.FindGameObjectWithTag("rturret") && currentMoneyAI >= 200){
			if(!GameObject.FindGameObjectWithTag("bturret" )){
//			Instantiate(humanTurretBLUE, humanTurretSpawnBlue1.transform.position, humanTurretSpawnBlue1.transform.rotation);
//			Instantiate(humanTurretBLUE, humanTurretSpawnBlue2.transform.position, humanTurretSpawnBlue2.transform.rotation);
			currentMoneyAI = currentMoneyAI - 150;
			}
		}
	}
	
	spawnAITimer = spawnAITimer + Time.deltaTime;
	
	
		
		
	if(spawnAITimer > .5){
	
		if(unitCounterLight == 1){
		aiCounter = "a";
		AICounter();
		spawnAITimer = 0;
		}
	
		if(unitCounterLight == 2){
		aiCounter = "b";
		AICounter();
		spawnAITimer = 0;
		}

		if(unitCounterLight == 3){
		aiCounter = "d";
		AICounter();
		spawnAITimer = 0;
		}

		if(unitCounterLight == 4){
		aiCounter = "f";
		AICounter();
		spawnAITimer = 0;
		}

		if(unitCounterHeavy == 1 && cannoneerCount < 3){
		aiCounter = "c";
		AICounter();
		spawnAITimer = 0;
		}
		if(unitCounterHeavy == 2 && cannoneerCount < 3){
		aiCounter = "ec";
		AICounter();
		spawnAITimer = 0;
		}
		if(unitCounterLight > 4){
//			if(currentMoneyAI > 400){
//			aiCounter = "e";
//			}
			
			
			aiCounter = "b";
			AICounter();
			spawnAITimer = 0;
			
			
			
		}
	
		
		
	
	}
		
		
	

}

function AICounter(){
		
	UnitCounter();
	

	//MARINE
	xAxisAI = Random.Range(-5.0, 5.0);
	
		if(aiCounter.Contains("a")){
		if(currentMoneyAI >= 50){
			if(aiAlien == false){
//			Instantiate(marineBLUE, Vector3(xAxisAI, 0 ,42), transform.rotation);
			
			}
			else{
			Instantiate(drudgeBLUE, Vector3(xAxisAI, 0, 42), transform.rotation);
			
			}
		currentMoneyAI = currentMoneyAI - 50;
		}
	spawnAITimer = 0;
	}
	
	//SNIPER
	
		if(aiCounter=="b"){
		if(currentMoneyAI >= 100){
			if(aiAlien == false){
//			Instantiate(sniperBLUE,  Vector3(xAxisAI, 0 ,42), transform.rotation);
			
			}
			else{
			Instantiate(squallerBLUE, Vector3(xAxisAI, 0 ,42), transform.rotation);
			
			}
			currentMoneyAI = currentMoneyAI - 100;
		}
	spawnAITimer = 0;
	}
	
	//Cannoneer
	
		if(aiCounter.Contains("c")){
		if(currentMoneyAI >= 150){
			if(aiAlien == false){
//			Instantiate(cannoneerBLUE,  Vector3(xAxisAI, 0 ,42), transform.rotation);
			
			
			}
			else{
			Instantiate(grieferBLUE,  Vector3(xAxisAI, 0 ,42), transform.rotation);
			
			}
			currentMoneyAI = currentMoneyAI - 150;
		}
	spawnAITimer = 0;
	}
	//Dozer
	
		if(aiCounter.Contains("d")){
		if(currentMoneyAI >= 200){
			if(aiAlien == false){
//			Instantiate(dozerBLUE, Vector3(xAxisAI, 0 ,42), transform.rotation);
	  		
			}
			else{
			Instantiate(warderBLUE, Vector3(xAxisAI, 0 ,42), transform.rotation);
			
			}
			currentMoneyAI = currentMoneyAI - 200;
		}
	spawnAITimer = 0;
	}
	//Striker
	
		if(aiCounter.Contains("e")){
		if(currentMoneyAI >= 300){
			if(aiAlien == false){
//			Instantiate(strikerBLUE,  Vector3(xAxisAI, 0 ,42), transform.rotation);
	  		
			}
			else{
			Instantiate(disrupterBLUE,  Vector3(xAxisAI, 0 ,42), transform.rotation);
			
			}
			currentMoneyAI = currentMoneyAI - 300;
		}
	spawnAITimer = 0;
	}
	//Titan
	
		if(aiCounter.Contains("f")){
		if(currentMoneyAI >= 400){
			if(aiAlien == false){
//			Instantiate(titanBLUE,  Vector3(xAxisAI, 0 ,42), transform.rotation);
	  		
			}
			else{
			Instantiate(arbiterBLUE, Vector3(xAxisAI, 0 ,42), transform.rotation);
	  		
			}
			currentMoneyAI = currentMoneyAI - 400;
		}
	spawnAITimer = 0;
	}
	
	
}


function UnitCounter(){



	//VARIABLES FOR ARRAY UNIT COUNTER
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

	//UNIT COUNTER ARRAY START	
    var gos : GameObject[];
   
    gos = GameObject.FindGameObjectsWithTag("red");
	
    //Determines amount of each unit on field
    for (var redu : GameObject in gos){ 
    	if (redu.transform.name.Contains("Marine")){
    	marineRedCount = marineRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Sniper")){
    	sniperRedCount = sniperRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Cannon")){
    	cannoneerRedCount = cannoneerRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Dozer")){
    	dozerRedCount = dozerRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Striker")){
    	strikerRedCount = strikerRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Titan")){
    	titanRedCount = titanRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Drudge")){
    	drudgeRedCount = drudgeRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Griefer")){
    	grieferRedCount = grieferRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Squaller")){
    	squallerRedCount = squallerRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Warder")){
    	warderRedCount = warderRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Disrupter")){
    	disrupterRedCount = disrupterRedCount + 1;
    	}
    	
    	if (redu.transform.name.Contains("Arbiter")){
    	arbiterRedCount = arbiterRedCount + 1;
    	}
    	
    }
    	
    	
    var gos2 : GameObject[];
   
    gos2 = GameObject.FindGameObjectsWithTag("blue");
    

    	
    	
     for (var blueu : GameObject in gos2){ 
    	if (blueu.transform.name.Contains("Marine")){
    	marineBlueCount = marineBlueCount + 1;
    	}
    	
    	
    	if (blueu.transform.name.Contains("Sniper")){
    	sniperBlueCount = sniperBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Cannon")){
    	cannoneerBlueCount = cannoneerBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Dozer")){
    	dozerBlueCount = dozerBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Striker")){
    	strikerBlueCount = strikerBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Titan")){
    	titanBlueCount = titanBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Drudge")){
    	drudgeBlueCount = drudgeBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Griefer")){
    	grieferBlueCount = grieferBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Squaller")){
    	squallerBlueCount = squallerBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Warder")){
    	warderBlueCount = warderBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Disrupter")){
    	disrupterBlueCount = disrupterBlueCount + 1;
    	}
    	
    	if (blueu.transform.name.Contains("Arbiter")){
    	arbiterBlueCount = arbiterBlueCount + 1;
    	}
    	
    }
    
    
    
    
    
    
    
  unitCounterLight = (marineRedCount + drudgeRedCount + cannoneerRedCount + (sniperRedCount*2) + (squallerRedCount*2) +(disrupterRedCount*3) + (arbiterRedCount * 4) + (titanRedCount *4) ) - (marineBlueCount + drudgeBlueCount + cannoneerBlueCount +  (squallerBlueCount*2)+ (sniperBlueCount*2) + (disrupterBlueCount*3) + (arbiterBlueCount * 4)+ (titanBlueCount *4) );
  unitCounterHeavy = ((dozerRedCount*2) + (strikerRedCount*2) + grieferRedCount + (warderRedCount * 2))-	((dozerBlueCount*2) + (strikerBlueCount*2) + grieferBlueCount + (warderBlueCount * 2));
		
}																																																																																																																								