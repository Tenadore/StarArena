#pragma strict
//import System;
var setLane : boolean;
var middleLane : boolean = true;
var raceHuman : boolean;
var nukedbyredStyle : UnityEngine.GUIStyle;
var nukedbyblueStyle : UnityEngine.GUIStyle;
var nukedbyredTexture : UnityEngine.Texture;
var nukedbyblueTexture : UnityEngine.Texture;
var blankmap : Texture;
var nukeSplashRedManager : GameObject;
var nukeSplashBlueManager : GameObject;
//-------Variables For Warder-------//
var warderLoop : boolean = true;
var maxSplash : int = 0;
//------Timers-------//
//--Muzzleflash
var delay : float = 1;
var nextfire : float;
var timer : boolean = false;
//---------Variables For Nuke----------//
static var nukeRedHealth : float = 0;
static var nukeBlueHealth : float = 0;
static var nukedBlue : boolean = false;
static var nukedRed : boolean = false;
//----------Variables For Animation and Audio----------//
//--Muzzleflash
//--Blinking
var muzzleflash : boolean = false;
//--Unit Seperation
var second : float;
var snipermuzzleon : boolean;
var snipermuzzleon1 : boolean;
var yellowmat : Material;
var unitControllerInstance : Unitcontroller;
//--Death
var blood : GameObject;
var dead : boolean = false;
var deathtimer : float = 0.5;
//--Sounds
var shoot : AudioClip;
var hasPlayed: boolean = false; 
var death1 : AudioClip;	
//-------------Variables For Upgrades---------------//
static var speedMultiplierRed : float = 1;
static var speedMultiplierBlue: float = 1;
static var damageMultiplierRed : float = 1;
static var damageMultiplierBlue : float = 1;
static var healthMultiplierRed : float = 1;
static var healthMultiplierBlue : float = 1;
//Variables for unit
var speed : float = 10;
var pwr : float = 4;
var range : float = 13;
var minRange : float = 3;
var health : float;
var maxHealth : float;
var rayLength : float;
//Variable for defining enemy
var enemy : boolean = false;
var waitForShoot : boolean = false;
//Variables for score
var guiManager : GameObject;
var guiManagerSingle : GameObject;
var pointsOnDeath : int = 50;
//Variables for money bonus
var deathBonus : int;
//Variables for timer to make units send damage correctly
var damageTimerSetter : boolean = false;
var isLightDamage : boolean = false;
var isLightArmor : boolean = false;
var cannoneerExplosion : UnityEngine.GameObject;
static var otherScript2 : BaseManager;
//RPC TEST VARS. Still here and in script but not being used at this point, most likely will be deleted here and within script later, but leave as we're still in testing phase
var currentPos : Vector3;
var currentAnimation : String;
var clientSound : boolean = false;
var clientDie : boolean = false;
var currentRot : Quaternion;
var muzzleOff : boolean = true;
var powerRedCounter : float;
var powerBlueCounter : float;
var speedRedCounter : float;
var speedBlueCounter : float;
var healthBlueCounter : float;
var healthRedCounter : float;
static var color;
var moveUp : boolean;
var moveDown: boolean;
var moveLeft : boolean;
var moveRight : boolean;
var boundarySetter : float;
// Bounds Variables
var boundsMainXMax : float = 6;
var boundsMainXMin : float = -6;
var boundsTopXMax : float = -9.6;
var boundsTopXMin : float = -22;		
var boundsBtmXMax : float = 22;
var boundsBtmXMin : float = 9.6;		
var boundsLeftZMax : float = - 22;
var boundsLeftZMin : float = - 36.12;		
var boundsRightZMax : float = 8.27;
var boundsRightZMin : float = 20;	
var boundsXmax : float = 500;
var boundsXmin : float = -500;
var boundsZmax : float = 500;
var boundsZmin : float = -500;	
var boundsMainZMax : float;
var boundsMainZMin : float;
var hit: RaycastHit;
var hitb: RaycastHit;
var isLevel1 : boolean;
var isLevel2 : boolean;
var isLevel3 : boolean;
var isLevel4 : boolean;
var isLevel5 : boolean;
var isLevel6 : boolean;
var isLevel7 : boolean;
var isLevel8 : boolean;
var dieX : boolean;
var die : boolean;
var redUnitTop : int;
var redUnitBottom : int;
var noAlly : boolean = true;
static var nukeRed : boolean = false;
static var nukeBlue : boolean = false;
//Campaign Variables
var campaign : boolean = false;
var cHealth : float = 0;
var cPower : float = 0;
var cHealth2 : float = 0;
var cRange : float = 0;
var cBounty : float = 0;
var maxCHealth : float = 0;
var maxCHealth2 : float = 0;
var inGameVolume : float;
var highGraphics : boolean = false;
var mothershipTimer : int;
var drudgeBlue : UnityEngine.GameObject;
var drudgeRed : UnityEngine.GameObject;
var multiPlayer : boolean;
var secondMother : float = 0;
var randomZ : int;
var addOrSubtractZ : int;
//FOR MOTHERSHIP DRUDGE SPAWNING
var levelPlaying : int = 0;
var xAxisRed : float;
var xAxisBlue : float;
var spawnMinX : int;
var spawnMaxX : int;
var unitSpawnPositionZ : float;
var aiUnitSpawnPositionZ : float;
var secondx : float = 0;
var targetTimer : float = 0;
var mothershipNuked : boolean = false;

var lookAtTimer : float = 0;

var flashvalue:float=0;

