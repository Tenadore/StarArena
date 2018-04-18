#pragma strict

//import System.Text.RegularExpressions;
//import System;
//import System.Data;
//import System.Data.SqlClient;

//var highscoreUrl = "https://server001.shalleeco.com/tenadore/data.php";  
//var form = new WWWForm();


//V11 New settings "mmm" vars
var mmmStyle:GUIStyle;
var mmmOff:Texture2D;
var mmmOn:Texture2D;
var isMmm:boolean;
var soundManager:GameObject;
var sm_Challenger:GameObject;

var baseURL = "http://www.tidbituniverse.com/netfolder/tidbit/stararena/data.php";
var uniqueID;
var testLeaderboard;



var styleChooseUserSettings : UnityEngine.GUIStyle;
var styleCreateUserSingle : UnityEngine.GUIStyle;
var textstylered : UnityEngine.GUIStyle;
var spawnRaces : boolean;
var humanAI : UnityEngine.GameObject;
var humanSingle : UnityEngine.GameObject;
var alienAI : UnityEngine.GameObject;
var alienSingle : UnityEngine.GameObject;

var loadingPlayers : UnityEngine.GUIStyle;
var createUser : boolean = false;
var logIn : boolean = false;
var leaderboard : boolean = false;
//import System.Data.Odbc;
//import System.Data.OleDb;

var isValid : boolean;
var validuser : boolean;
var validpassword : boolean;
var uid;


var stylePassword : UnityEngine.GUIStyle;
var styleLeaderboardBtn : UnityEngine.GUIStyle;
var styleReady : UnityEngine.GUIStyle;
var textureReadyO : UnityEngine.Texture2D;
var textureReady : UnityEngine.Texture2D;
var styleLeaderboard : UnityEngine.Texture2D;
var styleBlank : UnityEngine.Texture2D;
var changeUserName : String = "Player1";
var createUserSingle : boolean = false;
var userNameSingle : String = "Player 1";
var raceNumber : int;
var raceNumberAI : int;
var raceRandom : boolean = true;
var randomRace : int;
var randomRaceAI : int;
var levelRandom : int;
var randomLevel : boolean;
var styleRefresh : UnityEngine.GUIStyle;
var textureLevelRandom : UnityEngine.Texture2D;
var textureHumanRace : UnityEngine.Texture2D;
var textureAlienRace : UnityEngine.Texture2D;
var textureHumanRaceAI : UnityEngine.Texture2D;
var textureAlienRaceAI : UnityEngine.Texture2D;
var textureRandomRace : UnityEngine.Texture2D;
var textureInvalidUserPass : UnityEngine.Texture2D;
var textureUsernameExists : UnityEngine.Texture2D;
var textureNoInternet : UnityEngine.Texture2D;
var styleError : UnityEngine.GUIStyle;
var styleOkayBtn : UnityEngine.GUIStyle;
var styleBlankButton : UnityEngine.GUIStyle;
var styleGraphicsLabel : UnityEngine.GUIStyle;
var styleVolumeLabel : UnityEngine.GUIStyle;
var textureLogIn : UnityEngine.Texture2D;
var textureLogInClicked : UnityEngine.Texture2D;
var textureCreate : UnityEngine.Texture2D;
var textureCreateClicked : UnityEngine.Texture2D;
var styleCreate : UnityEngine.GUIStyle;
var styleLogIn : UnityEngine.GUIStyle;
var styleArrowRight : UnityEngine.GUIStyle;
var styleArrowLeft : UnityEngine.GUIStyle;
var styleSinglePlayer : UnityEngine.GUIStyle;
var styleMultiPlayer : UnityEngine.GUIStyle;
var styleTutorial : UnityEngine.GUIStyle;
var styleSkirmish : UnityEngine.GUIStyle;
var styleCampaign : UnityEngine.GUIStyle;
var styleLevel1 : UnityEngine.GUIStyle;
var styleLevelStarting : UnityEngine.Texture2D;
var styleLevel2 : UnityEngine.Texture2D;
var styleLevel3 : UnityEngine.Texture2D;
var styleLevel4 : UnityEngine.Texture2D;
var styleLevel5 : UnityEngine.Texture2D;
var styleLevel6	: UnityEngine.Texture2D;
var styleLevel7 : UnityEngine.Texture2D;
var styleHumans : UnityEngine.GUIStyle;
var styleAliens : UnityEngine.GUIStyle;
var styleBack : UnityEngine.GUIStyle;
var styleLAN : UnityEngine.GUIStyle;
var styleOnline : UnityEngine.GUIStyle;
var styleHost : UnityEngine.GUIStyle;
var styleJoin : UnityEngine.GUIStyle;
var styleHumanRedLable : UnityEngine.GUIStyle;
var styleHumanBlueLable : UnityEngine.GUIStyle;
var styleAlienRedLable : UnityEngine.GUIStyle;
var styleAlienBlueLable : UnityEngine.GUIStyle;
var styleLevelOneLable : UnityEngine.GUIStyle;
var styleLevelTwoLable : UnityEngine.GUIStyle;
var styleLevelThreeLable : UnityEngine.GUIStyle;
var styleChooseRace : UnityEngine.GUIStyle;
var styleUnitPedia : UnityEngine.GUIStyle;
var styleHowToPlay : UnityEngine.GUIStyle;
var styleStart : UnityEngine.GUIStyle;
var styleDisplayGames : UnityEngine.GUIStyle;
var styleNameYourGame : UnityEngine.GUIStyle;
var stylePrev : UnityEngine.GUIStyle;
var styleNext : UnityEngine.GUIStyle;
var styleWaitingForPlayer : UnityEngine.GUIStyle;
var stylePlayerConnected : UnityEngine.GUIStyle;
var styleQuit : UnityEngine.GUIStyle;
var styleEasy : UnityEngine.GUIStyle;
var styleNormal : UnityEngine.GUIStyle;
var styleHard : UnityEngine.GUIStyle;
var textureEasyGrey : UnityEngine.Texture2D;
var textureNormalGrey : UnityEngine.Texture2D;
var textureHardGrey : UnityEngine.Texture2D;
var textureEasyOriginal : UnityEngine.Texture2D;
var textureNormalOriginal : UnityEngine.Texture2D;
var textureHardOriginal : UnityEngine.Texture2D;
var styleContinue : UnityEngine.GUIStyle;
var styleNewGame : UnityEngine.GUIStyle;
var textureContinueGrey : UnityEngine.Texture2D;
var textureContinue : UnityEngine.Texture2D;
var textureContinuePressed : UnityEngine.Texture2D;
var styleSettings : UnityEngine.GUIStyle;

var styleHigh : UnityEngine.GUIStyle;
var styleLow : UnityEngine.GUIStyle;
var textureHigh : UnityEngine.Texture;
var textureLow : UnityEngine.Texture;
var textureHighG : UnityEngine.Texture;
var textureLowG : UnityEngine.Texture;

var buttonclick : AudioClip;
var bgPediaMarine: Texture2D;
var bgPediaSniper: Texture2D;
var bgPediaCannoneer: Texture2D;
var bgPediaDozer: Texture2D;
var bgPediaStriker: Texture2D;
var bgPediaTitan: Texture2D;
var bgPediaNuke : Texture2D;
var bgPediaDrudge: Texture2D;
var bgPediaSqualler: Texture2D;
var bgPediaGriefer: Texture2D;
var bgPediaWarder: Texture2D;
var bgPediaDisrupter: Texture2D;
var bgPediaArbiter: Texture2D;
var bgPediaMothership : Texture2D;
var bg : Texture2D;
var bgstyle : UnityEngine.GUIStyle;
var bgstyle2 : Texture2D;
var bgstyleOriginal : UnityEngine.Texture;
var bgLoading : UnityEngine.Texture;
var bgstyleSkirmish : UnityEngine.Texture;
var bgstyleLAN : UnityEngine.Texture;
var bgstyleJoinLAN : UnityEngine.Texture;
var bgstyleUnitPedia : UnityEngine.GUIStyle;
var bgstyleHowToPlay : UnityEngine.GUIStyle;
var bgstyleStarmap : UnityEngine.Texture;

var buttonstyleLevel1 : UnityEngine.GUIStyle;
var buttonstyleLevel2 : UnityEngine.GUIStyle;
var buttonstyleLevel3 : UnityEngine.GUIStyle;
var buttonstyleLevel4 : UnityEngine.GUIStyle;
var buttonstyleLevel5 : UnityEngine.GUIStyle;
var buttonstyleLevel6 : UnityEngine.GUIStyle;
var buttonstyleLevel7 : UnityEngine.GUIStyle;
//Variables for Screen Settings
var scrnH : float;
var scrnW : float;
var btnX : float;
var btnY : float;
var btnW : float;
var btnH : float;
//Variables for displaying level and race choosen
var levelChosen : String;
var labelLevel : String;
//Animation
var marine : UnityEngine.GameObject;
var sniper : UnityEngine.GameObject;
var cannoneer : UnityEngine.GameObject;
var dozer : UnityEngine.GameObject;
var striker : UnityEngine.GameObject;
var titan : UnityEngine.GameObject;
var styleNuke : UnityEngine.GUIStyle;
var drudge : UnityEngine.GameObject;
var squaller : UnityEngine.GameObject;
var griefer : UnityEngine.GameObject;
var warder : UnityEngine.GameObject;
var disrupter : UnityEngine.GameObject;
var arbiter : UnityEngine.GameObject;
var styleMothership : UnityEngine.GUIStyle;
//Variables for Choosing race

var raceHuman : boolean;
var raceAlien : boolean;
var raceHumanClient : boolean;
var raceAlienClient : boolean;
var raceHumanAI : boolean;
var raceAlienAI : boolean;
var labelRace : String;
var labelRaceAI : String;
var raceChosen : boolean;
var raceChosenAI : boolean;
var levelOne : boolean;
var levelTwo : boolean;
var levelThree : boolean;
var levelFour : boolean;
var levelFive : boolean;
var levelSix : boolean;
var levelSeven : boolean;
var singleChoice : boolean = false;
var singlePlayer : boolean = false;
var multiPlayer : boolean = false;
var skirmish : boolean = false;
var volumeControl : boolean = false;
var multiLocal : boolean = false;
var multiOnline : boolean = false;
var multiChoice : boolean = false;
var hostLAN : boolean = false;
var hostedLAN : boolean = false;
var joinLAN : boolean = false;
var joinedLAN : boolean = false;
var tutorial : boolean = false;
var howToPlay : boolean = false;
var unitPedia : boolean = false;
var humanPedia : boolean = false;
var alienPedia : boolean = false;
var tutorialChoice : boolean = false;
var unitPediaUnits : boolean = false;
var start : boolean = false;
var nuke : boolean = false;
var mothership : boolean = false;
var playerConnected : boolean = false;
var playerReady : boolean = false;
private var hostData : HostData[];
var pediaPage : int = 1;
var maxPlayers : int = 2;
var serverNameField : String = "Game Name";
var updateTimer : float;
var gameOne : boolean = false;
var gameTwo : boolean = false;
var gameThree : boolean = false;
var gameFour : boolean = false;
var gameFive : boolean = false;
var campaign : boolean = false;

