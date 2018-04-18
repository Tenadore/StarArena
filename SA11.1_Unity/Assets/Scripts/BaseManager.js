#pragma strict

var healthc : float = 800;
var healthb : float = 800;
var health : float = 800;
var maxHealth : float = 800;
var isLightDamage : boolean = false;
var isLightArmor : boolean = false;
var baseHealthObject :  UnityEngine.GameObject;
var otherScript: BaseHealth_Manager;
var gameOver : boolean = false;

var winServer : UnityEngine.GameObject;
var loseServer : UnityEngine.GameObject;
var isLevel8 : boolean = false;
var bothBasesDead : boolean = false;
var nukeBluePF : GameObject;
var nukeUsed : boolean;
var lvl8UpLeft : UnityEngine.GameObject;
var lvl8DownLeft : UnityEngine.GameObject;
var blueBaseDeathTop : UnityEngine.GameObject;
var blueBaseDeathBottom : UnityEngine.GameObject;
var alienNuke : GameObject;

//variables for other scripts
var aiHumanManager : GameObject;
//var listener = Camera.main.GetComponent(AudioListener);

function Start () {

	nukeUsed = false;
	isLightArmor = true;
	
	if(GameObject.Find("LevelEight")){
	isLevel8 = true;
	}
	else{
	isLevel8 = false;
	}
	
	

}


function Update () {

	

}