var commanderBuffAmount:float;
var comBuffMap:Texture2D;
var shadowMap:Texture2D;
var currentlyBuffed:boolean=false;
function Start(){
	middleLane = true;
	secondMother = 0;
	inGameVolume = PlayerPrefs.GetFloat("volume");
	AudioListener.volume = inGameVolume;
	GetComponent.<AudioSource>().volume = inGameVolume;
	nukeRed = false;
	nukeBlue = false;
	if(GameObject.Find("AIHuman") || GameObject.Find("AIHuman(Clone)")){
		raceHuman = true;
	}else{
		raceHuman = false;
	}
	if(GameObject.Find("MultiPlayer")){
		multiPlayer = true;
	}else{
		multiPlayer = false;
	}if(this.transform.name.Contains("Marine") || this.transform.name.Contains("Drudge")){
		deathBonus = 5;
	}else if(this.transform.name.Contains("Sniper") || this.transform.name.Contains("Squaller")){
		deathBonus = 10;
	}else if(this.transform.name.Contains("Cannoneer") || this.transform.name.Contains("Griefer")){
		deathBonus = 15;
	}else if(this.transform.name.Contains("Dozer") || this.transform.name.Contains("Warder")){
		deathBonus = 20;
	}else if(this.transform.name.Contains("Striker") || this.transform.name.Contains("Disrupter")){
		deathBonus = 30;
	}else if(this.transform.name.Contains("Titan") || this.transform.name.Contains("Arbiter")){
		deathBonus = 40;
	}
//===SET INITAL BOUNDS BASED ON LEVEL
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
		unitSpawnPositionZ = -36.5;
		aiUnitSpawnPositionZ = 36.5;
		boundsMainZMax = 42;
		boundsMainZMin = -42;
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
		unitSpawnPositionZ = -36.5;
		aiUnitSpawnPositionZ = 36.5;
		boundsMainZMax = 42;
		boundsMainZMin = -42;	
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
		unitSpawnPositionZ = -52;
		aiUnitSpawnPositionZ = 35.5;	
		boundsMainXMax  = 6.5;
		boundsMainXMin  = -7;		
		boundsTopXMax  = -9.6;
		boundsTopXMin  = -22;		
		boundsBtmXMax  = 22;
		boundsBtmXMin  = 9.6;		
		boundsLeftZMax  = -22;
		boundsLeftZMin  = -36.12;		
		boundsRightZMax  = 8.27;
		boundsRightZMin  = 20;
		boundsMainZMax = 42;
		boundsMainZMin = -55;
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
		boundsMainXMax  = 26.55;
		boundsMainXMin  = 12.47;		
		boundsTopXMax  = -16.13;
		boundsTopXMin  = -29.31;		
		boundsBtmXMax  = 26.55;
		boundsBtmXMin  = 12.47;		
		boundsLeftZMax  = -24.66;
		boundsLeftZMin  = -38.87;		
		boundsRightZMax  = 6.31;
		boundsRightZMin  = 20.48;
		boundsMainZMax = 35;
		boundsMainZMin = -58;
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
		unitSpawnPositionZ = -52;
		aiUnitSpawnPositionZ = 35.5;	
		boundsMainXMax  = 6.5;
		boundsMainXMin  = -7;		
		boundsTopXMax  = -9.6;
		boundsTopXMin  = -22;		
		boundsBtmXMax  = 22;
		boundsBtmXMin  = 9.6;		
		boundsLeftZMax  = -22;
		boundsLeftZMin  = -36.12;		
		boundsRightZMax  = 8.27;
		boundsRightZMin  = 20;
		boundsMainZMax = 42;
		boundsMainZMin = -55;
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
		boundsMainXMax  = 26.55;
		boundsMainXMin  = 12.47;		
		boundsTopXMax  = -16.13;
		boundsTopXMin  = -29.31;		
		boundsBtmXMax  = 26.55;
		boundsBtmXMin  = 12.47;		
		boundsLeftZMax  = -24.66;
		boundsLeftZMin  = -38.87;		
		boundsRightZMax  = 6.31;
		boundsRightZMin  = 20.48;
		boundsMainZMax = 35;
		boundsMainZMin = -58;
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
		unitSpawnPositionZ = -55;
		aiUnitSpawnPositionZ = 32.5;	
		boundsMainXMax  = 26.55;
		boundsMainXMin  = 12.47;		
		boundsTopXMax  = -16.13;
		boundsTopXMin  = -29.31;		
		boundsBtmXMax  = 26.55;
		boundsBtmXMin  = 12.47;		
		boundsLeftZMax  = -24.66;
		boundsLeftZMin  = -38.87;		
		boundsRightZMax  = 6.31;
		boundsRightZMin  = 20.48;
		boundsMainZMax = 35;
		boundsMainZMin = -58;
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
		boundsMainXMax  = 9;
		boundsMainXMin  = -5.5;		
		boundsTopXMax  = -9;
		boundsTopXMin  = -20;		
		boundsBtmXMax  = 18;
		boundsBtmXMin  = 8.7;		
		boundsLeftZMax  = -14.7;
		boundsLeftZMin  = -25.1;	
		boundsRightZMax  = 500;
		boundsRightZMin  = -500;
		boundsMainZMax = 33;
		boundsMainZMin = -50;		
	}
	boundsXmax = boundsMainXMax;
	boundsXmin = boundsMainXMin;
	if(this.transform.tag == "red"){
		moveRight = true;
		moveLeft = false;
		moveDown = false;
		moveUp = false;
	}else if(this.transform.tag == "blue"){
		moveRight = false;
		moveLeft = true;
		moveDown = false;
		moveUp = false;
	}if(!GameObject.Find("speedRed(Clone)")){
    	speedRedCounter = 0;
    }if(!GameObject.Find("powerRed(Clone)")){
    	powerRedCounter = 0;
    }if(!GameObject.Find("healthRed(Clone)")){
    	healthRedCounter = 0;
    }if(!GameObject.Find("speedBlue(Clone)")){
    	speedBlueCounter = 0;
    }if(!GameObject.Find("powerBlue(Clone)")){
    	powerBlueCounter = 0;
    }if(!GameObject.Find("healthBlue(Clone)")){
   		healthBlueCounter = 0;
    }
	nukedRed = false;
	nukedBlue = false;
	nukeBlueHealth = 0;
	nukeRedHealth = 0;
	var upgr : GameObject[];
    upgr = GameObject.FindGameObjectsWithTag("upgradered");
	for (var upgred : GameObject in upgr){ 
		if(upgred.transform.name.Contains("Speed")){
    		speedRedCounter = speedRedCounter + 1;
    	}if(upgred.transform.name.Contains("Power")){
    		powerRedCounter = powerRedCounter + 1;
    	}if(upgred.transform.name.Contains("Health")){
    		healthRedCounter = healthRedCounter + 1;
		}
	}
	var upgb : GameObject[];
    upgb = GameObject.FindGameObjectsWithTag("upgradeblue");
	for (var upgblue : GameObject in upgb){ 
		if(upgblue.transform.name.Contains("Speed")){
    		speedBlueCounter = speedBlueCounter + 1;
    	}if(upgblue.transform.name.Contains("Power")){
    		powerBlueCounter = powerBlueCounter + 1;
    	}if(upgblue.transform.name.Contains("Health")){
    		healthBlueCounter = healthBlueCounter + 1;
		}
	}	
	//POWER
	if(powerRedCounter == 0){
		damageMultiplierRed = 1.0;
	}if(powerRedCounter == 1){
		damageMultiplierRed = 1.1;
	}if(powerRedCounter == 2){
		damageMultiplierRed = 1.2;
	}if(powerRedCounter == 3){
		damageMultiplierRed = 1.3;
	}if(powerRedCounter == 4){
		damageMultiplierRed = 1.4;
	}if(powerRedCounter == 5){
		damageMultiplierRed = 1.5;
	}
	//SPEED
	if(speedRedCounter == 0){
		speedMultiplierRed = 1.0;
	}if(speedRedCounter == 1){
		speedMultiplierRed = 1.07;
	}if(speedRedCounter == 2){
		speedMultiplierRed = 1.14;
	}if(speedRedCounter == 3){
		speedMultiplierRed = 1.21;
	}if(speedRedCounter == 4){
		speedMultiplierRed = 1.28;
	}if(speedRedCounter == 5){
		speedMultiplierRed = 1.35;
	}
	//HEALTH
	if(healthRedCounter == 0){
		healthMultiplierRed = 1.0;
	}if(healthRedCounter == 1){
		healthMultiplierRed = 1.1;
	}if(healthRedCounter == 2){
		healthMultiplierRed = 1.2;
	}if(healthRedCounter == 3){
		healthMultiplierRed = 1.3;
	}if(healthRedCounter == 4){
		healthMultiplierRed = 1.4;
	}if(healthRedCounter == 5){
		healthMultiplierRed = 1.5;
	}
	//POWER
	if(powerBlueCounter == 0){
		damageMultiplierBlue = 1.0;
	}if(powerBlueCounter == 1){
		damageMultiplierBlue = 1.1;
	}if(powerBlueCounter == 2){
		damageMultiplierBlue = 1.2;
	}if(powerBlueCounter == 3){
		damageMultiplierBlue = 1.3;
	}if(powerBlueCounter == 4){
		damageMultiplierBlue = 1.4;
	}if(powerBlueCounter == 5){
		damageMultiplierBlue = 1.5;
	}
	//SPEED
	if(speedBlueCounter == 0){
		speedMultiplierBlue = 1.0;
	}if(speedBlueCounter == 1){
		speedMultiplierBlue = 1.07;
	}if(speedBlueCounter == 2){
		speedMultiplierBlue = 1.14;
	}if(speedBlueCounter == 3){
		speedMultiplierBlue = 1.21;
	}if(speedBlueCounter == 4){
		speedMultiplierBlue = 1.28;
	}if(speedBlueCounter == 5){
		speedMultiplierBlue = 1.35;
	}
	//HEALTH
	if(healthBlueCounter == 0){
		healthMultiplierBlue = 1.0;
	}if(healthBlueCounter == 1){
		healthMultiplierBlue = 1.1;
	}if(healthBlueCounter == 2){
		healthMultiplierBlue = 1.2;
	}if(healthBlueCounter == 3){
		healthMultiplierBlue = 1.3;
	}if(healthBlueCounter == 4){
		healthMultiplierBlue = 1.4;
	}if(healthBlueCounter == 5){
		healthMultiplierBlue = 1.5;
	}
	//Correct Health Orb Size
	var orbx = this.transform.Find("healthorb");
	orbx.transform.localScale = Vector3(.5,.5,.5);
	//SHADOW TOGGLE
	if(PlayerPrefs.GetInt("high") == 0){
		highGraphics = false;
		var shadowsOff = this.transform.Find("shadow");
		shadowsOff.GetComponent.<Renderer>().enabled = false;		
	}else if(PlayerPrefs.GetInt("high") > 0){
		highGraphics = true;
	}if(this.transform.name.Contains("Marine")||this.transform.name.Contains("Sniper")
	||this.transform.name.Contains("Cannoneer")||this.transform.name.Contains("Titan")
	||this.transform.name.Contains("Drudge")||this.transform.name.Contains("Disrupter")
	||this.transform.name.Contains("Arbiter") || this.transform.name.Contains("Mother")){
		isLightArmor = true;
	}else{
		isLightArmor = false;
	}if(this.transform.name.Contains("Marine")||this.transform.name.Contains("Sniper")
	||this.transform.name.Contains("Dozer")||this.transform.name.Contains("Titan")
	||this.transform.name.Contains("Drudge")||this.transform.name.Contains("Squaller")
	||this.transform.name.Contains("Arbiter")){
		isLightDamage = true;
	}else{
		isLightDamage = false;
	}
	//Campaign Upgrades
	if(GameObject.Find("Campaign")){
		campaign = true;
	}else{
		campaign = false;
	}if(campaign == true){
		if(this.transform.tag == "red" && PlayerPrefs.GetInt("health") > 0){
			cHealth = (health*0.10);
			maxCHealth = (maxHealth*0.10);
		}if(this.transform.tag == "red" && PlayerPrefs.GetInt("power") > 0){
			cPower = (pwr*0.15);
		}if(this.transform.tag == "red" && PlayerPrefs.GetInt("health2") > 0){
			cHealth2 = (health*0.10);
			maxCHealth2 = (maxHealth*0.10);
		}if(this.transform.tag == "red" && PlayerPrefs.GetInt("range") > 0){
			cRange = (range*0.25);
		}if(this.transform.tag == "red" && PlayerPrefs.GetInt("titanHvyArmor") > 0){
			if(this.transform.name.Contains("Titan")){
				isLightArmor = false;
			}
		}if(this.transform.tag == "red" && PlayerPrefs.GetInt("marineHvyDmg") > 0){
			if(this.transform.name.Contains("Marine")){
				isLightDamage = false;
			}
		}if(this.transform.tag == "blue" && PlayerPrefs.GetInt("bounty") > 0){
			cBounty = (deathBonus*0.50);
			deathBonus = deathBonus + cBounty;
		}
	}
	range = range + cRange;
	maxHealth = health;
	var orb1 = this.transform.Find("healthorb");
	orb1.GetComponent.<Renderer>().material.color = Color.green; 
	damageTimerSetter = false;
	//Sets  power ups for Player 1 and 2
	if (this.transform.tag == "red"){
		speed = speed * speedMultiplierRed;
	}else if (this.transform.tag == "blue"){
		speed = speed * speedMultiplierBlue;
	}if (this.transform.tag == "red"){
		pwr = (pwr * damageMultiplierRed) + cPower;
	}else if (this.transform.tag == "blue"){
		pwr = pwr * damageMultiplierBlue;
	}if(this.transform.tag == "red"){
		health = (health * healthMultiplierRed) + (cHealth + cHealth2);
		maxHealth = (maxHealth * healthMultiplierRed) + (maxCHealth + maxCHealth2);
	}else if(this.transform.tag == "blue"){
		health = health * healthMultiplierBlue;
		maxHealth = maxHealth * healthMultiplierBlue;
	}	
	snipermuzzleon = false;
	snipermuzzleon1 = true;
	var orb = this.transform.Find("healthorb");
	orb.GetComponent.<Renderer>().material.name = "green"; 
	unitControllerInstance = GetComponent(Unitcontroller);
	var allChildren = gameObject.GetComponentsInChildren(Transform);
	for(var child5 : Transform in allChildren){
    	if (child5.name == "muzzleflash"){
    		child5.GetComponent.<Renderer>().enabled = false;
    		child5.GetComponent.<Renderer>().material = yellowmat;
       	}if(child5.name.Contains("FlashLight")){
    			//child5.gameObject.SetActive(false);
    			child5.GetComponent.<Light>().intensity=0;
    			if(this.transform.name.Contains("arine")){
    				child5.GetComponent.<Light>().range=3.0;
    			}else if(this.transform.name.Contains("riker")||this.transform.name.Contains("rupter")){
    				child5.GetComponent.<Light>().range=7.0;
    			}else if(this.transform.name.Contains("othership")){
    				child5.GetComponent.<Light>().range=12;
    			}else{
    				child5.GetComponent.<Light>().range=5.0;
    			}
    	}
    }
    mothershipTimer = 0;
    timer = false;
    
    
    
    //COMMANDER UNIT CHECK
    if(this.transform.name.Contains("itan")||this.transform.name.Contains("biter") ){
    	ApplyCommanderBuff();
    }else{
    
    	if(this.transform.tag=="red"){
    		if(GameObject.Find("Titan_Red_PF")||GameObject.Find("Titan_Red_PF(Clone)")||GameObject.Find("Arbiter_Red_PF")||GameObject.Find("Arbiter_Red_PF(Clone)")   ){
    			AddComBuff();
    		}else{}
    	}else{
    		if(GameObject.Find("Titan_Blue_PF")||GameObject.Find("Titan_Blue_PF(Clone)")||GameObject.Find("Arbiter_Blue_PF")||GameObject.Find("Arbiter_Blue_PF(Clone)")   ){
    			AddComBuff();
    		}else{}
    	}
    
    }
    
    
    
    
    
}

