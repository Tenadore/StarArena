#pragma strict


var startTexture : UnityEngine.Texture;
var endTexture : UnityEngine.Texture;
var thisButton : UnityEngine.GUIElement;
var isOver : boolean = false;
var pickCam : Camera;

function Start () { 
thisButton.GetComponent.<GUITexture>().texture = startTexture;

}

function Update () {

//This if statement tests if there is a 1 finger touch that is beginning AND over the GUITexture object of choice
if ((Input.touchCount == 1) && (Input.GetTouch(0).phase == TouchPhase.Began) ) 
{
	//Camera.main.ViewportToScreenPoint(Cursor.position)
	if(thisButton.HitTest(pickCam.ViewportToScreenPoint(Input.GetTouch(0).position)) != null)
	{
	isOver = true;
	thisButton.GetComponent.<GUITexture>().texture = endTexture;
	}






}

//This if statement waits until the user removes his finger from the button to run
if ((Input.GetTouch(0).phase == TouchPhase.Ended))

	
	thisButton.GetComponent.<GUITexture>().texture = startTexture;



	isOver = false;

}