#pragma strict
//Variables for Warder
var warderLoop : boolean = true;
var maxSplash : int = 0;
//Variables for .5 second delay
var delay : float = 1;
var nextfire : float;
var timer : boolean = false;
//Variables for Nuke
static var nukeRedHealth : float = 0;
static var nukeBlueHealth : float = 0;
static var nukedBlue : boolean = false;
static var nukedRed : boolean = false;
//Variables for unit
var speed : float = 10;
var pwr : float = 4;
var range : float = 13;
var minRange : float = 3;
var health : float;
var maxHealth : float;
var rayLength : float;
//Variable for muzzle flash blinking
var muzzleflash : boolean = false;
//Variable for defining enemy
var enemy : boolean = false;
//Variables for death
var blood : GameObject;
var dead : boolean = false;
var deathtimer : float = 0.5;
//Variables for sound
var shoot : AudioClip;
var hasPlayed: boolean = false; 
var death1 : AudioClip;
//Variables for score
var guiManager : GameObject;
var guiManagerSingle : GameObject;
var pointsOnDeath : int = 50;
//Variables for money bonus
var deathBonus : int = 5;
//Variables for muzzle flash for different units
var second : float;
var snipermuzzleon : boolean;
var snipermuzzleon1 : boolean;
var yellowmat : Material;
var damageTimerEnemy : boolean = true;
var unitControllerInstance : Unitcontroller;
//Variables for speed power up
static var speedMultiplierRed : float = 1;
static var speedMultiplierBlue: float = 1;
//Variables for damage power up
static var damageMultiplierRed : float = 1;
static var damageMultiplierBlue : float = 1;
//variables for health power up
static var healthMultiplierRed : float = 1;
static var healthMultiplierBlue : float = 1;
//Variables for timer to make units send damage correctly
var damageTimer : float;
var damageTimerSetter : boolean = false;
//Human

var sniperLightCounter : int = 2;
var marineLightCounter : int = 1;
var cannoneerLightCounter : int = 1;
var dozerHeavyCounter : int = 1;
var strikerHeavyCounter : int = 2;
var titanLightCounter : int = 4;
var grieferHeavyCounter : int = 1;
var disrupterLightCounter : int = 3;

var cannoneerCounter : int = 1;

var blueNuke : boolean = false;
var redNuke : boolean = false;


var unitCounterRed : int = 1;

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



var killUnits : boolean = false;

var moveUp : boolean;
var changeDirection : int;
var noSwitch : boolean;

