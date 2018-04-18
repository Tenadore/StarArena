#pragma strict

static var nukeRed : boolean;
static var nukeBlue : boolean;
var blankmap : Texture;
var nukesoundtimer : float;
var wide : float;
var tall : float;
var nukesound : AudioClip;
var mothershipsound : AudioClip;

var splashScreen : String;


function Start () {

	wide = Screen.width;
	tall = Screen.height;


	if(GameObject.Find("NukeRed(Clone)")){
		//Unitcontroller.nukeRed = true;
		nukeRed = true;
		nukeBlue = false;
		splashScreen = "red";
		Nuke();
	}
	else if(GameObject.Find("NukeBlue(Clone)")){
		//Unitcontroller.nukeBlue = true;
		nukeRed = false;
		nukeBlue = true;
		splashScreen = "blue";
		Nuke();
	}
		
	yield WaitForSeconds (.5);
	
	if(GameObject.Find("SinglePlayer") || GameObject.Find("Tutorial")){
	Destroy(this.gameObject);
	}
	else if(GameObject.Find("MultiPlayer")){
	Network.Destroy(this.gameObject);
	}

	
	

}
function Update () {

}

public function Nuke(){

	//GameGUI_Manager.Nuke(splashScreen);
	Unitcontroller.Nuke(nukeBlue, nukeRed);
	
	
}






	

	
	





