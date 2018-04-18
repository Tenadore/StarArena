#pragma strict
var mothershipsound : AudioClip;


var nukeSplashStyle : UnityEngine.GUIStyle;
var mothershipredtex : UnityEngine.Texture;


function Start () {
		
		
	
		GetComponent.<AudioSource>().clip = mothershipsound;
		GetComponent.<AudioSource>().Play();
		nukeSplashStyle.normal.background = mothershipredtex;

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
