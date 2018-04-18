#pragma strict
var scrnH : float;
var scrnW : float;
var btnX : float;
var btnY : float;
var btnW : float;
var btnH : float;

function Start () {

}

function Update () {

	scrnH = Screen.height;
	scrnW = Screen.width;
	btnX = Screen.width;
	btnY = Screen.height;
	btnW = Screen.width;
	btnH = Screen.height;
	

}

function onGUI () {
	   
	    if(GUI.Button(Rect(10, 10, 100, 30), "Start Server")){
    	}
}