function Start(){


//var viewID : NetworkViewID= Network.AllocateViewID();
//GLOBAL RPC TEST START
//if(Network.isServer){
	if(this.transform.tag == "red"){
	this.transform.rotation = Quaternion.Euler(0, 180, 0);
	}
	noSwitch = false;

	var upgr : GameObject[];
    upgr = GameObject.FindGameObjectsWithTag("upgradered");
	for (var upgred : GameObject in upgr){ 
		if(upgred.transform.name.Contains("Speed")){
    	speedRedCounter = speedRedCounter + 1;
    	}
    	if(upgred.transform.name.Contains("Power")){
    	powerRedCounter = powerRedCounter + 1;
    	}
    	if(upgred.transform.name.Contains("Health")){
    	healthRedCounter = healthRedCounter + 1;
		}
	}
	var upgb : GameObject[];
    upgb = GameObject.FindGameObjectsWithTag("upgradeblue");
	for (var upgblue : GameObject in upgb){ 
		if(upgblue.transform.name.Contains("Speed")){
    	speedBlueCounter = speedBlueCounter + 1;
    	}
    	if(upgblue.transform.name.Contains("Power")){
    	powerBlueCounter = powerBlueCounter + 1;
    	}
    	if(upgblue.transform.name.Contains("Health")){
    	healthBlueCounter = healthBlueCounter + 1;
		}
	}
	
	//Upgrade Multipliers Red
	//POWER
	if(powerRedCounter == 1){
	damageMultiplierRed = 1.1;
	}
	if(powerRedCounter == 2){
	damageMultiplierRed = 1.2;
	}
	if(powerRedCounter == 3){
	damageMultiplierRed = 1.3;
	}
	if(powerRedCounter == 4){
	damageMultiplierRed = 1.4;
	}
	if(powerRedCounter == 5){
	damageMultiplierRed = 1.5;
	}
	//SPEED
	if(speedRedCounter == 1){
	speedMultiplierRed = 1.07;
	}
	if(speedRedCounter == 2){
	speedMultiplierRed = 1.14;
	}
	if(speedRedCounter == 3){
	speedMultiplierRed = 1.21;
	}
	if(speedRedCounter == 4){
	speedMultiplierRed = 1.28;
	}
	if(speedRedCounter == 5){
	speedMultiplierRed = 1.5;
	}
	//HEALTH
	if(healthRedCounter == 1){
	healthMultiplierRed = 1.1;
	}
	if(healthRedCounter == 2){
	healthMultiplierRed = 1.2;
	}
	if(healthRedCounter == 3){
	healthMultiplierRed = 1.3;
	}
	if(healthRedCounter == 4){
	healthMultiplierRed = 1.4;
	}
	if(healthRedCounter == 5){
	healthMultiplierRed = 1.5;
	}
	
	
		//Upgrade Multipliers Red
	//POWER
	if(powerBlueCounter == 1){
	damageMultiplierBlue = 1.1;
	}
	if(powerBlueCounter == 2){
	damageMultiplierBlue = 1.2;
	}
	if(powerBlueCounter == 3){
	damageMultiplierBlue = 1.3;
	}
	if(powerBlueCounter == 4){
	damageMultiplierBlue = 1.4;
	}
	if(powerBlueCounter == 5){
	damageMultiplierBlue = 1.5;
	}
	//SPEED
	if(speedBlueCounter == 1){
	speedMultiplierBlue = 1.07;
	}
	if(speedBlueCounter == 2){
	speedMultiplierBlue = 1.14;
	}
	if(speedBlueCounter == 3){
	speedMultiplierBlue = 1.21;
	}
	if(speedBlueCounter == 4){
	speedMultiplierBlue = 1.28;
	}
	if(speedBlueCounter == 5){
	speedMultiplierBlue = 1.35;
	}
	//HEALTH
	if(healthBlueCounter == 1){
	speedMultiplierBlue = 1.1;
	}
	if(healthBlueCounter == 2){
	speedMultiplierBlue = 1.2;
	}
	if(healthBlueCounter == 3){
	speedMultiplierBlue = 1.3;
	}
	if(healthBlueCounter == 4){
	speedMultiplierBlue = 1.4;
	}
	if(healthBlueCounter == 5){
	speedMultiplierBlue = 1.5;
	}
	
	
	
	//Correct Health Orb Size
	
	var orbx = this.transform.Find("healthorb");
	orbx.transform.localScale = Vector3(.5,.5,.5);
	
	
	
	//SHADOW TOGGLE
	
//	var shadows = this.transform.Find("shadow");
//	shadows.renderer.enabled = false;



	if(this.transform.name.Contains("Marine")||this.transform.name.Contains("Sniper")
	||this.transform.name.Contains("Cannoneer")||this.transform.name.Contains("Titan")
	||this.transform.name.Contains("Drudge")||this.transform.name.Contains("Disrupter")
	||this.transform.name.Contains("Squaller")||this.transform.name.Contains("Arbiter")){
	isLightArmor = true;
	}
	else{
	isLightArmor = false;
	}
	if(this.transform.name.Contains("Marine")||this.transform.name.Contains("Sniper")
	||this.transform.name.Contains("Dozer")||this.transform.name.Contains("Titan")
	||this.transform.name.Contains("Drudge")||this.transform.name.Contains("Squaller")
	||this.transform.name.Contains("Arbiter")){
	isLightDamage = true;
	}
	else{
	isLightDamage = false;
	}
	
	maxHealth = health;
	var orb1 = this.transform.Find("healthorb");
	orb1.GetComponent.<Renderer>().material.color = Color.green; 

	damageTimerSetter = false;
	//Sets speed power up for Player 1 and 2
	if (this.transform.tag == "red"){
	speed = speed * speedMultiplierRed;
	}
	else if (this.transform.tag == "blue"){
	speed = speed * speedMultiplierBlue;
	}
	//Sets the damage power up for Player 1 and 2
	if (this.transform.tag == "red"){
	pwr = pwr * damageMultiplierRed;
	}
	else if (this.transform.tag == "blue"){
	pwr = pwr * damageMultiplierBlue;
	}
	//Sets the health power up for Player1 and 2
	if(this.transform.tag == "red"){
	health = health * healthMultiplierRed;
	maxHealth = maxHealth * healthMultiplierRed;
	}
	else if(this.transform.tag == "blue"){
	health = health * healthMultiplierBlue;
	maxHealth = maxHealth * healthMultiplierBlue;
	}
	//Newly created units don't die to nuke   ....
	if (nukedBlue == true){	
	nukeBlueHealth = 0;
	}
	if (nukedRed == true){
	nukeRedHealth = 0;
	}
	
	snipermuzzleon = false;
	snipermuzzleon1 = true;
	var orb = this.transform.Find("healthorb");
	orb.GetComponent.<Renderer>().material.name = "green"; 
	unitControllerInstance = GetComponent(Unitcontroller);
	var allChildren = gameObject.GetComponentsInChildren(Transform);
	for (var child5 : Transform in allChildren){
    	if (child5.name == "muzzleflash"){
    	child5.GetComponent.<Renderer>().enabled = false;
    	child5.GetComponent.<Renderer>().material = yellowmat;
       	}
    }
    
    changeDirection = Random.Range(195,210);
}

