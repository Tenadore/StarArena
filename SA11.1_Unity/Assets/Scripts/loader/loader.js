#pragma strict
var wide:float;
var tall:float;
var loaderStyle:GUIStyle;
function Start () {
	wide=Screen.width;
	tall=Screen.height;
	yield WaitForSeconds(.1);
	Application.LoadLevel("MainMenu");
}

function Update () {

}

function OnGUI(){

	GUI.Label(Rect(0,0, wide,tall),"",loaderStyle );

}