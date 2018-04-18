#pragma strict



var gameGUIManager_Object : GameObject;
var gameGUIManager_Single : GameObject;
var gameGUIManager_Tutorial : GameObject;





function Start () {

	// var races : GameObject[];
 //    races =  GameObject.FindGameObjectsWithTag ("race");
 
 //    for(var i = 0 ; i < races.length ; i ++){
        
 //        Network.Destroy(races[i]);
 //    }

	if(GameObject.Find("SinglePlayer")){
	//yield WaitForSeconds (1);
	Instantiate(gameGUIManager_Single, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
	}
	else if(GameObject.Find("MultiPlayer")){
	//yield WaitForSeconds (2);
	Instantiate(gameGUIManager_Object, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
	}
	else if(GameObject.Find("Tutorial")){
	//yield WaitForSeconds (1);
	Instantiate(gameGUIManager_Tutorial, Vector3(0,0,0), Quaternion(0.0,0.0,0.0,0.0));
	}



}

function Update () {

}