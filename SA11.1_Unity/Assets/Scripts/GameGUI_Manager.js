#pragma strict

//------------SERVER COMMUNICATION------------------//
//import System;
//import System.Data;
//import System.Data.SqlClient;


//For URL Escaping in iOS
import System.IO;
import System.Text.RegularExpressions;


//var dbcon : IDbConnection;
var url = "http://comm.tidbit.us:81/insert.aspx?";
var baseURL = "http://www.tidbituniverse.com/netfolder/tidbit/stararena/data.php";
var uniqueID;

var loadingPlayers : UnityEngine.GUIStyle;
var styleGearMenu : UnityEngine.GUIStyle;
var gearMenu : boolean;
var gearButton : UnityEngine.GUIStyle;
var displayGUI : boolean;
var bgloading2 : UnityEngine.Texture;
var username : String;
var usernameMP;
var usernameMPLocal;
//--------------------------VARIABLES FOR BUTTONS--------------------------------//
var currentTexture : UnityEngine.Texture;
var startTexture : UnityEngine.Texture;
var endTexture : UnityEngine.Texture;
//---------BUTTON STYLES HUMANS---------//
var button1 : UnityEngine.GUIStyle;
var button2 : UnityEngine.GUIStyle;
var button3 : UnityEngine.GUIStyle;
var button4 : UnityEngine.GUIStyle;
var button5 : UnityEngine.GUIStyle;
var button6 : UnityEngine.GUIStyle;
//--------TEXTURES FOR HUMANS---------//
var button1a : UnityEngine.Texture;
var button2a : UnityEngine.Texture;
var button3a : UnityEngine.Texture;
var button4a : UnityEngine.Texture;
var button5a : UnityEngine.Texture;
var button6a : UnityEngine.Texture;
var button1b : UnityEngine.Texture;
var button2b : UnityEngine.Texture;
var button3b : UnityEngine.Texture;
var button4b : UnityEngine.Texture;
var button5b : UnityEngine.Texture;
var button6b : UnityEngine.Texture;
//---------BUTTON STYLES ALIENS---------//
var button1c : UnityEngine.GUIStyle;
var button2c : UnityEngine.GUIStyle;
var button3c : UnityEngine.GUIStyle;
var button4c : UnityEngine.GUIStyle;
var button5c : UnityEngine.GUIStyle;
var button6c : UnityEngine.GUIStyle;
//--------TEXTURES FOR ALIENS------------//
var button1d : UnityEngine.Texture;
var button2d : UnityEngine.Texture;
var button3d : UnityEngine.Texture;
var button4d : UnityEngine.Texture;
var button5d : UnityEngine.Texture;
var button6d : UnityEngine.Texture;
var button1e : UnityEngine.Texture;
var button2e : UnityEngine.Texture;
var button3e : UnityEngine.Texture;
var button4e : UnityEngine.Texture;
var button5e : UnityEngine.Texture;
var button6e : UnityEngine.Texture;
//Variable for Speed Upgrade Counter
var speedUpgrade1 : UnityEngine.Texture;
var speedUpgrade2 : UnityEngine.Texture;
var speedUpgrade3 : UnityEngine.Texture;
var speedUpgrade4 : UnityEngine.Texture;
var speedUpgrade5 : UnityEngine.Texture;
var speedUpgrade1a : UnityEngine.Texture;
var speedUpgrade2a : UnityEngine.Texture;
var speedUpgrade3a : UnityEngine.Texture;
var speedUpgrade4a : UnityEngine.Texture;

var speedStackerRed : int = 0;
var speedStackerBlue : int = 0;
var speedStackerX : int;
var speedStackerStars : String;
//Variables for Damage Upgrade Counter
var damageUpgrade1 : UnityEngine.Texture;
var damageUpgrade2 : UnityEngine.Texture;
var damageUpgrade3 : UnityEngine.Texture;
var damageUpgrade4 : UnityEngine.Texture;
var damageUpgrade5 : UnityEngine.Texture;
var damageUpgrade1a : UnityEngine.Texture;
var damageUpgrade2a : UnityEngine.Texture;
var damageUpgrade3a : UnityEngine.Texture;
var damageUpgrade4a : UnityEngine.Texture;
var damageStackerRed : int = 0;
var damageStackerBlue : int = 0;
var damageStackerX : int;
var damageStackerStars : String;
//Variables for Health
var healthUpgrade1 : UnityEngine.Texture;
var healthUpgrade2 : UnityEngine.Texture;
var healthUpgrade3 : UnityEngine.Texture;
var healthUpgrade4 : UnityEngine.Texture;
var healthUpgrade5 : UnityEngine.Texture;
var healthUpgrade1a : UnityEngine.Texture;
var healthUpgrade2a : UnityEngine.Texture;
var healthUpgrade3a : UnityEngine.Texture;
var healthUpgrade4a : UnityEngine.Texture;
var healthStackerRed : int = 0;
var healthStackerBlue : int = 0;
var healthStackerX : int;
//------------BUTTONS FOR NUKE/-----------//
var mothershipButton : UnityEngine.GUIStyle;
var mothershipButtonA : UnityEngine.Texture;
var pwrbutton1 : UnityEngine.GUIStyle;
var pwrbutton1a : UnityEngine.Texture;
//---------POPOUT BUTTONS-----------//
var upgused : Texture;
var pwrclicked : boolean;
var upgclicked : boolean;
var overlayStyle : GUIStyle;
var upg : UnityEngine.GUIStyle;
var pwrup : UnityEngine.GUIStyle;
var pwrposwide: float;
var upgposwide: float;
var upgbutwide : float;
var pwrbutwide : float;
//--------------UPGRADE BUTTONS-----------//
var blankbutton : UnityEngine.GUIStyle;
var upgbutton1 : UnityEngine.GUIStyle;
var upgbutton2 : UnityEngine.GUIStyle;
var upgbutton3 : UnityEngine.GUIStyle;
var upgbutton4 : UnityEngine.GUIStyle;
var upgbutton1a : UnityEngine.Texture;
var upgbutton2a : UnityEngine.Texture;
var upgbutton3a : UnityEngine.Texture;
var upgbutton4a : UnityEngine.Texture;
var upgbutton1Original : UnityEngine.Texture;
var upgbutton2Original : UnityEngine.Texture;
var upgbutton3Original : UnityEngine.Texture;
var upgbutton4Original : UnityEngine.Texture;
//-----------------------------------------END OF BUTTONS------------------------------//

//----------SOUNDS---------//
var buttonsound : AudioClip;
var errorsound : AudioClip;
//------END OF SOUNDS------//

//----------------------------------------PREFABS THAT ARE SPAWNED----------------------------------//
//MARINE
var marineRED : UnityEngine.GameObject;
var marineBLUE : UnityEngine.GameObject;
//SNIPER
var sniperRED : UnityEngine.GameObject;
var sniperBLUE : UnityEngine.GameObject;
//CANNONEER
var cannoneerRED : UnityEngine.GameObject;
var cannoneerBLUE : UnityEngine.GameObject;
//DOZER
var dozerRED : UnityEngine.GameObject;
var dozerBLUE : UnityEngine.GameObject;
//STRIKER
var strikerRED : UnityEngine.GameObject;
var strikerBLUE : UnityEngine.GameObject;
//TITAN
var titanRED : UnityEngine.GameObject;
var titanBLUE : UnityEngine.GameObject;
//DRUDGE
var drudgeRED : UnityEngine.GameObject;
var drudgeBLUE : UnityEngine.GameObject;
//SQUALLER
var squallerRED : UnityEngine.GameObject;
var squallerBLUE : UnityEngine.GameObject;
//GRIEFER
var grieferRED : UnityEngine.GameObject;
var grieferBLUE : UnityEngine.GameObject;
//WARDER
var warderRED : UnityEngine.GameObject;
var warderBLUE : UnityEngine.GameObject;
//DISRUPTER
var disrupterRED : UnityEngine.GameObject;
var disrupterBLUE : UnityEngine.GameObject;
//ARBITER
var arbiterRED : UnityEngine.GameObject;
var arbiterBLUE : UnityEngine.GameObject;
//--------------------------------TURRETS---------------------------------//
var humanTurretRED : UnityEngine.GameObject;
var humanTurretBLUE : UnityEngine.GameObject;
var alienTurretRED : UnityEngine.GameObject;
var alienTurretBLUE : UnityEngine.GameObject;
//-------TURRET SPAWN LOCATION--------//
var humanTurretSpawnRed1 : GameObject;
var humanTurretSpawnRed2 : GameObject;
var humanTurretSpawnBlue1 : GameObject;
var humanTurretSpawnBlue2 : GameObject;
var alienTurretSpawnRed : GameObject;
var alienTurretSpawnBlue : GameObject;
//--------TURRET BOOLEAN----------//
var turret : boolean = false;
//-----------------------------END OF TURRET-------------------------------//

