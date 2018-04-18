#pragma strict


var killUnits : GameObject;
static var tutorial : int = 1;
var guiManager_Tutorial : GameObject;
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



function Start(){

	this.GetComponent.<Animation>().wrapMode = WrapMode.Loop;
	this.GetComponent.<Animation>().Play("idle");
}

function Update(){


	if (health <= 0 && dead == false){
		dead = true;
		GetComponent.<AudioSource>().Stop();
		currentAnimation = "die";
		Die();
	}
	if(GameObject.Find("NukeRed(Clone)")  && this.transform.tag == "blue"){
	health = health - 500;
	}
	
	if(this.transform.tag == "red" && this.transform.name.Contains("Marine")){
		if(this.transform.position.z >= Random.Range(195,210)){
			if(GameObject.Find("Up(Clone)")){
			this.transform.Translate(0,0,Time.deltaTime*speed);
			}
		}
		
	}

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
//	var orb = this.transform.Find("healthorb");
//	
//	orb.transform.localScale = Vector3(((health/maxHealth)*.33)+.2,((health/maxHealth)*.33)+.2,((health/maxHealth)*.33)+.2);
//	if( (health / maxHealth) >=  .67){
//	orb.renderer.material.color = Color.green; 
//	}
//	else if( (health / maxHealth) < .67 && (health / maxHealth) > .33){
//	orb.renderer.material.color = Color.yellow; 
//	}
//	else if( (health / maxHealth) <= .33){
//	orb.renderer.material.color = Color.red;
//	}	
	
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
		

		}
		if(this.transform.tag == "blue"){
		guiManager.GetComponent(GameGUI_SinglePlayer);
		GameGUI_SinglePlayer.ScoreBlue(pointsOnDeath);  
		GameGUI_SinglePlayer.BlueBonus(deathBonus);
		

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
//	Network.Instantiate(blood, this.transform.position, this.transform.rotation,1);
//	var orb = this.transform.Find("healthorb");
//	orb.renderer.enabled = false;

	
	
	this.GetComponent.<Animation>().Play("die");
	

	this.transform.tag = "dead";
	
	
	if(this.transform.name.Contains("Drudge") || this.transform.name.Contains("Griefer")){
	yield WaitForSeconds(.6);
	Instantiate(killUnits, killUnits.transform.position, killUnits.transform.rotation);
	}
	//yield WaitForSeconds (deathtimer);
	

	
	//transform.Translate (Vector3.up * 10000);
	

	Destroy(this.gameObject);

	
	//if(Network.isServer && this.transform.tag == "red"){

//	
//	else if (Network.isClient && this.transform.tag == "blue"){
//	//yield WaitForFixedUpdate();
//	Network.Destroy(this.gameObject);
//	}
	
	
	
	
}