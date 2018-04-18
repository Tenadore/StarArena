#pragma strict
var nukesound : AudioClip;
var mothershipsound : AudioClip;

var nukeSplashStyle : UnityEngine.GUIStyle;
var nukeredtex : UnityEngine.Texture;
var mothershipredtex : UnityEngine.Texture;

function Start () {
		
		
		Unitcontroller.Nuke(false, true);
		GetComponent.<AudioSource>().clip = nukesound;
		GetComponent.<AudioSource>().Play();
		nukeSplashStyle.normal.background = nukeredtex;
	
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