//--------------NUKE---------------//
var nukedbyredStyle : UnityEngine.GUIStyle;
var nukedbyblueStyle : UnityEngine.GUIStyle;
var nukedbyredTexture : UnityEngine.Texture;
var nukedbyblueTexture : UnityEngine.Texture;
var blankmap : Texture;
var nukeSplashRedManager : GameObject;
var nukeSplashBlueManager : GameObject;
var nukeRed : boolean = false;
var nukeBlue : boolean = false;
var nukeRedPF : GameObject;
var nukeBluePF : GameObject;
//-----------END OF NUKE-------------//

//------------MOTHERSHIP-------------//
var mothershipRed : GameObject;
var mothershipBlue : GameObject;
var mothershipRedStyle : UnityEngine.Texture;
var mothershipBlueStyle : UnityEngine.Texture;

//--------------------------------------------------END OF PREFABS-----------------------------------//

//----------SCREEN HEIGHT/WIDTH-------------//
var wide = Screen.width;
var tall = Screen.height;
//--------------SCORE/KILLS/MONEY-------------//
var startingMoney : int = 500;
var incomePerSec : int = 15;
var maxIncome : int = 45;
static var currentMoney : int;
var timeLast : float;
var textstyle : GUIStyle;
var textstylered : GUIStyle;
var textstyleblue : GUIStyle;
static var currentScoreRed : int = 0;
static var currentKillsRed : int = 0;
static var currentScoreBlue : int = 0;
static var currentKillsBlue : int = 0;
static var currentScoreRed2 : int = 0;
static var currentKillsRed2 : int = 0;
static var currentScoreBlue2 : int = 0;
static var currentKillsBlue2 : int = 0;
//-----------END OF SCORE/KILLS/MONEY------------//

//-------------------------------------------------UPGRADES---------------------------------------//

var speedRed : GameObject;
var speedBlue : GameObject;
//DAMAGE

var powerRed : GameObject;
var powerBlue : GameObject;

//HEALTH

var healthRed : GameObject;
var healthBlue : GameObject;

//-------------------------------------------END OF UPGRADES----------------------------------------//

//---------SPAWN BASES---------//
var baseMgr : GameObject;
//------RANDOM SPAWN FOR UNITS ON X AXIS--------//
var xAxisRed : float;
var xAxisBlue : float;
//------CHANGE SPAWN FOR UNITS ON Z AXIS-------//
var unitSpawnPositionZ : float;
var aiUnitSpawnPositionZ : float;
//-----------WIN THE GAME/SCORE SCREEN-------------//
var mmButton : UnityEngine.GUIStyle;
var bgstyle : UnityEngine.GUIStyle;
var bgwin : UnityEngine.Texture;
var bglose : UnityEngine.Texture; 
var bgloading : UnityEngine.Texture; 
var win : boolean = false;
var lose : boolean = false;
var done : boolean = false;
//-------------------END----------------//
var gameguiNetworkview : NetworkView;
//-------------------ARROWS--------------//
var arrowBlueLevel3 : UnityEngine.GameObject;
var arrowRedLevel3 : UnityEngine.GameObject;
var arrow : UnityEngine.GameObject;
var arrow2 : UnityEngine.GameObject;
var downRight : UnityEngine.GameObject;
var downLeft : UnityEngine.GameObject;

var isLevel1 : boolean;
var isLevel2 : boolean;
var isLevel3 : boolean;
var isLevel4 : boolean;
var isLevel5 : boolean;
var isLevel6 : boolean;
var isLevel7 : boolean;
var isLevel8 : boolean;

var spawnMinX : int;
var spawnMaxX : int;
var blueLvl2MothershipSpawn  = Vector3(0,0,39);
var blueLvl3MothershipSpawn = Vector3(19,0,36);
var alien : boolean;
var nukesound : AudioClip;
var mothershipsound : AudioClip;

var nukeSplashTimer : float = 10;
var splashScreenOn : boolean;
var nukeSplashStyle : UnityEngine.GUIStyle;
var splashScreen : String;

var a : GameObject;
var nukeRedPFalien : GameObject;
var nukeBluePFalien : GameObject;

var nukeExplosion : UnityEngine.GameObject;

var raceHuman : boolean;
var basesPlaced : boolean;
//var rUser2;
//var bUser2;
var usernameOpponent : String;
var timer : float = 0;
var loadingTexture : UnityEngine.Texture;
var baseSplash : boolean = true;

//random load screen vars
var loadingScreen1 : UnityEngine.Texture;
var loadingScreen2 : UnityEngine.Texture;
var loadingScreen3 : UnityEngine.Texture;
var loadingScreen4 : UnityEngine.Texture;
var randomLoadScreen : int;

var bgwinquit :UnityEngine.Texture;
var quitter : boolean = false;
///////This timer will check to make sure you are connected ever .25 seconds
var connectionTimer : float;
var lockWinScreen : boolean = false;
//===================================================END OF VARIABLES================================//

function Awake(){

	currentTexture = startTexture;
	baseURL="http://www.tidbituniverse.com/netfolder/tidbit/stararena/data.php";
	
}