//END START

function Update (){
	if(muzzleflash==true){
		if(this.transform.name.Contains("arine")||this.transform.name.Contains("udge")){
			flashvalue = 1.25;
		}else{
			flashvalue = 2;
		}
	}else{
		flashvalue=0;
	}

	lookAtTimer = lookAtTimer + Time.deltaTime;
	if(lookAtTimer>=1){
		lookAtTimer = 0;
	}
	FindClosestEnemy();
	//Differentiate muzzle flash timings for different unit types
	if(this.transform.name.Contains("Marine") || this.transform.name.Contains("Titan") 
	|| this.transform.name.Contains("Dozer") || this.transform.name.Contains("Mother")){
		muzzleflash = Mathf.Repeat (Time.time * 10.0, 1.0) < 0.5;
	}else if(this.transform.name.Contains("Sniper") || this.transform.name.Contains("Drudge")
	|| this.transform.name.Contains("Squaller") || this.transform.name.Contains("Cannoneer") 
	|| this.transform.name.Contains("Striker") || this.transform.name.Contains("Griefer")
	|| this.transform.name.Contains("Arbiter") || this.transform.name.Contains("Disrupter")){		
		second = second + Time.deltaTime;
		if(snipermuzzleon == true && snipermuzzleon1 == true){		
			second = 0;
			snipermuzzleon = false;
			snipermuzzleon1 = false;
		}if(second >= 1){
			second = 0;
		}if(second < .1){
			muzzleflash = true;
		}else{
			muzzleflash = false;
		}
	}if (health <= 0 && dead == false){
		dead = true;
		GetComponent.<AudioSource>().Stop();
		Die();
	}
	//Plays the audio assoctiated with the weapon if firing on an enemy and the shoot animation
	GetComponent.<Animation>().wrapMode = WrapMode.Once;
	
	//** FCE Start
	if(FindClosestEnemy()==null){
	
	}
	else if(FindClosestEnemy()!=null){
	
	if(((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) <= range && dead == false )){
			enemy = true;
			if (!GetComponent.<AudioSource>().isPlaying){
				clientSound = true;
		}if (timer == false && damageTimerSetter == false){
			nextfire = Time.time;
			damageTimerSetter = true;
		}else{
			GetComponent.<Animation>().wrapMode = WrapMode.Once;
		}if(this.transform.name.Contains("Marine") || this.transform.name.Contains("Dozer") || this.transform.name.Contains("Titan") || this.transform.name.Contains("Mothership")){  
			this.GetComponent.<Animation>().Play("shoot");
		}
		//Plays the muzzle flash animation
		snipermuzzleon = true;
		var allChildren2 = gameObject.GetComponentsInChildren(Transform);
		for (var child : Transform in allChildren2){
    		if (child.name == "muzzleflash"){
    			muzzleOff = false;
    			child.GetComponent.<Renderer>().enabled = muzzleflash;
    		}if(child.name.Contains("FlashLight")){
    			//child.gameObject.SetActive(true);
    			
    			child.GetComponent.<Light>().intensity=flashvalue;
    		}
			LookAt();	
    	}
    }
	//Makes warder and dozer run closer to enemies slightly out of range
	else if(((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) <= (range +4) && dead == false) && !this.GetComponent.<Animation>().IsPlaying("shoot") && (this.transform.name.Contains("Warder") || this.transform.name.Contains("Dozer")) ){
		this.transform.LookAt(2*this.transform.position - FindClosestEnemy().transform.position);
		this.transform.Translate(0,0, -speed*Time.deltaTime);
	}
    //Plays the run animation if no enemy is within range
    else if((  ((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) > range) && (dead == false) && !this.GetComponent.<Animation>().IsPlaying("shoot")  )){
	    damageTimerSetter = false;
		enemy = false;
		hasPlayed = false;
		GetComponent.<AudioSource>().Stop();    
    	var allChildren3 = gameObject.GetComponentsInChildren(Transform);
		for (var child2 : Transform in allChildren3){
    		if (child2.name == "muzzleflash") {
    			muzzleOff = true;
    			child2.GetComponent.<Renderer>().enabled = false;
    		}if(child2.name.Contains("FlashLight")){
    			//child2.gameObject.SetActive(false);
    			child2.GetComponent.<Light>().intensity=0;
    		}
    	}
		this.GetComponent.<Animation>().Play("run");
	    if(moveUp == false && moveDown == false){
			if(this.transform.tag=="red" && this.transform.name.Contains("Striker")){			
			    var turret2 = this.transform.Find("turretdummy");
			    turret2.transform.rotation = Quaternion.Euler(270, 180, 0);
			}else if(this.transform.tag == "red" && this.transform.name.Contains("Dozer")){
			    var turret7 = this.transform.Find("turretdummy");
			    turret7.transform.rotation = Quaternion.Euler(0, 180, 0); 
		   	}else if(this.transform.tag == "red"){
				this.transform.rotation = Quaternion.Euler(0, 180, 0);
			}if(this.transform.tag=="blue" && this.transform.name.Contains("Striker")){
		    	var turret3 = this.transform.Find("turretdummy");
		    	turret3.transform.rotation = Quaternion.Euler(270, 0, 0);
		    }else if(this.transform.tag == "blue" && this.transform.name.Contains("Dozer")){
		    	var turret8 = this.transform.Find("turretdummy");
		    	turret8.transform.rotation = Quaternion.Euler(0, 0, 0);
		    }else if(this.transform.tag == "blue"){
		    	this.transform.rotation = Quaternion.Euler(0, 0, 0);
		    }
		}else if(moveUp == true && moveDown == false){
			if(this.transform.tag=="red" && this.transform.name.Contains("Striker")){
			    var turret2a = this.transform.Find("turretdummy");
			    turret2a.transform.rotation = Quaternion.Euler(270, 90, 0);
			}else if(this.transform.tag == "red" && this.transform.name.Contains("Dozer")){
			    var turret7a = this.transform.Find("turretdummy");
			    turret7a.transform.rotation = Quaternion.Euler(0, 90, 0);			  			   
		   	}else if(this.transform.tag == "red"){
				this.transform.rotation = Quaternion.Euler(0, 90, 0);
			}if(this.transform.tag=="blue" && this.transform.name.Contains("Striker")){
		    	var turret3b = this.transform.Find("turretdummy");
		    	turret3b.transform.rotation = Quaternion.Euler(270, 90, 0);
		    }else if(this.transform.tag == "blue" && this.transform.name.Contains("Dozer")){
		    	var turret8b = this.transform.Find("turretdummy");
		    	turret8b.transform.rotation = Quaternion.Euler(0, 90, 0);
		    }else if(this.transform.tag == "blue"){
		    	this.transform.rotation = Quaternion.Euler(0, 90, 0);
		    }
		}else if(moveUp == false && moveDown == true){
			if(this.transform.tag=="red" && this.transform.name.Contains("Striker")){
			    var turret2c = this.transform.Find("turretdummy");
			    turret2c.transform.rotation = Quaternion.Euler(270, 270, 0);
			}else if(this.transform.tag == "red" && this.transform.name.Contains("Dozer")){
			    var turret7c = this.transform.Find("turretdummy");
			    turret7c.transform.rotation = Quaternion.Euler(0, 270, 0);			    
		   	}else if(this.transform.tag == "red"){
				this.transform.rotation = Quaternion.Euler(0, 270, 0);
			}if(this.transform.tag=="blue" && this.transform.name.Contains("Striker")){
		    	var turret3c = this.transform.Find("turretdummy");
		    	turret3c.transform.rotation = Quaternion.Euler(270, 270, 0);
		    }else if(this.transform.tag == "blue" && this.transform.name.Contains("Dozer")){
		    	var turret8c = this.transform.Find("turretdummy");
		    	turret8c.transform.rotation = Quaternion.Euler(0, 270, 0);
		    }else if(this.transform.tag == "blue"){
		    	this.transform.rotation = Quaternion.Euler(0, 270, 0);
		    }
		}
//+++++++++ENFORCES BOUNDS FOR ALL LEVELS BELOW++++++++++
	    if(isLevel1 || isLevel4){
			if(this.transform.position.x >= 6 && (this.transform.tag == "red" || this.transform.tag == "blue")){
				this.transform.position.x = 6;
			}if(this.transform.position.x <= -6 && (this.transform.tag == "red" || this.transform.tag == "blue")){
				this.transform.position.x = -6;
			}			
		}
		if (Physics.Raycast (this.transform.position, transform.TransformDirection(Vector3(0,0,-1)), hit, rayLength) ){
//THIS RAYCAST IS FOR UNITS MOVING AROUND EACH OTHER/FAKE UNIT COLLISION
		    if(moveRight == true || moveLeft == true){
				if(this.transform.tag == "red" && hit.transform.tag == "red"){
					noAlly = false;
		    	 	if (this.transform.position.x > hit.transform.position.x){
		        		this.transform.Translate(-speed*Time.deltaTime*.5,0, 0);
		        	}else{
		        		this.transform.Translate(speed*Time.deltaTime*.5,0, 0);
		          	}		          	
				}else if(this.transform.tag == "blue" && hit.transform.tag == "blue"){
		        	noAlly = false;
		    	    if(this.transform.position.x < hit.transform.position.x){
		        		this.transform.Translate(-speed*Time.deltaTime*.5,0, 0);
		        	}else{
		        		this.transform.Translate(speed*Time.deltaTime*.5,0, 0);
		          	}
		        }else{
		        	noAlly = true;
		        }
		   	}else if(moveUp == true || moveDown == true){
		   		noAlly = false;
		   		if(this.transform.tag == "red" && hit.transform.tag == "red"){
		    	 	if (this.transform.position.z > hit.transform.position.z){
		        		this.transform.Translate(0,0,-speed*Time.deltaTime*.5);
		        	}else{
		        		this.transform.Translate(0,0,speed*Time.deltaTime*.5);
		          	}
		        }else if(this.transform.tag == "blue" && hit.transform.tag == "blue"){
		        	noAlly = false;
					if (this.transform.position.z < hit.transform.position.z){
		        		this.transform.Translate(0,0,-speed*Time.deltaTime*.5);
		        	}else{
		        		this.transform.Translate(0,0,speed*Time.deltaTime*.5);
		          	}
		      	}else{
		        	noAlly = true;
		        }
		  	}	       
		}else{
			noAlly = true;
		}		
		//START bounds raycast
		if (isLevel1 == false && isLevel4 == false){			
			if (Physics.Raycast (this.transform.position, transform.TransformDirection(Vector3(0,0,-1)), hitb, 1) ){
				if((hitb.transform.tag == "middleleftup" || hitb.transform.tag == "middleleftdown") && this.transform.tag == "red"){
					boundsXmax = 500;
					boundsXmin = -500;
					boundsZmax = boundsLeftZMax;
					boundsZmin = boundsLeftZMin;
				}else if((hitb.transform.tag == "middlerightup" || hitb.transform.tag == "middlerightdown") && this.transform.tag == "blue"){
					boundsXmax = 500;
					boundsXmin = -500;
					boundsZmax = boundsRightZMin;
					boundsZmin = boundsRightZMax;
				}else if(hitb.transform.tag == "topleft"){
					if(this.transform.tag == "red"){							  
						boundsXmax = boundsTopXMax;
						boundsXmin = boundsTopXMin;
						boundsZmax = 500;
						boundsZmin = -500;
					}else{
						boundsXmax = 500;
						boundsXmin = -500;					
						boundsZmax = boundsLeftZMax;
						boundsZmin = boundsLeftZMin;					
					}
				}
				else if(hitb.transform.tag == "topright"){
					if(this.transform.tag == "red"){							
					boundsXmax = 500;
					boundsXmin = -500;							
					boundsZmax = boundsRightZMin;
					boundsZmin = boundsRightZMax;
					}else{
					boundsXmax = boundsTopXMax;
					boundsXmin = boundsTopXMin;							
					boundsZmax = 500;
					boundsZmin = -500;							
					}
				}else if(hitb.transform.tag == "bottomleft"){
					if(this.transform.tag == "red"){							 
					boundsXmax = boundsBtmXMax;
					boundsXmin = boundsBtmXMin;							
					boundsZmax = 500;
					boundsZmin = -500;
					}else{
					boundsXmax = 500;
					boundsXmin = -500;							
					boundsZmax = boundsLeftZMax;
					boundsZmin = boundsLeftZMin ;							
					}
				}
				else if(hitb.transform.tag == "bottomright"){				
					if(this.transform.tag == "red"){					 
					boundsXmax = 500;
					boundsXmin = -500;					
					boundsZmax = boundsRightZMin;
					boundsZmin = boundsRightZMax;
					}else{
					boundsXmax = boundsBtmXMax;
					boundsXmin = boundsBtmXMin;					
					boundsZmax = 500;
					boundsZmin = -500;				
					}
				}else if(hitb.transform.tag == "middleleft" && this.transform.tag == "blue"){
					boundsXmax = boundsMainXMax;
					boundsXmin = boundsMainXMin;							
					boundsZmax = 500;
					boundsZmin = -500;				
				}else if(hitb.transform.tag == "middleright" && this.transform.tag == "red"){
					boundsXmax = boundsMainXMax;
					boundsXmin = boundsMainXMin;							
					boundsZmax = 500;
					boundsZmin = -500;				
				}if(this.transform.tag == "red"){
					if(isLevel7 == false){
						if(hitb.transform.tag == "middleleftup" || hitb.transform.tag == "bottomright"){
							moveRight = false;
				   			moveDown = false;
				    		moveLeft = false;
				       		moveUp = true;				       	
				        }else if(hitb.transform.tag == "topleft" || hitb.transform.tag == "bottomleft" || hitb.transform.tag == "middleright"){				       	
					        moveUp = false;
					        moveDown = false;
					        moveLeft = false;
					        moveRight = true;					            
				        }else if(hitb.transform.tag == "topright" || hitb.transform.tag == "middleleftdown"){
				        	moveUp = false;
				        	moveRight = false;
				        	moveDown = true;
				        	moveLeft = false;
				        }
				   }else{
				   		if(hitb.transform.tag == "bottomleft"){
				   			moveUp = true;
				   			moveDown = false;
				   			moveLeft = false;
				   			moveRight = false;
				   		}else if(hitb.transform.tag == "topleft"){
				   			moveUp = false;
				   			moveDown = false;
				   			moveRight = true;
				   			moveLeft = false;
				   		}else if(hitb.transform.tag == "topright"){
				   			moveUp = false;
				   			moveDown = true;
				   			moveRight = false;
				   			moveLeft = false;
				   		}else if(hitb.transform.tag == "bottomright"){
				   			moveUp = false;
				   			moveDown = false;
				   			moveRight = true;
				   			moveLeft = false;
				   		}				   		
				   	}
				}else if(this.transform.tag == "blue"){
					if(isLevel7 == false){
				        if(hitb.transform.tag == "middleleft" || hitb.transform.tag == "topright" || hitb.transform.tag == "bottomright"){
				        	moveUp = false;
				        	moveRight = false;
				        	moveDown = false;
				        	moveLeft = true;
				        }else if(hitb.transform.tag == "middlerightup" || hitb.transform.tag == "bottomleft"){
							moveRight = false;
				   			moveDown = false;
				    		moveLeft = false;
				       		moveUp = true;
				        }else if(hitb.transform.tag == "topleft" || hitb.transform.tag == "middlerightdown"){
				        	moveUp = false;
				        	moveRight = false;
				        	moveDown = true;
				        	moveLeft = false;
				        }
				    }else{
				    	if(hitb.transform.tag == "bottomleft"){
				   			moveUp = false;
				   			moveDown = false;
				   			moveLeft = true;
				   			moveRight = false;
				   		}else if(hitb.transform.tag == "topleft"){
				   			moveUp = false;
				   			moveDown = true;
				   			moveRight = false;
				   			moveLeft = false;
				   		}else if(hitb.transform.tag == "topright"){
				   			moveUp = false;
				   			moveDown = false;
				   			moveRight = false;
				   			moveLeft = true;
				   		}else if(hitb.transform.tag == "bottomright"){
				   			moveUp = true;
				   			moveDown = false;
				   			moveRight = false;
				   			moveLeft = false;
				   		}
				    }
				}						
			}
		}	
//+++++++++++++++++++MAIN MOVEMENT CODE FOR FORWARD MOVEMENT++++++++++++++++++++++++++
		if((this.transform.tag == "red" || this.transform.tag == "blue") && (this.transform.name.Contains("Dozer") || this.transform.name.Contains("Striker")) ){
			if(moveUp == true){
				this.transform.rotation = Quaternion.Euler(0, 90, 0);
		    	this.transform.Translate(0, 0, -speed*Time.deltaTime);
		    }else if(moveDown == true){
		    	this.transform.rotation = Quaternion.Euler(0, -90, 0);
		    	this.transform.Translate(0, 0, -speed*Time.deltaTime);
		    }else if(moveLeft == true){
				this.transform.rotation = Quaternion.Euler(0, 0, 0);
				this.transform.Translate(0,0, -speed*Time.deltaTime);
			}else if(moveRight == true){
				this.transform.rotation = Quaternion.Euler(0, 180, 0);
				this.transform.Translate(0,0, -speed*Time.deltaTime);
			}
		}else if(this.transform.tag == "red" && (!this.transform.name.Contains("Dozer") || !this.transform.name.Contains("Striker")) ){
			if(moveUp == true){
				this.transform.rotation = Quaternion.Euler(0, 90, 0);
		    	this.transform.Translate(0, 0, -speed*Time.deltaTime);		    
		    }if(moveDown == true){
		    	this.transform.rotation = Quaternion.Euler(0, -90, 0);
		    	this.transform.Translate(0, 0, -speed*Time.deltaTime);
		    }if(moveLeft == true){
				this.transform.rotation = Quaternion.Euler(0, 0, 0);
				this.transform.Translate(0,0, -speed*Time.deltaTime);
			}if(moveRight == true){
				this.transform.rotation = Quaternion.Euler(0, 180, 0);
				this.transform.Translate(0,0, -speed*Time.deltaTime);
			}
		}else if(this.transform.tag == "blue"&& (!this.transform.name.Contains("Dozer") || !this.transform.name.Contains("Striker")) ){
			if(moveUp == true){
				this.transform.rotation = Quaternion.Euler(0, 90, 0);
		    	this.transform.Translate(0, 0, -speed*Time.deltaTime);
		    }if(moveDown == true){
		    	this.transform.rotation = Quaternion.Euler(0, -90, 0);
		    	this.transform.Translate(0, 0, -speed*Time.deltaTime);
		    }if(moveLeft == true){
				this.transform.rotation = Quaternion.Euler(0, 0, 0);
				this.transform.Translate(0,0, -speed*Time.deltaTime);
			}if(moveRight == true){
				this.transform.rotation = Quaternion.Euler(0, 180, 0);
				this.transform.Translate(0,0, -speed*Time.deltaTime);
			}
		}	
//+++++++++++++++++++++++++ENFORCEMENT++++++++++++++++++++++++++
		if (isLevel1 == false && isLevel4 == false){
			// if(middleLane == false){
			// 	if(this.transform.position.x < boundsMainXMax && this.transform.position.x > boundsMainXMin && (this.transform.position.z > boundsRightZMax || this.transform.position.z < boundsLeftZMax)){
			// 		//print("In Middle Lane");
			// 		middleLane = true;
			// 	}
			// }else{
			// 	if(this.transform.position.x > boundsMainXMax && this.transform.position.x < boundsMainXMin && this.transform.position.z < boundsRightZMax && this.transform.position.z > boundsLeftZMax){
			// 		//print("Not In Middle Lane");
			// 		middleLane = false;
			// 	}
			// }
			if(this.transform.position.z < boundsRightZMax && this.transform.position.z > boundsLeftZMax){
					
			}
			if (this.transform.tag == "red" && moveRight == true){
				//Red units attacking base can't run past it
				if(this.transform.position.z > boundsMainZMax){
					//print("979");
					this.transform.position.z = boundsMainZMax;
				//Red units moving right above the level
				}else if (this.transform.position.x < boundsTopXMin && this.transform.position.z < 0){
					//print("983");		
					this.transform.position.x = boundsTopXMin;				
				}else if (this.transform.position.x > boundsBtmXMax && this.transform.position.z < 0){
					//print("986");		
					this.transform.position.x = boundsBtmXMax;				
				}				
				//Red units at bottom right corner, to move up
				else if (this.transform.position.x > (boundsMainXMax + 3)  && this.transform.position.z >= boundsRightZMin){
					//print("984");
					if(!isLevel8){
						moveRight=false;
						moveUp=true;
						this.transform.position.z = boundsRightZMin;
					}
				}
				else if (this.transform.position.x < (boundsMainXMax + 3) && this.transform.position.x > boundsMainXMax && this.transform.position.z >= boundsRightZMin){
					//print("1013");
					if(!isLevel8){
						moveRight=true;
						moveUp=false;
						this.transform.position.x = boundsMainXMax;
					}
				}
				//Red units at top right corner, to move down
				else if (this.transform.position.x < (boundsMainXMin -3) && this.transform.position.z >= boundsRightZMin){
					//print("993");
					if(isLevel3 == true || isLevel6 == true){
						moveDown=true;
						moveRight=false;
						this.transform.position.z = boundsRightZMin;	
					}else if(isLevel8 == false){				
						moveRight=false;
						moveDown=true;
						this.transform.position.z = boundsRightZMin;
						}						
				}else if (this.transform.position.x > (boundsMainXMin -3) && this.transform.position.x < boundsMainXMin && this.transform.position.z >= boundsRightZMin){
					//print("1025");
					if(isLevel3 == true || isLevel6 == true){
						moveDown=true;
						moveRight=false;
						this.transform.position.x = boundsMainXMin;	
					}else{				
						moveRight=true;
						moveDown=false;
						this.transform.position.x = boundsMainXMin;
						}						
				}
				//Red units moving out of red base, runs checker function to decide whether to move up or down
				else if ((this.transform.position.x < boundsMainXMax) && (this.transform.position.x > boundsMainXMin) && (this.transform.position.z > boundsLeftZMax) && this.transform.position.z < -16){
					//print("1005");
					ArrowChecker();
				}else if (this.transform.position.x > 0 && this.transform.position.x > boundsBtmXMax && this.transform.position.z < (boundsRightZMax-1) && this.transform.position.z > boundsLeftZMax){
					//print("1008");
					this.transform.position.x = boundsBtmXMax;
				}else if (this.transform.position.x > 0 && this.transform.position.x < boundsBtmXMin && this.transform.position.z < (boundsRightZMax-1) && this.transform.position.z > boundsLeftZMax){
					//print("1011");
					if(isLevel7 == true){
						this.transform.position.z = boundsLeftZMax;
						moveUp = true;
						moveRight = false;
					}else{
						PositionChecker();
						//this.transform.position.x = boundsBtmXMin;
					}
				//Red Units moving right along top lane be above bounds
				}else if (this.transform.position.x < 0 && this.transform.position.x < boundsTopXMin && this.transform.position.z < (boundsRightZMax) && this.transform.position.z > boundsLeftZMax){
					//print("1020");
					this.transform.position.x = boundsTopXMin;
				//Red Units moving right along top lane be below bounds
				}else if (this.transform.position.x < 0 && this.transform.position.x > boundsTopXMax && this.transform.position.z < (boundsRightZMax -1) && this.transform.position.z > boundsLeftZMax){
					//print("1023");
					PositionChecker();
					//this.transform.position.x = boundsTopXMax;
				}							
			}else if(this.transform.tag=="red" && moveUp == true){
				//Red Units moving up from bottom right stuck in center
				if (this.transform.position.x > boundsTopXMin && this.transform.position.z > 0 && this.transform.position.z < boundsRightZMax){	
					//print("1031");
					this.transform.position.z = boundsRightZMax;
				}
				//Red units at top left corner, to move right
				else if (this.transform.position.x < boundsTopXMin && this.transform.position.z > 0){
					//print("1033");		
					moveUp = false;
					moveRight = true;
					this.transform.position.x = boundsTopXMin;				
				}else if (this.transform.position.x < boundsTopXMin && this.transform.position.z < 0){
					//print("1042");		
					moveUp = false;
					moveRight = true;
					this.transform.position.x = boundsTopXMin;				
				}
				//Moving up from bottom right, turning into blue base
				else if (this.transform.position.x < boundsMainXMin && this.transform.position.z > 0){	
					//print("1040");					
					moveUp=false;
					moveRight = true;
					this.transform.position.x = boundsMainXMin;	
				}else if(this.transform.position.z < 0 && this.transform.position.z < boundsLeftZMin){
					//print("1045");
					this.transform.position.z = boundsLeftZMin;
				}else if(this.transform.position.z < 0 && this.transform.position.z > boundsLeftZMax){
					//print("1048");
					this.transform.position.z = boundsLeftZMax;
				}else if(this.transform.position.z > 0 && this.transform.position.z > boundsRightZMin){
					//print("1051");
					this.transform.position.z = boundsRightZMin;
				}else if(this.transform.position.z > 0 && this.transform.position.z < boundsLeftZMax){
					//print("1054");
					this.transform.position.z = boundsRightZMax;					
				}				
			}else if (this.transform.tag=="red" && moveDown == true){
				//Red units moving down stuck in center
				if (this.transform.position.x < boundsBtmXMin && this.transform.position.z > 0 && this.transform.position.z < boundsRightZMax){	
					//print("1069");
					this.transform.position.z = boundsRightZMax;
				}
				//Red units moving down from Top Right, to turn into blue base					
				else if (this.transform.position.x >= boundsMainXMax && this.transform.position.z > 0){	
					//print("1060");		
					moveDown=false;
					moveRight=true;
					this.transform.position.x = boundsMainXMax;					
				}
				//Red Units move down from red base side, to move right along bottom lane
				else if(this.transform.position.x >= boundsBtmXMax && this.transform.position.z < 0){	
					//print("1067");				
					moveDown=false;
					moveRight=true;
					this.transform.position.x = boundsBtmXMax;					
				}else if(this.transform.position.z < 0 && this.transform.position.z < boundsLeftZMin){
					//print("1072");
					if(isLevel8 == false){
						this.transform.position.z = boundsLeftZMin;
					}
				}else if(this.transform.position.z < -4 && this.transform.position.z > boundsLeftZMax){
					//print("1075");
					this.transform.position.z = boundsLeftZMax;
				}else if(this.transform.position.z > 0 && this.transform.position.z > boundsRightZMin){
					//print("1078");
					this.transform.position.z = boundsRightZMin;
				}else if(this.transform.position.z > 0 && this.transform.position.z < boundsLeftZMax){
					//print("1081");
					this.transform.position.z = boundsRightZMax;
				}
			}else if (this.transform.tag == "blue" && moveLeft == true){	
				////print("1139");
				//Blue units cannot run past the opposing players base	
				if(this.transform.position.z < boundsMainZMin){
					this.transform.position.z = boundsMainZMin;
				//Blue units left right above the level
				}else if (this.transform.position.x < boundsTopXMin && this.transform.position.z > 0){
				//print("1138");	
					if(!isLevel7){	
					this.transform.position.x = boundsTopXMin;	
					}			
				}else if (this.transform.position.x > boundsBtmXMax && this.transform.position.z > 0){
					//print("1141");		
					this.transform.position.x = boundsBtmXMax;				
				}else if(this.transform.position.z > 0 && this.transform.position.z <= boundsRightZMax && this.transform.position.x > boundsMainXMin && this.transform.position.x < boundsMainXMax){
					//print("1144");
					ArrowChecker();			
				}
				//Blue going left on btm, to turn up
				else if(this.transform.position.x > (boundsMainXMax + 3) && this.transform.position.z <= boundsLeftZMin){
					//print("1149");
					moveLeft=false;
					moveUp=true; 
					this.transform.position.z = boundsLeftZMin;					
				}
				else if(this.transform.position.x < (boundsMainXMax + 3) && this.transform.position.x > boundsMainXMax && this.transform.position.z <= boundsLeftZMin){
					//print("1155");
					moveLeft=true;
					moveUp=false; 
					this.transform.position.x = boundsMainXMax;					
				}
				//Blue going left on top, to turn down
				else if(this.transform.position.x < (boundsMainXMin - 3) && this.transform.position.z < boundsLeftZMin){
					//print("1156");
					moveLeft=false;
					moveDown=true;
					this.transform.position.z = boundsLeftZMin;
				}else if(this.transform.position.x > (boundsMainXMin - 3) && this.transform.position.x < boundsMainXMin && this.transform.position.z < boundsLeftZMin){
					//print("1167");
					moveLeft=true;
					moveDown=false;
					this.transform.position.x = boundsMainXMin;
				}else if (this.transform.position.x > 0 && this.transform.position.x > boundsBtmXMax && this.transform.position.z < (boundsRightZMax-1) && this.transform.position.z > boundsLeftZMax){
					//print("1161");
					this.transform.position.x = boundsBtmXMax;
				}else if (this.transform.position.x > 0 && this.transform.position.x < boundsBtmXMin && this.transform.position.z < (boundsRightZMax-1) && this.transform.position.z > boundsLeftZMax){
					//print("1164");
					if(isLevel7 == true){
						this.transform.position.z = boundsLeftZMax;
						moveUp = true;
						moveLeft = false;
					}else{
						PositionChecker();
						//this.transform.position.x = boundsBtmXMin;
					}
				}else if (this.transform.position.x < 0 && this.transform.position.x < boundsTopXMin && this.transform.position.z < (boundsRightZMax-1) && this.transform.position.z > boundsLeftZMax){
					//print("1173");
					this.transform.position.x = boundsTopXMin;
				}else if (this.transform.position.x < 0 && this.transform.position.x > boundsTopXMax && this.transform.position.z < (boundsRightZMax-1) && this.transform.position.z > boundsLeftZMax){
					//print("1176");
					PositionChecker();
					//this.transform.position.x = boundsTopXMax;					
				}			
			}else if (this.transform.tag=="blue" && moveDown == true){
				//Blue units moving down from top left, to turn left into red base					
				if (this.transform.position.x >= boundsMainXMax && this.transform.position.z < 0){	
					//print("1182");				
					moveDown=false;
					moveLeft=true;
					this.transform.position.x = boundsMainXMax;
				}
				//Blue units moving down towards btm right, to turn left along bottom
				else if(this.transform.position.x >= boundsBtmXMax && this.transform.position.z > 0){
				//print("1189");					
					moveDown=false;
					moveLeft=true;
					this.transform.position.x = boundsBtmXMax ;
				}else if(this.transform.position.z < 0 && this.transform.position.z < boundsLeftZMin){
					//print("1194");
					this.transform.position.z = boundsLeftZMin;
					
				}else if(this.transform.position.z < 0 && this.transform.position.z > boundsLeftZMax){
					//print("1198");
					this.transform.position.z = boundsLeftZMax;
					
				}else if(this.transform.position.z > 0 && this.transform.position.z > boundsRightZMin){
					//print("1202");
					this.transform.position.z = boundsRightZMin;
					
				}else if(this.transform.position.z > 0 && this.transform.position.z < boundsLeftZMax){
					//print("1206");
					this.transform.position.z = boundsRightZMax;					
				}				
			}
			else if(this.transform.tag=="blue" && moveUp == true){
				//Blue units moving up at top right corner, to move left along top
				if (this.transform.position.x <= boundsTopXMin && this.transform.position.z > 0){
					//print("1213");
					moveUp = false;
					moveLeft = true;
					this.transform.position.x = boundsTopXMin;
				}
				//Blue units Moving up from bottom left, turning left into red base
				else if (this.transform.position.x <= boundsMainXMin && this.transform.position.z < 0){	
					//print("1220");
					if(!isLevel7){		
						moveUp=false;
						moveLeft = true;
						this.transform.position.x = boundsMainXMin;
					}else{
						this.transform.position.z = boundsRightZMax;
					}
				}else if(this.transform.position.z < 0 && this.transform.position.z < boundsLeftZMin){
					//print("1225");
					this.transform.position.z = boundsLeftZMin;
				}else if(this.transform.position.z < 0 && this.transform.position.z > boundsLeftZMax){
					if(!isLevel7){
						//print("1228");
						this.transform.position.z = boundsLeftZMax;
					}
				}else if(this.transform.position.z > 0 && this.transform.position.z > boundsRightZMin){
					//print("1231");
					this.transform.position.z = boundsRightZMin;
				}else if(this.transform.position.z > 0 && this.transform.position.z < boundsLeftZMax){
					//print("1234");
					this.transform.position.z = boundsRightZMax;
				}
				
			}
		}  
	}else{
		enemy = false;
		var allChildren4 = gameObject.GetComponentsInChildren(Transform);
		for (var child3 : Transform in allChildren4){
    		if (child3.name == "muzzleflash") {
    			child3.GetComponent.<Renderer>().enabled = muzzleflash;
    		}if(child3.name.Contains("FlashLight")){
    			//child3.gameObject.SetActive(true);
    			child3.GetComponent.<Light>().intensity=flashvalue;
    		}
    	}
    	//Stops units from running past bases in Level1 and Level4
		if(this.transform.tag == "red"){
			if(this.transform.position.z > boundsMainZMax){
				this.transform.position.z = boundsMainZMax;
			}
		}else if(this.transform.tag == "blue"){
			if(this.transform.position.z < boundsMainZMin){
				this.transform.position.z = boundsMainZMin;
			}
		}
    }

    //Apply damage for all units but warder
	if((Time.time > nextfire) && !this.transform.name.Contains("Warder")){
    	nextfire = Time.time + delay;
    	timer = true;
	}else{
		timer = false;
		
	}if(timer == true && enemy==true && !FindClosestEnemy().name.Contains("Base")){
		this.GetComponent.<Animation>().Play("shoot");
		snipermuzzleon1 = true;
		ShootSound();
		second = 0;
		//V8
		if(FindClosestEnemy().GetComponent(Unitcontroller)){
			var tempscript : Unitcontroller = FindClosestEnemy().GetComponent(Unitcontroller);
		
			tempscript.Applydmg(pwr,isLightDamage);
		}
		if(highGraphics == true){
			if(this.transform.name.Contains("Cannoneer") || this.transform.name.Contains("Striker") ){
				Instantiate(cannoneerExplosion, FindClosestEnemy().transform.position + Vector3(0,4,0), FindClosestEnemy().transform.rotation);	
			}
		}
	}else if(timer == true && enemy == true && FindClosestEnemy().name.Contains("Base")){
		this.GetComponent.<Animation>().Play("shoot");	
		snipermuzzleon1 = true;
		ShootSound();
		second = 0;
		//V8
		if(FindClosestEnemy().GetComponent(BaseManager)){
			var tempscript2 : BaseManager = FindClosestEnemy().GetComponent(BaseManager);
			tempscript2.Applydmg(pwr,isLightDamage);
		}				
	}
	
	}
	//***FCEEND
	
	currentPos = this.transform.position;
	currentRot = this.transform.rotation;	
	if(nukeRed == true){				
	NukeDeath();
	}if(nukeBlue == true){				
	NukeDeath();
	}
}
//END UPDATE
function NukeDeath(){
	var mothershipDamage : int;
	mothershipDamage = Random.Range(50,101);
	if(!this.transform.name.Contains("Mother")){
		if(nukeRed == true && this.transform.tag == "blue"){
			if(GameObject.Find("SinglePlayer") || GameObject.Find("SinglePlayer(Clone)")){					
				Die(); 					
			}else if(GameObject.Find("MultiPlayer")){
				Die();
			}
			yield WaitForSeconds(.5);
			nukeRed = false;
		}if(nukeBlue == true && this.transform.tag == "red"){
	 		if(GameObject.Find("SinglePlayer") || GameObject.Find("SinglePlayer(Clone)")){
	 			Die();		 		
		 	}else if(GameObject.Find("MultiPlayer")){
		 		Die();	
 			}
		 	yield WaitForSeconds(.5);
			nukeBlue = false;
		}
	}else if((mothershipNuked == false && this.transform.tag == "blue") && this.transform.name.Contains("Mother")){			
		this.Applydmg(mothershipDamage, false);
		mothershipNuked = true;		
	}else if((mothershipNuked == false && this.transform.tag == "red") && this.transform.name.Contains("Mother")){
		this.Applydmg(mothershipDamage, false);
		mothershipNuked = true;
	}
}
static function Nuke(nukeBluex : boolean, nukeRedx : boolean){
	nukeRed = nukeRedx;
	nukeBlue = nukeBluex;	
}
static function Save(color : String){
	PlayerPrefs.SetString("Color", color);
}
function ArrowChecker(){

	 if(isLevel7 == true){
		moveUp = true;
		moveRight = false;
		moveLeft = false;
		if(this.transform.tag == "red"){
			this.transform.position.z = boundsLeftZMax;
		}else if(this.transform.tag == "blue"){
			this.transform.position.z = boundsRightZMax;
		}	
	}if(GameObject.Find("UpLeft") || GameObject.Find("UpLeft(Clone)") || GameObject.Find("Lvl8UpLeft") || GameObject.Find("Lvl8UpLeft(Clone)")){
		moveUp=true;
		moveRight=false;
		moveLeft=false;
		if(this.transform.tag=="red"){
			this.transform.position.z = boundsLeftZMax;
		}else{
			this.transform.position.z = boundsRightZMax;
		}
	}else if(GameObject.Find("DownLeft") || GameObject.Find("DownLeft(Clone)") || GameObject.Find("Lvl8DownLeft") || GameObject.Find("Lvl8DownLeft(Clone)")){
		moveDown=true;
		moveRight=false;
		moveLeft=false;
		if(this.transform.tag=="red"){
			this.transform.position.z = boundsLeftZMax;
		}else{
			this.transform.position.z = boundsRightZMax;
		}
	}
}
function PositionChecker(){
	if(this.transform.position.x < 0){
		
		if(this.transform.tag=="red"){
			moveUp=false;
			moveRight=true;
			moveLeft=false;
			this.transform.position.x = boundsTopXMax;
		}else{
			moveUp = false;
			moveDown = false;
			moveLeft = true;
			this.transform.position.x = boundsTopXMax;
		}
	}else if(this.transform.position.x > 0){
		
		if(this.transform.tag=="red"){
			moveDown=false;
			moveRight=true;
			moveLeft=false;
			this.transform.position.x = boundsBtmXMin;
		}else{
			moveDown = false;
			moveUp = false;
			moveLeft = true;
			this.transform.position.x = boundsBtmXMin;
		}
	}
}
function ShootSound(){
	GetComponent.<AudioSource>().clip = shoot;
	GetComponent.<AudioSource>().Play();	
}


