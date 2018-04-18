#pragma strict
var baseURL = "http://server001.shalleeco.com/tenadore/data.php";
var styleNameYourGame : UnityEngine.GUIStyle;
var userName : String = "Enter User Name";
var validuser : boolean;


function Start () {

//GetScore();
//CheckUser();

}

function Update (){

//GetScore();
}
function OnGUI(){

	var wide : int = Screen.width;
	var tall : int = Screen.height;

	

	
	userName = GUI.TextField (Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), userName, 25, styleNameYourGame);
	
	if (GUI.changed == true){
		CheckUser(userName);
		if(validuser==false){
			getuid(userName);
		}
	}
	
}
function getuid(username:String){
	var hs_get = WWW(baseURL+"?retrieveid="+username);
	yield hs_get;
	gameObject.GetComponent.<GUIText>().text = "UID :" + hs_get.text;

}
function CheckUser(username : String){
	var hs_get = WWW(baseURL+"?checkuser="+username);
    yield hs_get;
    	if (hs_get.text=="1"){
    	validuser = false;
    	}else if(hs_get.text=="0"){
    	validuser= true;
    	}
}

// Get the scores from the access DB to display in a GUIText.
function GetScore() {
    var numfields = 2; //if you change the amount of columns in the php, change this
    
    gameObject.GetComponent.<GUIText>().text = "Loading Scores";
    
    var hs_get = WWW(baseURL + "?uid=2&viewscore");
    yield hs_get;
 
    if(hs_get.error) {
    	print("There was an error getting the high score: " + hs_get.error);
    } else {
        	
 			var received_data = Regex.Split(hs_get.text,",");
			var scores = (received_data.Length-1)/numfields;
			var username = new Array();
			var score = new Array();
			gameObject.GetComponent.<GUIText>().text ="";
			for(var i = 0; i<scores;i++) {
				username[i]=received_data[numfields*i];
				score[i]=received_data[numfields*i+1];//increment by one for each column.
				gameObject.GetComponent.<GUIText>().text = gameObject.GetComponent.<GUIText>().text + "Name: " +username[i]+ " Score: " +score[i]+"\r\n";
			}	
			//Pseudocode:
			//label_1st_place.text = username[1];
			//label_1st_score.text = score[1];
		
}
}