function Applydmg (dmg : float, isLightDamage2 : boolean){
	
	
	
	if(this.transform.tag == "red"){
	health = health - dmg;
	BaseHealth_Manager.BaseHealthRed(health);
	}
	if(isLevel8 == true){
		if(this.transform.tag == "blue" && this.transform.name.Equals("Base_Manager_Blue_Bottom")){
		healthc = healthc - dmg;
		BaseHealth_Manager.BaseHealthBlue2(healthc);
			if(healthc <=0){
			healthc = 0;
			WinLoseCampaign.WinCampaign(2);
				if(nukeUsed == false){
				
				Instantiate(blueBaseDeathBottom, blueBaseDeathBottom.transform.position, Quaternion(0,0,0,0));
				Instantiate(alienNuke, alienNuke.transform.position, Quaternion(0,0,0,0));
				Instantiate(nukeBluePF, Vector3(0,0,0), Quaternion(0,0,0,0));
				nukeUsed = true;
				Destroy(GameObject.Find("Base_Manager_Blue_Bottom"));
				Destroy(GameObject.Find("ArrowT1"));
				Instantiate(lvl8UpLeft, lvl8UpLeft.transform.position, lvl8UpLeft.transform.rotation);
				Destroy(GameObject.Find("Lvl8DownLeft(Clone)"));
				Destroy(GameObject.Find("Lvl8DownLeft"));
				Destroy(GameObject.Find("BlueBaseLower"));
				Destroy(GameObject.Find("BlueTurretLower"));
				Destroy(GameObject.Find("BlueHealthLower"));
				}
			
			
			
			}
		}
		if(this.transform.tag == "blue" && this.transform.name.Equals("Base_Manager_Blue_Top")){
		healthb = healthb - dmg;
		BaseHealth_Manager.BaseHealthBlue(healthb);
			if(healthb <=0){
			healthb = 0;
			WinLoseCampaign.WinCampaign(1);
				if(nukeUsed == false){
				
				Instantiate(blueBaseDeathTop, blueBaseDeathTop.transform.position, Quaternion(0,0,0,0));
				Instantiate(alienNuke, alienNuke.transform.position, Quaternion(0,0,0,0));
				Instantiate(nukeBluePF, Vector3(0,0,0), Quaternion(0,0,0,0));
				nukeUsed = true;
				Destroy(GameObject.Find("Base_Manager_Blue_Top"));
				Destroy(GameObject.Find("ArrowT1"));
				Instantiate(lvl8DownLeft, lvl8DownLeft.transform.position, lvl8DownLeft.transform.rotation);
				Destroy(GameObject.Find("Lvl8UpLeft(Clone)"));
				Destroy(GameObject.Find("Lvl8UpLeft"));
				Destroy(GameObject.Find("BlueBaseUpper"));
				Destroy(GameObject.Find("BlueTurretUpper"));
				Destroy(GameObject.Find("BlueHealthUpper"));
				}
			
			}
		}
	}
	else{
		if(this.transform.tag == "blue"){
		healthb = healthb - dmg;
		BaseHealth_Manager.BaseHealthBlue(healthb);
			if(healthb <=0){
			healthb = 0;
			
			}
		}
	}
	
	if(healthb <= 100){
		print("Low Base Life");
	AIHuman.LowBaseLife(true);
	AIAlien.LowBaseLife(false);
	}
	if(healthc <= 100){
	
	AIAlien.LowBaseLife(true);
	}
	if(isLevel8 == true && healthb <= 0){
		AIAlien.BaseDead("Top");
		print("TopBaseDead");
	}
	else if(isLevel8 == true && healthc <= 0){
		AIAlien.BaseDead("Bottom");
	}

	
	
	//-------------------------------------------------LOSE SINGLE PLAYER--------------------------------------//	
	
		if (gameOver == false && health <= 0){
		if(GameObject.Find("SinglePlayer") || GameObject.Find("SinglePlayer(Clone)")){
			var gos1 : GameObject[];
			var gosb1 : GameObject[];
	   
	    	gos1 = GameObject.FindGameObjectsWithTag("blue");
	    	gosb1 = GameObject.FindGameObjectsWithTag("red");
	    	 //Destroys all units before end game screen
	    	for (var go1 : GameObject in gos1){ 
	   		Destroy(go1);
	       	} 
	       	for (var gob1 : GameObject in gosb1){ 
	   		Destroy(gob1);
	       	} 
	       	
	       	  //Tells GUI Game Manager to run the win or lose function, which will make it display the correct end game screen
	       	var guios1 : GameObject[];
	       	  
	        guios1 = GameObject.FindGameObjectsWithTag("gui");
	        
	        for (var gui1 : GameObject in guios1){ 
	   		var tempscript1 = gui1.GetComponent(GameGUI_SinglePlayer);
			tempscript1.Lose();
	       	}
	       	
			gameOver = true;
	    } 
	    }
    	 
	//---------------------------------------------LOSE SERVER---------------------------------------------//
	
	
		if (gameOver == false && health <= 0){
			Network.Instantiate(loseServer, this.transform.position, this.transform.rotation, 0);
		
//			var gos2 : GameObject[];
//			var gosb2 : GameObject[];
//	   
//	    	gos2 = GameObject.FindGameObjectsWithTag("blue");
//	    	gosb2 = GameObject.FindGameObjectsWithTag("red");
//	    	 //Destroys all units before end game screen
//	    	for (var go2 : GameObject in gos2){ 
//	   		Network.Destroy(go2);
//	       	} 
//	       	for (var gob2 : GameObject in gosb2){ 
//	   		Network.Destroy(gob2);
//	       	} 
	       	AudioListener.volume = 0.0;
			//listener.enabled = false;
			gameOver = true;
  	  }
		 
    	  
    	 
	//------------------------------------------------WIN SINGLE PLAYER-----------------------------------------//
	if(isLevel8 == false){
		if (gameOver == false && healthb <=0){
		if(GameObject.Find("SinglePlayer") || GameObject.Find("SinglePlayer(Clone)")){
		
		var gosx1 : GameObject[];
	   	var gosbx1 : GameObject[];
	   		 	 
	    gosx1 = GameObject.FindGameObjectsWithTag("blue");
	    gosbx1 = GameObject.FindGameObjectsWithTag("red");
	    	 
	    	for (var gox1 : GameObject in gosx1){ 
	   		Destroy(gox1);	
	    	} 
	    	for (var gobx1 : GameObject in gosbx1){ 
	    	Destroy(gobx1);
	   		} 
	    
	       	     	       	       	    
	    var guiosx1 : GameObject[];
	    
	    guiosx1 = GameObject.FindGameObjectsWithTag("gui");
	    
	    for (var guix1 : GameObject in guiosx1){ 
	   	var tempscriptx1 = guix1.GetComponent(GameGUI_SinglePlayer);
		tempscriptx1.Win();
	    }
		
		gameOver = true;
		}
		}
	}
	
	
	//---------------------------------------------WIN SERVER------------------------------//
	
	
		if (gameOver == false && healthb <= 0 && isLevel8 == false){
			Network.Instantiate(winServer, this.transform.position, this.transform.rotation, 0);

		
//		var gosx2 : GameObject[];
//	   	var gosbx2 : GameObject[];
//	   		 	 
//	    gosx2 = GameObject.FindGameObjectsWithTag("blue");
//	    gosbx2 = GameObject.FindGameObjectsWithTag("red");
//	    	 
//	    	for (var gox2 : GameObject in gosx2){ 
//	   		Network.Destroy(gox2);	
//	    	} 
//	    	for (var gobx2 : GameObject in gosbx2){ 
//	    	Network.Destroy(gobx2);
//	   		} 
	    AudioListener.volume = 0.0;
//		listener.enabled = false;
		gameOver = true;
		}
	
}