//** Could be cause of crashes on S4 ** Due to null object reference ** fixed null here and at the other //** tags by explicitly telling it to do nothing when it returns null, before it didnt know what to do
function FindClosestEnemy () : GameObject{	
    var gos : GameObject[];
    if(this.transform.tag == "red"){
    	gos = GameObject.FindGameObjectsWithTag("blue"); 
    }if(this.transform.tag == "blue"){
    	gos = GameObject.FindGameObjectsWithTag("red");
    }
    var closest : GameObject;
    var distance = Mathf.Infinity; 
    //var position = transform.position;
    if(gos!=null){ 
	    for(var go : GameObject in gos){ 
	    	var curDistance = Vector3.Distance(go.transform.position , this.transform.position); 
	        if (curDistance < distance){ 
	        	
	        		closest = go; 
	        		//Array.Clear(gos,0,999);
	        	distance = curDistance; 
	        } 
	    }
    }
    else{
    
    }
     	 
    	return closest;
    	//gos.Clear();
  
}
function Applydmg (dmg : float, isLightDamage2 : boolean){
	if(isLightDamage2 == false && isLightArmor == false){
		dmg = dmg * 1.18;
	}if(isLightDamage2 == true && isLightArmor == false){
		dmg = dmg * .82;
	}
	health = health - dmg;
	//Change Health Orb Color
	var orb = this.transform.Find("healthorb");
	orb.transform.localScale = Vector3(((health/maxHealth)*.33)+.2,((health/maxHealth)*.33)+.2,((health/maxHealth)*.33)+.2);
	if((health / maxHealth) >=  .67){
		orb.GetComponent.<Renderer>().material.color = Color.green; 
	}else if((health / maxHealth) < .67 && (health / maxHealth) > .33){
		orb.GetComponent.<Renderer>().material.color = Color.yellow; 
	}else if((health / maxHealth) <= .33){
		orb.GetComponent.<Renderer>().material.color = Color.red;
	}	
}
function Die(){
	//if commander unit removes buff from all units, if no other commander is present
	var commandername:String;
	commandername=this.transform.name;
	if(this.transform.name.Contains("itan")||this.transform.name.Contains("biter") ){
		this.transform.name="dyingcommanderunit";
	}else{}
		
	var i:int=0;
	for(var gameObj : GameObject in GameObject.FindObjectsOfType(GameObject))
	{
    	if(gameObj.transform.name==commandername )
    	{
    	    i++;
    	}
	}
	if(i<1){
	 	if(this.transform.name=="dyingcommanderunit" ){
    		RemoveCommanderBuff();	
   		}else{}
	}else{
	
	
	}

	GetComponent.<AudioSource>().clip = death1;
	GetComponent.<AudioSource>().Play();	
	if(multiPlayer == true){
		if(this.transform.tag == "red"){
			guiManager.GetComponent(GameGUI_Manager);						
			if(Network.isClient){				
				GameGUI_Manager.RedBonus(deathBonus);								
			}else{//MIGHT BE BREAKING POINTS ON DEATH
		 		GameGUI_Manager.ScoreRed(pointsOnDeath);
			}
		}else if(this.transform.tag == "blue"){
			guiManager.GetComponent(GameGUI_Manager);
			if(Network.isServer){			
			GameGUI_Manager.BlueBonus(deathBonus);	
			GameGUI_Manager.ScoreBlue(pointsOnDeath);		 
			}
		}	
	}
	else if(multiPlayer == false){
		if(this.transform.tag == "red"){
			guiManager.GetComponent(GameGUI_SinglePlayer);
			GameGUI_SinglePlayer.ScoreRed(pointsOnDeath);  
			GameGUI_SinglePlayer.RedBonus(deathBonus);
		}else if(this.transform.tag == "blue"){
			guiManager.GetComponent(GameGUI_SinglePlayer);
			GameGUI_SinglePlayer.ScoreBlue(pointsOnDeath); 
				if(raceHuman == true){
					AIHuman.BlueBonus(deathBonus);
				}else{
					AIAlien.BlueBonus(deathBonus);
				}
			
		}
	}
	var allChildren6 = gameObject.GetComponentsInChildren(Transform);
	for (var child7 : Transform in allChildren6){
    	if (child7.name == "muzzleflash"){
    		child7.GetComponent.<Renderer>().enabled = false;
    	}if(child7.name.Contains("FlashLight")){
    			//child7.gameObject.SetActive(false);
    			child7.GetComponent.<Light>().intensity=0;
    	}
    }if(highGraphics == true){
    	Instantiate(blood, this.transform.position, this.transform.rotation);
	}
	var orb = this.transform.Find("healthorb");
	orb.GetComponent.<Renderer>().enabled = false;
	this.GetComponent.<Animation>().Play("die",PlayMode.StopAll);
	//WARDER SPLASH DAMAGE ON DEATH
	if(this.transform.name.Contains("Warder")){
		var gosx : GameObject[];
		if(this.transform.tag == "red"){
			gosx = GameObject.FindGameObjectsWithTag("blue"); 
		}else if(this.transform.tag == "blue"){
			gosx = GameObject.FindGameObjectsWithTag("red");
		}   
	    for(var gox : GameObject in gosx){
	    	var curDistancex = Vector3.Distance(gox.transform.position , this.transform.position);	    	
	    	if (curDistancex <= (range*2) && !gox.transform.name.Contains("Base")){		    		
	    		var tempscriptx : Unitcontroller = gox.GetComponent(Unitcontroller);
				tempscriptx.Applydmg(pwr,isLightDamage);
				warderLoop = false;
				maxSplash = maxSplash + 1;
				if(maxSplash >= gosx.length){
					break;
				}					
			}else{
				maxSplash = maxSplash + 1;
				if(maxSplash >= gosx.length){
					break;				
				}
			}
		}		
	}
	this.transform.tag = "dead";
	yield WaitForSeconds (deathtimer);
	if(multiPlayer == false){
	Destroy(this.gameObject);
	}else if(multiPlayer == true){
	Network.Destroy(this.gameObject);
	}
}