//END START

function Update (){

//NEW RPC TEST GLOBAL
//if(Network.isServer){
	var tutorialTimer : float;
	
	if(GameObject.Find("Up(Clone)") || GameObject.Find("Up")){
	moveUp = true;
	}
	else{
	moveUp = false;
	}
	
	tutorialTimer = tutorialTimer + Time.deltaTime;
	
	if(this.transform.tag == "red" && this.transform.name.Contains("Marine")){
		if(this.transform.position.z >= changeDirection){
			if(moveUp == true && noSwitch == false){
			this.transform.rotation = Quaternion.Euler(0,90,0);
			noSwitch = true;
			}
			else if(moveUp == false && noSwitch == false){
			this.transform.rotation = Quaternion.Euler(0,270,0);
			noSwitch = true;
			}
		}
		if(this.transform.position.x <= -18 || this.transform.position.x >= 19){
		Destroy(this.gameObject);
		}
	}
	
//	if(!GameObject.Find("Drudge_Tutorial(Clone)")){
//	killUnits = true;
//	}
//	
//	if(!GameObject.Find("Griefer_Tutorial(Clone)")){
//	killUnits = true;
//	}
//	if(GameObject.Find("Speed_Tutorial(Clone)")){
//	killUnits = false;
//	}
//	if(killUnits == true){
//		if(this.transform.name.Contains("Marine")){
//		Destroy(this.gameObject);
//		}
//		if(this.transform.name.Contains("Striker")){
//		Destroy(this.gameObject);
//		}
//	}






	if(GameObject.Find("NukeRed(Clone)")  && this.transform.tag == "blue"){
	health = health - 500;
	//redNuke = true;
	
	}
	if(GameObject.Find("NukeBlue(Clone)") && this.transform.tag == "red" ){
	health = health - 500;
	//blueNuke = true;
	
	}
	
//	//Make sure the power up cap is properly observed
//	if(speedMultiplierBlue > 1.125){
//	speedMultiplierBlue = 1.125;
//	}
//	if(speedMultiplierRed > 1.125){
//	speedMultiplierRed = 1.125;
//	}
//	if(damageMultiplierRed > 1.25){
//	damageMultiplierRed = 1.25;
//	}
//	if(damageMultiplierBlue > 1.25){
//	damageMultiplierBlue = 1.25;
//	}
//	if(healthMultiplierRed > 1.5){
//	healthMultiplierRed = 1.5;
//	}
//	if(healthMultiplierBlue > 1.5){
//	healthMultiplierBlue = 1.5;
//	}	
	
	//OLD NUKE PRIOR 2513	
				
//	//Nuke for Player 1 (Server) multiplayer
//	if(nukedBlue == true && this.transform.tag == "blue" && !this.transform.name.Contains("Base")){
//	health = health + nukeBlueHealth;
//	}
//	//Nuke for Player 2 (Client) multiplayer
//	if(nukedRed == true && this.transform.tag == "red" && !this.transform.name.Contains("Base")){	
//	health = health + nukeRedHealth;
//	}		

		
	//Initial defining of timer. goes up 1 per second
	damageTimer = Time.deltaTime + damageTimer;
	if (damageTimer >=1){
	damageTimer = 0;
	}
	//Differentiate muzzle flash timings for different unit types
	if(this.transform.name.Contains("Marine") || this.transform.name.Contains("Titan") 
	|| this.transform.name.Contains("Dozer") || this.transform.name.Contains("Mother")){
	muzzleflash = Mathf.Repeat (Time.time * 10.0, 1.0) < 0.5;
	}
	else if(this.transform.name.Contains("Sniper") || this.transform.name.Contains("Drudge")
	|| this.transform.name.Contains("Squaller") || this.transform.name.Contains("Cannoneer") 
	|| this.transform.name.Contains("Striker") || this.transform.name.Contains("Griefer")
	|| this.transform.name.Contains("Arbiter") || this.transform.name.Contains("Disrupter")){
	
	
	second = second + Time.deltaTime;
		if(snipermuzzleon == true && snipermuzzleon1 == true){
		
		second = 0;
		snipermuzzleon = false;
		snipermuzzleon1 = false;
		}
		if(second >= 1){
		second = 0;
		}
		if(second < .1){
		muzzleflash = true;
		}
		else{
		muzzleflash = false;
		}
	}
	timer = false;
	FindClosestEnemy();
	//Shows raycast that allows units to move around other units (Debugging purposes only)
	Debug.DrawLine(this.transform.position, (this.transform.position + Vector3(0,0,3)), Color.red);
	
	
    //Tells units/objects when they are dead and sets thier tag to dead       
	if (health <= 0 && dead == false){
	dead = true;
	GetComponent.<AudioSource>().Stop();
	currentAnimation = "die";
	Die();
	
	}
	
	
	//Plays the audio assoctiated with the weapon if firing on an enemy and the shoot animation
	
	
		if(((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) <= range && dead == false)){
   		enemy = true;
   			if (!GetComponent.<AudioSource>().isPlaying){
   			clientSound = true;
			//ShootSound();
			}	
			if (timer == false && damageTimerSetter == false){
			nextfire = Time.time;
			damageTimerSetter = true;
			}
			
    		this.transform.Translate(0,0,0);
    		
			GetComponent.<Animation>().wrapMode = WrapMode.Default;
			
			//*****************************************************
			if(this.transform.name.Contains("Marine") || this.transform.name.Contains("Dozer") || this.transform.name.Contains("Titan") || this.transform.name.Contains("Mothership")){  
				currentAnimation = "shoot";
				this.GetComponent.<Animation>().Play("shoot");
			}
			
			
			//Plays the muzzle flash animation
			snipermuzzleon = true;
			var allChildren2 = gameObject.GetComponentsInChildren(Transform);
			for (var child : Transform in allChildren2){
	    		if (child.name == "muzzleflash"){
	    		muzzleOff = false;
	    		child.GetComponent.<Renderer>().enabled = muzzleflash;
	    		}
	    		//Turns to face enemy being shot
	    		
	   		
				
				if(this.transform.name.Contains("Striker")){
	    		var turret = this.transform.Find("turretdummy");
	    		turret.transform.LookAt(2*this.transform.position - Vector3((FindClosestEnemy().transform.position.x), (FindClosestEnemy().transform.position.y-120),(FindClosestEnemy().transform.position.z)));
				}
	    		else if(this.transform.name.Contains("Dozer")){
	    		var turret9 = this.transform.Find("turretdummy"); 
	    		//turret9.transform.LookAt(2*(this.transform.position - Vector3((FindClosestEnemy().transform.position.x), (FindClosestEnemy().transform.position.y),(FindClosestEnemy().transform.position.z))));
	    		turret9.transform.LookAt(2*this.transform.position - (Vector3((FindClosestEnemy().transform.position.x), (FindClosestEnemy().transform.position.y-2),(FindClosestEnemy().transform.position.z))));
	    		
	    		}
	    	
	    		else{
	    		this.transform.LookAt(2*this.transform.position - FindClosestEnemy().transform.position);
	    		}	
	    	}
	    }
	
	//Makes warder run closer to enemies slightly out of range
	else if(((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) <= (range +4) && dead == false) && !this.GetComponent.<Animation>().IsPlaying("shoot") && this.transform.name.Contains("Warder") ){
		this.transform.LookAt(2*this.transform.position - FindClosestEnemy().transform.position);
		this.transform.Translate(0,0, -speed*Time.deltaTime);
	
	}
    
    //Plays the run animation if no enemy is within range
    else if(((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) > range && dead == false) && !this.GetComponent.<Animation>().IsPlaying("shoot")){
    damageTimerSetter = false;
    enemy = false;
    hasPlayed = false;
    GetComponent.<AudioSource>().Stop();
    //snipermuzzleon1 = true;
    var allChildren3 = gameObject.GetComponentsInChildren(Transform);
		for (var child2 : Transform in allChildren3){
    		if (child2.name == "muzzleflash") {
    		muzzleOff = true;
    		child2.GetComponent.<Renderer>().enabled = false;
    		}
    	}
	     
		if(this.transform.tag=="red" && this.transform.name.Contains("Striker")){
	    var turret2 = this.transform.Find("turretdummy");
	    turret2.transform.rotation = Quaternion.Euler(270, 180, 0);
	    }
	    else if(this.transform.tag == "red" && this.transform.name.Contains("Dozer")){
	    var turret7 = this.transform.Find("turretdummy");
	    turret7.transform.rotation = Quaternion.Euler(0, 180, 0);
	    }
	    
	    
	    if(this.transform.tag=="blue" && this.transform.name.Contains("Striker")){
	    var turret3 = this.transform.Find("turretdummy");
	    turret3.transform.rotation = Quaternion.Euler(270, 0, 0);
	    }
	    else if(this.transform.tag == "blue" && this.transform.name.Contains("Dozer")){
	    var turret8 = this.transform.Find("turretdummy");
	    turret8.transform.rotation = Quaternion.Euler(0, 0, 0);
	    }
	    else if(this.transform.tag == "blue"){
	    this.transform.rotation = Quaternion.Euler(0, 0, 0);
	    }
	currentAnimation = "run";
	this.GetComponent.<Animation>().Play("run");
	//Makes units run around each other instead of stacking on top of each other
	var hit: RaycastHit;
		if (Physics.Raycast (this.transform.position, transform.TransformDirection(Vector3(0,0,-1)), hit, rayLength) ){
			if (this.transform.tag == "red"){
	    	 	if (this.transform.position.x > hit.transform.position.x){
	        	this.transform.Translate(-speed*Time.deltaTime,0, 0);
	        	}
	       		else{
	        	this.transform.Translate(speed*Time.deltaTime,0, 0);
	          	}
			}
	        else if(this.transform.tag == "blue"){
	    	    if (this.transform.position.x < hit.transform.position.x){
	        	this.transform.Translate(-speed*Time.deltaTime,0, 0);
	        	}
	       		else{
	        	this.transform.Translate(speed*Time.deltaTime,0, 0);
	          	}
	        }
		}
		
//		if(this.transform.position.x >= 6 && (this.transform.tag == "red" || this.transform.tag == "blue")){
//		this.transform.position.x = 6;
//		}
//		if(this.transform.position.x <= -6 && (this.transform.tag == "red" || this.transform.tag == "blue")){
//		this.transform.position.x = -6;
//		}
		if(this.transform.tag == "red" && (this.transform.name.Contains("Dozer") || this.transform.name.Contains("Striker"))){
		this.transform.rotation = Quaternion.Euler(0,180,0);
		this.transform.Translate(0,0, -speed*Time.deltaTime);
		}
		else{
		enemy = false;
			
		this.transform.Translate(0,0, -speed*Time.deltaTime);
			
		}
	}
	
	else{
	enemy = false;
	var allChildren4 = gameObject.GetComponentsInChildren(Transform);
		for (var child3 : Transform in allChildren4){
    		if (child3.name == "muzzleflash") {
    		child3.GetComponent.<Renderer>().enabled = muzzleflash;
    		}
    	}
    }
    //Apply damage
	if((Time.time > nextfire) && !this.transform.name.Contains("Warder")){
    nextfire = Time.time + delay;
    timer = true;
	}
	else{
	timer = false;
	}
	if(timer == true && enemy==true && !FindClosestEnemy().name.Contains("Base")){
	
	//********************
	//animation.wrapMode = WrapMode.Loop;
	currentAnimation = "shoot";
	this.GetComponent.<Animation>().Play("shoot");
	
	snipermuzzleon1 = true;
	ShootSound();
	second = 0;
	var tempscript : UnitController_Tutorial = FindClosestEnemy().GetComponent(UnitController_Tutorial);
	tempscript.Applydmg(pwr,isLightDamage);
		//Heavy damaging unit names will be added to the OR part of the IF statement below
		if(this.transform.name.Contains("Cannoneer") || this.transform.name.Contains("Striker") ){
		Instantiate(cannoneerExplosion, FindClosestEnemy().transform.position + Vector3(0,4,0), FindClosestEnemy().transform.rotation);	
		}
	}
	else if(timer == true && enemy == true && FindClosestEnemy().name.Contains("Base")){
	//animation.wrapMode = WrapMode.Once;
	currentAnimation = "shoot";
	this.GetComponent.<Animation>().Play("shoot");
	
	snipermuzzleon1 = true;
	ShootSound();
	second = 0;
	var tempscript2 : BaseManager = FindClosestEnemy().GetComponent(BaseManager);
	tempscript2.Applydmg(pwr,isLightDamage);	
				
	}
	
	



//START RUNNING RPCS FUNCTIONS FOR CLIENT
	
currentPos = this.transform.position;
currentRot = this.transform.rotation;

//networkView.RPC("ClientPosition",RPCMode.Others, currentPos);
//
//networkView.RPC("ClientRotation",RPCMode.Others, currentRot);
//
//networkView.RPC("ClientAnimation",RPCMode.Others, currentAnimation);
//
//networkView.RPC("ClientMuzzle",RPCMode.Others, muzzleflash, muzzleOff );
//
//networkView.RPC("ClientSound",RPCMode.Others, clientSound);
//
//networkView.RPC("ClientDie",RPCMode.Others, dead);















}
//END UPDATE