var difficultyLevel : int;
var normal : UnityEngine.GameObject;
var easy : UnityEngine.GameObject;
var hard : UnityEngine.GameObject;


//var dbcon : IDbConnection;
var userName : String = "Player1";
var password : String = "Password";
var url = "http://comm.tidbit.us:81/insert.aspx?";
var levelNumber : int;
var inGameVolume : float = 1.0;
var settings : boolean = false;
var highGraphics : boolean = true;
var customSkin : GUISkin;
var invalidUserPass : boolean = false;
var backOneField : boolean = false;


//Leaderboard vars
var datastyle : UnityEngine.GUIStyle;
private var fulluserdata : String[] = new String[100];
private var fullMyData : String[] = new String[10];
var myRank : String;
var getleaderdata : boolean = true;
var refreshTimer : float = 0;

//Slider styles
var sliderbarstyle : UnityEngine.GUIStyle;
var sliderthumbstyle : UnityEngine.GUIStyle;
var styleSPnameLabel : UnityEngine.GUIStyle;

//Connection error vars
var failedToConnectMS : boolean = false;
var noInternetStyle : UnityEngine.GUIStyle;
var noInternetLabelOn : boolean = false;
var internetConnection : boolean = false;
var pingTimer : float;

//Random Loading Screen Vars
var loadingScreen1 : UnityEngine.Texture;
var loadingScreen2 : UnityEngine.Texture;
var loadingScreen3 : UnityEngine.Texture;
var loadingScreen4 : UnityEngine.Texture;
var randomLoadScreen : int;
var blankmap : UnityEngine.Texture;


//Host datavars
var game1data : int;
var game2data : int;
var game3data : int;
var game4data : int;
var x : int = 0;
var y : int = 0;
var joiningGame : boolean = false;
var joinlabelStyle : UnityEngine.GUIStyle;
var joiningGameTexture : UnityEngine.Texture;
var failedtoJoinTexture : UnityEngine.Texture;
var joiningGameTimer : float;
var closed : boolean = false;
var open : boolean = false;

var bgstyle3 : UnityEngine.GUIStyle;
var usernameopponent : String = "Unknown";
var styleopponent : UnityEngine.GUIStyle;

//v10+ vars
var styleFB:GUIStyle;
var styleWWW:GUIStyle;
var styleLogo:GUIStyle;

function Awake(){

}
function Start () {
	//v11
	soundManager=GameObject.Find("SoundManager");
//	
//	isMmm=false;
//	    		mmmStyle.normal.background=mmmOff;
//	    		soundManager.GetComponent(AudioSource).enabled=false;



	if(!PlayerPrefs.HasKey("mmm")){
		PlayerPrefs.SetInt("mmm",1);
	}

	if(PlayerPrefs.GetInt("mmm")==0){
		isMmm=false;
		mmmStyle.normal.background=mmmOff;
		soundManager.GetComponent(AudioSource).enabled=false;
	}else{
		isMmm=true;
		mmmStyle.normal.background=mmmOn;
		soundManager.GetComponent(AudioSource).enabled=true;	
	}
	
	
	
	
	//
	
	PingKo();

	//default graphics to high
	if(!PlayerPrefs.HasKey("high") ){
		PlayerPrefs.SetInt("high",1);
	}
	
	//default volume to max
	if(!PlayerPrefs.HasKey("volume")){
		PlayerPrefs.SetFloat("volume",1.0);
		
	}
	if(!PlayerPrefs.HasKey("introPlayed")){
		PlayerPrefs.SetInt("introPlayed", 0);
	}
	

	bgstyle3.normal.background = blankmap;
	bgstyle3.active.background = blankmap;
	//PlayerPrefs.SetInt("usernameChosenSingle", 0);
	if(PlayerPrefs.GetString("userNameSingle") != ""){		
		if(PlayerPrefs.GetString("userNameSingle") != "player1"){
		userNameSingle = PlayerPrefs.GetString("userNameSingle");
		changeUserName = userNameSingle;
		}
	}

	if(PlayerPrefs.GetInt("usernameChosenSingle") == 0){
		userNameSingle = "player1";
		changeUserName = "player1";
	}
	//Network.Connect("98.254.77.170",23466);
	//runs a function that pings your brother's server, used to check internet connectivity
	internetConnection = false;
	
	
	randomLoadScreen = (UnityEngine.Random.Range(1, 5));
	if(randomLoadScreen == 1){
		bgLoading = loadingScreen1;
	}
	else if(randomLoadScreen == 2){
		bgLoading = loadingScreen2;
	}
	else if(randomLoadScreen == 3){
		bgLoading = loadingScreen3;
	}
	else if(randomLoadScreen == 4){
		bgLoading = loadingScreen4;
	}
	else{
		bgLoading = loadingScreen4;
	}
	
	
	if(PlayerPrefs.GetInt("level1") == 0 && PlayerPrefs.GetInt("level6") == 0){
		styleContinue.normal.background = textureContinueGrey;
		styleContinue.active.background = textureContinueGrey;
	}
	else{
		styleContinue.normal.background = textureContinue;
		styleContinue.active.background = textureContinuePressed;
	}
//	if(PlayerPrefs.GetString("userNameSingle") == null){
//		PlayerPrefs.SetString("userNameSingle","Player 1");
//		changeUserName = PlayerPrefs.GetString("userNameSingle");
//	}

	DestroyArrayRaces();

	// if (Network.connections.Length == 1) {
	// 	Network.CloseConnection(Network.connections[0], true);
	// 	MasterServer.UnregisterHost();
	// }
	// else if(Network.connections.Length > 0) {
	// 	Network.CloseConnection(Network.connections[0], true);
	// }

	 //MasterServer.ipAddress = "98.254.77.170";
	 //MasterServer.ipAddress = "98.242.180.240";
	 MasterServer.ipAddress = "www.tidbituniverse.com";
	 MasterServer.port = 23466;
	// Network.natFacilitatorIP = "98.254.77.170";
	// Network.natFacilitatorPort = 50005;
//	MasterServer.ipAddress = "75.87.251.199	";
//	MasterServer.port = 23466;
	Network.natFacilitatorIP = "www.tidbituniverse.com";
	Network.natFacilitatorPort = 50005;

	Network.TestConnection();


	//Creates and Sets certain playerprefs to 0 if they do not exist for use in other scenes
	
	//Playerprefs for when a pathway is initially completed
	if (PlayerPrefs.GetFloat("path1Human") != 1){
	
		PlayerPrefs.SetFloat("path1Human",0);
	}
	if (PlayerPrefs.GetFloat("path1Alien") != 1){
	
		PlayerPrefs.SetFloat("path1Alien",0);
	}	
	if (PlayerPrefs.GetFloat("path2") != 1){
	
		PlayerPrefs.SetFloat("path2",0);
	}	
	if (PlayerPrefs.GetFloat("path3") != 1){
	
		PlayerPrefs.SetFloat("path3",0);
	}
	//Playerprefs to make sure the bonus label for completed pathways only are displayed once 
	if (PlayerPrefs.GetFloat("path1Shown") != 1){
	
		PlayerPrefs.SetFloat("path1Shown",0);
	}	
	if (PlayerPrefs.GetFloat("path2Shown") != 1){
	
		PlayerPrefs.SetFloat("path2Shown",0);
	}	
	if (PlayerPrefs.GetFloat("path3Shown") != 1){
	
		PlayerPrefs.SetFloat("path3Shown",0);
	}
	
	
	
	
	
	
	
	

	//PlayerPrefs.SetInt("usernameChosenSingle", 0);
	
	
	inGameVolume = PlayerPrefs.GetFloat("volume");
	Network.Disconnect();
	



	levelRandom = 0;
	raceRandom = true;
	raceNumber = 1;
	raceNumberAI = 1;
	settings = false;
	campaign = false;
	singleChoice = false;
	singlePlayer = false;
	multiPlayer = false;
	skirmish = false;
	multiLocal  = false;
	multiOnline  = false;
	multiChoice = false;
	hostLAN = false;
	hostedLAN = false;
	joinLAN = false;
	joinedLAN = false;
	tutorial = false;
	howToPlay = false;
	unitPedia = false;
	humanPedia = false;
	alienPedia = false;
	tutorialChoice = false;
	unitPediaUnits = false;
	start = false;
	nuke = false;
	mothership = false;
	playerConnected = false;
	playerReady = false;
	gameOne = false;
	gameTwo = false;
	gameThree = false;
	gameFour = false;
	gameFive = false;
	pediaPage = 1;
	maxPlayers = 2;
	levelOne = false;
	levelTwo = false;
	levelThree = false;
	levelFour = false;
	levelFive = false;
	levelSix = false;
	levelSeven = false;
	raceHuman = false;
	raceAlien = false;
	raceHumanClient = false;
	raceAlienClient = false;
	raceHumanAI = false;
	raceAlienAI = false;
	levelNumber = 1;
	volumeControl = false;
	randomLevel = false;
	playerReady = false;
	styleEasy.normal.background = textureEasyGrey;
	
	
	

	if(!GameObject.Find("HumanSingle") && !GameObject.Find("HumanSingle(Clone)")){
		Instantiate(humanSingle, humanSingle.transform.position, humanSingle.transform.rotation);
	}
	if(!GameObject.Find("AlienSingle") && !GameObject.Find("AlienSingle(Clone)")){
		Instantiate(alienSingle, alienSingle.transform.position, alienSingle.transform.rotation);
	}
	if(!GameObject.Find("HumanAI") && !GameObject.Find("HumanAI(Clone)")){
		Instantiate(humanAI, humanAI.transform.position, humanAI.transform.rotation);
	}
	if(!GameObject.Find("AlienAI") && !GameObject.Find("AlienAI(Clone)")){
		Instantiate(alienAI, alienAI.transform.position, alienAI.transform.rotation);
	}


	if(!GameObject.Find("Easy(Clone)")){
	Instantiate(easy, this.transform.position, this.transform.rotation);
	}
	if(PlayerPrefs.GetInt("usernameChosen") > 0){
	userName = PlayerPrefs.GetString("userName");
	}
	if(PlayerPrefs.GetInt("passwordChosen") > 0){
	password = PlayerPrefs.GetString("password");
	}
	
	var baseURL = "http://www.tidbituniverse.com/netfolder/tidbit/stararena/data.php";

}