function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo){
	var aposition : Vector3;
	var arotation : Quaternion;
	var ahealth : float;	
	if(GameObject.Find("MultiPlayer")){
		if(stream.isWriting && Network.isServer){
			aposition = transform.position;
			arotation = transform.rotation;
			ahealth = health;
			stream.Serialize (aposition);
			stream.Serialize (arotation);
			stream.Serialize (ahealth);			
		}else if(stream.isReading && Network.isClient) {
			stream.Serialize(aposition);
			stream.Serialize(arotation);
			stream.Serialize(ahealth);
			transform.position = aposition;
			transform.rotation = arotation;
			health = ahealth;
		}
	}
}

function LookAt(){
	if(lookAtTimer >= .5){
		if(this.transform.name.Contains("Striker")){
			var turret = this.transform.Find("turretdummy");
			turret.transform.LookAt(2*this.transform.position - Vector3((FindClosestEnemy().transform.position.x), (FindClosestEnemy().transform.position.y-120),(FindClosestEnemy().transform.position.z)));
		}else if(this.transform.name.Contains("Dozer")){
			var turret9 = this.transform.Find("turretdummy"); 
			turret9.transform.LookAt(2*this.transform.position - (Vector3((FindClosestEnemy().transform.position.x), (FindClosestEnemy().transform.position.y-2),(FindClosestEnemy().transform.position.z))));
		}else{
			this.transform.LookAt(2*this.transform.position - FindClosestEnemy().transform.position);
		}if(this.transform.name.Contains("Warder") || this.transform.name.Contains("Dozer") ){
			this.transform.LookAt(2*this.transform.position - FindClosestEnemy().transform.position);	
		}
	}	
}

