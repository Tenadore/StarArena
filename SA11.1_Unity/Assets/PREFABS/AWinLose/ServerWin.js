#pragma strict

function Start () {
	
	var gui : GameObject[];
	gui = GameObject.FindGameObjectsWithTag("gui");
	
	for(var win : GameObject in gui){
	var tempscript1 = win.GetComponent(GameGUI_Manager);
	tempscript1.Win();
	}

}

function Update () {

}