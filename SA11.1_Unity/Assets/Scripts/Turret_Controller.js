#pragma strict

//Variables for .5 second delay
var nextfire : float;
var timer : boolean = false;
var pwr : float = 4;
var range : float = 16;
//Variable for muzzle flash blinking
var muzzleflash : boolean = false;
//Variable for defining enemy
var enemy : boolean = false;
//Variables for sound
var shoot : AudioClip;
//Variables for muzzle flash for different units
var second : float;
var snipermuzzleon : boolean;
var yellowmat : Material;
var damageTimerSetter : boolean = false;
//Type of Damage being sent
var isLightDamage : boolean = false;

var c_AdditionalDefense : boolean;
var isLevel8 : boolean;


function Start () {
isLightDamage = true;
snipermuzzleon = false;
	
	if(GameObject.Find("LevelEight")){
	isLevel8 = true;
	}
	else{
	isLevel8 = false;
	}
	if(PlayerPrefs.GetInt("additionalDefense") > 0){
	c_AdditionalDefense = true;
	}
	else{
	c_AdditionalDefense = false;
	}
//second = 0;
}

function Update () {


	if(enemy == false){
	this.GetComponent.<Animation>().Play("idle");
	var allChildren = gameObject.GetComponentsInChildren(Transform);
		for (var child5 : Transform in allChildren){
    		if (child5.name == "muzzleflash"){
    		child5.GetComponent.<Renderer>().enabled = false;
    		child5.GetComponent.<Renderer>().material = yellowmat;
       		}
    	}
	}
	
	
	//if(this.transform.name.Contains("Human")){
	muzzleflash = Mathf.Repeat (Time.time * 10.0, 1.0) < 0.5;
	//}
	
//	else if(this.transform.name.Contains("Alien")){
//	second = second + Time.deltaTime;
//		if(snipermuzzleon == true){
//		second = 0;
//		snipermuzzleon = false;
//		}
//		if(second >= 1.033){
//		second = 0;
//		}
//		if(second < .1){
//		muzzleflash = true;
//		}
//		else{
//		muzzleflash = false;
//		}
//	}
	
	
	timer = false;
	FindClosestEnemy();
	
	//**Start
	if(FindClosestEnemy()==null){
	}
	else if(FindClosestEnemy()!=null){
	
	if((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) <= range){
   	enemy = true;
   		if (!GetComponent.<AudioSource>().isPlaying){
		ShootSound();
		}	
		if (timer == false && damageTimerSetter == false){
   	
		
		nextfire = Time.time;
		damageTimerSetter = true;
		}
    this.transform.Translate(0,0,0);
	GetComponent.<Animation>().wrapMode = WrapMode.Once;
	this.GetComponent.<Animation>().Play("shoot");
	//Plays the muzzle flash animation
	snipermuzzleon = true;
	var allChildren2 = gameObject.GetComponentsInChildren(Transform);
		for (var child : Transform in allChildren2){
    		if (child.name == "muzzleflash"){
    		child.GetComponent.<Renderer>().enabled = muzzleflash;
    		}
    		//Turns to face enemy being shot
    		this.transform.LookAt(FindClosestEnemy().transform.position);
    		
    	}
    }
    else{
    enemy = false;
    	if(this.transform.tag=="rturret"){
	    this.transform.rotation = Quaternion.Euler(0, 0, 0);	
	    }
	    
	    else if(this.transform.tag=="bturret"){
	    this.transform.rotation = Quaternion.Euler(0, 180, 0);	
	    }
	    //Makes turrets for AdditionalDefenses face the right direction
	    
	    if(isLevel8 == false){
		    if(this.transform.tag == "c_redturret1"){
		    this.transform.rotation = Quaternion.Euler(0, 0, -90);
		    }
		    if(this.transform.tag == "c_redturret2"){
		    this.transform.rotation = Quaternion.Euler(0, 0, 90);
		    }
		}
		else{
			if(this.transform.tag == "c_redturret1"){
		    this.transform.rotation = Quaternion.Euler(0, 0, 0);
		    }
		    if(this.transform.tag == "c_redturret2"){
		    this.transform.rotation = Quaternion.Euler(0, 0, 0);
		    }
		}
    }  
    if (Time.time > nextfire){
    nextfire = Time.time + 1;
    timer = true;
    
	}
	else{
	snipermuzzleon = false;
	timer = false;
	}
	if(timer == true && enemy==true){
		if(FindClosestEnemy().GetComponent(Unitcontroller)){
			
				var tempscript : Unitcontroller = FindClosestEnemy().GetComponent(Unitcontroller);
				tempscript.Applydmg(pwr,isLightDamage);
			
		}
	}	
	
	
	
	}
	//**end
}


function FindClosestEnemy () : GameObject{
	//Find all game objects with tagged red or blue
    var gos : GameObject[];
    if(this.transform.tag == "rturret" || this.transform.tag == "c_redturret1" || this.transform.tag == "c_redturret2"){
    gos = GameObject.FindGameObjectsWithTag("blue"); 
    }
    if(this.transform.tag == "bturret"){
    gos = GameObject.FindGameObjectsWithTag("red");
    }
    var closest : GameObject; 
    var distance = Mathf.Infinity; 
    var position = transform.position; 
    //Pick through them and find the closest one
    if(gos!=null){ 
	    for (var go : GameObject in gos){ 
	    var curDistance = Vector3.Distance(go.transform.position , this.transform.position); 
	        if (curDistance < distance){ 
	        closest = go; 
	        distance = curDistance; 
	        } 
	    } 
    }
    else{
    }
    return closest;
}	

function ShootSound(){

	GetComponent.<AudioSource>().clip = shoot;
	GetComponent.<AudioSource>().Play();
}