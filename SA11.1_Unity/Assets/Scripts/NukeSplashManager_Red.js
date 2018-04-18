#pragma strict





var mothershipRedStyle : UnityEngine.GUIStyle;
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
	if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("Tutorial") || GameObject.Find("HumanSingle")){
	GetComponent.<AudioSource>().clip = nukesound;
	GetComponent.<AudioSource>().Play();

	}
	else if(GameObject.Find("AlienSingle(Clone)") || GameObject.Find("AlienSingle")){
	GetComponent.<AudioSource>().clip = mothershipsound;
	GetComponent.<AudioSource>().Play();
	
	}
}

function Update () {


	//if(Network.isClient == true)
	
		nukesoundtimer = Time.deltaTime + nukesoundtimer;
		//Debug.LogWarning("SHOULD BE GETTING NUKED, or SEE SLPAHS SCREEN RED");
		if (nukesoundtimer >= 1.3){
			nukedbyredStyle.normal.background = blankmap;
			nukedbyredStyle.active.background = blankmap;
			mothershipRedStyle.normal.background = blankmap;
			mothershipRedStyle.active.background = blankmap;
		}
		if (nukesoundtimer > 3){
			if(GameObject.Find("MultiPlayer")){
			Network.Destroy(this.gameObject);
			}
			else{
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

//CHANGE FOR MULTIPLAYER

	if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("Tutorial") || GameObject.Find("HumanServer") || GameObject.Find("HumanSingle")){
	GUI.Label (new Rect (0,0,wide, tall),"", nukedbyredStyle);
	}
	else if(GameObject.Find("AlienSingle(Clone)") || GameObject.Find("AlienServer")){
	GUI.Label (new Rect (0,0,wide, tall),"", mothershipRedStyle);
	}
	
	
	
	
	
	//GUI.Label (new Rect (0,0,wide, tall),"", nukedbyblueStyle);
	
	






}