function Update () {
	//print(refreshTimer);
	//forces correct lobby display on a 1 second timer
	if(hostedLAN == true && playerConnected == false && refreshTimer >= .94){
		MasterServer.RegisterHost("Star_Arena", serverNameField, "Open");
		//print("OPENING _ XX");
	}
	if(hostedLAN == true && playerConnected == true && refreshTimer >= .94){
		MasterServer.RegisterHost("Star_Arena", serverNameField, "Closed");
		//print("CLOSING _ XX");
	}



//	if(setToClosed == true){
//		MasterServer.RegisterHost("Star_Arena", serverNameField,"Closed");
//		setToClosed = false;
//		
//	}
	
	joiningGameTimer = joiningGameTimer + Time.deltaTime;

	pingTimer = pingTimer + Time.deltaTime;

	
	refreshTimer = Time.deltaTime + refreshTimer;
	if(refreshTimer >= 1){
 	 	//print("Done");
 	 	getuid(userName);
 	 	refreshTimer = 0;
 	 }


	if(validuser == true && createUser == true){
	invalidUserPass = true;
	//print("Should display user exists");
	styleError.normal.background = textureUsernameExists;
	styleError.active.background = textureUsernameExists;
	
	}
	if(isValid == false && logIn == true){
	styleError.active.background = textureInvalidUserPass;
	styleError.normal.background = textureInvalidUserPass;

	}
	
	AudioListener.volume = inGameVolume;
	
	if(Application.isLoadingLevel){
	bgstyle.normal.background = bgLoading;
	}


	//Refresh games every second
	updateTimer = Time.deltaTime + updateTimer;
	if(updateTimer >= .5){
	updateTimer = 0;
	}
	
	if(updateTimer == 0){
	x=0;
	RefreshHostList();
	
	}
	

	
	if(levelNumber < 1){
	levelNumber = 8;
	}else if(levelNumber > 8){
	levelNumber = 1;
	}
	
	if(raceNumber < 1){
	raceNumber = 3;
	}else if(raceNumber > 3){
	raceNumber = 1;
	}
	
	if(raceNumberAI < 1){
	raceNumberAI = 3;
	}else if(raceNumberAI > 3){
	raceNumberAI = 1;
	}
	
	
	
	if(unitPediaUnits == true){
		if(pediaPage <= 1){
		pediaPage = 1;
		}
		if(pediaPage >= 7){
		pediaPage = 7;
		}
	}
	if(pediaPage == 1){
	DestroyPediaUnits();
	}
	if(pediaPage == 2){
	DestroyPediaUnits();
	}
	if(pediaPage == 3){
	DestroyPediaUnits();
	}
	if(pediaPage == 4){
	DestroyPediaUnits();
	}
	if(pediaPage == 5){
	DestroyPediaUnits();
	}
	if(pediaPage == 6){
	DestroyPediaUnits();
	}
	if(pediaPage == 7){
	nuke = true;
	DestroyPediaUnits();
	}
	if(start == true){
	bgstyle.normal.background = bgLoading;
	}
	else if(joinLAN == true){
	bgstyle.normal.background = bgstyle2;
	}
	else if(skirmish == true){
	bgstyle.normal.background = bgstyleSkirmish;
	}
	else if(hostedLAN == true){
	bgstyle.normal.background = bgstyleLAN;
	}
	else if(joinedLAN == true){
	bgstyle.normal.background = bgstyleJoinLAN;
	}
	else if(multiChoice == true && multiLocal == true && leaderboard == false){
	bgstyle.normal.background = bgstyleOriginal;
	}
	else if(leaderboard == true){
	bgstyle.normal.background = styleLeaderboard;
	}
	else{
	//tag
		if(!campaign==true){
			bgstyle.normal.background = bgstyleOriginal;
		}
	}
	//SETTINGS
	
	
	
	if(settings == true){
		if(PlayerPrefs.GetInt("high") == 0){
		styleHigh.normal.background = textureHighG;
		styleHigh.active.background = textureHighG;
		styleLow.normal.background = textureLow;
		styleLow.active.background = textureLow;
		}
		else if(PlayerPrefs.GetInt("high") > 0){
		styleHigh.normal.background = textureHigh;
		styleHigh.active.background = textureHigh;
		styleLow.normal.background = textureLowG;
		styleLow.active.background = textureLowG;
		}
	}
	if(joinedLAN == true){
		if(playerReady == true){
			styleReady.normal.background = textureReady;
			styleReady.active.background = textureReady;
		}
		else{
			styleReady.normal.background = textureReadyO;
			styleReady.active.background = textureReadyO;
		}
	}
		
	if(createUser != true){
		if(logIn != true){
			invalidUserPass = false;
		}
		else{}
	}
	else if(logIn != true){
		if(createUser != true){
			invalidUserPass = false;
		}
	}

	
	
}


	



function OnGUI() {
MasterServer.ipAddress = "www.tidbituniverse.com";
MasterServer.port = 23466;
Network.natFacilitatorIP = "www.tidbituniverse.com";
Network.natFacilitatorPort = 50005;
var wide : int = Screen.width;
var tall : int = Screen.height;


	GUI.skin = customSkin;

	

	
	


	 

 	 GUI.Label (Rect (0, 0, wide, tall), "",bgstyle);
 	 
 	 
// 	 if(raceAlienClient == true && start == false){
//	 GUI.Label (new Rect( (wide/2.6), (tall/4.2), wide/3.911, tall/2.2), "", styleAlienBlueLable);
//	 }
//	 if(raceHumanClient == true && start == false){
//	 GUI.Label (new Rect( (wide/2.6), (tall/4.1), wide/3.911, tall/2.2), "", styleHumanBlueLable);
//	 }
	
	if((multiChoice && multiLocal == true && leaderboard == false) || hostLAN == true || hostedLAN == true || joinLAN == true || joinedLAN == true ){
		GUI.Label (Rect ( ( ((wide/1.75)) ), tall/24 , 50, 50),"Logged In As: " + userName , textstylered);
	}

 	 if(raceChosen == true && start == false){
 	 	if(skirmish == true){
 		GUI.Label(new Rect( (wide/4.8), (tall/15), wide/3.911, tall/2.2), "", styleHumanRedLable);
 	 	}
 	 	else if(hostedLAN == true){
 	 	GUI.Label(new Rect( (wide/2.74), (tall/15), wide/3.911, tall/2.2), "", styleHumanRedLable);
 	 	}
 	 }
 	

// 	 if(raceChosen == true && start == false){
// 	 GUI.Label (new Rect( (wide/2.775), (tall/17.5), wide/3.911, tall/2.2), "", styleAlienRedLable);
// 	 }
 	 if(start == false){
 	 	 if(skirmish == true && raceChosenAI == true){
 		 GUI.Label (new Rect( (wide/1.58), (tall/15), wide/3.911, tall/2.2), "", styleHumanBlueLable);
 		 }
 		 else if(joinedLAN == true && raceChosen == true){
 		 	if(Network.isClient){
 		 	GUI.Label (new Rect( (wide/2.6), (tall/4.2), wide/3.911, tall/2.2), "", styleHumanBlueLable);
 		 	}
 		 }
 	 }
// 	 if(raceChosenAI == true && start == false){
// 	 GUI.Label (new Rect( (wide/1.5), (tall/17.5), wide/3.911, tall/2.2), "", styleAlienBlueLable);
// 	 }
	 if(invalidUserPass == true){
 	 GUI.Label (new Rect( (wide/1.43), (tall/2.4), wide/3.5, tall/3.5), "", styleError);
 	 }
 	 
 	 if(leaderboard == true){
 	 	 	if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
	       			leaderboard = false;

	       	}
 	 	
 	 	invalidUserPass = false;
 	 	
		if(getleaderdata == true){
			
			getMyRank();
			getMyStats();
			getLeaderboard();
			getleaderdata = false;
		}
		//LEADERBOARD LABELS START
		//RANK 1
		//Username
		//print(wide);
		//print(tall);
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
 	 
 	 
 	 
//	    GUI.Label(new Rect( (wide/4.7), (tall/1.8), wide/4.1, tall/2.4), "", styleLevel1);
//	    GUI.Label(new Rect( (wide/4.8), (tall/15), wide/3.911, tall/2.2), "", styleHumanRedLable);
// 	 	GUI.Label (new Rect( (wide/1.58), (tall/15), wide/3.911, tall/2.2), "", styleHumanBlueLable);

 	 if(randomLevel == true && start == false){
 	 	if(skirmish == true){
 		 GUI.Label(new Rect( (wide/4.7), (tall/1.8), wide/4.1, tall/2.4), "", styleLevel1);
 		}
 		else if(hostedLAN == true){
 		GUI.Label(new Rect( (wide/2.74), (tall/1.8), wide/4.1, tall/2.4), "", styleLevel1);
 		}
 	 }
// 	 if(levelTwo == true && start == false){
// 	 GUI.Label (new Rect( (wide/2.775), (tall/1.87), wide/3.911, tall/2.2), "", styleLevelTwoLable);
// 	 }
// 	 if(levelThree == true && start == false){
// 	 GUI.Label (new Rect( (wide/2.775), (tall/1.87), wide/3.911, tall/2.2), "", styleLevelThreeLable);
// 	 }
// 	 if(levelFive == true && start == false){
// 	 GUI.Label (new Rect( (wide/2.775), (tall/1.87), wide/3.911, tall/2.2), "", styleLevelThreeLable);
// 	 }
 	 
 	 
 	 if(tutorial == false && singlePlayer == false && multiPlayer == false && multiChoice == false && start == false && settings == false && createUserSingle == false){
 	 	if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleQuit)){
			Application.Quit();
		}
	}
	 if(skirmish == false && multiChoice == false && tutorial == false && start == false && campaign == false && settings == false){
	 	
		//write to DB test button
		if(singleChoice == false && multiPlayer == false){
		
				
			if(createUserSingle == false){	
			
				// New WWW and FB ICons v10
				if(GUI.Button(new Rect(wide*.8,tall*.555, wide*.09, tall*.15 ) ,"", styleFB )){
					Application.OpenURL ("https://www.facebook.com/pages/Tidbit-Universe/192175697591339?ref=hl");
				}
				if(GUI.Button(new Rect(wide*.11,tall*.555, wide*.09, tall*.15 ) ,"", styleWWW )){
					Application.OpenURL ("http://www.tidbituniverse.com");
				}
				GUI.Label(new Rect(.36*wide,.9*tall,.26*wide,.08*tall),"",styleLogo );
			
				if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), "", styleSinglePlayer)) {
					GetComponent.<AudioSource>().Play();
					//print(PlayerPrefs.GetInt("usernameChosenSingle"));
					if(PlayerPrefs.GetInt("usernameChosenSingle") == 0){
						createUserSingle = true;
					}
					else if(PlayerPrefs.GetInt("usernameChosenSingle") == 1){
						singlePlayer = true;
						singleChoice = true;
						multiPlayer = false;
					}
				
				}
			}
		
			if(createUserSingle == true){
		    	
			    if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
			    createUserSingle = false;
			    
			    }	
		    	
		    	

		    	
		    	userNameSingle = GUI.TextField (Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), userNameSingle, 9, styleNameYourGame);
		    	userNameSingle = Regex.Replace(userNameSingle, "[^a-zA-Z0-9!? ]", "");
		    	
	
		    	
			        if(userNameSingle != "Username" && userNameSingle != "" && userNameSingle != "username"){ 
				        if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), "", styleCreateUserSingle)){
				     
				      			changeUserName = userNameSingle;
						        createUserSingle = false;
						       	singlePlayer = true;
						       	singleChoice = true;
						       	multiPlayer = false;
						        PlayerPrefs.SetString("userNameSingle", userNameSingle);
						        PlayerPrefs.SetInt("usernameChosenSingle", 1);
						        
						    
						    
				        }
				    }
				    
				
		    	}
		
		
		
		
		}
		if((singlePlayer == false && multiPlayer == false) && createUserSingle == false){
			//main menu first multiplayerbutton
			if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), "", styleMultiPlayer)) {
				
				if(internetConnection == true){
					GetComponent.<AudioSource>().Play();
					multiPlayer = true;
					singlePlayer = false;
					singleChoice = false;
				}
				else{
					//perhaps play error sound
					noInternetLabelOn = true;
					PingKo();
				}
				//PingKo();

			}
			
			
			if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/4.5), wide/2.5, tall/6.5), "", styleTutorial)) {
			GetComponent.<AudioSource>().Play();
			tutorial = true;
			}
			
			
			if(GUI.Button (new Rect( wide/35, tall/1.165, wide/7, tall/12), "", styleSettings)){
			GetComponent.<AudioSource>().Play();
	    	settings = true;
	    	}
			
		}	
		
		if(singleChoice == true){
			if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), "", styleSkirmish)){
			GetComponent.<AudioSource>().Play();
	        skirmish = true;
	        levelNumber = 1;
	        raceNumber = 1;
	        raceNumberAI = 1;
	       
	        }
	        if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), "", styleCampaign)){
	        campaign = true;
	        GetComponent.<AudioSource>().Play();
	        }
		    if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
	       	singleChoice = false;
	       	singlePlayer = false;
	       	skirmish = false;
	       	campaign = false;
	        }
	    }
	    if(multiPlayer == true){
	    	if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
	    		if(logIn == true ){	
	    			logIn = false;
	    		}
	    		else if(createUser == false && logIn == false ){
	    			multiPlayer = false;
	    		}
	    		
	       		else if(createUser == true){
	       			createUser = false;
	       		}
	       		if(leaderboard == true){
	       			leaderboard = false;

	       		}
	       		
	       		
	       		
	       		


	       	invalidUserPass = false;
	       	Network.Disconnect();
	        }
	        //LAN or WIFI MultiPlayer LAN Games
		    if(createUser == false && logIn == false){
		        if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), "", styleLogIn)){
		        logIn = true;
		        GetComponent.<AudioSource>().Play();
		        
		        }
		        if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), "", styleCreate)){
		        createUser = true;
		        GetComponent.<AudioSource>().Play();
		        }
		        
		        
		    }
		    //----------------------------SAVE USERNAME----------------------------------//
		    if(createUser == true){
		    	
		    	
		    	
		    	logIn = false;
		    	userName = GUI.TextField (Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), userName, 9, styleNameYourGame);
		    	userName = Regex.Replace(userName, "[^a-zA-Z0-9!? ]", "");
		    	password = GUI.TextField (Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), password, 15, stylePassword);
				var validUser : boolean;
				if (GUI.changed == true){
		    	CheckUser(userName);
				}
		    	
		    	
			        //if((userName != "Enter User Name" && userName != "") && (password != "Enter Password" && password != "")){ 
			        	
				        if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/4.5), wide/2.5, tall/6.5), "", styleCreate)){
				     	
				     		
				     		
    							if(validuser==false){
									CreateUserPass(userName,password);
									GetComponent.<AudioSource>().Play();
									multiLocal = true;
				        			multiPlayer = false;
				        			multiChoice = true;
				        			PlayerPrefs.SetString("userName", userName);
						        	PlayerPrefs.SetInt("usernameChosen", 1);
						        	PlayerPrefs.SetString("password", password);
						        	PlayerPrefs.SetInt("passwordChosen", 1);
						        	invalidUserPass = false;
						        	
						        	

								}
								
    	
    						
				      		
						    //else if(userName == PlayerPrefs.GetString("userName")){
						    }