//START CLIENT SIDE RPC FUNCTIONS, THESE ARE NOW NEVER RUN DUE TO COMMENTED OUT LINES 460-470. Please don't be a douche and leave them for the time being just in case. 
@RPC
function ClientPosition (location : Vector3){

	if(Network.isClient){
	this.transform.position = location;
	}

}

@RPC
function ClientAnimation (animation : String){

	if(Network.isClient){
	this.GetComponent.<Animation>().Play(animation);
	}

}

@RPC
function ClientMuzzle (muzz : boolean, muzzoff : boolean){

	if(Network.isClient && muzzoff == false){
	var allChildren3 = gameObject.GetComponentsInChildren(Transform);
			for (var child : Transform in allChildren3){
	    		if (child.name == "muzzleflash"){
	    		child.GetComponent.<Renderer>().enabled = muzz;
	    		}
	}
	}
	else{
		var allChildren4 = gameObject.GetComponentsInChildren(Transform);
			for (var child : Transform in allChildren4){
	    		if (child.name == "muzzleflash"){
	    		child.GetComponent.<Renderer>().enabled = false;
	    		}
	}
	}
	}

@RPC
function ClientSound (sound : boolean){

	if(Network.isClient && sound == true){
	
	GetComponent.<AudioSource>().clip = shoot;
		if (!GetComponent.<AudioSource>().isPlaying){
			GetComponent.<AudioSource>().Play();
		}
	
	}
	
	
}

