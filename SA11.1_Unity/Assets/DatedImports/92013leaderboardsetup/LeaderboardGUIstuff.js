#pragma strict

var uniqueID : float = 35;
var bgstyle : UnityEngine.GUIStyle;
var datastyle : UnityEngine.GUIStyle;
var baseURL = "http://server001.shalleeco.com/tenadore/data.php";

//var datastyle : UnityEngine.GUIStyle;
private var fulluserdata : String[] = new String[100];
private var fullMyData : String[] = new String[10];
var myRank : String;

function Start () {
	getLeaderboard();
	getMyRank();
	getMyStats();
}

function Update () {

}


function OnGUI() {

	var wide : int = Screen.width;
	var tall : int = Screen.height;
	print(wide);
	print(tall);
	GUI.Label (Rect (0, 0, wide, tall), "",bgstyle);
	
	//LEADERBOARD LABELS START
	//RANK 1
	//Username
	GUI.Label (new Rect( (wide/4)-(wide/14), (tall/6.9), wide/7, tall/11), ""+fulluserdata[3], datastyle);
	//Wins
	GUI.Label (new Rect( (wide/2.9), (tall/6.9), wide/7, tall/11), ""+fulluserdata[0], datastyle);
	//Losses
	GUI.Label (new Rect( (wide/1.95), (tall/6.9), wide/7, tall/11), ""+fulluserdata[1], datastyle);
	//Skill
	GUI.Label (new Rect( (wide/1.43), (tall/6.9), wide/7, tall/11), ""+fulluserdata[2], datastyle);
	
	//RANK 2
	GUI.Label (new Rect( (wide/4)-(wide/14), (tall/3.98), wide/7, tall/11), ""+fulluserdata[7], datastyle);
	GUI.Label (new Rect( (wide/2.9), (tall/3.98), wide/7, tall/11), ""+fulluserdata[4], datastyle);
	GUI.Label (new Rect( (wide/1.95), (tall/3.98), wide/7, tall/11), ""+fulluserdata[5], datastyle);
	GUI.Label (new Rect( (wide/1.43), (tall/3.98), wide/7, tall/11), ""+fulluserdata[6], datastyle);
	
	//RANK 3
	GUI.Label (new Rect( (wide/4)-(wide/14), (tall/2.7725), wide/7, tall/11), ""+fulluserdata[11], datastyle);
	GUI.Label (new Rect( (wide/2.9), (tall/2.7725), wide/7, tall/11), ""+fulluserdata[8], datastyle);
	GUI.Label (new Rect( (wide/1.95), (tall/2.7725), wide/7, tall/11), ""+fulluserdata[9], datastyle);
	GUI.Label (new Rect( (wide/1.43), (tall/2.7725), wide/7, tall/11), ""+fulluserdata[10], datastyle);
	
	//RANK 4
	GUI.Label (new Rect( (wide/4)-(wide/14), (tall/2.142), wide/7, tall/11), ""+fulluserdata[15], datastyle);
	GUI.Label (new Rect( (wide/2.9), (tall/2.142), wide/7, tall/11), ""+fulluserdata[12], datastyle);
	GUI.Label (new Rect( (wide/1.95), (tall/2.142), wide/7, tall/11), ""+fulluserdata[13], datastyle);
	GUI.Label (new Rect( (wide/1.43), (tall/2.142), wide/7, tall/11), ""+fulluserdata[14], datastyle);
	
	//RANK5
	GUI.Label (new Rect( (wide/4)-(wide/14), (tall/1.752), wide/7, tall/11), ""+fulluserdata[19], datastyle);
	GUI.Label (new Rect( (wide/2.9), (tall/1.752), wide/7, tall/11), ""+fulluserdata[16], datastyle);
	GUI.Label (new Rect( (wide/1.95), (tall/1.752), wide/7, tall/11), ""+fulluserdata[17], datastyle);
	GUI.Label (new Rect( (wide/1.43), (tall/1.752), wide/7, tall/11), ""+fulluserdata[18], datastyle);
	
	//YOUR RANK
	//Your rank number, then name, wins, losses, skill
	GUI.Label (new Rect( (wide/10), (tall/1.405), wide/10, tall/11), ""+myRank, datastyle);
	
	GUI.Label (new Rect( (wide/4)-(wide/14), (tall/1.405), wide/7, tall/11), ""+fullMyData[3], datastyle);
	GUI.Label (new Rect( (wide/2.9), (tall/1.405), wide/7, tall/11), ""+fullMyData[0], datastyle);
	GUI.Label (new Rect( (wide/1.95), (tall/1.405), wide/7, tall/11), ""+fullMyData[1], datastyle);
	GUI.Label (new Rect( (wide/1.43), (tall/1.405), wide/7, tall/11), ""+fullMyData[2], datastyle);
	
}


function getLeaderboard(){
	
	
	var commaChar = ","[0];

	var hs_get = WWW(baseURL + "?uid=1&topfive");
    yield hs_get;
    
    var leaderboardData = new ArrayList();
    
    //this var creates an array with all leaderboard data, split based on CSV
     fulluserdata = hs_get.text.Split(commaChar);
    
   	


}
function getMyStats(){

	var commaChar = ","[0];
	
	var hs_get = WWW(baseURL + "?uid="+uniqueID+"&viewvalues");
    yield hs_get;
	
	var myData = new ArrayList();
	fullMyData = hs_get.text.Split(commaChar);

}
function getMyRank(){

	var hs_get = WWW(baseURL + "?uid="+uniqueID+"&myrank");
    yield hs_get;
	myRank = hs_get.text;

}



// Get the scores from the access DB to display in a GUIText.
//function GetScore() {
//	print("Retrieving Scores");
//    var numfields = 2; //if you change the amount of columns in the php, change this
//    
//    //gameObject.guiText.text = "Loading Scores";
//    
//    var hs_get = WWW(baseURL + "?uid=2&viewscore");
//    yield hs_get;
// 
//    if(hs_get.error) {
//    	print("There was an error getting the high score: " + hs_get.error);
//    } else {
//        	
// 			var received_data = Regex.Split(hs_get.data,",");
//			var scores = (received_data.Length-1)/numfields;
//			var username = new Array();
//			var score = new Array();
//			gameObject.guiText.text ="";
//			for(var i = 0; i<scores;i++) {
//				username[i]=received_data[numfields*i];
//				score[i]=received_data[numfields*i+1];//increment by one for each column.
//				gameObject.guiText.text = gameObject.guiText.text + "Name: " +username[i]+ " Score: " +score[i]+"\r\n";
//			}	
//			//Pseudocode:
//			//label_1st_place.text = username[1];
//			//label_1st_score.text = score[1];
//		
//}
//}