//==========================================START OF START FUNCTION===================================//
function Start () {
	baseURL="http://www.tidbituniverse.com/netfolder/tidbit/stararena/data.php";
	//randomLoadScreen = (UnityEngine.Random.Range(1, 5));
	uniqueID = PlayerPrefs.GetString("uniqueID");
	
    usernameMP = PlayerPrefs.GetString("userName");
    displayGUI = true;
    basesPlaced = false;
    loadingPlayers.normal.background = loadingTexture;
    loadingPlayers.active.background = loadingTexture;
    loadingPlayers.hover.background = loadingTexture;
    
    //WILL WORK if timer added
    //networkView.RPC ("SendUsername", RPCMode.OthersBuffered, usernameMP);
    


	

	
	//Sets the level and The spawn points of units
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
	unitSpawnPositionZ = -53.7;
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
	unitSpawnPositionZ = -53.7;
	aiUnitSpawnPositionZ = 35.6;
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
	}else if(GameObject.Find("LevelEight")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = true;
	spawnMinX = 5;
	spawnMaxX = 8.5;
	}
	//------------------SETS THE DEFAULT DIRECTION OF PLAYER 1 AND 2-------------------//
	if(isLevel2 == true || isLevel5 == true){
		if(Network.isClient){
		Network.Instantiate(downRight, downRight.transform.position, downRight.transform.rotation, 0);
		}if(Network.isServer){
		Network.Instantiate(downLeft, downLeft.transform.position, downLeft.transform.rotation, 0);
		}
	}
	//------SETS THE DEFAULT VALUES OF VARIABLES------//
	nukeRed = false;
	nukeBlue = false;
	speedStackerRed = 0;
	speedStackerBlue = 0;
	damageStackerRed = 0;
	damageStackerBlue = 0;
	healthStackerRed = 0;
	healthStackerBlue = 0;	
	currentScoreRed = 0;
	currentKillsRed = 0;
	currentScoreBlue = 0;
	currentKillsBlue = 0;
	currentScoreRed2 = 0;
	currentKillsRed2 = 0;
	currentScoreBlue2 = 0;
	currentKillsBlue2 = 0;
	incomePerSec = 10;
	startingMoney = 500;
	currentMoney = startingMoney;
	timeLast = Time.time;
	timer = Time.time;
	win = false;
	lose = false;
	nukedbyblueStyle.normal.background = nukedbyblueTexture;
	nukedbyblueStyle.active.background = nukedbyblueTexture;
	nukedbyredStyle.normal.background = nukedbyredTexture;
	nukedbyredStyle.active.background = nukedbyredTexture;
	
	//-----------------END--------------//
	
	//-------SETS Z SPAWN FOR UNITS BASED ON LEVEL-------//
	if(isLevel1 || isLevel4){
	unitSpawnPositionZ = -36.5;
	aiUnitSpawnPositionZ = 36.5;
	}
	else if(isLevel2 || isLevel5 ){
	unitSpawnPositionZ = -52;
	aiUnitSpawnPositionZ = 35.5;
		if(Network.isServer){
		Instantiate(arrow, arrow.transform.position, arrow.transform.rotation);
		}else if(Network.isClient){
		Instantiate(arrow2, arrow2.transform.position, arrow2.transform.rotation);
		}
	}else if(isLevel3 || isLevel6){
		if(Network.isServer){
		Instantiate(arrowRedLevel3, arrowRedLevel3.transform.position, arrowRedLevel3.transform.rotation);
		}else if(Network.isClient){
		Instantiate(arrowBlueLevel3, arrowBlueLevel3.transform.position, arrowBlueLevel3.transform.rotation);
		}
	}
	else if(isLevel7){
	unitSpawnPositionZ = -55;
	aiUnitSpawnPositionZ = 32.5;
	}
	//-------------END----------------//
	
	
	//-------------SETS POPOUT BUTTONS POSITION
	pwrclicked = false;	
	pwrposwide = .951;
	upgposwide = .951;

	upgclicked = false;
	upgbutwide = 10;
	pwrbutwide = 10;
	//-------------END--------------//


	gameguiNetworkview = this.GetComponent(NetworkView);
	var viewID = Network.AllocateViewID();
	
	
	//--------PLACES BASES ON THE MAP--------//
	if(!GameObject.Find("Base_Mgr(Clone)")){
		Instantiate(baseMgr, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
	}
	//---------END OF BASE PLACE----------//
	
	if(GameObject.Find("HumanServer") || GameObject.Find("HumanClient")){
	raceHuman = true;
	}
	//------------CHANGES THE UNIT/SPECIALS TO MATCH THE CHOSEN RACE-----------//
	if(GameObject.Find("AlienServer") || GameObject.Find("AlienClient")){
	raceHuman = false;
	pwrbutton1 = mothershipButton;
	pwrbutton1a = mothershipButtonA;
	button1 = button1c;
	button2 = button2c;
	button3 = button3c;
	button4 = button4c;
	button5 = button5c;
	button6 = button6c;
	button1a = button1d;
	button2a = button2d;
	button3a = button3d;
	button4a = button4d;
	button5a = button5d;
	button6a = button6d;
	button1b = button1e;
	button2b = button2e;
	button3b = button3e;
	button4b = button4e;
	button5b = button5e;
	button6b = button6e;
	}
	//--------------------------END----------------------//	
	basesPlaced = false;
}
//====================================END OF START FUNCTION=====================================//