@RPC
function ClientDie (diex : boolean){



	if(Network.isClient && diex == true){
	yield WaitForSeconds(deathtimer);
	Destroy(gameObject);
	}

}

@RPC
function ClientRotation (rot : Quaternion){

	if(Network.isClient){
	this.transform.rotation = rot;
	}

}



















function ShootSound(){

	GetComponent.<AudioSource>().clip = shoot;
	GetComponent.<AudioSource>().Play();
}


function FindClosestEnemy () : GameObject{
	//Find all game objects with tagged red or blue
    var gos : GameObject[];
    if(this.transform.tag == "red"){
    gos = GameObject.FindGameObjectsWithTag("blue"); 
    }
    if(this.transform.tag == "blue"){
    gos = GameObject.FindGameObjectsWithTag("red");
    }
    var closest : GameObject; 
    var distance = Mathf.Infinity; 
    var position = transform.position; 
    //Pick through them and find the closest one
    for (var go : GameObject in gos){ 
    var curDistance = Vector3.Distance(go.transform.position , this.transform.position); 
        if (curDistance < distance){ 
        closest = go; 
        distance = curDistance; 
        } 
    } 
    return closest;
}	


function Applydmg (dmg : float, isLightDamage2 : boolean){
	
	
	if(isLightDamage2 == false && isLightArmor == false){
	dmg = dmg * 1.25;
	}
	if(isLightDamage2 == true && isLightArmor == false){
	dmg = dmg * .75;
	}
	
	health = health - dmg;
	//Change Health Orb Color
	var orb = this.transform.Find("healthorb");
	
	orb.transform.localScale = Vector3(((health/maxHealth)*.33)+.2,((health/maxHealth)*.33)+.2,((health/maxHealth)*.33)+.2);
	if( (health / maxHealth) >=  .67){
	orb.GetComponent.<Renderer>().material.color = Color.green; 
	}
	else if( (health / maxHealth) < .67 && (health / maxHealth) > .33){
	orb.GetComponent.<Renderer>().material.color = Color.yellow; 
	}
	else if( (health / maxHealth) <= .33){
	orb.GetComponent.<Renderer>().material.color = Color.red;
	}	
	
}


