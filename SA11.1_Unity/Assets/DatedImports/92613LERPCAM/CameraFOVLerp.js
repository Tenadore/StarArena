#pragma strict







//#$^&*()*&^%$^&*()(*&^%&%$&^**()     NOTE - THIS SCRIPT HAS BEEN MERGED WITH THE CAMERA CONTROLLER SCRIPT AND NOW EXISTS ONLY FOR REFERENCE

var startPosition : Vector3;
var targetPosition : Vector3;
var startRotation : Quaternion;
var targetRotation : Quaternion;

var atDefault : boolean = true;
var lerpTimer : float;

var speed : float = 1;

var lerpingTo : boolean = false;
var lerpingFrom : boolean = false;

function Start () {

	startPosition = this.transform.position;
		startRotation = this.transform.rotation;


}





function Update () {

	

	
	lerpTimer = lerpTimer + Time.deltaTime;
	
	if((lerpTimer * speed) > 1){
		lerpingTo = false;
		lerpingFrom = false;
	}

	if(lerpingTo == true && (lerpTimer * speed) < 1){
		print("I SHOULD BE LERPING TO");
		this.transform.position = Vector3.Lerp(startPosition, Vector3(78.0,68.0,0.0) , lerpTimer * speed);
		this.transform.rotation = Quaternion.Lerp(startRotation, Quaternion.Euler(40.0,270.0,0.0) , lerpTimer* speed);
	
	}
	
	if(lerpingFrom == true && (lerpTimer * speed) < 1){
		print("I SHOULD BE LERPING FROM");
		this.transform.position = Vector3.Lerp(startPosition, Vector3(40.0,104.0,0.0) , lerpTimer* speed);
		this.transform.rotation = Quaternion.Lerp(startRotation, Quaternion.Euler(70.0,270.0,0.0) , lerpTimer * speed);
	
	}


}




function OnGUI(){

	var wide = Screen.width;
	var tall = Screen.height;
	
	//Lerp button
	if (GUI.Button (new Rect ((wide/30) , tall/5, tall/6, tall/6),""))  {
		if(atDefault == false){
			atDefault = true;
			startPosition = this.transform.position;
			startRotation = this.transform.rotation;
			lerpTimer = 0;
			lerpingFrom = true;
		}
		else if(atDefault == true){
			atDefault = false;
			startPosition = this.transform.position;
			startRotation = this.transform.rotation;
			lerpTimer = 0;
			lerpingTo = true;
		}
			
	
	}



}
