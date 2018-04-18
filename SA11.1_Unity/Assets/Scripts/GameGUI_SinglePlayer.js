#pragma strict

var starmapButton : UnityEngine.GUIStyle;
var styleGearMenu : UnityEngine.GUIStyle;
var gearMenu : boolean;
var gearButton : UnityEngine.GUIStyle;
static var bottom : boolean = false;
var lastCounter : float;
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
var pwrup : UnityEngine.GUIStyle;
var pwrposwide: float;
var upgposwide: float;
var upgbutwide : float;
var pwrbutwide : float;
var blankbutton : UnityEngine.GUIStyle;
var pwrbutton1 : UnityEngine.GUIStyle;
var pwrbutton1a : UnityEngine.Texture;
var mothershipButton : UnityEngine.GUIStyle;
var mothershipButtonA : UnityEngine.Texture;
var mmButton : UnityEngine.GUIStyle;
var bgstyle : UnityEngine.GUIStyle;
var bgwin : UnityEngine.Texture;
var bglose : UnityEngine.Texture; 
var bgloading : UnityEngine.Texture; 
var upgbutton4price : UnityEngine.Texture;
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
var upg : UnityEngine.GUIStyle;
var upgused : Texture;
var pwrclicked : boolean;
var upgclicked : boolean;
var overlayStyle : GUIStyle;
var buttonsound : AudioClip;
var errorsound : AudioClip;
var marineRED : UnityEngine.GameObject;
var sniperRED : UnityEngine.GameObject;
var cannoneerRED : UnityEngine.GameObject;
var dozerRED : UnityEngine.GameObject;
var strikerRED : UnityEngine.GameObject;
var titanRED : UnityEngine.GameObject;
var drudgeRED : UnityEngine.GameObject;
var squallerRED : UnityEngine.GameObject;
var grieferRED : UnityEngine.GameObject;
var warderRED : UnityEngine.GameObject;
var disrupterRED : UnityEngine.GameObject;
var arbiterRED : UnityEngine.GameObject;
var humanTurretRED : UnityEngine.GameObject;
var humanTurretBLUE : UnityEngine.GameObject;
var alienTurretRED : UnityEngine.GameObject;
var alienTurretBLUE : UnityEngine.GameObject;
var blankmap : Texture;
var nukeSplashRedManager : GameObject;
var nukeSplashBlueManager : GameObject;
static var nukesound : AudioClip;
var nukesoundtimer : float;
var nextNameNumber : float = 1;
var wide = Screen.width;
var tall = Screen.height;
var startingMoneyAI : int = 1000;
var incomePerSecAI : int;
var maxIncomeAI : int = 1000;
var timeLastAI : float;
var startingMoney : int = 500;
var incomePerSec : int = 4;
var maxIncome : int = 1000;
static var currentMoney : int;
var timeLast : float;
var textstyle : GUIStyle;
var textstylered : GUIStyle;
var textstyleblue : GUIStyle;
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
static var currentScoreRed : int = 0;
static var currentKillsRed : int = 0;
static var currentScoreBlue : int = 0;
static var currentKillsBlue : int = 0;
var spawnDelay : float = 0;
var spawnDelaySniper : float = 0;
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
var healthStackerStars : String;
var gameguiNetworkview : NetworkView;
var baseMgr : GameObject;
var aiAlien : boolean;
var campaign : boolean;
var aiCounter : String;
var timerAISpawn : float;
var timerAINuke : float;
var counterAI : String;
var xAxis : float;
var xAxisAI : float;
var spawnAITimer : float;
var nukeRedPF : GameObject;
var nukeBluePF : GameObject;
var nukeRed : boolean = false;
var nukeBlue : boolean = false;
var motherShipRed : GameObject;
var motherShipBlue : GameObject;
var turret : boolean = false;
var upgradeTimer : float;
var turretTimer : float;
var moneyBonusTimer : float;
var directionTimer : float = 0;
var aiDirection2 : float = 2;
var powerRed : GameObject;
var powerBlue : GameObject;
var speedRed : GameObject;
var speedBlue : GameObject;
var healthRed: GameObject;
var healthBlue : GameObject;
var win : boolean = false;
var lose : boolean = false;
var done : boolean = false;
var wins : float;
var losses : float;
var upRightLevel3 : UnityEngine.GameObject;
var upRight : UnityEngine.GameObject;
var downRight : UnityEngine.GameObject;
var mCounter : int;
var upgradeDestroyRed : GameObject[];
var upgradeDestroyBlue : GameObject[];
var unitSpawnPositionZ : float;
var aiUnitSpawnPositionZ : float;
var easy : boolean;
var normal : boolean;
var hard : boolean;
var arrowLevel3 : UnityEngine.GameObject;
var arrow : UnityEngine.GameObject;
var downRight2 : UnityEngine.GameObject;
var downLeft2 : UnityEngine.GameObject;
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
var spawnMinXlvl8X : int;
var spawnMaxXlvl8X : int;
var c_CurrentMoney : boolean;
var c_Income : boolean;
var c_AdditionalDefense : boolean;
var additionalTop : UnityEngine.GameObject;
var additionalBottom : UnityEngine.GameObject;
var blueLvl3MothershipSpawn = Vector3(19,0,36);
var blueLvl8MothershipSpawnBottom = Vector3(14,0,28);
var blueLvl8MothershipSpawnTop = Vector3(-16,0,28);
var lvl8RedTurretUp : UnityEngine.GameObject;
var lvl8RedTurretDown : UnityEngine.GameObject;
var lvl8AddTop : UnityEngine.GameObject;
var lvl8AddBottom : UnityEngine.GameObject;
var lvl8MothershipCounter : int;
var lvl8MothershipTop : UnityEngine.GameObject;
var lvl8MothershipBottom : UnityEngine.GameObject;
var mothershipsUsed : boolean = false;
var redUnitsTopb : float;
var redUnitsBottomb : float;
var randomNuke : int;
var randomCounter : int;
var randomSendTimer : float = 0;
var randomSend : int;
static var lowBaseLife : boolean = false;
var currentMoneyAITest : int;
var getMoney : int = 0;
var unitSeperation;	
var userName : String;
var userNameAI : String;
var mothershipCount : int = 0;
var mothershipUp : UnityEngine.GameObject;
var mothershipDown : UnityEngine.GameObject;
var nukeExplosion : UnityEngine.GameObject;
var path2 : boolean;
var path3 : boolean;
var randomMoneyBonus : float = 0;
var randomSendBonus : float = 0;
var randomUnitSend : int = 0;
var randomUnitSeperation : int = 0;
var raceHuman : boolean;
var isTutorial : boolean;
var displayGUI : boolean;
var aiSetterHuman : UnityEngine.GameObject;
var aiSetterAlien : UnityEngine.GameObject;
var loadingScreen1 : UnityEngine.Texture;
var loadingScreen2 : UnityEngine.Texture;
var loadingScreen3 : UnityEngine.Texture;
var loadingScreen4 : UnityEngine.Texture;
var randomLoadScreen : int;
var upgradeCounter : int;
var isPaused : boolean = false;
function Awake(){
	currentTexture = startTexture;
	unitSeperation = Random.Range(1, 1.5);	
}
function Start () {
	upgradeCounter = 0;
	randomLoadScreen = (UnityEngine.Random.Range(1, 5));
	displayGUI = true;
	if(PlayerPrefs.GetFloat("path2") == 1){
		path2 = true;
	}else if(PlayerPrefs.GetFloat("path2") == 0 ){
		path2 = false;
	}if(PlayerPrefs.GetFloat("path3") == 1){
		path3 = true;
	}else if(PlayerPrefs.GetFloat("path3") == 0 ){
		path3 = false;
	}
	userName = PlayerPrefs.GetString("userNameSingle");
	bottom = false;
	mothershipCount = 0;
	getMoney = 0;
	lowBaseLife = false;
	mothershipsUsed = false;
	lvl8MothershipCounter = 0;
	aiDirection2 = 1;
	if(GameObject.Find("Campaign")){
		campaign = true;
	}	else{
		campaign = false;
	}
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
		spawnMinX = -5;
		spawnMaxX = 8.5;
		spawnMinXlvl8X = -19;
		spawnMaxXlvl8X = -11;
		aiUnitSpawnPositionZ = 29;
	}if(isLevel2 == true || isLevel5 == true){
		Instantiate(downRight2, downRight2.transform.position, downRight2.transform.rotation);
		Instantiate(downLeft2, downLeft2.transform.position, downLeft2.transform.rotation);
	}else if(isLevel3 == true || isLevel6 == true){
		Instantiate(arrowLevel3, arrowLevel3.transform.position, arrowLevel3.transform.rotation);
	}
	upgradeTimer = 0;
	wins = PlayerPrefs.GetFloat("Wins", wins);
	losses = PlayerPrefs.GetFloat("Losses", losses);	
	if(isLevel1 || isLevel4){
		unitSpawnPositionZ = -36.5;
		aiUnitSpawnPositionZ = 36.5;
	}else if(isLevel2 || isLevel5){
		unitSpawnPositionZ = -52;
		aiUnitSpawnPositionZ = 35.5;
		Instantiate(arrow, arrow.transform.position, arrow.transform.rotation);
	}else if(isLevel3 || isLevel6 ||isLevel7){
		unitSpawnPositionZ = -55;
		aiUnitSpawnPositionZ = 32.5;
	}else if(isLevel8){
		unitSpawnPositionZ = -44;
	}	
	upgradeDestroyRed = GameObject.FindGameObjectsWithTag ("upgradered");
	upgradeDestroyBlue = GameObject.FindGameObjectsWithTag("upgradeblue");
	for(var destroyred : GameObject in upgradeDestroyRed){
		Destroy(destroyred);
	}
	for(var destroyblue : GameObject in upgradeDestroyBlue){
		Destroy(destroyblue);
	}
	currentScoreRed = 0;
	currentScoreBlue = 0;
	currentKillsRed = 0;
	currentKillsBlue = 0;
	if(GameObject.Find("HumanSingle") || GameObject.Find("HumanSingle(Clone)")){
		raceHuman = true;
	}else{
		raceHuman = false;
	}if(GameObject.Find("AlienAI") || GameObject.Find("AlienAI(Clone)")){
		aiAlien = true;
		Instantiate(aiSetterAlien, aiSetterAlien.transform.position, aiSetterAlien.transform.rotation);
	}if(GameObject.Find("HumanAI") || GameObject.Find("HumanAI(Clone)")){
		aiAlien = false;
		Instantiate(aiSetterHuman, aiSetterHuman.transform.position, aiSetterHuman.transform.rotation);
	}if(GameObject.Find("AlienSingle") || GameObject.Find("AlienSingle(Clone)")){
		pwrbutton1 = mothershipButton;
		pwrbutton1 = mothershipButton;
		pwrbutton1a = mothershipButtonA;
		button1 = button1d;
		button2 = button2d;
		button3 = button3d;
		button4 = button4d;
		button5 = button5d;
		button6 = button6d;
		button1a = button1f;
		button2a = button2f;
		button3a = button3f;
		button4a = button4f;
		button5a = button5f;
		button6a = button6f;
		button1b = button1e;
		button2b = button2e;
		button3b = button3e;
		button4b = button4e;
		button5b = button5e;
		button6b = button6e;
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
	timeLast = Time.time;
	timerAISpawn = Time.time;	
	pwrclicked = false;	
	pwrposwide = .951;
	upgposwide = .951;	
	upgclicked = false;
	upgbutwide = 10;
	pwrbutwide = 10;
	if(!GameObject.Find("Base_Mgr(Clone)")){
		Instantiate(baseMgr, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
	}
	if(campaign == true){
		if(PlayerPrefs.GetInt("maxIncome") > 0){
			c_CurrentMoney = true;
		}else{
			c_CurrentMoney = false;
		}if(PlayerPrefs.GetInt("income") > 0){
			c_Income = true;
		}else{
			c_Income = false;
		}if(PlayerPrefs.GetInt("additionalDefense") > 0){
			c_AdditionalDefense = true;
		}else{
			c_AdditionalDefense = false;
		}
	}if(campaign == true && c_AdditionalDefense == true){
		if(isLevel1 || isLevel4){
			Instantiate(additionalTop, additionalTop.transform.position, lvl8AddTop.transform.rotation );
			Instantiate(additionalBottom, additionalBottom.transform.position, lvl8AddBottom.transform.rotation);
		}else if(isLevel2 || isLevel5){
			Instantiate(additionalTop, Vector3(5.125,2.453,-52.39), lvl8AddTop.transform.rotation );
			Instantiate(additionalBottom, Vector3(-5.104,2.453,-52.39), lvl8AddBottom.transform.rotation);
		}else if(isLevel3 || isLevel6 || isLevel7){
			Instantiate(additionalTop, Vector3(24.85,2.453,-53.49), lvl8AddTop.transform.rotation );
			Instantiate(additionalBottom, Vector3(14.62,2.453,-53.49), lvl8AddBottom.transform.rotation);
		}else if(isLevel8){
			Instantiate(lvl8AddTop, lvl8AddTop.transform.position, lvl8AddTop.transform.rotation );
			Instantiate(lvl8AddBottom, lvl8AddBottom.transform.position, lvl8AddBottom.transform.rotation);
		}
	}	
	if(campaign == false){
		incomePerSec = 10;
	}else if(campaign == true && c_Income == false){
		incomePerSec = 10;
	}else if(campaign == true && c_Income == true){
		incomePerSec = 15;
	}	
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
	}if(campaign == true){
		if((PlayerPrefs.GetInt("levelsBeaten") == 0 || PlayerPrefs.GetInt("levelsBeaten") == 1) && isLevel8 == false){
			easy = true;
			normal = false;
			hard = false;
		}else if((PlayerPrefs.GetInt("levelsBeaten") == 2 || PlayerPrefs.GetInt("levelsBeaten") == 3 || PlayerPrefs.GetInt("levelsBeaten") == 4 || PlayerPrefs.GetInt("levelsBeaten") == 5) && isLevel8 == false){
			normal = true;
			easy = false;
			hard = false;
		}else if((PlayerPrefs.GetInt("levelsBeaten") == 6 || PlayerPrefs.GetInt("levelsBeaten") == 7 || PlayerPrefs.GetInt("levelsBeaten") == 8) || isLevel8 == true){
			hard = true;
			normal = false;
			easy = false;
		}
	}
	if(easy == true){
		userNameAI = "Easy AI";
	}
	else if(normal == true){
		userNameAI = "Medium AI";
	}
	else{
		userNameAI = "Hard AI";
	}
	
}
function Update (){

	if(win == true || lose == true){
		Camera.main.gameObject.GetComponent(AudioListener).enabled = false;
		//audio.Stop();
	}

	if(currentMoney < 400){	
	button6.normal.background = button6a;
	}		
	Income();	
	if(campaign == true && path2 == true){
		randomMoneyBonus = Time.deltaTime + randomMoneyBonus;
		if(randomMoneyBonus > 5){
			currentMoney = currentMoney + Random.Range(50,151);
			randomMoneyBonus = 0;
		}
	}if(campaign == true && path3 == true){
		randomSendBonus = Time.deltaTime + randomSendBonus;
		if(randomSendBonus > 7){
			RandomSend();
		}
	}if(nukeRed == true){
		pwrbutton1.normal.background = pwrbutton1a;
		pwrbutton1.active.background = pwrbutton1a;
	}if(currentMoney < 300){
		upgbutton4.normal.background = upgbutton4a;
		upgbutton4.active.background = upgbutton4a;
	}else{
		upgbutton4.normal.background = upgbutton4Original;
		upgbutton4.active.background = upgbutton4Original;
	}
	//--------SPEED---------//
	if(speedStackerRed == 0 && currentMoney < 100){
		upgbutton2.normal.background = upgbutton2a;
		upgbutton2.active.background = upgbutton2a;
	}else if(speedStackerRed == 0 && currentMoney >= 100){
		upgbutton2.normal.background = upgbutton2Original;
	}else if(speedStackerRed == 1 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade1;
		upgbutton2.active.background = speedUpgrade1;
	}else if(speedStackerRed == 1 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade1a;
		upgbutton2.active.background = speedUpgrade1a;
	}else if(speedStackerRed == 2 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade2a;
		upgbutton2.active.background = speedUpgrade2a;
	}else if(speedStackerRed == 2 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade2;
		upgbutton2.active.background = speedUpgrade2;
	}else if(speedStackerRed == 3 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade3a;
		upgbutton2.active.background = speedUpgrade3a;
	}else if(speedStackerRed == 3 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade3;
		upgbutton2.active.background = speedUpgrade3;
	}else if(speedStackerRed == 4 && currentMoney < 100){
		upgbutton2.normal.background = speedUpgrade4a;
		upgbutton2.active.background = speedUpgrade4a;
	}else if(speedStackerRed == 4 && currentMoney >= 100){
		upgbutton2.normal.background = speedUpgrade4;
		upgbutton2.active.background = speedUpgrade4;
	}else if(speedStackerRed == 5){
		upgbutton2.normal.background = speedUpgrade5;
		upgbutton2.active.background = speedUpgrade5;
	}
	//------------POWER------------//
	if(damageStackerRed == 0 && currentMoney < 100){
		upgbutton1.normal.background = upgbutton1a;
		upgbutton1.active.background = upgbutton1a;
	}else if(damageStackerRed == 0 && currentMoney >= 100){
		upgbutton1.normal.background = upgbutton1Original;
	}else if(damageStackerRed == 1 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade1;
		upgbutton1.active.background = damageUpgrade1;
	}else if(damageStackerRed == 1 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade1a;
		upgbutton1.active.background = damageUpgrade1a;
	}else if(damageStackerRed == 2 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade2a;
		upgbutton1.active.background = damageUpgrade2a;
	}else if(damageStackerRed == 2 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade2;
		upgbutton1.active.background = damageUpgrade2;
	}else if(damageStackerRed == 3 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade3a;
		upgbutton1.active.background = damageUpgrade3a;
	}else if(damageStackerRed == 3 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade3;
		upgbutton1.active.background = damageUpgrade3;
	}else if(damageStackerRed == 4 && currentMoney < 100){
		upgbutton1.normal.background = damageUpgrade4a;
		upgbutton1.active.background = damageUpgrade4a;
	}else if(damageStackerRed == 4 && currentMoney >= 100){
		upgbutton1.normal.background = damageUpgrade4;
		upgbutton1.active.background = damageUpgrade4;
	}else if(damageStackerRed == 5){
		upgbutton1.normal.background = damageUpgrade5;
		upgbutton1.active.background = damageUpgrade5;
	}
	//-----------HEALTH--------------//
	if(healthStackerRed == 0 && currentMoney < 100){
		upgbutton3.normal.background = upgbutton3a;
		upgbutton3.active.background = upgbutton3a;
	}else if(healthStackerRed == 0 && currentMoney >= 100){
		upgbutton3.normal.background = upgbutton3Original;
	}else if(healthStackerRed == 1 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade1;
		upgbutton3.active.background = healthUpgrade1;
	}else if(healthStackerRed == 1 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade1a;
		upgbutton3.active.background = healthUpgrade1a;
	}else if(healthStackerRed == 2 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade2a;
		upgbutton3.active.background = healthUpgrade2a;
	}else if(healthStackerRed == 2 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade2;
		upgbutton3.active.background = healthUpgrade2;
	}else if(healthStackerRed == 3 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade3a;
		upgbutton3.active.background = healthUpgrade3a;
	}else if(healthStackerRed == 3 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade3;
		upgbutton3.active.background = healthUpgrade3;
	}else if(healthStackerRed == 4 && currentMoney < 100){
		upgbutton3.normal.background = healthUpgrade4a;
		upgbutton3.active.background = healthUpgrade4a;
	}else if(healthStackerRed == 4 && currentMoney >= 100){
		upgbutton3.normal.background = healthUpgrade4;
		upgbutton3.active.background = healthUpgrade4;
	}else if(healthStackerRed == 5){
		upgbutton3.normal.background = healthUpgrade5;
		upgbutton3.active.background = healthUpgrade5;
	}if(turret == true){
		upgbutton4.normal.background = upgbutton4a;
		upgbutton4.active.background = upgbutton4a;
	}	
	speedStackerX = speedStackerRed;
	damageStackerX = damageStackerRed;
	healthStackerX = healthStackerRed;
	if(currentMoney < 50){
		button1.normal.background = button1a;
	}else{
		button1.normal.background = button1b;
	}
	if(currentMoney < 100){
		button2.normal.background = button2a;
	}else{
		button2.normal.background = button2b;
	}if(currentMoney < 150){
		button3.normal.background = button3a;
	}else{
		button3.normal.background = button3b;
	}if(currentMoney < 200){
		button4.normal.background = button4a;
	}else{
		button4.normal.background = button4b;
	}if(currentMoney < 300){
		button5.normal.background = button5a;
	}else{
		button5.normal.background = button5b;
	}if(currentMoney < 400){
		button6.normal.background = button6a;
	}else{
		button6.normal.background = button6b;
	}
	directionTimer = Time.deltaTime + directionTimer;
	if(directionTimer >= 2){
		Direction();
		directionTimer = 0;
	}
	//Increments of time it takes for a certain difficulty level to upgrade
	upgradeTimer = upgradeTimer + Time.deltaTime;
	if(hard == true){
		if(upgradeTimer >= 15 && upgradeCounter == 0){
			AIUpgrades(1);
			upgradeCounter++;
		}else if(upgradeTimer >= 35 && upgradeCounter == 1){
			AIUpgrades(2);
			AITurret();
			upgradeCounter++;
		}else if(upgradeTimer >= 65 && upgradeCounter == 2){
			AIUpgrades(3);
			upgradeCounter++;
		}else if(upgradeTimer >= 85 && upgradeCounter == 3){
			AIUpgrades(4);
			upgradeCounter++;
		}else if(upgradeTimer >= 105 && upgradeCounter == 4){
			AIUpgrades(5);
		}
	}else if(normal == true){
		if(upgradeTimer >= 25 && upgradeCounter == 0){
			AIUpgrades(1);
			upgradeCounter++;
		}else if(upgradeTimer >= 45 && upgradeCounter == 1){
			AIUpgrades(2);
			AITurret();
			upgradeCounter++;
		}else if(upgradeTimer >= 75 && upgradeCounter == 2){
			AIUpgrades(3);
			upgradeCounter++;
		}else if(upgradeTimer >= 95 && upgradeCounter == 3){
			AIUpgrades(4);
			upgradeCounter++;
		}else if(upgradeTimer >= 115 && upgradeCounter == 4){
			AIUpgrades(5);
			upgradeCounter++;
		}
	}else if(easy == true){
		if(upgradeTimer >= 45 && upgradeCounter == 0){
			AIUpgrades(1);
			upgradeCounter++;
		}else if(upgradeTimer >= 65 && upgradeCounter == 1){
			AIUpgrades(2);
			AITurret();
			upgradeCounter++;
		}else if(upgradeTimer >= 85 && upgradeCounter == 2){
			AIUpgrades(3);
			upgradeCounter++;
		}else if(upgradeTimer >= 105 && upgradeCounter == 3){
			AIUpgrades(4);
			upgradeCounter++;
		}else if(upgradeTimer >= 135 && upgradeCounter == 4){
			AIUpgrades(5);
			upgradeCounter++;
		}
	}
}
function Income(){
	if (timeLast + .5 <= Time.time){
		currentMoney = currentMoney + incomePerSec;
		timeLast = Time.time;
	}if(hard == true){
		if(incomePerSec >= 35){
		incomePerSec = 35;
		}
	}else if(normal == true){
		if(incomePerSec >= 35){
		incomePerSec = 35;
		}
	}else if(easy == true){
		if(incomePerSec >= 35){
		incomePerSec = 35;
		}		
	}if(campaign == false){
		if (currentMoney >= 1000){
			currentMoney = 1000;	
		}
	}else if(campaign == true && c_CurrentMoney == false){
		if(currentMoney >= 1000){
			currentMoney = 1000;
		}
	}else if(campaign == true && c_CurrentMoney == true){
		if(currentMoney >= 1500){
			currentMoney = 1500;
		}
	}
}
function OnGUI(){
	GUI.depth = 0;
	var wide = Screen.width;
	var tall = Screen.height;	
	GUI.Label (Rect (0, 0, wide, tall), "",bgstyle);
	//END GAME SCREEN
	if (win == true && done == false){	
		bgstyle.normal.background = bgwin;
		bgstyle.active.background = bgwin;
		var tempcamscript2 : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
		tempcamscript2.PanelSwap();
		Destroy(GameObject.Find("SinglePlayer"));
		Destroy(GameObject.Find("Easy(Clone)"));
		Destroy(GameObject.Find("Normal(Clone)"));
		Destroy(GameObject.Find("Hard(Clone)"));
		if(done == false){
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) -(tall/7), 100, 100), currentKillsBlue.ToString(), textstyle);			
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) - (tall/16), 100, 100), currentKillsRed.ToString(), textstyle);			
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/70), 100, 100), currentScoreBlue.ToString(), textstyle);			
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/11), 100, 100), currentScoreRed.ToString(), textstyle);
		}if(campaign == true){
			if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/5), wide/2.5, tall/6.5), "", starmapButton)){			
				if(isLevel1 == true){
					if(PlayerPrefs.GetInt("level6") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
						PlayerPrefs.SetInt("level6", 1);
					}				
				}else if(isLevel2 == true){
					if(PlayerPrefs.GetInt("level7") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
						PlayerPrefs.SetInt("level7", 1);
					}				
				}else if(isLevel3 == true){
					if(PlayerPrefs.GetInt("level8") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
					}
					PlayerPrefs.SetInt("level8", 1);
				}else if(isLevel4 == true){
					if(PlayerPrefs.GetInt("level1") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
					}
					PlayerPrefs.SetInt("level1", 1);
				}else if(isLevel5 == true){
					if(PlayerPrefs.GetInt("level2") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
					}
					PlayerPrefs.SetInt("level2", 1);
				}else if(isLevel6 == true){
					if(PlayerPrefs.GetInt("level3") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
					}
					PlayerPrefs.SetInt("level3", 1);
				}else if(isLevel7 == true){
					if(PlayerPrefs.GetInt("level4") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
					}
					PlayerPrefs.SetInt("level4", 1);
				}else if(isLevel8 == true){
					if(PlayerPrefs.GetInt("level5") == 0){
						PlayerPrefs.SetInt("levelsBeaten", PlayerPrefs.GetInt("levelsBeaten") + 1);
					}
					PlayerPrefs.SetInt("level5", 1);
				}
				done = true;
			}if(done == true){						
				if(randomLoadScreen == 1){
					bgloading = loadingScreen1;
				}else if(randomLoadScreen == 2){
					bgloading = loadingScreen2;
				}else if(randomLoadScreen == 3){
					bgloading = loadingScreen3;
				}else if(randomLoadScreen == 4){
					bgloading = loadingScreen4;
				}else{
					bgloading = loadingScreen4;
				}	
				bgstyle.normal.background = bgloading;
				bgstyle.active.background = bgloading;
				if(isLevel8 == false){
					Application.LoadLevel("SinglePlayer_Campaign");
				}else if(isLevel8 == true){
					Application.LoadLevel("EndGameScrollingText");
				}				
			}			
		}else if(campaign == false){
			if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/5), wide/2.5, tall/6.5), "", mmButton)){
				done = true;
			}
			if(done == true){						
				if(randomLoadScreen == 1){
					bgloading = loadingScreen1;
				}else if(randomLoadScreen == 2){
					bgloading = loadingScreen2;
				}else if(randomLoadScreen == 3){
					bgloading = loadingScreen3;
				}else if(randomLoadScreen == 4){
					bgloading = loadingScreen4;
				}else{
					bgloading = loadingScreen4;
				}	
				bgstyle.normal.background = bgloading;
				bgstyle.active.background = bgloading;				
				Application.LoadLevel("MainMenu");
			}
		}	
	}else if (lose == true && done == false){
		var tempcamscript3 : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
		tempcamscript3.PanelSwap();
		bgstyle.normal.background = bglose;
		bgstyle.active.background = bglose;
		Destroy(GameObject.Find("SinglePlayer"));
		Destroy(GameObject.Find("Easy(Clone)"));
		Destroy(GameObject.Find("Normal(Clone)"));
		Destroy(GameObject.Find("Hard(Clone)"));
		if(done == false){
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) -(tall/7), 100, 100), currentKillsBlue.ToString(), textstyle);
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) - (tall/16), 100, 100), currentKillsRed.ToString(), textstyle);
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/70), 100, 100), currentScoreBlue.ToString(), textstyle);
			GUI.Label (Rect ( ( wide - (wide/2.5) ), (tall/2) + (tall/11), 100, 100), currentScoreRed.ToString(), textstyle);
		}if(campaign == true){
			if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/5), wide/2.5, tall/6.5), "", starmapButton)){
				done = true;
				if(done == true){
					Destroy(GameObject.Find("Easy(Clone)"));
					Destroy(GameObject.Find("Normal(Clone)"));
					Destroy(GameObject.Find("Hard(Clone)"));
					if(randomLoadScreen == 1){
						bgloading = loadingScreen1;
					}else if(randomLoadScreen == 2){
						bgloading = loadingScreen2;
					}else if(randomLoadScreen == 3){
						bgloading = loadingScreen3;
					}else if(randomLoadScreen == 4){
						bgloading = loadingScreen4;
					}else{
						bgloading = loadingScreen4;
					}
					bgstyle.normal.background = bgloading;
					bgstyle.active.background = bgloading;
					Application.LoadLevel("SinglePlayer_Campaign");
				}				
			}
		}else if(campaign == false){
			if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/5), wide/2.5, tall/6.5), "", mmButton)){
				done = true;
				if(done == true){
					Destroy(GameObject.Find("SinglePlayer")); //added by ben v11
					Destroy(GameObject.Find("Easy(Clone)"));
					Destroy(GameObject.Find("Normal(Clone)"));
					Destroy(GameObject.Find("Hard(Clone)"));
					if(randomLoadScreen == 1){
						bgloading = loadingScreen1;
					}else if(randomLoadScreen == 2){
						bgloading = loadingScreen2;
					}else if(randomLoadScreen == 3){
						bgloading = loadingScreen3;
					}else if(randomLoadScreen == 4){
						bgloading = loadingScreen4;
					}else{
						bgloading = loadingScreen4;
					}
					bgstyle.normal.background = bgloading;
					bgstyle.active.background = bgloading;
					Application.LoadLevel("MainMenu");
				}				
			}	
		}	
	}