function Die(){



		    	
		    	
	    	
	    
    
    

	GetComponent.<AudioSource>().clip = death1;
	GetComponent.<AudioSource>().Play();
	//Adds money and score for killing units

	
	if(GameObject.Find("MultiPlayer")){
	
		if(this.transform.tag == "red"){
		guiManager.GetComponent(GameGUI_Manager);
		GameGUI_Manager.ScoreRed(pointsOnDeath);  
		GameGUI_Manager.RedBonus(deathBonus);
			
		}
		if(this.transform.tag == "blue"){
		guiManager.GetComponent(GameGUI_Manager);
		GameGUI_Manager.ScoreBlue(pointsOnDeath);  
		GameGUI_Manager.BlueBonus(deathBonus);
			
		}
	}
	if(GameObject.Find("SinglePlayer")){
		if(this.transform.tag == "red"){
		guiManager.GetComponent(GameGUI_SinglePlayer);
		GameGUI_SinglePlayer.ScoreRed(pointsOnDeath);  
		GameGUI_SinglePlayer.RedBonus(deathBonus);
		
		//Below-712 will no longer be needed once array counting system is implemented
//			if(this.transform.name.Contains("Marine") || this.transform.name.Contains("Drudge")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightRed(marineLightCounter);
//			}
//			if(this.transform.name.Contains("Sniper") || this.transform.name.Contains("Squaller")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightRed(sniperLightCounter);
//			}
//			if(this.transform.name.Contains("Cannoneer")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightRed(cannoneerLightCounter);
//			}
//			if(this.transform.name.Contains("Griefer")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesHeavyRed(grieferHeavyCounter);
//			}
//			if(this.transform.name.Contains("Dozer") || this.transform.name.Contains("Warder")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesHeavyRed(dozerHeavyCounter);
//			}
//			if(this.transform.name.Contains("Striker")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesHeavyRed(strikerHeavyCounter);
//			}
//			if(this.transform.name.Contains("Disrupter")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightRed(disrupterLightCounter);
//			}
//			if(this.transform.name.Contains("Titan") || this.transform.name.Contains("Arbiter")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightRed(titanLightCounter);
//			}
		}
		if(this.transform.tag == "blue"){
		guiManager.GetComponent(GameGUI_SinglePlayer);
		GameGUI_SinglePlayer.ScoreBlue(pointsOnDeath);  
		GameGUI_SinglePlayer.BlueBonus(deathBonus);
		
				//Below-752 will no longer be needed once array counting system is implemented
//			if(this.transform.name.Contains("Marine") || this.transform.name.Contains("Drudge")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightBlue(marineLightCounter);
//			}
//			if(this.transform.name.Contains("Sniper") || this.transform.name.Contains("Squaller")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightBlue(sniperLightCounter);
//			}
//			if(this.transform.name.Contains("Cannoneer")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightBlue(cannoneerLightCounter);
//			GameGUI_SinglePlayer.UnitDiesCannoneer(cannoneerCounter);
//			}
//			if(this.transform.name.Contains("Griefer")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesHeavyBlue(grieferHeavyCounter);
//			}
//			if(this.transform.name.Contains("Dozer") || this.transform.name.Contains("Warder")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesHeavyBlue(dozerHeavyCounter);
//			}
//			if(this.transform.name.Contains("Striker")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesHeavyBlue(strikerHeavyCounter);
//			}
//			if(this.transform.name.Contains("Disrupter")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightBlue(disrupterLightCounter);
//			}
//			if(this.transform.name.Contains("Titan") || this.transform.name.Contains("Arbiter")){
//			guiManager.GetComponent(GameGUI_SinglePlayer);
//			GameGUI_SinglePlayer.UnitDiesLightBlue(titanLightCounter);
//			}
		}
		if(this.transform.tag == "red"){
		guiManager.GetComponent(GameGUI_SinglePlayer);
		//GameGUI_SinglePlayer.RedUnitCounter(unitCounterRed);
		}
	}

	


	var allChildren6 = gameObject.GetComponentsInChildren(Transform);
	for (var child7 : Transform in allChildren6){
    	if (child7.name == "muzzleflash"){
    	child7.GetComponent.<Renderer>().enabled = false;
    	}
    }
    //BLOOD FOR SINGLE PLAYER
    //***********ADD if statement so it will not be locally instantiated on top of network instantiated when playing multiplayer***************
    
    if (this.transform.name.Contains("Marine") || this.transform.name.Contains("Drudge") || this.transform.name.Contains("Can") || this.transform.name.Contains("Sni") || this.transform.name.Contains("Disr")){
    
    	Instantiate(blood, this.transform.position, this.transform.rotation);
    
    
    }
    
    else if(this.transform.name.Contains("Mother")){
    	Instantiate(blood, (this.transform.position + Vector3(0,15,0)), this.transform.rotation);
    }
  
    else{
    	Instantiate(blood, (this.transform.position + Vector3(0,6,0)), this.transform.rotation);
    }
    Instantiate(blood, this.transform.position, this.transform.rotation);
    //END OF BLOOD FOR SINGLE PLAYER
	Network.Instantiate(blood, this.transform.position, this.transform.rotation,1);
	var orb = this.transform.Find("healthorb");
	orb.GetComponent.<Renderer>().enabled = false;
	
	this.GetComponent.<Animation>().Play("die",PlayMode.StopAll);
	
	if(this.transform.name.Contains("Warder")){
		var gosx : GameObject[];
		    if(this.transform.tag == "red"){
		    gosx = GameObject.FindGameObjectsWithTag("blue"); 
		    }
		    if(this.transform.tag == "blue"){
		    gosx = GameObject.FindGameObjectsWithTag("red");
		    }
		    
		   
	    //WARDER SLPASH DAMAGE ON DEATH
	    for (var gox : GameObject in gosx){
	    	var curDistancex = Vector3.Distance(gox.transform.position , this.transform.position);
	    	
		    	if (curDistancex <= 12 && !gox.transform.name.Contains("Base")){
		    		
		    		var tempscriptx : Unitcontroller = gox.GetComponent(Unitcontroller);
					tempscriptx.Applydmg(pwr,isLightDamage);
					warderLoop = false;
					maxSplash = maxSplash + 1;
					Debug.Log(gosx.Length + "maxsplash" + maxSplash);
					if(maxSplash >= gosx.length){
						break;
					}
					
				}

				else{
					maxSplash = maxSplash + 1;
					if(maxSplash >= gosx.length){
						break;
				
					}
				}
		}
		
		
	}
	this.transform.tag = "dead";
	
	yield WaitForSeconds (deathtimer);
	

	
	//transform.Translate (Vector3.up * 10000);
	
	if(GameObject.Find("SinglePlayer")){
	Destroy(this.gameObject);
	}
	
	//if(Network.isServer && this.transform.tag == "red"){
	
	//yield WaitForFixedUpdate();
	if(GameObject.Find("MultiPlayer")){
	Network.Destroy(this.gameObject);
	}
	//clientDie = true;
	//}
	
//	
//	else if (Network.isClient && this.transform.tag == "blue"){
//	//yield WaitForFixedUpdate();
//	Network.Destroy(this.gameObject);
//	}
	
	
	
	
}