//====================================START OF UPDATE FUNCTION==================================//
function Update (){
	
	baseURL="http://www.tidbituniverse.com/netfolder/tidbit/stararena/data.php";
	if(win == true || lose == true){
		Camera.main.gameObject.GetComponent(AudioListener).enabled = false;
		//audio.Stop();
	}

	connectionTimer = connectionTimer + Time.deltaTime;
	if(connectionTimer>.5){
		CheckConnection();
		connectionTimer=0;
	}

 
 	if(basesPlaced == false){
		if(GameObject.FindGameObjectWithTag("basered") && GameObject.FindGameObjectWithTag("baseblue")){
			basesPlaced = true;
			GetComponent.<NetworkView>().RPC ("SendUsername", RPCMode.OthersBuffered, usernameMP);
		}
	}
	else if(basesPlaced == true){
		baseSplash = false;
	}
 
	nukeSplashTimer = Time.deltaTime + nukeSplashTimer;
	if (nukeSplashTimer <= 1){
	splashScreenOn = true;
	}else{
	splashScreenOn = false;
	}

	//---------------------------------------UPGRADE BUTTONs TEXT AND STYLE----------------------------------//
	
	//------SEPERATES SERVER AND CLIENT---------//
	if (Network.isServer == true){
	speedStackerX = speedStackerRed;
	damageStackerX = damageStackerRed;
	healthStackerX = healthStackerRed;
	}
	else if (Network.isClient == true){
	speedStackerX = speedStackerBlue;
	damageStackerX = damageStackerBlue;
	healthStackerX = healthStackerBlue;
	}
	//-------------END-------------//
	
	
	//------GRAYS OUT SPECIAL WEAPON ONCE IT IS USED------//
	if(Network.isServer && nukeRed == true){
	pwrbutton1.normal.background = pwrbutton1a;
	pwrbutton1.active.background = pwrbutton1a;
	}
	if(Network.isClient && nukeBlue == true){
	pwrbutton1.normal.background = pwrbutton1a;
	pwrbutton1.active.background = pwrbutton1a;
	}
	//------------------END---------------------//
	
	
	
	
	if(currentMoney < 300){
	upgbutton4.normal.background = upgbutton4a;
	upgbutton4.active.background = upgbutton4a;
	}
	else{
	upgbutton4.normal.background = upgbutton4Original;
	upgbutton4.active.background = upgbutton4Original;
	}
	if(Network.isServer){
		//--------SPEED---------//
		if(speedStackerRed == 0 && currentMoney < 100){
		upgbutton2.normal.background = upgbutton2a;
		upgbutton2.active.background = upgbutton2a;
		}
		else if(speedStackerRed == 0 && currentMoney >= 100){
		upgbutton2.normal.background = upgbutton2Original;
		}
		else if(speedStackerRed == 1 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade1;
		upgbutton2.active.background = speedUpgrade1;
		}
		else if(speedStackerRed == 1 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade1a;
		upgbutton2.active.background = speedUpgrade1a;
		}
		else if(speedStackerRed == 2 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade2a;
		upgbutton2.active.background = speedUpgrade2a;
		}
		else if(speedStackerRed == 2 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade2;
		upgbutton2.active.background = speedUpgrade2;
		}
		else if(speedStackerRed == 3 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade3a;
		upgbutton2.active.background = speedUpgrade3a;
		}
		else if(speedStackerRed == 3 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade3;
		upgbutton2.active.background = speedUpgrade3;
		}
		else if(speedStackerRed == 4 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade4a;
		upgbutton2.active.background = speedUpgrade4a;
		}
		else if(speedStackerRed == 4 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade4;
		upgbutton2.active.background = speedUpgrade4;
		}
		else if(speedStackerRed == 5){
		upgbutton2.normal.background = speedUpgrade5;
		upgbutton2.active.background = speedUpgrade5;
		}
		//------------POWER------------//
		if(damageStackerRed == 0 && currentMoney < 100){
		upgbutton1.normal.background = upgbutton1a;
		upgbutton1.active.background = upgbutton1a;
		}
		else if(damageStackerRed == 0 && currentMoney >= 100){
		upgbutton1.normal.background = upgbutton1Original;
		}
		else if(damageStackerRed == 1 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade1;
		upgbutton1.active.background = damageUpgrade1;
		}
		else if(damageStackerRed == 1 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade1a;
		upgbutton1.active.background = damageUpgrade1a;
		}
		else if(damageStackerRed == 2 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade2a;
		upgbutton1.active.background = damageUpgrade2a;
		}
		else if(damageStackerRed == 2 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade2;
		upgbutton1.active.background = damageUpgrade2;
		}
		else if(damageStackerRed == 3 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade3a;
		upgbutton1.active.background = damageUpgrade3a;
		}
		else if(damageStackerRed == 3 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade3;
		upgbutton1.active.background = damageUpgrade3;
		}
		else if(damageStackerRed == 4 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade4a;
		upgbutton1.active.background = damageUpgrade4a;
		}
		else if(damageStackerRed == 4 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade4;
		upgbutton1.active.background = damageUpgrade4;
		}
		else if(damageStackerRed == 5){
		upgbutton1.normal.background = damageUpgrade5;
		upgbutton1.active.background = damageUpgrade5;
		}
		//-----------HEALTH--------------//
		if(healthStackerRed == 0 && currentMoney < 100){
		upgbutton3.normal.background = upgbutton3a;
		upgbutton3.active.background = upgbutton3a;
		}
		else if(healthStackerRed == 0 && currentMoney >= 100){
		upgbutton3.normal.background = upgbutton3Original;
		}
		else if(healthStackerRed == 1 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade1;
		upgbutton3.active.background = healthUpgrade1;
		}
		else if(healthStackerRed == 1 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade1a;
		upgbutton3.active.background = healthUpgrade1a;
		}
		else if(healthStackerRed == 2 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade2a;
		upgbutton3.active.background = healthUpgrade2a;
		}
		else if(healthStackerRed == 2 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade2;
		upgbutton3.active.background = healthUpgrade2;
		}
		else if(healthStackerRed == 3 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade3a;
		upgbutton3.active.background = healthUpgrade3a;
		}
		else if(healthStackerRed == 3 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade3;
		upgbutton3.active.background = healthUpgrade3;
		}
		else if(healthStackerRed == 4 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade4a;
		upgbutton3.active.background = healthUpgrade4a;
		}
		else if(healthStackerRed == 4 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade4;
		upgbutton3.active.background = healthUpgrade4;
		}
		else if(healthStackerRed == 5){
		upgbutton3.normal.background = healthUpgrade5;
		upgbutton3.active.background = healthUpgrade5;
		}
		//-----------END--------------//
		if(turret == true){
		upgbutton4.normal.background = upgbutton4a;
		upgbutton4.active.background = upgbutton4a;
		}
		
		speedStackerX = speedStackerRed;
		damageStackerX = damageStackerRed;
		healthStackerX = healthStackerRed;
	}
	if(Network.isClient){
		if(speedStackerBlue == 0 && currentMoney < 100){
		upgbutton2.normal.background = upgbutton2a;
		upgbutton2.active.background = upgbutton2a;
		}
		else if(speedStackerBlue == 0 && currentMoney >= 100){
		upgbutton2.normal.background = upgbutton2Original;
		}
		else if(speedStackerBlue == 1 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade1;
		upgbutton2.active.background = speedUpgrade1;
		}
		else if(speedStackerBlue == 1 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade1a;
		upgbutton2.active.background = speedUpgrade1a;
		}
		else if(speedStackerBlue == 2 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade2a;
		upgbutton2.active.background = speedUpgrade2a;
		}
		else if(speedStackerBlue == 2 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade2;
		upgbutton2.active.background = speedUpgrade2;
		}
		else if(speedStackerBlue == 3 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade3a;
		upgbutton2.active.background = speedUpgrade3a;
		}
		else if(speedStackerBlue == 3 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade3;
		upgbutton2.active.background = speedUpgrade3;
		}
		else if(speedStackerBlue == 4 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade4a;
		upgbutton2.active.background = speedUpgrade4a;
		}
		else if(speedStackerBlue == 4 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade4;
		upgbutton2.active.background = speedUpgrade4;
		}
		else if(speedStackerBlue == 5){
		upgbutton2.normal.background = speedUpgrade5;
		upgbutton2.active.background = speedUpgrade5;
		}
		//------------POWER------------//
	
		if(damageStackerBlue == 0 && currentMoney < 100){
		upgbutton1.normal.background = upgbutton1a;
		upgbutton1.active.background = upgbutton1a;
		}
		else if(damageStackerBlue == 0 && currentMoney >= 100){
		upgbutton1.normal.background = upgbutton1Original;
		}
		else if(damageStackerBlue == 1 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade1;
		upgbutton1.active.background = damageUpgrade1;
		}
		else if(damageStackerBlue == 1 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade1a;
		upgbutton1.active.background = damageUpgrade1a;
		}
		else if(damageStackerBlue == 2 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade2a;
		upgbutton1.active.background = damageUpgrade2a;
		}
		else if(damageStackerBlue == 2 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade2;
		upgbutton1.active.background = damageUpgrade2;
		}
		else if(damageStackerBlue == 3 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade3a;
		upgbutton1.active.background = damageUpgrade3a;
		}
		else if(damageStackerBlue == 3 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade3;
		upgbutton1.active.background = damageUpgrade3;
		}
		else if(damageStackerBlue == 4 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade4a;
		upgbutton1.active.background = damageUpgrade4a;
		}
		else if(damageStackerBlue == 4 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade4;
		upgbutton1.active.background = damageUpgrade4;
		}
		else if(damageStackerBlue == 5){
		upgbutton1.normal.background = damageUpgrade5;
		upgbutton1.active.background = damageUpgrade5;
		}
		//-----------HEALTH--------------//
		if(healthStackerBlue == 0 && currentMoney < 100){
		upgbutton3.normal.background = upgbutton3a;
		upgbutton3.active.background = upgbutton3a;
		}
		else if(healthStackerBlue == 0 && currentMoney >= 100){
		upgbutton3.normal.background = upgbutton3Original;
		}
		else if(healthStackerBlue == 1 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade1;
		upgbutton3.active.background = healthUpgrade1;
		}
		else if(healthStackerBlue == 1 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade1a;
		upgbutton3.active.background = healthUpgrade1a;
		}
		else if(healthStackerBlue == 2 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade2a;
		upgbutton3.active.background = healthUpgrade2a;
		}
		else if(healthStackerBlue == 2 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade2;
		upgbutton3.active.background = healthUpgrade2;
		}
		else if(healthStackerBlue == 3 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade3a;
		upgbutton3.active.background = healthUpgrade3a;
		}
		else if(healthStackerBlue == 3 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade3;
		upgbutton3.active.background = healthUpgrade3;
		}
		else if(healthStackerBlue == 4 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade4a;
		upgbutton3.active.background = healthUpgrade4a;
		}
		else if(healthStackerBlue == 4 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade4;
		upgbutton3.active.background = healthUpgrade4;
		}
		else if(healthStackerBlue == 5){
		upgbutton3.normal.background = healthUpgrade5;
		upgbutton3.active.background = healthUpgrade5;
		}
	//-----------END--------------//
	
		speedStackerX = speedStackerBlue;
		damageStackerX = damageStackerBlue;
		healthStackerX = healthStackerBlue;
		if(turret == true){
		upgbutton4.normal.background = upgbutton4a;
		upgbutton4.active.background = upgbutton4a;
		}
	}
	
	
	//----------------------------------END OF UPGRADE BUTTONS TEXT AND STYLE------------------------------------//
	
	
	//---------MONEY CAP------//
	if (currentMoney >= 1000){
	currentMoney = 1000;
	}
	//-------END OF MONEY CAP------//

	
	//-----------------------------------GRAYS OUT BUTTONS IF NOT ENOUGH MONEY-----------------------------------//	
	if(currentMoney < 50){
	button1.normal.background = button1a;
	}
	else{
	button1.normal.background = button1b;
	}
	if(currentMoney < 100){
	button2.normal.background = button2a;
	}
	else{
	button2.normal.background = button2b;
	}
	if(currentMoney < 150){
	button3.normal.background = button3a;
	}
	else{
	button3.normal.background = button3b;
	}
	if(currentMoney < 200){
	button4.normal.background = button4a;
	}
	else{
	button4.normal.background = button4b;
	}
	if(currentMoney < 300){
	button5.normal.background = button5a;
	}
	else{
	button5.normal.background = button5b;
	}
	if(currentMoney < 400){
	button6.normal.background = button6a;
	}
	else{
	button6.normal.background = button6b;
	}
	//--------------------------------------------END------------------------------------------------------//
			
	//-----------------------------------------------IF INCOME BREAKS	
	//---------ADDS INCOME EVERY .5 SECONDS------------//
	if(basesPlaced == true){  //If income breaks move GameObject . Find back to here
		if (timeLast + .5 <= Time.time){
		currentMoney = currentMoney + incomePerSec;
		timeLast = Time.time;
		}
	}
		if(incomePerSec > 25){
		incomePerSec = 25;
		}
	

	//----------END OF INCOME---------//
	
	
	if(timer + .5 <= Time.time){
		if(Network.isServer){
		GetComponent.<NetworkView>().RPC("ScoreSync", RPCMode.OthersBuffered, currentScoreRed, currentScoreBlue, currentKillsRed, currentKillsBlue);
		}
	timer = Time.time;
	}
	
}
//===========================================END OF UPDATE FUCNTION==========================================//
//=========================================START OF ONGUI FUNCTION=============================================//
function OnGUI(){

	GUI.depth = 0;
	var wide = Screen.width;
	var tall = Screen.height;
	
	
	//------------------------------Nuke Splash Screen------------------------------//
	if(splashScreenOn==true){
	
		GUI.Label (new Rect (0,0,wide, tall),"", nukeSplashStyle);
		
	}
	GUI.Label (Rect (0, 0, wide, tall), "",bgstyle);
		//GUI.Label (new Rect (0,0,wide, tall),"", loadingPlayers);
	
	
	
	
	
	
	
	//------------------------------WIN THE GAME--------------------------------------//
	if (win == true && done == false){
	
		if(quitter==false && lockWinScreen==false){
			lockWinScreen =true;
		   	bgstyle.normal.background = bgwin;
			bgstyle.active.background = bgwin;
		}else if (quitter==true && lockWinScreen==false){
			bgstyle.normal.background = bgwinquit;
			bgstyle.active.background = bgwinquit;
		}
	
	var tempcamscript2 : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
	tempcamscript2.PanelSwap();
	
		
	//------------------SETS BACKGROUND TO VICTORY SCREEN------------------//
		
	//-----------------LABELS TO DISPLAY STATS-------------------//
		if(done == false){
			if(Network.isServer){
			//bgstyle.normal.background = bgwin;
			//bgstyle.active.background = bgwin;
	//-------YOUR KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) -(tall/7), 100, 100), currentKillsBlue.ToString(), textstyle);
	//--------ENEMY KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) - (tall/16), 100, 100), currentKillsRed.ToString(), textstyle);
	//---------YOUR SCORE----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/70), 100, 100), currentScoreBlue.ToString(), textstyle);
	//----------ENEMY SCORE---------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/11), 100, 100), currentScoreRed.ToString(), textstyle);
			}
			else{
			//bgstyle.normal.background = bgwin;
			//bgstyle.active.background = bgwin;
	//-------YOUR KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) -(tall/7), 100, 100), currentKillsRed2.ToString(), textstyle);
	//--------ENEMY KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) - (tall/16), 100, 100), currentKillsBlue2.ToString(), textstyle);
	//---------YOUR SCORE----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/70), 100, 100), currentScoreRed2.ToString(), textstyle);
	//----------ENEMY SCORE---------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/11), 100, 100), currentScoreBlue2.ToString(), textstyle);
			}
		}
		
	//------------MAIN MENU BUTTON-------------//
		if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/5), wide/2.5, tall/6.5), "", mmButton)){
		AddWin(uniqueID);
		done = true;
			
			if(done == true){
					if(randomLoadScreen == 1){
						bgloading = loadingScreen1;
					}
					else if(randomLoadScreen == 2){
						bgloading = loadingScreen2;
					}
					else if(randomLoadScreen == 3){
						bgloading = loadingScreen3;
					}
					else if(randomLoadScreen == 4){
						bgloading = loadingScreen4;
					}
					else{
						bgloading = loadingScreen4;
					}	
		
			
			bgstyle.normal.background = bgloading;
			bgstyle.active.background = bgloading;
			Destroy(GameObject.Find("SinglePlayer"));
			Destroy(GameObject.Find("HumanSingle"));
			Destroy(GameObject.Find("AlienSingle"));
			Destroy(GameObject.Find("HumanAI"));
			Destroy(GameObject.Find("AlienAI"));
			Destroy(GameObject.Find("MultiPlayer"));
			Destroy(GameObject.Find("HumanServer"));
			Destroy(GameObject.Find("AlienServer"));
			Destroy(GameObject.Find("HumanClient"));
			Destroy(GameObject.Find("AlienClient"));
			Application.LoadLevel("MainMenu");

			
			}	
		}
	}
	
	//--------------------------------END OF WIN-----------------------------------//

	//-------------------------SETS THE BACKGROUND TO DEFEAT SCREEN------------------------------//
	else if (lose == true && done == false){
	lockWinScreen =true;
	bgstyle.normal.background = bglose;
	bgstyle.active.background = bglose;
	var tempcamscript3 : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
	tempcamscript3.PanelSwap();
	
	
	
	//-------------------LABELS TO DISPLAY SCORE-----------------------//
		if(done == false){
			if(Network.isServer){
			//bgstyle.normal.background = bglose;
			//bgstyle.active.background = bglose;
	//-------YOUR KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) -(tall/7), 100, 100), currentKillsBlue.ToString(), textstyle);
	//--------ENEMY KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) - (tall/16), 100, 100), currentKillsRed.ToString(), textstyle);
	//---------YOUR SCORE----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/70), 100, 100), currentScoreBlue.ToString(), textstyle);
	//----------ENEMY SCORE---------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/11), 100, 100), currentScoreRed.ToString(), textstyle);
			}
			else{
			//bgstyle.normal.background = bglose;
			//bgstyle.active.background = bglose;

	//-------YOUR KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) -(tall/7), 100, 100), currentKillsRed2.ToString(), textstyle);
	//--------ENEMY KILLS----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) - (tall/16), 100, 100), currentKillsBlue2.ToString(), textstyle);
	//---------YOUR SCORE----------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/70), 100, 100), currentScoreRed2.ToString(), textstyle);
	//----------ENEMY SCORE---------//
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/11), 100, 100), currentScoreBlue2.ToString(), textstyle);
			}
		}
	//-------------MAIN MENU BUTTON-----------------//
		if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/5), wide/2.5, tall/6.5), "", mmButton)){
		AddLoss(uniqueID);
		done = true;
			if(done == true){
						if(randomLoadScreen == 1){
							bgloading = loadingScreen1;
						}
						else if(randomLoadScreen == 2){
							bgloading = loadingScreen2;
						}
						else if(randomLoadScreen == 3){
							bgloading = loadingScreen3;
						}
						else if(randomLoadScreen == 4){
							bgloading = loadingScreen4;
						}
						else{
							bgloading = loadingScreen4;
						}
			bgstyle.normal.background = bgloading;
			bgstyle.active.background = bgloading;
			Destroy(GameObject.Find("SinglePlayer"));
			Destroy(GameObject.Find("HumanSingle"));
			Destroy(GameObject.Find("AlienSingle"));
			Destroy(GameObject.Find("HumanAI"));
			Destroy(GameObject.Find("AlienAI"));
			Destroy(GameObject.Find("MultiPlayer"));
			Destroy(GameObject.Find("HumanServer"));
			Destroy(GameObject.Find("AlienServer"));
			Destroy(GameObject.Find("HumanClient"));
			Destroy(GameObject.Find("AlienClient"));
			Application.LoadLevel("MainMenu");
			}
		}
	}
	

	
	if (win == false && lose == false && displayGUI == true){
	if(basesPlaced == true){ // Same as income

		if (GUI.Button (new Rect ((wide/30) - (wide/6), tall/3.7, tall/2.5, tall/2.5),"", gearButton)) {
			if(gearMenu == true){
				gearMenu = false;
			}
			else{
				gearMenu = true;
			}
		}
	//--------------------------------------POWER/SPEED/HEALTH UPGRADE BUTTONS----------------------------------------//
	if (GUI.Button (new Rect(wide*upgbutwide, tall/7.7, (.25)*tall, (.06)*tall),"", upgbutton1)){
			if (currentMoney >= 100){
			if(Network.isServer && damageStackerRed < 5){
			Network.Instantiate(powerRed, Vector3(0,0,0), Quaternion(0,0,0,0), 0);
			damageStackerRed = damageStackerRed + 1;
			currentMoney = currentMoney - 100;	
			}
			if(Network.isClient && damageStackerBlue < 5){
			Network.Instantiate(powerBlue, Vector3(0,0,0), Quaternion(0,0,0,0), 0);
			damageStackerBlue = damageStackerBlue + 1;
			currentMoney = currentMoney - 100;	
			}
		}

	}
	if (GUI.Button (new Rect (  wide*upgbutwide, tall/3.9 , (.25)*tall, (.06)*tall),"", upgbutton2  )){
			if(currentMoney > 100){
			if(Network.isServer && speedStackerRed < 5){
			Network.Instantiate(speedRed, Vector3(0,0,0), Quaternion(0,0,0,0), 0);
			speedStackerRed = speedStackerRed + 1;
			currentMoney = currentMoney - 100;
			}
			if(Network.isClient && speedStackerBlue < 5){
			Network.Instantiate(speedBlue, Vector3(0,0,0), Quaternion(0,0,0,0), 0);
			speedStackerBlue = speedStackerBlue + 1;
			currentMoney = currentMoney - 100;
			}
		}
	}
	if (GUI.Button (new Rect (  wide*upgbutwide, tall/2.65 , (.25)*tall, (.06)*tall),"", upgbutton3 )){
		if(currentMoney >= 100){
			if(healthStackerRed < 5 && Network.isServer){
			Network.Instantiate(healthRed, Vector3(0,0,0), Quaternion(0,0,0,0), 0);
			healthStackerRed = healthStackerRed + 1;
			currentMoney = currentMoney - 100;
			}
			if(healthStackerBlue < 5 && Network.isClient){
			Network.Instantiate(healthBlue, Vector3(0,0,0), Quaternion(0,0,0,0), 0);
			healthStackerBlue = healthStackerBlue + 1;
			currentMoney = currentMoney - 100;
			}
		}
	}
	//--------------------------------------END OF POWER/SPEED/HEALTH-------------------------------------------------//
	
	
	//-----------------------------------------------BUTTON FOR BASE TURRETS-------------------------------------------//
	if (GUI.Button (new Rect (  wide*upgbutwide, tall/2 , (.25)*tall, (.06)*tall),"", upgbutton4 )){
		if(currentMoney >= 300){
			if(Network.isServer){
			if(raceHuman == true){
				if(isLevel1 || isLevel4){
					if(!GameObject.FindGameObjectWithTag("rturret")){
					Network.Instantiate(humanTurretRED, humanTurretSpawnRed1.transform.position, humanTurretSpawnRed1.transform.rotation,0);
					Network.Instantiate(humanTurretRED, humanTurretSpawnRed2.transform.position, humanTurretSpawnRed2.transform.rotation,0);
					currentMoney = currentMoney - 300;
					}
				
				}else if(isLevel2 || isLevel5){
					if(!GameObject.FindGameObjectWithTag("rturret")){
					Network.Instantiate(humanTurretRED, Vector3(2.8, 4.4, -53), humanTurretSpawnRed1.transform.rotation,0);
					Network.Instantiate(humanTurretRED, Vector3(-2.8, 4.4, -53), humanTurretSpawnRed2.transform.rotation,0);
					currentMoney = currentMoney - 300;
					}
				
				}else if(isLevel3 || isLevel6 || isLevel7){
					if(!GameObject.FindGameObjectWithTag("rturret")){
					Network.Instantiate(humanTurretRED, Vector3(21.69, 4.4, -53.7), humanTurretSpawnRed1.transform.rotation,0);
					Network.Instantiate(humanTurretRED, Vector3(17.44, 4.4, -53.7), humanTurretSpawnRed2.transform.rotation,0);
					currentMoney = currentMoney - 300;
					}
				}
			}
			}
			else if(Network.isClient){
			 if(raceHuman == true){
				if(isLevel1 || isLevel2 || isLevel4 || isLevel5){
					if(!GameObject.FindGameObjectWithTag("bturret")){
					Network.Instantiate(humanTurretBLUE, humanTurretSpawnBlue1.transform.position, humanTurretSpawnBlue1.transform.rotation,0);
					Network.Instantiate(humanTurretBLUE, humanTurretSpawnBlue2.transform.position, humanTurretSpawnBlue2.transform.rotation,0);
					currentMoney = currentMoney - 300;
					}
				}else if(isLevel3 || isLevel6 || isLevel7){
					if(!GameObject.FindGameObjectWithTag("bturret")){
					Network.Instantiate(humanTurretBLUE, Vector3(21.69,4.4,35.7), humanTurretSpawnBlue1.transform.rotation,0 );
					Network.Instantiate(humanTurretBLUE, Vector3(17.42,4.4,35.7), humanTurretSpawnBlue2.transform.rotation, 0);
					currentMoney = currentMoney - 300;
					}
				}
			}
			}
			if(Network.isServer){
			if(raceHuman == false){
				if(isLevel1 || isLevel4){
					if(!GameObject.FindGameObjectWithTag("rturret")){
					Network.Instantiate(alienTurretRED, alienTurretSpawnRed.transform.position, alienTurretSpawnRed.transform.rotation,0);
					currentMoney = currentMoney - 300;
					}
				}else if(isLevel2 || isLevel5){
					if(!GameObject.FindGameObjectWithTag("rturret")){
					Network.Instantiate(alienTurretRED, Vector3(-0.04, 3.7, -52.7227), alienTurretSpawnRed.transform.rotation,0);
					currentMoney = currentMoney - 300;
					}
				}else if(isLevel3 || isLevel6 || isLevel7){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
					Network.Instantiate(alienTurretRED, Vector3(19.51, 4.5, -53.37), alienTurretSpawnRed.transform.rotation, 0);
					currentMoney = currentMoney - 300;
					turret = true;
					}
				}
			}
			}
			else if(Network.isClient){
			if(raceHuman == false){
				if(isLevel1 || isLevel2 || isLevel4 || isLevel5){
					if(!GameObject.FindGameObjectWithTag("bturret")){
					Network.Instantiate(alienTurretBLUE, alienTurretSpawnBlue.transform.position, alienTurretSpawnBlue.transform.rotation,0);
					currentMoney = currentMoney - 300;
					}
				}else if(isLevel3 || isLevel6 || isLevel7){
					if(!GameObject.FindGameObjectWithTag("bturret")){
					Network.Instantiate(alienTurretBLUE, Vector3(19.51,4.539,35.31), alienTurretSpawnBlue.transform.rotation, 0);
					currentMoney = currentMoney - 300;
					}
				}
			}
			}
		turret = true;
		}
	}
	//---------------------------------------------------END OF TURRETS--------------------------------------------------//


	//---------------------------------NUKE/MOTHERSHIP BUTTON-----------------------------------------------//
	if (GUI.Button (new Rect (  wide*pwrbutwide,(tall/1.5) , (.25)*tall, (.25)*tall),"", pwrbutton1)){
		if(nukeRed == false && Network.isServer){
			splashScreen = "red";
			//Nuke(splashScreen);
			if(raceHuman == true){
				
				Network.Instantiate(nukeRedPF, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				Network.Instantiate(nukeExplosion, Vector3(0,10,0), Quaternion(0,0,0,0), 0);
				Network.Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				nukeRed = true;
				
			}
			
			else if(raceHuman == false){
				if(isLevel1 || isLevel4){
				//nukedbyredStyle.normal.background = mothershipRedStyle;
				//nukedbyredStyle.active.background = mothershipRedStyle;
				Network.Instantiate(nukeRedPFalien, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				Network.Instantiate(mothershipRed, Vector3(0,0,-42), Quaternion(0,0,0,0), 0);
				//Network.Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				nukeRed = true;  
				}else if(isLevel2 || isLevel5){
				Network.Instantiate(nukeRedPFalien, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				Network.Instantiate(mothershipRed, Vector3(xAxisRed,0,-57), Quaternion(0.0,0.0,0.0,0.0), 0);
				//Network.Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				nukeRed=true;
			    }else if(isLevel3 || isLevel6 || isLevel7){
			    Network.Instantiate(nukeRedPFalien, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				Network.Instantiate(mothershipRed, Vector3(16,0,-56.8), Quaternion(0.0,0.0,0.0,0.0), 0);
				//Network.Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				nukeRed=true;
				}
			        
			}
		}
		else if(nukeBlue == false && Network.isClient){
			splashScreen = "blue";
			//Nuke(splashScreen);
			if(raceHuman == true){
			Network.Instantiate(nukeBluePF, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
			Network.Instantiate(nukeExplosion, Vector3(0,10,0), Quaternion(0,0,0,0), 0);
			Network.Instantiate(nukeSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
			nukeBlue = true;
			}
			else if(raceHuman == false){
				if(isLevel1 || isLevel2 || isLevel4 || isLevel5){
				//nukedbyblueStyle.normal.background = mothershipBlueStyle;
				//nukedbyblueStyle.active.background = mothershipBlueStyle;
				Network.Instantiate(nukeBluePFalien, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				Network.Instantiate(mothershipBlue, (blueLvl2MothershipSpawn), Quaternion(0,0,0,0), 0);
				//Network.Instantiate(nukeSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				nukeBlue = true;
				}else if (isLevel3 || isLevel6 || isLevel7){
				Network.Instantiate(nukeBluePFalien, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				Network.Instantiate(mothershipBlue, blueLvl3MothershipSpawn, Quaternion(0.0,0.0,0.0,0.0), 0);
				//Network.Instantiate(nukeSplashBlueManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0), 0);
				nukeBlue=true;
				}
			}
		}
	}
	//-----------------------------END OF NUKE MOTHERSHIP BUTTON------------------------------------------//
	
	  
	//------------------------------------POP OUT MENUS-----------------------------------------------//
	if (GUI.Button (new Rect (  wide*pwrposwide, tall-(tall/2.5) , (.4)*tall, (.4)*tall),"", pwrup )){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if (pwrclicked == false){
		pwrbutwide = .86;
		pwrposwide = .81;
		pwrclicked = true;
			var tempcamscript : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
			tempcamscript.PanelSwap();
		}
		else{
		pwrbutwide = 10;
		pwrposwide = .951;
		pwrclicked = false;
			var tempcamscript4 : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
			tempcamscript4.PanelSwap();
		}
	}
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
	//-------------------------------------------END OF POPOUT BUTTONS-----------------------------------//
	
	
	//--------------------------------------BLUE BAR UNDERNEATH OF UNIT BUTTONS--------------------------//
	GUI.depth = 5;
	GUI.Label (Rect(0,0,wide,tall), "" , overlayStyle);
	//-----------------------------------------------END-------------------------------------------------//
	

	//-----------------------------------PLACES BUTTONS BASED ON RESOLUTION------------------------------//
	//------------MARINE/DRUDGE----------//
	if (GUI.Button (new Rect ( ( ((wide/22)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button1 )){
		if(raceHuman == true){
		ClickMarine();
		
		}
		else{
		ClickDrudge();	
		}
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//------------SNIPER/SQUALLER-----------//
	if (GUI.Button (new Rect ( ( ((wide/7)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button2 )){
		if(raceHuman == true){
		ClickSniper();
		}
		else{
		ClickSqualler();
		}
			
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//----------CANNONEER/GRIEFER-----------//
	if (GUI.Button (new Rect ( ( ((wide/4.15)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button3 )){
		if(raceHuman == true){
		ClickCannoneer();
		}
		else{
		ClickGriefer();
		}	
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//--------------DOZER/WARDER------------//
	if (GUI.Button (new Rect ( ( ((wide/2.95)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button4 )){
		if(raceHuman == true){
		ClickDozer();
		}
		else{
		ClickWarder();
		}
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//------------STRIKER/DISRUPTER------------//
	if (GUI.Button (new Rect ( ( ((wide/2.3)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button5 )){
		if(raceHuman == true){
		ClickStriker();
		}
		else{
		ClickDisrupter();
		}
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//-----------TITAN/ARBITER------------//
	if (GUI.Button (new Rect ( ( ((wide/1.878)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button6 )){
		if(raceHuman == true){
		ClickTitan();
		}
		else{
		ClickArbiter();
		}
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	}
	//---------------------------------------END OF UNIT BUTTONS-----------------------------------------//
	
	
	//------------------------------------LABELS FOR MONEY/SCORE/KILLS-----------------------------------//
	GUI.depth = 0;
	//GUI.Label (Rect (0, 0, wide, tall), "",bgstyle);
	
	GUI.Label (Rect ((wide)-(wide/5), (tall/17), 500, 50), "cash: " + currentMoney.ToString(), textstyle);
	
	//NAMELABELS
	
	if(Network.isServer){
		GUI.Label (Rect ( ( ((wide/80)) ), tall/12 , 50, 50), ""+usernameOpponent, textstyleblue);
		GUI.Label (Rect ( ( ((wide/80)) ), tall/24 , 50, 50), ""+usernameMP, textstylered);
		GUI.Label (Rect ( ( ((wide/8)) ), tall/12 , 50, 50), "Score: " + currentScoreRed.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/3)) ), tall/12 , 50, 50), "Kills: " + currentKillsRed.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/8)) ), tall/24 , 50, 50), "Score: " + currentScoreBlue.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/3)) ), tall/24 , 50, 50), "Kills: " + currentKillsBlue.ToString(), textstyle);

	}
	else if(Network.isClient){
		GUI.Label (Rect ( ( ((wide/80)) ), tall/12 , 50, 50), ""+usernameMP, textstyleblue);
		GUI.Label (Rect ( ( ((wide/80)) ), tall/24 , 50, 50), ""+usernameOpponent, textstylered);
		GUI.Label (Rect ( ( ((wide/8)) ), tall/12 , 50, 50), "Score: " + currentScoreRed2.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/3)) ), tall/12 , 50, 50), "Kills: " + currentKillsRed2.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/8)) ), tall/24 , 50, 50), "Score: " + currentScoreBlue2.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/3)) ), tall/24 , 50, 50), "Kills: " + currentKillsBlue2.ToString(), textstyle);
	}
//		GUI.Label (Rect ( ( ((wide/8)) ), tall/12 , 50, 50), "Score: " + currentScoreRed.ToString(), textstyle);
//		GUI.Label (Rect ( ( ((wide/3)) ), tall/12 , 50, 50), "Kills: " + currentKillsRed.ToString(), textstyle);
//		GUI.Label (Rect ( ( ((wide/8)) ), tall/24 , 50, 50), "Score: " + currentScoreBlue.ToString(), textstyle);
//		GUI.Label (Rect ( ( ((wide/3)) ), tall/24 , 50, 50), "Kills: " + currentKillsBlue.ToString(), textstyle);
	
	
	
	//--------------------------------------------END OF LABELS------------------------------------------//
	}
	}
	if(baseSplash == true){
	
		GUI.Label (new Rect (0,0,wide, tall),"", loadingPlayers);		
	}
	if(gearMenu == true && displayGUI == true ){
	GUI.Label (new Rect( (wide/5.5), (tall/4.5), wide/1.6, tall/2.2), "", styleGearMenu);
			
			if (GUI.Button (new Rect( (wide/2)-(wide/4.78), (tall/2.65), wide/2.5, tall/6.5), "", mmButton)){
				AddLoss(uniqueID);
				displayGUI = false;
				//done=true;//ADDED BY BEN V11
				Destroy(GameObject.Find("Easy(Clone)"));
				Destroy(GameObject.Find("Normal(Clone)"));
				Destroy(GameObject.Find("Hard(Clone)"));
				Destroy(GameObject.Find("SinglePlayer"));
				Destroy(GameObject.Find("HumanSingle"));
				Destroy(GameObject.Find("AlienSingle"));
				Destroy(GameObject.Find("HumanAI"));
				Destroy(GameObject.Find("AlienAI"));
				Destroy(GameObject.Find("MultiPlayer"));
				Destroy(GameObject.Find("HumanServer"));
				Destroy(GameObject.Find("AlienServer"));
				Destroy(GameObject.Find("HumanClient"));
				Destroy(GameObject.Find("AlienClient"));
				
			
						if(randomLoadScreen == 1){
							bgloading = loadingScreen1;
						}
						else if(randomLoadScreen == 2){
							bgloading = loadingScreen2;
						}
						else if(randomLoadScreen == 3){
							bgloading = loadingScreen3;
						}
						else if(randomLoadScreen == 4){
							bgloading = loadingScreen4;
						}
						else{
							bgloading = loadingScreen4;
						}
				bgstyle.normal.background = bgloading;
				bgstyle.active.background = bgloading;
			
				
				
//				if(Network.isServer){
//				networkView.RPC("DisconnectClient", RPCMode.Others, 1);
//				
//				}
			
				GetComponent.<NetworkView>().RPC("OtherGuyQuit", RPCMode.Others, 1);

				Network.Disconnect();
		
				Application.LoadLevel("MainMenu");
				
				
			}
		

	}
//	if(win == true || lose == true){
//		Camera.main.gameObject.GetComponent(AudioListener).enabled = false;
//		//audio.Stop();
//	}
}

function CheckConnection(){

	if(Network.connections.Length<1&&quitter==false){
		OtherGuyQuit(1);
		
	}

}


@RPC
function OtherGuyQuit(x : int){
	if(win!=true&&lose!=true){
		displayGUI = false;
		win = true; 
		done = false;
		quitter = true;
		Camera.main.gameObject.GetComponent(AudioListener).enabled = false;
	}
	//print("QUITTER!!!!!!!!!!!!!!!!!");
	
//	bgstyle.normal.background = bgwinquit;
//	bgstyle.active.background = bgwinquit;
//	var tempcamscript2 : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
//	tempcamscript2.PanelSwap();
	

}



@RPC
function DisconnectClient(x : int){	
	displayGUI = false;
	
	
	Network.Disconnect();
		if(randomLoadScreen == 1){
			bgloading = loadingScreen1;
		}
		else if(randomLoadScreen == 2){
			bgloading = loadingScreen2;
		}
		else if(randomLoadScreen == 3){
			bgloading = loadingScreen3;
		}
		else if(randomLoadScreen == 4){
			bgloading = loadingScreen4;
		}
		else{
			bgloading = loadingScreen4;
		}
	bgstyle.normal.background = bgloading;
	bgstyle.active.background = bgloading;
	Application.LoadLevel("MainMenu");
}
//================================================END OF ONGUI FUNCTION==============================================//


//=========================================START OF UNIT SPAWNING FUNCTIONS==========================================//


//--------------DRUDGE------------//
function ClickDrudge(){
	if(currentMoney >= 50){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(drudgeRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}			
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(drudgeBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 50;
	incomePerSec = incomePerSec + 1;
	}
}
//------------SQUALLER-------------//
function ClickSqualler(){
	if(currentMoney >= 100){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(squallerRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);		
		Network.Instantiate(squallerBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 100;
	incomePerSec = incomePerSec + 2;
	}
}
//--------------GRIEFER---------------//
function ClickGriefer(){
	if(currentMoney >= 150){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(grieferRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}		
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(grieferBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 150;
	incomePerSec = incomePerSec + 3;
	}
}
//---------------WARDER--------------//
function ClickWarder(){
	if(currentMoney >= 200){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
	
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(warderRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}			
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(warderBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 200;
	incomePerSec = incomePerSec + 4;
	}
}
//-----------DISRUPTER---------------//
function ClickDisrupter(){
	if(currentMoney >= 300){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(disrupterRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(disrupterBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 300;
	incomePerSec = incomePerSec + 5;
	}
}
//-----------ARBITER---------------//
function ClickArbiter(){
	if(currentMoney >= 400){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(arbiterRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}			
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(arbiterBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 400;
	incomePerSec = incomePerSec + 6;
	}
}
//---------------MARINE---------------//
function ClickMarine(){	
	if(currentMoney >= 50){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(marineRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}			
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(marineBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 50;
	incomePerSec = incomePerSec + 1;
	}
}
//----------------SNIPER--------------//
function ClickSniper(){
	if(currentMoney >= 100){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();			
		if( Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(sniperRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(sniperBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 100;
	incomePerSec = incomePerSec + 2;
	}	
}
//--------CANNONEER----------//
function ClickCannoneer(){
	if(currentMoney >= 150){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if( Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(cannoneerRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(cannoneerBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 150;
	incomePerSec = incomePerSec + 3;
	}	
}
//-----------DOZER-----------//
function ClickDozer(){
	if(currentMoney >= 200){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if( Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(dozerRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(dozerBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 200;
	incomePerSec = incomePerSec + 4;
	}	
}
//------------STRIKER-----------//
function ClickStriker(){
	if(currentMoney >= 300){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if(Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(strikerRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(strikerBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 300;
	incomePerSec = incomePerSec + 5;
	}	
}
//-----------TITAN------------//
function ClickTitan(){
	if(currentMoney >= 400){
	GetComponent.<AudioSource>().clip = buttonsound;
	GetComponent.<AudioSource>().Play();
		if( Network.isServer){
		xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(titanRED, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
		}
		else{
		xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
		Network.Instantiate(titanBLUE, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
		}
	currentMoney = currentMoney - 400;
	incomePerSec = incomePerSec + 6;
	}	
}
//======================================END OF UNIT SPAWNING FUNCTIONS=================================//	

					
//===================================FUNCTIONS FOR SCORE/KILLS/MONEY BONUS===========================//	

//---------ADDS SCORE AND KILLS FOR SERVER----------//																									
static function ScoreRed(scoreAdd : int){
	
	
	
	currentScoreRed = currentScoreRed + scoreAdd;
	currentKillsRed = currentKillsRed + 1;	
	
	
	
}
//---------------END---------------//			


//-----------ADDS MONEY PER KILL FOR SERVER----------//
static function RedBonus( moneyAdd : int){
	
		currentMoney = currentMoney + moneyAdd;
	
}
//------------------END--------------//
	

//-----------ADDS MONEY PER KILL FOR CLIENT------------//
static function BlueBonus( moneyAdd : int){
		
		currentMoney = currentMoney + moneyAdd;
	
}
//--------------END--------------//


//----------------ADDS SCORE AND KILLS FOR CLIENT------------//
static function ScoreBlue(scoreAdd : int){
	
	
	
	currentScoreBlue = currentScoreBlue + scoreAdd;
	currentKillsBlue = currentKillsBlue + 1;
	
		
	

}
@RPC
function ScoreSync(rs : int, bs : int, rk : int, bk : int){
	currentScoreRed2 = rs;
	currentScoreBlue2 = bs;
	currentKillsRed2 = rk;
	currentKillsBlue2 = bk;

}


//-------------------END-----------------//	


function AddWin(uniqueID : String){
	var tempurl:String;
	tempurl = baseURL+"?uid="+uniqueID+"&updateskill=win";
	tempurl = System.Uri.EscapeUriString(tempurl);
	var hs_get = WWW(tempurl);
	yield hs_get;
}
function AddLoss(uniqueID : String){
	var tempurl:String;
	tempurl = baseURL+"?uid="+uniqueID+"&updateskill=loss";
	tempurl = System.Uri.EscapeUriString(tempurl);
	var hs_get = WWW(tempurl);
	yield hs_get;
}
//function UsernameMP(username : String){
//	if(Network.isClient){
//	var hs_get = WWW(baseURL+"?getusername="+username);
//	yield hs_get;
//	}
//}

function Win(){
	
	
	if(Network.isServer){
	win = true;
	}
	else if(Network.isClient){
	lose = true;
	}
	else{
	win = true;
	}

}


function Lose(){
	
	
	if(Network.isServer){
	lose = true;
	}
	else if(Network.isClient){
	win = true;
	}
	else{
	lose = true;
	}
}


@RPC
function SendUsername (username : String){
		 usernameOpponent=username;	
}




function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo){

	
}
//																																																																																																																																																																																																																																																																											