function ApplyCommanderBuff(){
	//applies commander buff to all allied units by titan
	var units;
	
	
	
	if(this.transform.tag=="red"){
		units = GameObject.FindGameObjectsWithTag("red");
		for (var unit:GameObject in units){
			if(unit.GetComponent(Unitcontroller)){
				unit.GetComponent(Unitcontroller).AddComBuff();	
			}else{}
		}
	}else{
		units = GameObject.FindGameObjectsWithTag("blue");
		for (var unit:GameObject in units){
			if(unit.GetComponent(Unitcontroller)){
				unit.GetComponent(Unitcontroller).AddComBuff();	
			}else{}
		}
	}
	
}

function RemoveCommanderBuff(){
	//removes commander buff to all allied units by titan
	
	var units;
	
	if(this.transform.tag=="red"){
		units = GameObject.FindGameObjectsWithTag("red");
		for (var unit:GameObject in units){
			if(unit.GetComponent(Unitcontroller)&&!unit.transform.name.Contains("itan")&&!unit.transform.name.Contains("biter")){
				unit.GetComponent(Unitcontroller).RemComBuff();	
			}else{}
		}
	}else{
		units = GameObject.FindGameObjectsWithTag("blue");
		for (var unit:GameObject in units){
			if(unit.GetComponent(Unitcontroller)&&!unit.transform.name.Contains("itan")&&!unit.transform.name.Contains("biter")){
				unit.GetComponent(Unitcontroller).RemComBuff();	
			}else{}
		}
	}
}

function AddComBuff(){
	var shadow:Transform;
	shadow = this.transform.Find("shadow");
	if(!currentlyBuffed){
		currentlyBuffed=true;
		//unit adds pwr to itself
		commanderBuffAmount=(pwr*.2);
		pwr = pwr+commanderBuffAmount;
	
		//Unit changes floor icon to buffed
		
								//shadowMap);
		if(shadow!=null){
			shadow.gameObject.GetComponent.<Renderer>().material.mainTexture=comBuffMap;
		}else{}
	}
	
}
function RemComBuff(){
	var shadow:Transform;
	shadow = this.transform.Find("shadow");
	
	if(currentlyBuffed ){
		currentlyBuffed=false;
		//unit removes pwr from itself
		pwr = pwr-commanderBuffAmount;
	
		//Unit changes foor icon to normal shadow
		
								//shadowMap);
		if(shadow!=null){
			shadow.gameObject.GetComponent.<Renderer>().material.mainTexture=shadowMap;
		}else{}
	}
}