//***********THESE FUNCTIONS WILL BE DELETED ONCE NEW empty gameobject upgrade SYSTEM IS ESTABLISHED
static function Speedupgradered(){
	
	speedMultiplierRed = speedMultiplierRed + 0.05;
}


static function Speedupgradeblue(){

	speedMultiplierBlue = speedMultiplierBlue + 0.05;
}


static function DamageUpgradeRed(){

	damageMultiplierRed = damageMultiplierRed + .1;
	
}


static function DamageUpgradeBlue(){

	damageMultiplierBlue = damageMultiplierBlue + .1;
}

static function HealthUpgradeRed(){

	healthMultiplierRed = healthMultiplierRed + .1;
}

static function HealthUpgradeBlue(){

	healthMultiplierBlue = healthMultiplierBlue + .1;
}


//OLD Nuke prior to 2513

//static function NukeRed(){
//	
//	
//	nukeBlueHealth = -500;
//	nukedBlue = true;
//	
//}
//
//
//static function NukeBlue(){
//	
//	nukeRedHealth = -500;
//	nukedRed = true;
//	
//}


//Manage power ups over the network
//**************THE UPG PORTIONS OF BELOW WILL BE DELETED ONCE NEW empty gameobject upgrade SYSTEM IS ESTABLISHED**************************//
function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo){
	
	//DELETE START
	//Variables for speed upgrades
//	var speedNetWorkMR : float;
//	var speedNetWorkMB : float;
//	//Variables for power upgrades
//	var pwrnetworkred : float;
//	var pwrnetworkblue : float;
//	//Variables for health upgrades
//	var healthnetworkred : float;
//	var healthnetworkblue : float;
//	
	
	var aposition : Vector3;
	var arotation : Quaternion;
	var ahealth : float;

	
	
	
	
	
	//If dying still isnt synced, perhaps add red and blue tags below so only the server can write to these network vars
	if(GameObject.Find("MultiPlayer")){
	
	
		if(stream.isWriting){
			aposition = transform.position;
			arotation = transform.rotation;
			ahealth = health;
			stream.Serialize (aposition);
			stream.Serialize (arotation);
			stream.Serialize (ahealth);
		
		}
		else{
			stream.Serialize(aposition);
			stream.Serialize(arotation);
			stream.Serialize(ahealth);
			transform.position = aposition;
			transform.rotation = arotation;
			health = ahealth;
		
		}
		
	
		//DELETE START
//		if (stream.isWriting &&  this.transform.tag == "red"){
//	    speedNetWorkMR  = speedMultiplierRed;
//	    stream.Serialize(speedNetWorkMR);
//		}
//		else if (stream.isReading  && this.transform.tag == "red"){
//	    stream.Serialize(speedNetWorkMR);
//	    speedMultiplierRed = speedNetWorkMR;
//		}
//		if (stream.isWriting  && this.transform.tag == "blue"){
//	    speedNetWorkMB  = speedMultiplierBlue;
//	    stream.Serialize(speedNetWorkMB);
//		}
//		else if (stream.isReading  && this.transform.tag == "blue"){
//		stream.Serialize(speedNetWorkMB);
//	    speedMultiplierBlue = speedNetWorkMB;
//		}
//		//Power Upgrades
//		if (stream.isWriting  && this.transform.tag == "red"){
//	    pwrnetworkred  = damageMultiplierRed;
//	    stream.Serialize(pwrnetworkred);
//		}
//		else if (stream.isReading  && this.transform.tag == "red"){
//		stream.Serialize(pwrnetworkred);
//		damageMultiplierRed = pwrnetworkred;
//	    }
//		if (stream.isWriting  && this.transform.tag == "blue"){
//	    pwrnetworkblue  = damageMultiplierBlue;
//	    stream.Serialize(pwrnetworkblue);
//		}
//		else if (stream.isReading  && this.transform.tag == "blue"){
//		stream.Serialize(pwrnetworkblue);
//		damageMultiplierBlue = pwrnetworkblue;
//		}
//		//Health Upgrades
//			//Power Upgrades
//		if (stream.isWriting  && this.transform.tag == "red"){
//	    healthnetworkred  = healthMultiplierRed;
//	    stream.Serialize(healthnetworkred);
//		}
//		else if (stream.isReading  && this.transform.tag == "red"){
//		stream.Serialize(healthnetworkred);
//		healthMultiplierRed = healthnetworkred;
//	    }
//		if (stream.isWriting  && this.transform.tag == "blue"){
//	    healthnetworkblue  = healthMultiplierBlue;
//	    stream.Serialize(healthnetworkblue);
//		}
//		else if (stream.isReading  && this.transform.tag == "blue"){
//		stream.Serialize(healthnetworkblue);
//		healthMultiplierBlue = healthnetworkblue;
//		}
		//DELETE END
	}
}