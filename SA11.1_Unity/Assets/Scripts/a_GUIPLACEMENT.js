#pragma strict


var bgstyle : UnityEngine.GUIStyle;
var textstyle : UnityEngine.GUIStyle;
var bgwin : UnityEngine.Texture2D;

function Start () {

}

function Update () {

}


function OnGUI(){



	GUI.depth = 0;
	var wide = Screen.width;
	var tall = Screen.height;
	
	bgstyle.normal.background = bgwin;
	bgstyle.active.background = bgwin;

	//End Game Screen
	
	Debug.Log("YES1");
	GUI.Label (Rect (0, 0, wide, tall), "",bgstyle);
	Debug.Log("YES2");
		if (GUI.Button (new Rect( (wide/2.22)-(wide/5), (tall/5), wide/2, tall/6.5), "", bgstyle)){
		}
		if (GUI.Button (new Rect( (wide/2.22)-(wide/5), (tall/2.75), wide/2, tall/6.5), "", bgstyle)){
			
			
			//Application.LoadLevel(0);
			
		}
	GUI.Label (new Rect( (wide/2.6), (tall/12.1), wide/3.911, tall/2.2), "", textstyle);
	

}