#pragma strict



var thisButton : UnityEngine.GUIElement;

//places object script is applied to relative of current resolution
function Start () {
	
	
	//var wide : int = 1280;
	//var tall : int = 800;
	
	//thisButton.guiTexture.pixelInset = Rect(((tall/2)*(-1)+10),((wide)*(-1)-200),tall,wide*2);
	//thisButton.guiTexture.pixelInset = Rect(((wide/4)*(-1)+20),(((tall)/2)*(-1)+28),944,616);
	
	
	


}
function OnGUI(){
var wide = Screen.width;
var tall = Screen.height;
thisButton.GetComponent.<GUITexture>().pixelInset = Rect(0,0,wide,tall);

}



function Update () {
	
	






}