//						    else if(validUser == false){
//						    Error.active.background = textureUsernameExists;
//						    styleError.normal.background = textureUsernameExists;
//						    invalidUserPass = true;
//						    }
				        //}
				 }
				    
				
		    
		    

		    
 
    		
    		
    	
    	
    		
    	
		    
		    
		    
		    
		    if(logIn == true){
		    	createUser = false;	    	
		       	userName = GUI.TextField (Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), userName, 9, styleNameYourGame);
		       	userName = Regex.Replace(userName, "[^a-zA-Z0-9!? ]", "");
		    	password = GUI.TextField (Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), password, 15, stylePassword);
		    	if (GUI.changed == true){
		    	CheckUser(userName);
		    	CheckPass(userName,password);
				}
		    	 if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/4.5), wide/2.5, tall/6.5), "", styleLogIn)){
		    	
				
				
					if(validuser==true){
						getuid(userName);
							
						if(validpassword==true){
							PlayerPrefs.SetString("userName", userName);
						    PlayerPrefs.SetInt("usernameChosen", 1);
				        	PlayerPrefs.SetString("password", password);
				        	PlayerPrefs.SetInt("passwordChosen", 1);
							multiLocal = true;
				        	multiPlayer = false;
				        	multiChoice = true;
				        	invalidUserPass = false;
							GetComponent.<AudioSource>().Play();
						}
					}
		    	 }
		    	
		    }
		}

	}
	   	if(tutorial == true && start == false){
	   		
		   		if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
		   			pediaPage = 1;
		   			nuke = false;
		   			mothership = false;
		   			if(howToPlay == false && unitPedia == false){
		       		tutorial = false;
		       		}
		       		if(howToPlay == true){
		       		howToPlay = false;
		       		tutorialChoice = false;
		       		}
		       		else if(unitPedia == true && unitPediaUnits == false){
		       		unitPedia = false;
		       		tutorialChoice = false;
		       		}
		       		if(unitPediaUnits == true){
		       		unitPediaUnits = false;
		       		unitPedia = true;
		       		tutorialChoice = true;
		       		}
		       		if(humanPedia == true || alienPedia == true){
		       		humanPedia = false;
		       		alienPedia = false;
		       		}
		        }
	        if(tutorialChoice == false && unitPedia == false){
	        	//tagtag
		   		if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), "", styleHowToPlay)){
		   			start = true;
		   			bgstyle.normal.background = bgLoading;
					bgstyle.active.background = bgLoading;
		   		GetComponent.<AudioSource>().Play();
		   		howToPlay = true;
		   		tutorialChoice = true;
		   		Destroy(GameObject.Find("SinglePlayer"));
		   		Destroy(GameObject.Find("MultiPlayer"));
		   		DontDestroyOnLoad(GameObject.Find("Tutorial"));
		   			
		   		Application.LoadLevel("t_Level1");
		   		}
		   		if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), "", styleUnitPedia)){
		   		GetComponent.<AudioSource>().Play();
		   		unitPedia = true;
		   		tutorialChoice = true;
		   		}
		   	}
		   	if(tutorialChoice == true && howToPlay == true){
				
	        }
	        if(tutorialChoice == true && unitPedia == true){
	       		if(GUI.Button(new Rect( (wide/4), (tall/3), wide/3.911, tall/2.2), "", styleHumanRedLable)){
	       		unitPediaUnits = true;
	       		tutorialChoice = false;
	       		humanPedia = true;
	       		
	       		}
	       		if(GUI.Button(new Rect( (wide/2), (tall/3), wide/3.911, tall/2.2), "", styleAlienRedLable)){
	       		unitPediaUnits = true;
	       		tutorialChoice = false;
	       		alienPedia = true;
	       		
	       		}
	       	GUI.Label (new Rect( (wide/3.4), (tall/1.3), wide/2.5, tall/6.5), "Choose Race", styleChooseRace);
	        }
	        if(unitPediaUnits == true){
	        	if(pediaPage >= 2){
	        		if(GUI.Button (new Rect( (wide/10.8), (tall) - (tall/7), wide/7, tall/12), "", stylePrev)){
	        		pediaPage = pediaPage - 1;
	        		DestroyPediaUnits();
	        		}
	        	}
	        	if(pediaPage <= 6){
	        		if(GUI.Button (new Rect( (wide/3.85), (tall) - (tall/7), wide/7, tall/12), "", styleNext)){
	        		pediaPage = pediaPage + 1;
	        		DestroyPediaUnits();
	        		}
	        	}
	        	if(humanPedia == true){
			        if(pediaPage == 1){
			        bgstyle.normal.background = bgPediaMarine;
			        	if(!GameObject.Find("Marine2(Clone)")){
			        	Instantiate(marine, marine.transform.position, marine.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 2){
			        bgstyle.normal.background = bgPediaSniper;	
			        	if(!GameObject.Find("Sniper(Clone)")){
			        	Instantiate(sniper, sniper.transform.position, sniper.transform.rotation);
			        	}
			        }
			       
			        else if(pediaPage == 3){
			        bgstyle.normal.background = bgPediaCannoneer;
			       		if(!GameObject.Find("Cannoneer(Clone)")){
			        	Instantiate(cannoneer, cannoneer.transform.position, cannoneer.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 4){
			        bgstyle.normal.background = bgPediaDozer;
			       		if(!GameObject.Find("Dozer(Clone)")){
			        	Instantiate(dozer, dozer.transform.position, dozer.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 5){
			        bgstyle.normal.background = bgPediaStriker;
			        	if(!GameObject.Find("Striker(Clone)")){
			        	Instantiate(striker, striker.transform.position, striker.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 6){
			        bgstyle.normal.background = bgPediaTitan;
			        	if(!GameObject.Find("Titan(Clone)")){
			        	Instantiate(titan, titan.transform.position, titan.transform.rotation);
			        	nuke = false;
			        	
			        	}
			        }
			        else if(pediaPage == 7){
			        bgstyle.normal.background = bgPediaNuke;
			        	
			      		if(nuke == true){
			        	GUI.Label (new Rect( (wide/10.3), (tall/3.75), wide/3.35, tall/2.2), "", styleNuke);
			        	}
			        }
		        }
		        if(alienPedia == true){
			        if(pediaPage == 1){
			        bgstyle.normal.background = bgPediaDrudge;
			        	if(!GameObject.Find("Drudge(Clone)")){
			        	Instantiate(drudge, drudge.transform.position, drudge.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 2){
			        bgstyle.normal.background = bgPediaSqualler;
			        	if(!GameObject.Find("Squaller(Clone)")){
			        	Instantiate(squaller, squaller.transform.position, squaller.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 3){
			        bgstyle.normal.background = bgPediaGriefer;
			       		if(!GameObject.Find("Griefer(Clone)")){
			        	Instantiate(griefer, griefer.transform.position, griefer.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 4){
			        bgstyle.normal.background = bgPediaWarder;
			        	if(!GameObject.Find("Warder(Clone)")){
			        	Instantiate(warder, warder.transform.position, warder.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 5){
			        bgstyle.normal.background = bgPediaDisrupter;
			        	if(!GameObject.Find("Disrupter(Clone)")){
			        	Instantiate(disrupter, disrupter.transform.position, disrupter.transform.rotation);
			        	}
			        }
			        else if(pediaPage == 6){
			        bgstyle.normal.background = bgPediaArbiter;
			        	if(!GameObject.Find("Arbiter(Clone)")){
			        	Instantiate(arbiter, arbiter.transform.position, arbiter.transform.rotation);
			        	nuke = false;
			        	}
			        }
			        else if(pediaPage == 7){
			        bgstyle.normal.background = bgPediaMothership;
			       		if(nuke == true){
			        	GUI.Label (new Rect( (wide/8), (tall/3.75), wide/3.911, tall/2.2), "", styleMothership);
			        	}
			        }
			    }
	   		}
	   		else if(unitPediaUnits == false){
//	   		bgstyle.normal.background = bgstyle2;
       		}
	   	}
	   		
		
	 
	 if(multiChoice == true && multiPlayer == false){
	 
	   	if(multiLocal == true){
	   		
	   		invalidUserPass = false;
	   		if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
		   		if(leaderboard == false){
		   		multiLocal = false;
		   		multiPlayer = true;
		   		multiChoice = false;
		   		backOneField = false;
		   			if(logIn == true){
		   			createUser = false;
		   			}
		   			if(createUser == true){
		   			logIn = false;
		   			}
		   		}
		   		if(leaderboard == true){
		   		leaderboard = false;
		   		

		   		}
		   		Network.Disconnect();
	   		}
	   	  if(leaderboard == false){
	        if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), "", styleHost)){
	        GetComponent.<AudioSource>().Play();
	        hostLAN = true;
	        joinLAN = false;
	        multiLocal = false;
	        getuid(userName);
	        PlayerPrefs.SetString("usernameMP", userName);
	        
	      
	       	}
	        if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), "", styleJoin)){
	        GetComponent.<AudioSource>().Play();
	        joinLAN = true;
	        multiLocal = false;
	        raceNumber = 1;
	        getuid(userName);
	        PlayerPrefs.SetString("usernameMP", userName);
	        
	        }
	        if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/1.38), wide/2.5, tall/6.5), "", styleLeaderboardBtn)){
	        GetComponent.<AudioSource>().Play();
	        getvalues();
	        
		    leaderboard = true;
		    getleaderdata = true;
		    

		    }
		  }
		
	    }

	}
	if(hostLAN == true){
		serverNameField = GUI.TextField (new Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), serverNameField, 25,styleNameYourGame);
		if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
		hostLAN = false;
		multiChoice = true;
		multiLocal = true;
		Network.Disconnect();
		
		}
		if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20),  wide/7, tall/12), "DONE", styleBlankButton)){
		StartServer();
		hostedLAN = true;
		hostLAN = false;
		GetComponent.<AudioSource>().Play();
		}
	}
	//LAN HOST
	if(hostedLAN == true){
		invalidUserPass = false;
		if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
		hostedLAN = false;
		hostLAN = false;
		joinLAN = false;
		joinedLAN = false;
		multiChoice = true;
		multiLocal = true;
		levelOne = false;
		levelTwo = false;
		levelThree = false;
		levelFour = false;
		levelFive = false;
		levelSix = false;
		levelSeven = false;
		raceHuman = false;
		raceAlien = false;
		raceChosen = false;
		levelNumber = 1;
		raceNumber = 1;
			if(Network.isServer){
				GetComponent.<NetworkView>().RPC("DisconnectClient", RPCMode.OthersBuffered, 1);
				playerReady = false;
			}
		
		playerConnected = false;
		Network.Disconnect();
		}

		
		
		if(GUI.Button (new Rect( (wide/3.2), (tall/4), wide/15, tall/10), "", styleArrowLeft)){
		raceNumber = raceNumber - 1;
		}
		if(GUI.Button (new Rect( (wide/1.61), (tall/4), wide/15, tall/10), "", styleArrowRight)){
		raceNumber = raceNumber + 1;
		}
			switch(raceNumber){
			case 1:
			raceAlien = false;
			raceHuman = false;
			raceRandom = true;
			raceChosen = true;
			styleHumanRedLable.active.background = textureRandomRace;
			styleHumanRedLable.normal.background = textureRandomRace;
				
				randomRace = UnityEngine.Random.Range(1,3);	
					switch(randomRace){
						case 1:
						raceHuman = true;
						raceAlien = false;
						raceRandom = false;
						raceChosen = true;
						break;
						case 2:
						raceAlien = true;
						raceHuman = false;
						raceRandom = false;
						raceChosen = true;
						break;
					}
				
						
			break;
			case 2:
			raceAlien = false;
			raceHuman = true;
			raceRandom = false;
			raceChosen = true;
			styleHumanRedLable.active.background = textureHumanRace;
			styleHumanRedLable.normal.background = textureHumanRace;
			break;
			case 3:
			raceAlien = true;
			raceHuman = false;
			raceRandom = false;
			raceChosen = true;
			styleHumanRedLable.active.background = textureAlienRace;
			styleHumanRedLable.normal.background = textureAlienRace;
			break;
		}




		if(GUI.Button (new Rect( (wide/3.2), (tall/1.4), wide/15, tall/10), "", styleArrowLeft)){
		levelNumber = levelNumber - 1;
		}
		if(GUI.Button (new Rect( (wide/1.61), (tall/1.4), wide/15, tall/10), "", styleArrowRight)){
		levelNumber = levelNumber + 1;
		}
		switch(levelNumber){
				case 1:
				randomLevel = true;
					levelRandom = UnityEngine.Random.Range(1,8);
					styleLevel1.active.background = textureLevelRandom;
					styleLevel1.normal.background = textureLevelRandom;	
					switch(levelRandom){
						case 1:
						levelChosen = "Level1";
						levelOne = true;
						
						break;
						case 2:
						levelChosen = "Level2";
						
						levelTwo = true;
						
						break;
						case 3:
						levelChosen = "Level3";
						
						levelThree = true;
						
						break;
						case 4:
						levelChosen = "Level4";
						
						levelFour = true;
						
						break;
						case 5:
						levelChosen = "Level5";
						
						levelFive = true;
						
						break;
						case 6:
						levelChosen = "Level6";
						
						levelSix = true;
						
						break;
						case 7:
						levelChosen = "Level7";
						
						levelSeven = true;
						break;
						
					}
				break;
				case 2:
				levelChosen = "Level1";
				levelOne = true;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevelStarting;
				styleLevel1.normal.background = styleLevelStarting;
				break;
				case 3:
				levelChosen = "Level2";
				levelOne = false;
				levelTwo = true;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel2;
				styleLevel1.normal.background = styleLevel2;
				break;
				case 4:
				levelChosen = "Level3";
				levelOne = false;
				levelTwo = false;
				levelThree = true;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel3;
				styleLevel1.normal.background = styleLevel3;
				break;
				case 5:
				levelChosen = "Level4";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = true;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel4;
				styleLevel1.normal.background = styleLevel4;
				break;
				case 6:
				levelChosen = "Level5";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = true;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel5;
				styleLevel1.normal.background = styleLevel5;
				break;
				case 7:
				levelChosen = "Level6";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = true;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel6;
				styleLevel1.normal.background = styleLevel6;
				break;
				case 8:
				levelChosen = "Level7";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = true;
				
				styleLevel1.active.background = styleLevel7;
				styleLevel1.normal.background = styleLevel7;
				break;
			}

		if(playerConnected == false){
		GUI.Label(Rect((wide/1.6), (tall/2.5), wide/3, tall/4), "", styleWaitingForPlayer);
			if(open==false){
			MasterServer.RegisterHost("Star_Arena", serverNameField, "Open");
		
			open=true;
			}
		}
		else if(playerConnected == true){
			GetComponent.<NetworkView>().RPC ("SendUsername", RPCMode.OthersBuffered, userName);
			//UNREGISTERHERE
			//MasterServer.UnregisterHost(); 
			//audio.Play();
			
			//v11 new challenger sound management
			
			
			if(open==true){
			MasterServer.RegisterHost("Star_Arena", serverNameField,"Closed");
	
			open=false;
			}
			
			//MasterServer.ClearHostList();
			if(playerReady == false){
				GUI.Label(Rect((wide/1.6), (tall/2.5), wide/3, tall/4), "", stylePlayerConnected);
			}	
		}
		//-----------------------------START BUTTON--------------------------------------------------//
		if(playerReady == true){
			//audio.Play();
			GUI.Label(Rect((wide/1.6), (tall/2.5), wide/3, tall/4), "", styleopponent);
			
			GUI.Label(Rect((wide/1.55), (tall/2.1), wide/3, tall/4), usernameopponent, textstylered);
			if (GUI.Button (new Rect( (wide/1.285), (tall/1.4), wide/5.0625, tall/9), "", styleStart)){
				if(Network.connections.Length > 0){
				Destroy(GameObject.Find("SinglePlayer"));
				Destroy(GameObject.Find("Tutorial"));
				DontDestroyOnLoad(GameObject.Find("MultiPlayer"));
				
				GetComponent.<NetworkView>().RPC("LoadLevel", RPCMode.AllBuffered, levelChosen , 0);
				}
			}
		}
		//-------------------------------------------------------------------------------------------//
	}
	if(joinLAN == true){
		   if(GUI.Button (new Rect((wide/2)-(wide/5.3), tall/1.25, wide/2.5, tall/6.5), "", styleRefresh)){
	   
	   	RefreshHostList();
//	   		MasterServer.ClearHostList();
//	   		hostData = MasterServer.PollHostList();
//      	    MasterServer.RequestHostList("Star_Arena");
	   }
	   if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
	   		if(joiningGame==false){
			   joinLAN = false;
			   multiChoice = true;
			   multiLocal = true;
			   Network.Disconnect();
			}
	   }
		//var hostData : HostData[];
		//&& hostData.comment != "Closed"
		invalidUserPass = false;
		
		
	
		if(MasterServer.PollHostList().Length != 0){
			
					//print("more than 0 games are being hosted");
	            
	            	if(gameOne == true){
		            	if(GUI.Button(new Rect( (wide/2.22)-(wide/5), (tall/5), wide/2, tall/8), hostData[game1data].gameName, styleDisplayGames)){
		            		if(joiningGame==false){
			              		Network.Connect(hostData[game1data]);
			              		joiningGameTimer=0;
			              		joiningGame = true;
		              		}
		              	}
		            }
	              	if(gameTwo == true){
	              		if(GUI.Button(new Rect( (wide/2.22)-(wide/5), (tall/2.9), wide/2, tall/8), hostData[game2data].gameName, styleDisplayGames)){
	              			if(joiningGame==false){
			              		Network.Connect(hostData[game2data]);
			              		joiningGameTimer=0;
			              		joiningGame = true;
			              	}
		              	} 
					}
					if(gameThree == true){
	              		if(GUI.Button(new Rect( (wide/2.22)-(wide/5), (tall/2.015), wide/2, tall/8), hostData[game3data].gameName, styleDisplayGames)){
	              			if(joiningGame==false){
			              		Network.Connect(hostData[game3data]);
			              		joiningGameTimer=0;
			              		joiningGame = true;
			              	}
		              	} 
					}
					if(gameFour == true){
	              		if(GUI.Button(new Rect( (wide/2.22)-(wide/5), (tall/1.55), wide/2, tall/8), hostData[game4data].gameName, styleDisplayGames)){
	              			if(joiningGame==false){
			              		Network.Connect(hostData[game4data]);
			              		joiningGameTimer =0;
			              		joiningGame = true;
			              	}
		              	} 
					}
	            
	   }
	
	}
	if(joinedLAN == true){
		invalidUserPass = false;
		joiningGame=false;
		if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
			GetComponent.<NetworkView>().RPC("OpenGames", RPCMode.Server);	
			hostLAN = false;
			joinedLAN = false;
			joinLAN = false;
			multiChoice = true;
			multiLocal = true;
			raceHumanClient = false;
			raceAlienClient = false;
			raceChosen = false;	
			playerReady = false;		
			Network.Disconnect();
		}
		if(Network.isClient){
			GetComponent.<NetworkView>().RPC ("SendUsername", RPCMode.OthersBuffered, userName);
			GUI.Label(Rect((wide/1.5), (tall/2.6), wide/3, tall/4), "", styleopponent);
			
			GUI.Label(Rect((wide/1.45), (tall/1.9), wide/3, tall/4), usernameopponent, textstylered);
			
			if(GUI.Button (new Rect( (wide/2.9), (tall/2.4), wide/15, tall/10), "", styleArrowLeft)){
			raceNumber = raceNumber - 1;
			}
			if(GUI.Button (new Rect( (wide/1.55), (tall/2.4), wide/15, tall/10), "", styleArrowRight)){
			raceNumber = raceNumber + 1;
			}
			if (GUI.Button (new Rect( (wide/1.285), (tall/1.4), wide/5.0625, tall/9), "ready", styleReady)){
			playerReady = true;
			GetComponent.<NetworkView>().RPC("PlayerReady", RPCMode.Server);
			
			}
		}
		
		switch(raceNumber){
			case 1:
			// raceAlienClient = false;
			// raceHumanClient = false;
			raceRandom = true;
			raceChosen = true;
			styleHumanBlueLable.active.background = textureRandomRace;
			styleHumanBlueLable.normal.background = textureRandomRace;
				
				randomRace = UnityEngine.Random.Range(1,3);	
					switch(randomRace){
						case 1:
						raceHumanClient = true;
						raceAlienClient = false;
						break;
						case 2:
						raceAlienClient = true;
						raceHumanClient = false;
						break;
					}
				
						
			break;
			case 2:
			raceAlienClient = false;
			raceHumanClient = true;
			raceRandom = false;
			raceChosen = true;
			
			styleHumanBlueLable.active.background = textureHumanRaceAI;
			styleHumanBlueLable.normal.background = textureHumanRaceAI;
			
			break;
			case 3:
			raceAlienClient = true;
			raceHumanClient = false;
			raceRandom = false;
			raceChosen = true;
			
			styleHumanBlueLable.active.background = textureAlienRaceAI;
			styleHumanBlueLable.normal.background = textureAlienRaceAI;
			
			break;
		}
		
	}
	//CAMPAIGN
	
	
	//SKIRMISH
     if(skirmish == true){

     	if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
	    skirmish = false;
	    raceHuman = false;
	    raceAlien = false;
	    raceHumanAI = false;
	    raceAlienAI = false;
	    levelOne = false;
	    levelTwo = false;
	    levelThree = false;
	    levelFour = false;
	    levelFive = false;
	    levelSix = false;
	    levelSeven = false;
	    raceChosen = false;
	    raceChosenAI = false;
	    randomLevel = false;
	    levelNumber = 0;
	    raceNumber = 0;
	    raceNumberAI = 0;
	    levelRandom = 0;
	    
	    }
	    if(GUI.Button (new Rect( (wide/1.8), (tall/1.8), wide/10, tall/12), "", styleEasy)){
	    difficultyLevel = 1;
	    styleEasy.normal.background = textureEasyGrey;
	    styleNormal.normal.background = textureNormalOriginal;
	    styleHard.normal.background = textureHardOriginal;
	    	if(!GameObject.Find("Easy(Clone)")){
	    	Instantiate(easy, this.transform.position, this.transform.rotation);
	    	}
	    }
	    if(GUI.Button (new Rect( (wide/1.4), (tall/1.8), wide/10, tall/12), "", styleNormal)){
	    difficultyLevel = 2;
	    styleEasy.normal.background = textureEasyOriginal;
	    styleNormal.normal.background = textureNormalGrey;
	    styleHard.normal.background = textureHardOriginal;
	    	if(!GameObject.Find("Normal(Clone)")){
	    	Instantiate(normal, this.transform.position, this.transform.rotation);
	    	}
	    }
	    if(GUI.Button (new Rect( (wide/1.15),(tall/1.8), wide/10, tall/12), "", styleHard)){
	    difficultyLevel = 3;
	    styleEasy.normal.background = textureEasyOriginal;
	    styleNormal.normal.background = textureNormalOriginal;
	    styleHard.normal.background = textureHardGrey;
	    	if(!GameObject.Find("Hard(Clone)")){
	    	Instantiate(hard, this.transform.position, this.transform.rotation);
	    	}
	    }