//**************************BEGIN GLOBAL GUI SWITCHES FOR ON/OFF**************************//
	if (win == false && lose == false && displayGUI == true){	
		if (GUI.Button (new Rect ((wide/30) - (wide/6), tall/3.7, tall/2.5, tall/2.5),"", gearButton))  {
			if(gearMenu == true){
				gearMenu = false;
			}else{
				gearMenu = true;
			}
		}if (GUI.Button (new Rect(wide*upgbutwide - 10, tall/7.7, (.278)*tall, (.08)*tall),"", upgbutton1)){
			if (currentMoney >= 100){
				if(damageStackerRed < 5){
					Instantiate(powerRed, Vector3(0,0,0), Quaternion(0,0,0,0));
					damageStackerRed = damageStackerRed + 1;
					currentMoney = currentMoney - 100;	
				}
			}
		}if (GUI.Button (new Rect (  wide*upgbutwide - 10, tall/3.9 , (.278)*tall, (.08)*tall),"", upgbutton2 )){
			if(currentMoney >= 100){
				if(speedStackerRed < 5){
					Instantiate(speedRed, Vector3(0,0,0), Quaternion(0,0,0,0));
					speedStackerRed = speedStackerRed + 1;
					currentMoney = currentMoney - 100;
				}			
			}		
		}if (GUI.Button (new Rect (  wide*upgbutwide - 10, tall/2.65 , (.278)*tall, (.08)*tall),"", upgbutton3 )){
			if(currentMoney >= 100){
				if(healthStackerRed < 5){
					Instantiate(healthRed, Vector3(0,0,0), Quaternion(0,0,0,0));
					healthStackerRed = healthStackerRed + 1;
					currentMoney = currentMoney - 100;
				}
			}		
		}if (GUI.Button (new Rect (  wide*upgbutwide - 10, tall/2 , (.278)*tall, (.08)*tall),"", upgbutton4 )){
			if(raceHuman == true){
				if(isLevel1 == true || isLevel4 == true){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
						Instantiate(humanTurretRED, humanTurretSpawnRed1.transform.position, humanTurretSpawnRed1.transform.rotation);
						Instantiate(humanTurretRED, humanTurretSpawnRed2.transform.position, humanTurretSpawnRed2.transform.rotation);
						currentMoney = currentMoney - 300;
						turret = true;
					}
				}else if(isLevel2 == true || isLevel5 == true){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
						Instantiate(humanTurretRED, Vector3(2.8, 4.4, -53), humanTurretSpawnRed1.transform.rotation);
						Instantiate(humanTurretRED, Vector3(-2.8, 4.4, -53), humanTurretSpawnRed2.transform.rotation);
						currentMoney = currentMoney - 300;
						turret = true;
					}
				}else if(isLevel3 == true || isLevel6 == true || isLevel7 == true){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
						Instantiate(humanTurretRED, Vector3(21.69, 4.4, -53.7), humanTurretSpawnRed1.transform.rotation);
						Instantiate(humanTurretRED, Vector3(17.44, 4.4, -53.7), humanTurretSpawnRed2.transform.rotation);
						currentMoney = currentMoney - 300;
						turret = true;
					}
				}else if(isLevel8){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
						Instantiate(lvl8RedTurretUp, lvl8RedTurretUp.transform.position, lvl8RedTurretUp.transform.rotation);
						Instantiate(lvl8RedTurretDown, lvl8RedTurretDown.transform.position, lvl8RedTurretDown.transform.rotation);
						currentMoney = currentMoney - 300;
						turret = true;
					}
				}
			}else if(raceHuman == false){
				if(isLevel1 == true || isLevel4 == true){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
						Instantiate(alienTurretRED, alienTurretSpawnRed.transform.position, alienTurretSpawnRed.transform.rotation);
						currentMoney = currentMoney - 300;
						turret = true;
					}
				}else if(isLevel2 == true || isLevel5 == true){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
						Instantiate(alienTurretRED, Vector3(-0.04, 3.7, -52.7227), alienTurretSpawnRed.transform.rotation);
						currentMoney = currentMoney - 300;
						turret = true;
					}
				}else if(isLevel3 == true || isLevel6 == true || isLevel7 == true){
					if(currentMoney >= 300 && !GameObject.FindGameObjectWithTag("rturret")){
						Instantiate(alienTurretRED, Vector3(19.51, 4.5, -53.37), alienTurretSpawnRed.transform.rotation);
						currentMoney = currentMoney - 300;
						turret = true;
					}
				}
			}
		}if (GUI.Button (new Rect (  wide*pwrbutwide,(tall/1.5) , (.25)*tall, (.25)*tall),"", pwrbutton1)){
			if(nukeRed == false && raceHuman == true){			
				Instantiate(nukeRedPF, Vector3(0,0,0), Quaternion(0,0,0,0));
				Instantiate(nukeExplosion, Vector3(0,10,0), Quaternion(0,0,0,0));
				Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
				nukeRed = true;
			}else if(nukeRed == false && raceHuman == false){
				if(isLevel1 || isLevel4){
					Instantiate(motherShipRed, Vector3(xAxis,0,-42), Quaternion(0.0,0.0,0.0,0.0));
					Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
					nukeRed=true;
				}else if(isLevel2 || isLevel5){
					Instantiate(motherShipRed, Vector3(xAxis,0,-57), Quaternion(0.0,0.0,0.0,0.0));
					Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
					nukeRed=true;
				}else if(isLevel3 || isLevel6 || isLevel7){
					Instantiate(motherShipRed, Vector3(16,0,-56.8), Quaternion(0.0,0.0,0.0,0.0));
					Instantiate(nukeSplashRedManager, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
					nukeRed=true;
				}
			}
		}
		if (GUI.Button (new Rect (  wide*pwrposwide, tall-(tall/2.5) , (.4)*tall, (.4)*tall),"", pwrup )){
		GetComponent.<AudioSource>().clip = buttonsound;
		GetComponent.<AudioSource>().Play();			
			if (pwrclicked == false){
				pwrbutwide = .86;
				pwrposwide = .81;
				pwrclicked = true;
				var tempcamscript : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
				tempcamscript.PanelSwap();
			}else{
				pwrbutwide = 10;
				pwrposwide = .951;
				pwrclicked = false;
				var tempcamscript4 : CameraControls = GameObject.Find("Main Camera").GetComponent(CameraControls);
				tempcamscript4.PanelSwap();
			}
		}if (GUI.Button (new Rect (  wide*upgposwide, tall-(tall/1.11) , (.4)*tall, (.5)*tall),"", upg )){
		GetComponent.<AudioSource>().clip = buttonsound;
		GetComponent.<AudioSource>().Play();		
			if(upgclicked == false){
				upgbutwide = .86;
				upgposwide = .81;
				upgclicked = true;
			}else{
				upgposwide = .951;
				upgbutwide = 10;
				upgclicked = false;
			}
		}
		//Overlay
		GUI.depth = 5;
		GUI.Label (Rect(0,0,wide,tall), "" , overlayStyle);
		if(GUI.Button (new Rect ( ( ((wide/22)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button1 )){
			ClickTier1();		
			GetComponent.<AudioSource>().clip = buttonsound;
			GetComponent.<AudioSource>().Play();
		}if (GUI.Button (new Rect ( ( ((wide/7)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button2 )){
			ClickTier2();				
			GetComponent.<AudioSource>().clip = buttonsound;
			GetComponent.<AudioSource>().Play();
		}if (GUI.Button (new Rect ( ( ((wide/4.15)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button3 )){		
			ClickTier3();			
			GetComponent.<AudioSource>().clip = buttonsound;
			GetComponent.<AudioSource>().Play();
		}if (GUI.Button (new Rect ( ( ((wide/2.95)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button4 )){		
			ClickTier4();		
			GetComponent.<AudioSource>().clip = buttonsound;
			GetComponent.<AudioSource>().Play();
		}if (GUI.Button (new Rect ( ( ((wide/2.3)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button5 )){		
			ClickTier5();			
			GetComponent.<AudioSource>().clip = buttonsound;
			GetComponent.<AudioSource>().Play();
		}if (GUI.Button (new Rect ( ( ((wide/1.878)) ), tall-(tall/5.25) , (.14)*tall, (.14)*tall),"", button6 )){		
			ClickTier6();			
			GetComponent.<AudioSource>().clip = buttonsound;
			GetComponent.<AudioSource>().Play();
		}		
		GUI.depth = 0;
		GUI.Label (Rect ((wide)-(wide/5), (tall/17), 500, 50), "cash: " + currentMoney.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/80)) ), tall/12 , 50, 50), userNameAI + ":" , textstyleblue);
		GUI.Label (Rect ( ( ((wide/5.5)) ), tall/12 , 50, 50), "Score: " + currentScoreRed.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/3)) ), tall/12 , 50, 50), "Kills: " + currentKillsRed.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/80)) ), tall/24 , 50, 50), userName + ":" , textstylered);
		GUI.Label (Rect ( ( ((wide/5.5)) ), tall/24 , 50, 50), "Score: " + currentScoreBlue.ToString(), textstyle);
		GUI.Label (Rect ( ( ((wide/3)) ), tall/24 , 50, 50), "Kills: " + currentKillsBlue.ToString(), textstyle);		
	}
	if(gearMenu == true && displayGUI == true ){
		GUI.Label (new Rect( (wide/5.5), (tall/4.5), wide/1.6, tall/2.2), "", styleGearMenu);
		Pause();
		if(campaign == false){
			if(GUI.Button (new Rect( (wide/2)-(wide/4.78), (tall/2.65), wide/2.5, tall/6.5), "", mmButton)){
				Pause();
				displayGUI = false;
				Destroy(GameObject.Find("SinglePlayer"));
				Destroy(GameObject.Find("Easy(Clone)"));
				Destroy(GameObject.Find("Normal(Clone)"));
				Destroy(GameObject.Find("Hard(Clone)"));
					if(randomLoadScreen == 1){
						bgloading = loadingScreen1;
					}else if(randomLoadScreen == 2){
						bgloading = loadingScreen2;
					}else if(randomLoadScreen == 3){
						bgloading = loadingScreen3;
					}else if(randomLoadScreen == 4){
						bgloading = loadingScreen4;
					}else{
						bgloading = loadingScreen4;
					}
				bgstyle.normal.background = bgloading;
				bgstyle.active.background = bgloading;
				Application.LoadLevel("MainMenu");			
			}
		}else{
			if (GUI.Button (new Rect( (wide/2)-(wide/4.78), (tall/2.65), wide/2.5, tall/6.5), "", starmapButton)){
				Pause();
				displayGUI = false;
				Destroy(GameObject.Find("Easy(Clone)"));
				Destroy(GameObject.Find("Normal(Clone)"));
				Destroy(GameObject.Find("Hard(Clone)"));
					if(randomLoadScreen == 1){
						bgloading = loadingScreen1;
					}else if(randomLoadScreen == 2){
						bgloading = loadingScreen2;
					}else if(randomLoadScreen == 3){
						bgloading = loadingScreen3;
					}else if(randomLoadScreen == 4){
						bgloading = loadingScreen4;
					}else{
						bgloading = loadingScreen4;
					}
				bgstyle.normal.background = bgloading;
				bgstyle.active.background = bgloading;
				Application.LoadLevel("SinglePlayer_Campaign");				
			}
		}
	}
//	if(win == true || lose == true){
//		Camera.main.gameObject.GetComponent(AudioListener).enabled = false;
//		//audio.Stop();
//	}
}
function SaveWins(wins : float){
	PlayerPrefs.SetFloat("Wins", wins);
}
function SaveLosses(losses : float){
	PlayerPrefs.SetFloat("Losses", losses);
}
function Win(){
	if(campaign == true){
		if(isLevel1 == true){
			if(PlayerPrefs.GetInt("level6") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);
			}
		}else if(isLevel2 == true){	
			if(PlayerPrefs.GetInt("level7") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);						
			}
		}else if(isLevel3 == true){
			if(PlayerPrefs.GetInt("level8") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);						
			}
		}else if(isLevel4 == true){	
			if(PlayerPrefs.GetInt("level1") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);						
			}
		}else if(isLevel5 == true){
			if(PlayerPrefs.GetInt("level2") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);						
			}
		}else if(isLevel6 == true){
			if(PlayerPrefs.GetInt("level3") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);						
			}
		}else if(isLevel7 == true){	
			if(PlayerPrefs.GetInt("level4") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);						
			}
		}else if(isLevel8 == true){
			if(PlayerPrefs.GetInt("level5") == 0){
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") + 1);						
			}
		}
	}
	win = true;
	wins = wins + 1;
	SaveWins(wins);
}
function Lose(){	
	lose = true;
	losses = losses + 1;
	SaveLosses(losses);
}
function ClickTier1(){	
	xAxis = Random.Range(spawnMinX, spawnMaxX);
	if(currentMoney >= 50){
		if(raceHuman == false){	
			Instantiate(drudgeRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}else{
			Instantiate(marineRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}
		currentMoney = currentMoney - 50;		
		incomePerSec++;		
	}	
}
function ClickTier2(){
	xAxis = Random.Range(spawnMinX, spawnMaxX);
	if(currentMoney >= 100){
		if(raceHuman == false){		
			Instantiate(squallerRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}else{
			Instantiate(sniperRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}
		currentMoney = currentMoney - 100;
		incomePerSec = incomePerSec + 2;
	}	
}
function ClickTier3(){
	xAxis = Random.Range(spawnMinX, spawnMaxX);
	if(currentMoney >= 150){
		if(raceHuman == false){
			Instantiate(grieferRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}else{
			Instantiate(cannoneerRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}
		currentMoney = currentMoney - 150;
		incomePerSec = incomePerSec + 3;
	}
}
function ClickTier4(){
	xAxis = Random.Range(spawnMinX, spawnMaxX);
	if(currentMoney >= 200){
		if(raceHuman == false){
			Instantiate(warderRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}else{
			Instantiate(dozerRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}	
		currentMoney = currentMoney - 200;	
		incomePerSec = incomePerSec + 4;
	}	
}
function ClickTier5(){
	xAxis = Random.Range(spawnMinX, spawnMaxX);
	if(currentMoney >= 300){
		if(raceHuman == false){
			Instantiate(disrupterRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}else{
			Instantiate(strikerRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}	
		currentMoney = currentMoney - 300;	
		incomePerSec = incomePerSec + 5;
	}	
}
function ClickTier6(){
	xAxis = Random.Range(spawnMinX, spawnMaxX);
	if(currentMoney >= 400){
		if(raceHuman == false){		
			Instantiate(arbiterRED, Vector3(xAxis, 0, unitSpawnPositionZ) , transform.rotation);
		}else{
			Instantiate(titanRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
		}	
		currentMoney = currentMoney - 400;
		incomePerSec = incomePerSec + 6;
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
	//currentMoneyAI = currentMoneyAI + moneyAdd;
}
//Adds score and kills for client
static function ScoreBlue(scoreAdd : int){
	currentScoreBlue = currentScoreBlue + scoreAdd;
	currentKillsBlue ++;	
}	
static function LowBaseLife(bottomx : boolean){
	lowBaseLife = true;	
	if(bottomx == true){
		bottom = true;
	}else if(bottomx == false){
		bottom = false;
	}	
}
function RandomSend(){
	randomUnitSend = Random.Range(1,4);
	switch(randomUnitSend){
		case 1:
			xAxis = Random.Range(spawnMinX, spawnMaxX);
			Instantiate(marineRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
			randomSendBonus = 0;
			randomUnitSend = 0;
		break;
		case 2:
			xAxis = Random.Range(spawnMinX, spawnMaxX);		
			Instantiate(sniperRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
			randomSendBonus = 0;
			randomUnitSend = 0;
		break;
		case 3:
			xAxis = Random.Range(spawnMinX, spawnMaxX);
			Instantiate(cannoneerRED, Vector3(xAxis, 0, unitSpawnPositionZ), transform.rotation);
			xAxis = Random.Range(spawnMinX, spawnMaxX);			
			randomSendBonus = 0;
			randomUnitSend = 0;
		break;
	}
}
function AITurret(){
	if(aiAlien == false){
		if(!isLevel8){
			if(isLevel1 == true || isLevel2 == true || isLevel4 == true || isLevel5 == true){
				if(!GameObject.FindGameObjectWithTag("bturret" )){
					Instantiate(humanTurretBLUE, humanTurretSpawnBlue1.transform.position, humanTurretSpawnBlue1.transform.rotation);
					Instantiate(humanTurretBLUE, humanTurretSpawnBlue2.transform.position, humanTurretSpawnBlue2.transform.rotation);
				}
			}else if(isLevel3 == true || isLevel6 == true || isLevel7 == true){
				if(!GameObject.FindGameObjectWithTag("bturret")){
					Instantiate(humanTurretBLUE, Vector3(21.69,4.4,35.7), humanTurretSpawnBlue1.transform.rotation);
					Instantiate(humanTurretBLUE, Vector3(17.42,4.4,35.7), humanTurretSpawnBlue2.transform.rotation);
				}
			}

		}
	}else if(aiAlien == true){
		if(!isLevel8){
			if(isLevel1 == true || isLevel2 == true || isLevel4 == true || isLevel5 == true){
				if(!GameObject.FindGameObjectWithTag("bturret" )){
					Instantiate(alienTurretBLUE, alienTurretSpawnBlue.transform.position, alienTurretSpawnBlue.transform.rotation);
				}
			}else if(isLevel3 == true || isLevel6 == true || isLevel7 == true){
				if(!GameObject.FindGameObjectWithTag("bturret")){
					Instantiate(alienTurretBLUE, Vector3(19.51,4.539,35.31), alienTurretSpawnBlue.transform.rotation);
				}
			}
		}	

	}
}
function AIUpgrades(timesRun : int){	
	switch(timesRun){
		case 1:
			if(damageStackerBlue == 0){
				Instantiate(powerBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				damageStackerBlue = damageStackerBlue + 1;
			}if(healthStackerBlue == 0){
				Instantiate(healthBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				healthStackerBlue = healthStackerBlue + 1;	
			}if(speedStackerBlue == 0){
				Instantiate(speedBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				speedStackerBlue = speedStackerBlue + 1;	
			}
		break;
		case 2:
			if(damageStackerBlue == 1){
				Instantiate(powerBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				damageStackerBlue = damageStackerBlue + 1;	
			}if(healthStackerBlue == 1){
				Instantiate(healthBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				healthStackerBlue = healthStackerBlue + 1;	
			}if(speedStackerBlue == 1){
				Instantiate(speedBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				speedStackerBlue = speedStackerBlue + 1;	
			}
		break;
		case 3:
			if(damageStackerBlue == 2){
				Instantiate(powerBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				damageStackerBlue = damageStackerBlue + 1;	
			}if(healthStackerBlue == 2){
				Instantiate(healthBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				healthStackerBlue = healthStackerBlue + 1;	
			}if(speedStackerBlue == 2){
				Instantiate(speedBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				speedStackerBlue = speedStackerBlue + 1;	
			}
		break;
		case 4:
			if(damageStackerBlue == 3){
				Instantiate(powerBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				damageStackerBlue = damageStackerBlue + 1;
			}if(healthStackerBlue == 3){
				Instantiate(healthBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				healthStackerBlue = healthStackerBlue + 1;	
			}if(speedStackerBlue == 3){
				Instantiate(speedBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				speedStackerBlue = speedStackerBlue + 1;	
			}
		break;
		case 5:
			if(damageStackerBlue == 4){
				Instantiate(powerBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				damageStackerBlue = damageStackerBlue + 1;	
			}if(healthStackerBlue == 4){
				Instantiate(healthBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				healthStackerBlue = healthStackerBlue + 1;	
			}if(speedStackerBlue == 4){
				Instantiate(speedBlue, Vector3(0,0,0), Quaternion(0,0,0,0));
				speedStackerBlue = speedStackerBlue + 1;	
			}
		break;	
	}
}
function Direction(){	
	if(isLevel2 == true || isLevel5 == true){
		aiDirection2 = Random.Range(1,3);
		if(aiDirection2 == 1 ){
			Destroy(GameObject.Find("DownRight"));
			Destroy(GameObject.Find("DownRight(Clone)"));
			if(!GameObject.Find("UpRight(Clone)") && !GameObject.Find("UpRight")){
				Instantiate(upRight, upRight.transform.position, upRight.transform.rotation);
			}
		}else if(aiDirection2 == 2){
			Destroy(GameObject.Find("UpRight(Clone)"));
			Destroy(GameObject.Find("UpRight"));
			if(!GameObject.Find("DownRight(Clone)") && !GameObject.Find("DownRight")){
				Instantiate(downRight, downRight.transform.position, downRight.transform.rotation);
			}
		}
	}else if(isLevel3 == true || isLevel6 == true){
		aiDirection2 = Random.Range(1,3);
		if(aiDirection2 == 1){	
			Destroy(GameObject.Find("UpRightLevel3(Clone)"));
			Destroy(GameObject.Find("UpRightLevel3"));
		}else if(aiDirection2 == 2){
			if(!GameObject.Find("UpRightLevel3(Clone)")){
				Instantiate(upRightLevel3, upRightLevel3.transform.position, upRightLevel3.transform.rotation);
			}	
		}
	}
}
function Pause(){
	if (isPaused == true){
		Camera.main.gameObject.GetComponent(AudioListener).enabled = true;
		Time.timeScale = 1;
		isPaused = false;
	}else{
		Camera.main.gameObject.GetComponent(AudioListener).enabled = false;
		Time.timeScale = 0;
		isPaused = true;
	}
}
