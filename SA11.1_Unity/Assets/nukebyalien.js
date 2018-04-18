#pragma strict
var nukebyalienStyle : UnityEngine.GUIStyle;

var nukesoundtimer : float;
var wide : float;
var tall : float;

var mothershipsound : AudioClip;


function Start () {

wide = Screen.width;
tall = Screen.height;

		GetComponent.<AudioSource>().clip = mothershipsound;
		GetComponent.<AudioSource>().Play();

}

function Update () {


		nukesoundtimer = Time.deltaTime + nukesoundtimer;

	
			if(nukesoundtimer > 1.3){
			Destroy(this.gameObject);
			}


}


function OnGUI() {


	
	
	GUI.Label (new Rect (0,0,wide, tall),"", nukebyalienStyle);
	





}