//	    GUI.Label(new Rect( (wide/4.7), (tall/1.8), wide/4.1, tall/2.4), "", styleLevel1);
//	    GUI.Label(new Rect( (wide/4.8), (tall/15), wide/3.911, tall/2.2), "", styleHumanRedLable);
// 	 	GUI.Label (new Rect( (wide/1.58), (tall/15), wide/3.911, tall/2.2), "", styleHumanBlueLable);
 	 
	    //!!!!!!!!!!!!!!!!RACE FOR HUMAN PLAYER!!!!!!!!!!!!!!!!!!!!
	    if(GUI.Button (new Rect( (wide/6.1), (tall/4), wide/15, tall/10), "", styleArrowLeft)){
		raceNumber = raceNumber - 1;
		}
		if(GUI.Button (new Rect( (wide/2.145), (tall/4), wide/15, tall/10), "", styleArrowRight)){
		raceNumber = raceNumber + 1;
		}
		
		
		
		
		switch(raceNumber){
			case 1:
			raceAlien = false;
			raceHuman = false;
			raceRandom = true;
			raceChosen = true;
			styleHumanRedLable.active.background = textureRandomRace;
			styleHumanRedLable.normal.background = textureRandomRace;
				
				randomRace = UnityEngine.Random.Range(1,3);	
					switch(randomRace){
						case 1:
						raceHuman = true;
						break;
						case 2:
						raceAlien = true;
						break;
					}
				
						
			break;
			case 2:
			raceAlien = false;
			raceHuman = true;
			raceRandom = false;
			raceChosen = true;
			styleHumanRedLable.active.background = textureHumanRace;
			styleHumanRedLable.normal.background = textureHumanRace;
			break;
			case 3:
			raceAlien = true;
			raceHuman = false;
			raceRandom = false;
			raceChosen = true;
			styleHumanRedLable.active.background = textureAlienRace;
			styleHumanRedLable.normal.background = textureAlienRace;
			break;
		}
		
		
		
	
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!RACE FOR COMPUTER PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		if(GUI.Button (new Rect( (wide/1.68), (tall/4), wide/15, tall/10), "", styleArrowLeft)){
		raceNumberAI = raceNumberAI - 1;
		}
		if(GUI.Button (new Rect( (wide/1.119), (tall/4), wide/15, tall/10), "", styleArrowRight)){
		raceNumberAI = raceNumberAI + 1;
		}
		switch(raceNumberAI){
			case 1:
			raceAlienAI = false;
			raceHumanAI = false;
			raceRandom = true;
			raceChosenAI = true;
			styleHumanBlueLable.active.background = textureRandomRace;
			styleHumanBlueLable.normal.background = textureRandomRace;
				
				randomRaceAI = UnityEngine.Random.Range(1,3);	
					switch(randomRaceAI){
						case 1:
						raceHumanAI = true;
						break;
						case 2:
						raceAlienAI = true;
						break;
					}
				
						
			break;
			case 2:
			raceAlienAI = false;
			raceHumanAI = true;
			raceRandom = false;
			raceChosenAI = true;
			styleHumanBlueLable.active.background = textureHumanRaceAI;
			styleHumanBlueLable.normal.background = textureHumanRaceAI;
			break;
			case 3:
			raceAlienAI = true;
			raceHumanAI = false;
			raceRandom = false;
			raceChosenAI = true;
			styleHumanBlueLable.active.background = textureAlienRaceAI;
			styleHumanBlueLable.normal.background = textureAlienRaceAI;
			break;
		}
		
		if(GUI.Button (new Rect( (wide/6.1), (tall/1.35), wide/15, tall/10), "", styleArrowLeft)){
		levelNumber = levelNumber - 1;
		}
		if(GUI.Button (new Rect( (wide/2.145), (tall/1.35), wide/15, tall/10), "", styleArrowRight)){
		levelNumber = levelNumber + 1;
		}
		
		
		
		
			switch(levelNumber){
				case 1:
				randomLevel = true;
					levelRandom = UnityEngine.Random.Range(1,8);
					styleLevel1.active.background = textureLevelRandom;
					styleLevel1.normal.background = textureLevelRandom;	
					switch(levelRandom){
						case 1:
						levelChosen = "Level1";
						levelOne = true;
						
						break;
						case 2:
						levelChosen = "Level2";
						
						levelTwo = true;
						
						break;
						case 3:
						levelChosen = "Level3";
						
						levelThree = true;
						
						break;
						case 4:
						levelChosen = "Level4";
						
						levelFour = true;
						
						break;
						case 5:
						levelChosen = "Level5";
						
						levelFive = true;
						
						break;
						case 6:
						levelChosen = "Level6";
						
						levelSix = true;
						
						break;
						case 7:
						levelChosen = "Level7";
						
						levelSeven = true;
						break;
						
					}
				break;
				case 2:
				levelChosen = "Level1";
				levelOne = true;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevelStarting;
				styleLevel1.normal.background = styleLevelStarting;
				break;
				case 3:
				levelChosen = "Level2";
				levelOne = false;
				levelTwo = true;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel2;
				styleLevel1.normal.background = styleLevel2;
				break;
				case 4:
				levelChosen = "Level3";
				levelOne = false;
				levelTwo = false;
				levelThree = true;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel3;
				styleLevel1.normal.background = styleLevel3;
				break;
				case 5:
				levelChosen = "Level4";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = true;
				levelFive = false;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel4;
				styleLevel1.normal.background = styleLevel4;
				break;
				case 6:
				levelChosen = "Level5";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = true;
				levelSix = false;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel5;
				styleLevel1.normal.background = styleLevel5;
				break;
				case 7:
				levelChosen = "Level6";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = true;
				levelSeven = false;
				
				styleLevel1.active.background = styleLevel6;
				styleLevel1.normal.background = styleLevel6;
				break;
				case 8:
				levelChosen = "Level7";
				levelOne = false;
				levelTwo = false;
				levelThree = false;
				levelFour = false;
				levelFive = false;
				levelSix = false;
				levelSeven = true;
				
				styleLevel1.active.background = styleLevel7;
				styleLevel1.normal.background = styleLevel7;
				break;
			}
		

		if (GUI.Button (new Rect( (wide/1.29), (tall/1.45), wide/5.0625, tall/9), "", styleStart)){

			spawnRaces = true;

			if(spawnRaces == true){
			SpawnRaces();
			spawnRaces = false;
		}
			start = true;
			skirmish = false;
			Destroy(GameObject.Find("Tutorial"));
			Destroy(GameObject.Find("MultiPlayer"));
			DontDestroyOnLoad(GameObject.Find("SinglePlayer"));
			bgstyle.normal.background = bgLoading;
			bgstyle.active.background = bgLoading;
			if(raceHuman == true){
			DontDestroyOnLoad(GameObject.Find("HumanSingle(Clone)"));
			}
			
			if(raceAlien == true){
			DontDestroyOnLoad(GameObject.Find("AlienSingle(Clone)"));
			}
			
			if(raceHumanAI == true){
			DontDestroyOnLoad(GameObject.Find("HumanAI(Clone)"));
			}
			
			if(raceAlienAI == true){
			DontDestroyOnLoad(GameObject.Find("AlienAI(Clone)"));
			}
			
			if(difficultyLevel == 3){
			DontDestroyOnLoad(GameObject.Find("Hard(Clone)"));
			}
			else if(difficultyLevel == 2){
			DontDestroyOnLoad(GameObject.Find("Normal(Clone)"));
			}
			else if(difficultyLevel == 1){
			DontDestroyOnLoad(GameObject.Find("Easy(Clone)"));
			}
			else{
			DontDestroyOnLoad(GameObject.Find("Easy(Clone)"));
			}
			if(levelOne == true){
				if(raceChosen == true && raceChosenAI == true){
				//Disconnect();
//				yield Resources.UnloadUnusedAssets();
				Application.LoadLevel(levelChosen);
				}
			}
			else if(levelTwo == true){
				if(raceChosen == true && raceChosenAI == true){
				//Disconnect();
				Application.LoadLevel(levelChosen);
				}
			}
			else if(levelThree == true){
				if(raceChosen == true && raceChosenAI == true){
				//Disconnect();
				Application.LoadLevel(levelChosen);
				}
			}
			else if(levelFour == true){
				if(raceChosen == true && raceChosenAI == true){
			//	Disconnect();
				Application.LoadLevel(levelChosen);
				}
			}
			else if(levelFive == true){
				if(raceChosen == true && raceChosenAI == true){
				//Disconnect();
				Application.LoadLevel(levelChosen);
				}
			}
			else if(levelSix == true){
				if(raceChosen == true && raceChosenAI == true){
				//Disconnect();
				Application.LoadLevel(levelChosen);
				}
			}
			else if(levelSeven == true){
				if(raceChosen == true && raceChosenAI == true){
				//Disconnect();
				Application.LoadLevel(levelChosen);
				}
			}
			
		}	
	}
	if(campaign == true){
	//THIS BLOCK OF CODE MOVED TO START FUNCTION//
//		if(PlayerPrefs.GetInt("level1") == 0 && PlayerPrefs.GetInt("level6") == 0){
//		styleContinue.normal.background = textureContinueGrey;
//		styleContinue.active.background = textureContinueGrey;
//		}
//		else{
//		styleContinue.normal.background = textureContinue;
//		styleContinue.active.background = textureContinuePressed;
//		}
		if (GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)-(tall/8), wide/2.5, tall/6.5), "", styleNewGame)){
		styleContinue.normal.background = blankmap;
		styleNewGame.normal.background = blankmap; 
		styleBack.normal.background = blankmap;  
		//Will be needing to add some playerprefs here as we add them to campaign
		//print("LOAD SCREEN" + bgLoading);
		bgstyle.normal.background = bgLoading;
		bgstyle.active.background = bgLoading;
		PlayerPrefs.SetInt("introPlayed", 0);
		PlayerPrefs.SetInt("level1", 0);
		PlayerPrefs.SetInt("level2", 0);
		PlayerPrefs.SetInt("level3", 0);
		PlayerPrefs.SetInt("level4", 0);
		PlayerPrefs.SetInt("level5", 0);
		PlayerPrefs.SetInt("level6", 0);
		PlayerPrefs.SetInt("level7", 0);
		PlayerPrefs.SetInt("level8", 0);
		PlayerPrefs.SetInt("health", 0);
		PlayerPrefs.SetInt("power", 0);
		PlayerPrefs.SetInt("income", 0);
		PlayerPrefs.SetInt("health2", 0);
		PlayerPrefs.SetInt("range", 0);
		PlayerPrefs.SetInt("maxIncome", 0);
		PlayerPrefs.SetInt("marineHvyDmg", 0);
		PlayerPrefs.SetInt("titanHvyArmor", 0);
		PlayerPrefs.SetInt("bounty", 0);
		PlayerPrefs.SetInt("additionalDefense", 0);
		PlayerPrefs.SetInt("upgradePoints", 0);
		PlayerPrefs.SetFloat("path1Alien",0);
		PlayerPrefs.SetFloat("path1Human",0);
		PlayerPrefs.SetFloat("path1Shown",0);
		PlayerPrefs.SetFloat("path2",0);
		PlayerPrefs.SetFloat("path2Shown",0);
		PlayerPrefs.SetFloat("path3",0);
		PlayerPrefs.SetFloat("path3Shown",0);
		PlayerPrefs.SetInt("levelsBeaten", 0);
	    //Application.LoadLevel("SinglePlayer_Campaign");
	      Application.LoadLevel("StarMapIntro");
	    }
	    if(GUI.Button (new Rect( (wide/2)-(wide/5), (tall/2)+(tall/20), wide/2.5, tall/6.5), "", styleContinue)){
	    	bgstyle.normal.background = bgLoading;
			bgstyle.active.background = bgLoading;
	    	if(PlayerPrefs.GetInt("level1") == 0 && PlayerPrefs.GetInt("level6") == 0){
	    	
	    	}
	    	else{
	    	styleContinue.normal.background = blankmap;
			styleNewGame.normal.background = blankmap; 
			styleBack.normal.background = blankmap;  
	    	Application.LoadLevel("SinglePlayer_Campaign");
	    	}
	    }
	    if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
	    campaign = false;
	    }
	}
	if(settings == true){
		//these settings skinned slider better
		sliderbarstyle.fixedWidth =wide/3;
		sliderbarstyle.fixedHeight =tall/3;
		sliderthumbstyle.fixedHeight =tall/10;
		sliderthumbstyle.fixedWidth =tall/10;
		sliderbarstyle.border.right = -(wide*.01774);
		sliderbarstyle.border.top = -(tall*.4);
		
		inGameVolume = GUI.HorizontalSlider (Rect (wide/15, tall/2.07, wide/3, 30), inGameVolume, 0.0, 1.0, sliderbarstyle,sliderthumbstyle);
		
		
		
    	GUI.Label (new Rect( wide/15, tall/2.5, wide/7, tall/12),"", styleVolumeLabel);
    	GUI.Label (new Rect( wide/15, tall/1.6, wide/7, tall/12),"", styleGraphicsLabel);
    	GUI.Label (new Rect( wide-wide/2.72, tall/2.6, wide/4, tall/6),"", styleSPnameLabel);
    	
    	if(GUI.Button (new Rect( wide/15, tall/1.35, wide/10, tall/15), "", styleHigh)){
    	highGraphics = true;
	    PlayerPrefs.SetInt("high", 1);
	    }
	    if(GUI.Button (new Rect(wide/5.5, tall/1.35, wide/10, tall/15), "", styleLow)){
	    highGraphics = false;
	    PlayerPrefs.SetInt("high", 0);
	    }
	    	
	    if(GUI.Button (new Rect(wide*.38, tall*.38, wide*.1, tall*.17), "", mmmStyle)){
	    	if(isMmm){
	    		isMmm=false;
	    		mmmStyle.normal.background=mmmOff;
	    		soundManager.GetComponent(AudioSource).enabled=false;
	    		PlayerPrefs.SetInt("mmm",0);
	    	}else{
	    		isMmm=true;
	    		mmmStyle.normal.background=mmmOn;
	    		soundManager.GetComponent(AudioSource).enabled=true;
	    		PlayerPrefs.SetInt("mmm",1);
	    	}
	    	
	    	
	    }
	    	
    	
	    
	   
	    changeUserName = GUI.TextField (Rect( wide-wide/2.5, tall/1.8, wide/3, tall/12), changeUserName, 9, styleNameYourGame);
	    //DISABLE THE ENTER KEY
	    //changeUserName = changeUserName.Replace("\n", "");
	    //DISABLES ALL KEYS BUT A-Z,SPACEBAR,!, and ? 
	    changeUserName = Regex.Replace(changeUserName, "[^a-zA-Z0-9!? ]", "");
	    
	    if(GUI.Button (new Rect( wide-wide/2.5, tall/1.55, wide/3, tall/12), "", styleChooseUserSettings)){
	    PlayerPrefs.SetString("userNameSingle", changeUserName);
	    }
	    
	    
		if(GUI.Button (new Rect( (wide)- (wide/6), (tall) - (tall/7), wide/7, tall/12), "", styleBack)){
	    settings = false;
	    PlayerPrefs.SetFloat("volume", inGameVolume);
	    }
	 
	}
	
	//Error label for when no internet connection is detected
	if(noInternetLabelOn==true){
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", noInternetStyle);
		
		if(Input.GetMouseButtonDown(0)){
			//PingKo();
			noInternetLabelOn=false;
		}
		
	}
	//Label for Joining a game and error if could not join, set to 10 seconds 
	if(joiningGame==true && joiningGameTimer<10 ){
		joinlabelStyle.normal.background = joiningGameTexture;
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", joinlabelStyle);
			
	}
	else if(joiningGame==true && joiningGameTimer>=10){
		joinlabelStyle.normal.background = failedtoJoinTexture;
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", joinlabelStyle);
		
		if(Input.GetMouseButtonDown(0)){
			
			joiningGame=false;
		}
	}
	
	//End all loading screen for use where it was previously coded poorly to later implement a loading screen
	GUI.Label (Rect (0, 0, wide, tall), "",bgstyle3);
	
}
@RPC
function OpenGames(){

//	playerConnected = false;
//	Network.Disconnect();
//	print("*****RESTARTING SERVER*****");
//	StartServer();
}

