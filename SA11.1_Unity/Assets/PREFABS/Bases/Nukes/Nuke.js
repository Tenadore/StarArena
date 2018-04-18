#pragma strict

static var nukeRed : boolean;
static var nukeBlue : boolean;


function Start () {

	if(GameObject.Find("NukeRed(Clone)")){
		//nukeRed = true;
		//nukeBlue = false;
		Unitcontroller.nukeRed = true;
		//Unitcontroller.Nuke(nukeBlue, nukeRed);
		//Nuke();
	}
	else if(GameObject.Find("NukeBlue(Clone)")){
		//nukeRed = false;
		//nukeBlue = true;
		Unitcontroller.nukeBlue = true;
		//Unitcontroller.Nuke(nukeBlue, nukeRed);
		//Nuke();
	}
		
	yield WaitForSeconds (.5);
	
	if(GameObject.Find("SinglePlayer") || GameObject.Find("Tutorial")){
	Destroy(this.gameObject);
	}
//	else if(GameObject.Find("MultiPlayer")){
//	Network.Destroy(this.gameObject);
//	}

}
function Update () {

}

public function Nuke(){

	//Unitcontroller.Nuke(nukeBlue, nukeRed);
	
	
}