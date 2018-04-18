#pragma strict
var mothershipBlueStyle : UnityEngine.GUIStyle;
var nukedbyredStyle : UnityEngine.GUIStyle;
var nukedbyblueStyle : UnityEngine.GUIStyle;
var blankmap : Texture;
var nukesoundtimer : float;
var wide : float;
var tall : float;
var nukesound : AudioClip;
var mothershipsound : AudioClip;


function Start () {

wide = Screen.width;
tall = Screen.height;
//yield WaitForSeconds (5);
//this.Destroy;

//NEED TO ADD IF STATEMENTS TO KNOW IF BLUE PLAYER IS HUMAN OR ALIEN + MP OR SP

	if(GameObject.Find("AlienAI") || GameObject.Find("AlienClient") || GameObject.Find("AlienAI(Clone)")){
		
		GetComponent.<AudioSource>().clip = mothershipsound;
		GetComponent.<AudioSource>().Play();
		
	}
	else{
	
		GetComponent.<AudioSource>().clip = nukesound;
		GetComponent.<AudioSource>().Play();
		
	}

	

}

function Update () {

	nukesoundtimer = Time.deltaTime + nukesoundtimer;
	
	if (nukesoundtimer >= 1.3){
			nukedbyblueStyle.normal.background = blankmap;
			nukedbyblueStyle.active.background = blankmap;
			mothershipBlueStyle.normal.background = blankmap;
			mothershipBlueStyle.active.background = blankmap;
	}
		
		
//		}
		if(GameObject.Find("MultiPlayer")){
			if (nukesoundtimer > 3){
			Network.Destroy(this.gameObject);
			}
		}
		if(GameObject.Find("SinglePlayer")){
			if(nukesoundtimer > 3){
			Destroy(this.gameObject);
			}
		}
		if(GameObject.Find("Tutorial")){
			if(nukesoundtimer > 3){
			Destroy(this.gameObject);
			}
		}
	
	
//		//if(Network.isServer == true)
//		nukesoundtimer = Time.deltaTime + nukesoundtimer;
//		//Debug.LogWarning("SHOULD BE GETTING NUKED, or SEE SLPAHS SCREEN RED");
//		if (nukesoundtimer >= 1)
//		{
//			nukedbyblueStyle.normal.background = blankmap;
//			nukedbyblueStyle.active.background = blankmap;
//			nukesoundtimer = 0;
//		}

}


function OnGUI() {


	
	if(GameObject.Find("HumanClient") || GameObject.Find("HumanAI(Clone)") || GameObject.Find("HumanAI")){
	GUI.Label (new Rect (0,0,wide, tall),"", nukedbyblueStyle);
	}
	else if(GameObject.Find("AlienClient") || GameObject.Find("AlienAI") || GameObject.Find("AlienAI(Clone)")){
	GUI.Label (new Rect (0,0,wide, tall),"", mothershipBlueStyle);
	}
	
	
	
	
	
	//GUI.Label (new Rect (0,0,wide, tall),"", nukedbyblueStyle);
	
	






}