function DestroyArrayRaces(){
	
	var races : GameObject[];
    races =  GameObject.FindGameObjectsWithTag ("race");
 
    for(var i = 0 ; i < races.length ; i ++){
        Destroy(races[i]);
    }
}

function SpawnRaces(){
	
	if(raceHuman == true){
		Instantiate(humanSingle, humanSingle.transform.position, humanSingle.transform.rotation);
	}
	if(raceAlien == true){
		Instantiate(alienSingle, alienSingle.transform.position, alienSingle.transform.rotation);
	}
	if(raceHumanAI == true){
		Instantiate(humanAI, humanAI.transform.position, humanAI.transform.rotation);
	}
	if(raceAlienAI == true){
		Instantiate(alienAI, alienAI.transform.position, alienAI.transform.rotation);
	}
}

function StartServer (){
		//print("*****STARTING SERVER*****");
		var useNAT = !Network.HavePublicAddress();
		//var useNAT = false;
		//print("useNat is"+useNAT);
        Network.InitializeServer(1, 25001, useNAT);
        MasterServer.RegisterHost("Star_Arena", serverNameField, "Open"); 
           
}

function OnPlayerDisconnected(player: NetworkPlayer){

       	
   
       	playerConnected = false;
		
		
		
        playerReady = false;
        Network.RemoveRPCs(player);
        Network.DestroyPlayerObjects(player);
        MasterServer.RegisterHost("Star_Arena", serverNameField, "Open");
        //Network.Disconnect();
        //StartServer();

}

