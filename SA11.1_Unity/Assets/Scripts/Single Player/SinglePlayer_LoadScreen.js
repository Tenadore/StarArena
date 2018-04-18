#pragma strict

//Variables for Screen Settings
var scrnH : float;
var scrnW : float;
var btnX : float;
var btnY : float;
var btnW : float;
var btnH : float;
//Variables for displaying level and race choosen
var levelChosen : String;
var labelLevel : String;
//Variables for Choosing race
var raceHuman : boolean;
var raceAlien : boolean;
var raceHumanAI : boolean;
var raceAlienAI : boolean;
var labelRace : String;
var labelRaceAI : String;
var raceChosen : boolean;
var raceChosenAI : boolean;
var levelOne : boolean;
var levelTwo : boolean;
var levelThree : boolean;
var skirmish : boolean = false;

function Start(){

skirmish = true;

}


function Update () {

	//Sets the Screen to fit the Device
	scrnH = Screen.height;
	scrnW = Screen.width;
	btnX = Screen.width;
	btnY = Screen.height;
	btnW = Screen.width;
	btnH = Screen.height;
	
}


function OnGUI (){
//
//	//Labels to tell you what level and race you have chosen
//	GUI.Label(Rect(15, 170, 100, 30), labelLevel);
//	GUI.Label(Rect(250, 170, 100, 30), labelRaceAI);
//	GUI.Label(Rect(125, 170, 100, 30), labelRace);
//	
	
	//Show the Host Game and Refresh Buttons
//	if(skirmish == false){
//        if(GUI.Button(Rect(10, 10, 100, 30), "Skirmish")){
//        Debug.Log("Skirmish");
//        skirmish = true;
//        }
//        if(GUI.Button(Rect(10, 50, 100, 30), "Campaign")){
//        Debug.Log("Campaign");
//        }
//     }      
    //Puts you back to the main menu
    if(GUI.Button(Rect(10, scrnH / 1.05, 200, 30), "Main Menu")){
    Debug.Log("Main Menu");
    Application.LoadLevel(0);
    }
//    //Allows Host to Choose race and select level.
//    if(skirmish == true){
//		if(GUI.Button(Rect(10, 10, 100, 30), "Level 1")){
//		Debug.Log("Loading Level 1");
//		levelChosen = "Level1";
//		labelLevel = "LEVEL 1";
//		levelOne = true;	
//		}
//		if(GUI.Button(Rect(10, 50, 100, 30), "Level 2")){
//		Debug.Log("Loading Level 2");
//		levelChosen = "Level2";
//		labelLevel = "LEVEL 2";
//		levelTwo = true;
//		}
//		if(GUI.Button(Rect(10, 90, 100, 30), "Level 3")){
//		Debug.Log("Loading Level 3");
//		levelChosen = "Level 3";
//		labelLevel = "LEVEL 3";
//		levelThree = true;
//		}
//		if(GUI.Button(Rect(120, 10, 100, 30), "Humans")){
//		Debug.Log("You are the Humans");
//		labelRace = "HUMANS";
//		raceHuman = true;
//		raceAlien = false;
//		raceChosen = true;
//		}
//		if(GUI.Button(Rect(120, 50, 100, 30), "Aliens")){
//		Debug.Log("You are the Aliens");
//		labelRace = "ALIENS";
//		raceAlien = true;
//		raceHuman = false;
//		raceChosen = true;
//		}		
	}
		//Start the game
		
			if(GUI.Button(Rect(10, 250, 150, 30), "Start Game")){
			DontDestroyOnLoad(GameObject.Find("SinglePlayer"));
				if(raceHuman == true){
				DontDestroyOnLoad(GameObject.Find("HumanSingle"));
				}
				if(raceAlien == true){
				DontDestroyOnLoad(GameObject.Find("AlienSingle"));
				}
				if(raceHumanAI == true){
				DontDestroyOnLoad(GameObject.Find("HumanAI"));
				}
				if(raceAlienAI == true){
				DontDestroyOnLoad(GameObject.Find("AlienAI"));
				}
				if(levelOne == true){
					if(raceChosen == true && raceChosenAI == true){
					Application.LoadLevel(1);
					}
				}
				if(levelTwo == true){
					if(raceChosen == true && raceChosenAI == true){
					Application.LoadLevel(2);
					}
				}
				if(levelThree == true){
					if(raceChosen == true && raceChosenAI == true){
					Application.LoadLevel(3);
					}
				}
			}
//    	//Starts race for
//	   if(skirmish == true){
//	    	if(GUI.Button(Rect(250, 10, 100, 30), "Humans")){
//			Debug.Log("Computer is Human");
//			labelRaceAI = "HUMANS";
//			raceHumanAI = true;
//			raceAlienAI = false;
//			raceChosenAI = true;
//			}
//			if(GUI.Button(Rect(250, 50, 100, 30), "Aliens")){
//			Debug.Log("Computer is Alien");
//			labelRaceAI = "ALIENS";
//			raceAlienAI = true;
//			raceHumanAI = false;
//			raceChosenAI = true;
//			}
//        }
//}
