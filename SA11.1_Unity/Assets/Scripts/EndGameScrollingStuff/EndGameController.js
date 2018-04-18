#pragma strict
var endGameLabelBGStyle:UnityEngine.GUIStyle;
var endGameLabelTextStyle:UnityEngine.GUIStyle;
var loadingBG : UnityEngine.Texture;
var yPos : float;
var clickTimer: float;
var scrollTimer: float;
var wide : float;
var tall: float;
var textOff : boolean = false;

function Start () {

}

function Update () {
	wide = Screen.width;
	tall = Screen.height;
	clickTimer = clickTimer + Time.deltaTime;
	scrollTimer = scrollTimer+ Time.deltaTime;
	
	if(yPos>=0){
		yPos = tall - (scrollTimer*40);
	}
	//print(yPos);
	
	
	if(clickTimer > 4){
		if(Input.GetMouseButtonDown(0)){
			endGameLabelBGStyle.normal.background = loadingBG;
			textOff=true;
			if(!GameObject.Find("Intro")){
				Application.LoadLevel("MainMenu");
			}
			else{
				Application.LoadLevel("SinglePlayer_Campaign");
			}
		}
	
	
	}

}

function OnGUI(){
	var wide = Screen.width;
	var tall = Screen.height;



 	GUI.Label (Rect (0, 0, wide, tall), "",endGameLabelBGStyle);
 
 
 	if(textOff==false){
 		GUI.Label (Rect (0, yPos, wide, tall), "",endGameLabelTextStyle);
	}


}