function RefreshHostList(){
		gameOne = false;
		gameTwo = false;
		gameThree = false;
		gameFour = false;
		x=0;
		y=0;
		hostData = MasterServer.PollHostList();
        MasterServer.RequestHostList("Star_Arena");
        
              
	        	for(var element : HostData in hostData) {
	        		//print("1st for loop working");
	        			y = y+1;
	        			//print(element.comment);
	        			if(element.comment=="Open"){
	        				//print("FOUND AT LEAST 1 OPEN GAME");
	        				x=x+1;
	        				
			        		if(x == 1){
			        			
			        			gameOne = true;
			        			gameTwo = false;
			        			gameThree = false;
			        			gameFour = false;
			        			game1data = y-1;
			        		}
			        		if(x == 2){
			        			gameTwo = true;
			        			gameThree = false;
			        			gameFour = false;
			        			game2data = y-1;
			        		}
			        		if(x == 3){
			        			gameThree = true;
			        			gameFour = false;
			        			game3data = y-1;
			        		}
			        		if(x == 4){
			        			gameFour = true;
			        			game4data = y-1;
			        		}

	        			}
	        		
	        		
				
	            }
        //print("TOTAL HOSTED GAMES" + MasterServer.PollHostList().length);
       // print("X IS" +x + "AND Y IS" + y);
        
}


