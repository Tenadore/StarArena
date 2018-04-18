#pragma strict
#pragma strict
var nukesound : AudioClip;
var mothershipsound : AudioClip;

var nukeSplashStyle : UnityEngine.GUIStyle;
var nukebluetex : UnityEngine.Texture;
var mothershipbluetex : UnityEngine.Texture;

function Start () {
		
	
		Unitcontroller.Nuke(true, false);
		GetComponent.<AudioSource>().clip = nukesound;
		GetComponent.<AudioSource>().Play();
		nukeSplashStyle.normal.background = nukebluetex;
	
	yield WaitForSeconds(1.5);
	Network.Destroy(this.gameObject);
}





function Update () {

}

function OnGUI(){
var wide = Screen.width;
var tall = Screen.height;
GUI.Label (new Rect (0,0,wide, tall),"", nukeSplashStyle);
}