@RPC
function SendUsername (username : String){
		 usernameopponent=username;	
}




function StyleChooser(){

//	if(validuser == true && createUser == true){
//		
//		invalidUserPass = true;
//		
//	}
	if(validuser == true && validpassword == true){
	isValid = true;
		if(logIn == true){
		invalidUserPass = false;
		}
//		else if(createUser == true){
//		invalidUserPass = true;
//		}
	}
	else{
	isValid = false;
		if(logIn == true){
		invalidUserPass = true;
		}
		else if(createUser == true){
		invalidUserPass = false;
		}

	}
	
}


function CreateUserPass(username : String, password : String){
	var tempurl:String;
	tempurl = baseURL+"?makeuser="+username+"&password="+password;
	tempurl = System.Uri.EscapeUriString(tempurl);
	print(tempurl);
	var hs_get = WWW(tempurl);
	yield hs_get;
	
	
	
}
function CheckUser(username : String){
	//print("CheckUser");
	var tempurl:String;
	tempurl = baseURL+"?checkuser="+username;
	tempurl = System.Uri.EscapeUriString(tempurl);
	print(tempurl);
	
	var hs_get = WWW(tempurl);
    yield hs_get;
    	if (hs_get.text=="1"){

    	validuser = true;
    	}else if(hs_get.text=="0"){

    	validuser= false;
    	}
    	StyleChooser();
}
function CheckPass(username : String,password :String){
	var tempurl:String;
	tempurl = baseURL+"?username="+username+"&checkpass="+password;
	tempurl = System.Uri.EscapeUriString(tempurl);
	
	var hs_get2 = WWW(tempurl);
    yield hs_get2;
    	if (hs_get2.text=="1"){
    	validpassword = true;
    	

    	}else if(hs_get2.text=="0"){
    	validpassword = false;
    	
    	}
	StyleChooser();
}
function getuid(username:String){
	var tempurl:String;
	tempurl = baseURL+"?retrieveid="+username;
	tempurl = System.Uri.EscapeUriString(tempurl);
	
	var hs_get = WWW(tempurl);
	yield hs_get;
	
	uniqueID = hs_get.text;
	
	
	
	PlayerPrefs.SetString("uniqueID", uniqueID);
	
}
function getvalues(){
	var tempurl:String;
	tempurl = baseURL+"?uid="+uniqueID+"&viewvalues";
	tempurl = System.Uri.EscapeUriString(tempurl);
	
	var hs_get = WWW(tempurl);
	yield hs_get;

	testLeaderboard = hs_get.text;
	
	

}

//leaderbpoard functions
function getLeaderboard(){
	
	//print("GETTING LEADERBOARD STATS");
	var commaChar = ","[0];

	var tempurl:String;
	tempurl = baseURL + "?uid=" + uniqueID +"&topfive";
	tempurl = System.Uri.EscapeUriString(tempurl);
	
	

	var hs_get = WWW(tempurl);
    yield hs_get;
    
    var leaderboardData = new ArrayList();
    
    //this var creates an array with all leaderboard data, split based on CSV
     fulluserdata = hs_get.text.Split(commaChar);
    
   	


}
function getMyStats(){

	var commaChar = ","[0];
	
	var tempurl:String;
	tempurl = baseURL + "?uid="+uniqueID+"&viewvalues";
	tempurl = System.Uri.EscapeUriString(tempurl);
	
	var hs_get = WWW(tempurl);
    yield hs_get;
	
	var myData = new ArrayList();
	fullMyData = hs_get.text.Split(commaChar);

}
function getMyRank(){
	var tempurl:String;
	tempurl = baseURL + "?uid="+uniqueID+"&myrank";
	tempurl = System.Uri.EscapeUriString(tempurl);
	
	var hs_get = WWW(tempurl);
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

function DestroyPediaUnits(){

	
	var destroy : GameObject[];
    destroy = GameObject.FindGameObjectsWithTag("red");
	for (var find : GameObject in destroy){
		if(humanPedia == true){
			if(pediaPage == 1){ 
				if(!find.transform.name.Contains("Marine")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 2){ 
				if(!find.transform.name.Contains("Sniper")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 3){ 
				if(!find.transform.name.Contains("Cannoneer")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 4){ 
				if(!find.transform.name.Contains("Dozer")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 5){ 
				if(!find.transform.name.Contains("Striker")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 6){ 
				if(!find.transform.name.Contains("Titan")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 7){
	    		if(nuke == true){
	    		Destroy(find);
	    		}
	    	}
    	}
    	else if(alienPedia == true){
			if(pediaPage == 1){ 
				if(!find.transform.name.Contains("Drudge")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 2){ 
				if(!find.transform.name.Contains("Squaller")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 3){ 
				if(!find.transform.name.Contains("Griefer")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 4){ 
				if(!find.transform.name.Contains("Warder")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 5){ 
				if(!find.transform.name.Contains("Disrupter")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 6){ 
				if(!find.transform.name.Contains("Arbiter")){
	    		Destroy(find);
	    		}
	    	}
	    	if(pediaPage == 7){
	    		if(nuke == true){
	    		Destroy(find);
	    		}
	    	}
    	}
	}
		

}





@RPC
function LoadLevel (levelx : String, x : int){

//Allow choosen race to load into the next scene
	DontDestroyOnLoad(GameObject.Find("MultiPlayer"));
	if(Network.isServer && raceHuman == true){
	DontDestroyOnLoad(GameObject.Find("HumanServer"));
	}
	if(Network.isServer && raceAlien == true){
	DontDestroyOnLoad(GameObject.Find("AlienServer"));
	}
	if(Network.isClient && raceHumanClient == true){
	DontDestroyOnLoad(GameObject.Find("HumanClient"));
	}
	if(Network.isClient && raceAlienClient == true){
	DontDestroyOnLoad(GameObject.Find("AlienClient"));
	}
		
		bgstyle3.normal.background = bgLoading;
		bgstyle3.active.background = bgLoading;
		
	//Load the level
	Application.LoadLevel(levelx);

}

@RPC
function DisconnectClient(x : int){
		hostLAN = false;
		joinedLAN = false;
		joinLAN = false;
		multiChoice = true;
		multiLocal = true;
		raceHumanClient = false;
		raceAlienClient = false;
		raceChosen = false;	
		playerReady = false;
		MasterServer.RegisterHost("Star_Arena", serverNameField, "Open"); 	
		Network.Disconnect();	
}
@RPC
function PlayerReady (){
	
	playerReady = true;

}

@RPC
function PlayerConnected (){

	if(!GameObject.Find("sm_Challenger(Clone)")){
		Instantiate(sm_Challenger);
	}
	
	
	playerConnected = true;
	joinLAN = false;
	joinedLAN = true;
	
	

}

function OnPlayerConnected (player : NetworkPlayer){

	
	playerConnected = true;
	GetComponent.<NetworkView>().RPC("PlayerConnected", RPCMode.All);

}

function OnFailedToConnectToMasterServer(info :	NetworkConnectionError) {
		print("Could not connect to master server: "+ info);
		failedToConnectMS = true;	
		//We can also use this function to automatically attempt reconnects to ko's master server upon failures
	
	}
	
function PingKo()
{
	//PHP DB version of Checker
	
	internetConnection = true;
	
	var tempurl:String;
	tempurl = baseURL+"?checkuser="+"Butthole";
	tempurl = System.Uri.EscapeUriString(tempurl);
	print(tempurl);
	var hs_get = WWW(tempurl);
    yield hs_get;
    	if (hs_get.text=="1"||hs_get.text=="0"){
    		internetConnection = true;
    	}
    	else{
    		internetConnection = false;
    	}
    	
    	
    	
    	
    	
    	
    	
	//print(hs_get.text);
//	//PING VERSION OF CHECKER, works fine for PC but not on android
//	var koPing : Ping = new Ping("98.254.77.170");
//	pingTimer = 0;
//	while(!koPing.isDone && pingTimer < 3.0)
//	{
//		internetConnection = false;
//		print("no internet");
//		yield;
//	}
//	if(koPing.isDone==true){
//		internetConnection=true;
//		print("yes internet");
//	}
//	

}



function Disconnect(){
	Network.Disconnect();
	MasterServer.UnregisterHost();
//	yield Resources.UnloadUnusedAssets();
//	Application.LoadLevel(levelChosen);
}