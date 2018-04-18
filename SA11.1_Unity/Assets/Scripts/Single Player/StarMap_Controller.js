#pragma strict
var bgstyle : UnityEngine.GUIStyle;
var levelSelected : boolean = true;
var bgBorder : UnityEngine.Texture;
var bgNoBorder : UnityEngine.Texture;
var bgUpgrade : UnityEngine.Texture;

var currentText : UnityEngine.Texture;

//style for text image
var textStyle : UnityEngine.GUIStyle;
//Vars for all text images
var foundationText : UnityEngine.Texture;
var approachText : UnityEngine.Texture;
var earthText : UnityEngine.Texture;
var moonText : UnityEngine.Texture;
var odysseyText :UnityEngine.Texture;
var thresholdText : UnityEngine.Texture;
var ascendanceText : UnityEngine.Texture;
var frameworkText : UnityEngine.Texture;
var noIntelText : UnityEngine.Texture;
var selectLevelText : UnityEngine.Texture;
var upgradeText : UnityEngine.GUIStyle;
var healthText : UnityEngine.Texture;
var powerText : UnityEngine.Texture;
var incomeText : UnityEngine.Texture;
var rangeText : UnityEngine.Texture;
var maxIncomeText : UnityEngine.Texture;
var marineHDText : UnityEngine.Texture;
var titanHAText : UnityEngine.Texture;
var bountyText : UnityEngine.Texture;
var addTurretText : UnityEngine.Texture;
var selectUpgradeText : UnityEngine.Texture;

var blankMap : UnityEngine.Texture;

//Vars for selection circles (needed to turn renderers on / off)
var c1 : UnityEngine.GameObject;
var c2 : UnityEngine.GameObject;
var c3 : UnityEngine.GameObject;
var c4 : UnityEngine.GameObject;
var c5 : UnityEngine.GameObject;
var c6 : UnityEngine.GameObject;
var c7 : UnityEngine.GameObject;
var c8 : UnityEngine.GameObject;

//Vars for connecting lines (needed to change materials from grey to green as you progress)
var l1 : UnityEngine.GameObject;
var l2 : UnityEngine.GameObject;
var l3 : UnityEngine.GameObject;
var l4 : UnityEngine.GameObject;
var l5 : UnityEngine.GameObject;
var l6 : UnityEngine.GameObject;
var l7 : UnityEngine.GameObject;
var l8 : UnityEngine.GameObject;

//Vars for the grey and green materials for connecting lines
var green : UnityEngine.Material;
var grey : UnityEngine.Material;

//Vars for buttons
var backBtn : UnityEngine.GUIStyle;
var upgradeBtn : UnityEngine.GUIStyle;
var launchBtn : UnityEngine.GUIStyle;
	//Launch Button Image vars
	var launchUP : UnityEngine.Texture;
	var launchP : UnityEngine.Texture;
	var launchG : UnityEngine.Texture;
	//Launch Button level to load string
	var levelChosen : String; 
//Vars for Uprade Tree
var upgradeTree : boolean = false;
	//Upgrade buttons
	var bountyBtn : UnityEngine.GUIStyle;
	var healthBtn : UnityEngine.GUIStyle;
	var health2Btn : UnityEngine.GUIStyle;
	var incomeBtn : UnityEngine.GUIStyle;
	var marineHvyDmgBtn : UnityEngine.GUIStyle;
	var maxIncomeBtn : UnityEngine.GUIStyle;
	var powerBtn : UnityEngine.GUIStyle;
	var rangeBtn : UnityEngine.GUIStyle;
	var titanHvyArmorBtn : UnityEngine.GUIStyle;
	var additionalDefenseBtn : UnityEngine.GUIStyle;
	var bountySelected : UnityEngine.Texture;
	var healthSelected : UnityEngine.Texture;
	var incomeSelected : UnityEngine.Texture;
	var marineHvyDmgSelected : UnityEngine.Texture;
	var maxIncomeSelected : UnityEngine.Texture;
	var powerSelected : UnityEngine.Texture;
	var rangeSelected : UnityEngine.Texture;
	var titanHvyArmorSelected : UnityEngine.Texture;
	var additionalDefenseSelected : UnityEngine.Texture;
	var bountyGrey : UnityEngine.Texture;
	var healthGrey : UnityEngine.Texture;
	var incomeGrey : UnityEngine.Texture;
	var marineHvyDmgGrey : UnityEngine.Texture;
	var maxIncomeGrey : UnityEngine.Texture;
	var powerGrey : UnityEngine.Texture;
	var rangeGrey : UnityEngine.Texture;
	var titanHvyArmorGrey : UnityEngine.Texture;
	var additionalDefenseGrey : UnityEngine.Texture;
	var outlineCircle : UnityEngine.GUIStyle;
	var allocateBtn : UnityEngine.GUIStyle;
	var allocateBtnTexture : UnityEngine.Texture;
	var allocateBtnUsedTexture : UnityEngine.Texture;
	var allocateBtnGreyTexture : UnityEngine.Texture;
	//Upgrade Int for allocating points and setting the Text area
	var upgradeChosen : int = 0;
	//Booleans player prefs set
	var u1 : boolean;
	var u2 : boolean;
	var u3 : boolean;
	var u4 : boolean;
	var u5 : boolean;
	var u6 : boolean;
	var u7 : boolean;
	var u8 : boolean;
	var u9 : boolean;
	var u10 : boolean;
	//booleans for upgrade points
	
	var levelTest : String;
	var moveLaunch : float = 1;
	var launchRect : Rect; 
	var wide = Screen.width;
	var tall = Screen.height;
	var e : Event;
	var styleUnspentPoints : UnityEngine.GUIStyle;
	var upgradePoints : int;
	var showBorder : boolean;
	var inGameVolume : float;
	
	
	//Vars for tutorial overlay text blocks ************************STILL NEEDS IMAGES TO BE SET IN INSPECTOR9613
	var styleIntroMessage: UnityEngine.GUIStyle;
	var styleOkButton: UnityEngine.GUIStyle;
	var introMessageOn : boolean;
	
	var stylePath1Alien : UnityEngine.GUIStyle;
	var stylePath1Human : UnityEngine.GUIStyle;
	var stylePath2 : UnityEngine.GUIStyle;
	var stylePath3 : UnityEngine.GUIStyle;
	
	//Random Loading Screen Vars
	var loadingScreen1 : UnityEngine.Texture;
	var loadingScreen2 : UnityEngine.Texture;
	var loadingScreen3 : UnityEngine.Texture;
	var loadingScreen4 : UnityEngine.Texture;
	var randomLoadScreen : int;
	var blankmap : UnityEngine.Texture;
	var bgLoading : UnityEngine.Texture;
	var allBGsButLoadingOff : boolean = false;
	var bgstyle3 : UnityEngine.GUIStyle;
	var canlaunch : boolean = false;
	
	
	//V8 New variables for blinking upg star
	var newUpgradeTimer:float;
	var styleNewUpgrades:GUIStyle;
	var star1:Texture2D;
	var star2:Texture2D;
	var rotateSpeed:float;
	
function Start () {

	

//	if(PlayerPrefs.GetInt("introPlayed") == 0){
//		print("PLAYING INTRO");
//		Handheld.PlayFullScreenMovie("StarMapIntroV2xxx.mp4", Color.black);
//		//Handheld.PlayFullScreenMovie("StarMapIntroV1_720p.mp4", Color.black );
//		PlayerPrefs.SetInt("introPlayed", 1);
//	}

//Handheld.PlayFullScreenMovie ("StarMapIntroV1_720p.mp4", Color.black, FullScreenMovieControlMode.CancelOnInput, FullScreenMovieScalingMode.None);
//iPhoneUtils.PlayMovie("StarMapIntroV1_720p.mp4", Color.black, iPhoneMovieControlMode.CancelOnTouch); 

	


	bgstyle3.normal.background = null;
	randomLoadScreen = (UnityEngine.Random.Range(1, 5));

	
	if(PlayerPrefs.GetInt("level1") == 0 && PlayerPrefs.GetInt("level6") == 0){
		//Handheld.PlayFullScreenMovie("StarMapIntroV2xxx.mp4", Color.black );
		introMessageOn = true;
		//Debug.Log("introshitonmovieplayed");
	}
	//Code to see if alien path 1 bonus is to be displayed
	else if((PlayerPrefs.GetInt("level1") == 1 && PlayerPrefs.GetInt("level2") == 1 && (PlayerPrefs.GetInt("level3") == 1 || PlayerPrefs.GetInt("level4") == 1)) && PlayerPrefs.GetFloat("path1Shown")!=1 ){
		introMessageOn = true;
		PlayerPrefs.SetFloat("path1Alien",1);
		Debug.Log("2");
	}
	//Code to see if human path 1 bonus is to be displayed
	else if(PlayerPrefs.GetInt("level6") == 1 && PlayerPrefs.GetInt("level7") == 1 && PlayerPrefs.GetInt("level8") == 1 && PlayerPrefs.GetFloat("path1Shown")!=1){
		introMessageOn = true;
		PlayerPrefs.SetFloat("path1Human",1);
		Debug.Log("3");
	}
	//Code to see if path 2 bonus is to be displayed
	else if( ( ((PlayerPrefs.GetInt("level6") == 1 && PlayerPrefs.GetInt("level7") == 1 && PlayerPrefs.GetInt("level8") == 1) && ((PlayerPrefs.GetInt("level1") == 1 && PlayerPrefs.GetInt("level2") == 1 && PlayerPrefs.GetInt("level3") == 1) || (PlayerPrefs.GetInt("level1") == 1 && PlayerPrefs.GetInt("level2") == 1 && PlayerPrefs.GetInt("level4") == 1)) && PlayerPrefs.GetFloat("path2Shown")!=1)) 
	|| (PlayerPrefs.GetInt("level1") == 1 && PlayerPrefs.GetInt("level2") == 1 && PlayerPrefs.GetInt("level3") == 1 && PlayerPrefs.GetInt("level4") == 1) && PlayerPrefs.GetFloat("path2Shown")!=1){ 
		introMessageOn = true;
		PlayerPrefs.SetFloat("path2",1);
		Debug.Log("4");
	}
	//Code to see if path 3 bonus is to be displayed
	else if( PlayerPrefs.GetInt("level1") == 1 && PlayerPrefs.GetInt("level2") == 1 && PlayerPrefs.GetInt("level3") == 1 && PlayerPrefs.GetInt("level4") == 1 && PlayerPrefs.GetInt("level6") == 1 && PlayerPrefs.GetInt("level7") == 1 && PlayerPrefs.GetInt("level8") == 1 && PlayerPrefs.GetFloat("path3Shown")!=1){
		introMessageOn = true;
		PlayerPrefs.SetFloat("path3",1);
		Debug.Log("5");
	}
	
	else{
		introMessageOn = false;
	}

	//Handheld.PlayFullScreenMovie("StarMapIntroV1_720p.mp4", Color.black );
	
	//Sets BG to be borderless at beginning, when intro blurb is displayed, after the OKAY button is clicked it re-appears
	showBorder = false;
	
	inGameVolume = PlayerPrefs.GetFloat("volume");
	AudioListener.volume = inGameVolume;
	
	
	upgradePoints = 0;
	
	if(PlayerPrefs.GetInt("upgradePoints") == 1){
	upgradePoints = 1;
	}
	else if(PlayerPrefs.GetInt("upgradePoints") == 2){
	upgradePoints = 2;
	}
	else if(PlayerPrefs.GetInt("upgradePoints") == 3){
	upgradePoints = 3;
	}
	else if(PlayerPrefs.GetInt("upgradePoints") == 4){
	upgradePoints = 4;
	}
	else if(PlayerPrefs.GetInt("upgradePoints") == 5){
	upgradePoints = 5;
	}
	else if(PlayerPrefs.GetInt("upgradePoints") == 6){
	upgradePoints = 6;
	}
	else if(PlayerPrefs.GetInt("upgradePoints") == 7){
	upgradePoints = 7;
	}
	else if(PlayerPrefs.GetInt("upgradePoints") == 0){
	upgradePoints = 0;
	}else{}
	
	//Handheld.PlayFullScreenMovie ("StarMapIntroV1_720p.mp4", Color.black, FullScreenMovieControlMode.CancelOnInput, FullScreenMovieScalingMode.None);
	
	//launchRect = Rect (  wide-(wide*.195), tall/1.55 , (.15)*wide, (.12)*tall);
	//Temporary playerpref code for testing purposes 
	//see my chicken scratched KEY for help knowing which levels go by which ppref number
	
	//This block represents what star map will look like if all levels have been beaten
//	 PlayerPrefs.SetInt("level1", 1);
//	 PlayerPrefs.SetInt("level2", 1);
//	 PlayerPrefs.SetInt("level3", 1);
//	 PlayerPrefs.SetInt("level4", 1);
//	 PlayerPrefs.SetInt("level5", 1);
//	 PlayerPrefs.SetInt("level6", 1);
//	 PlayerPrefs.SetInt("level7", 1);
//	 PlayerPrefs.SetInt("level8", 1);


	 //*********************THIS IS FOR TESTING ONLY DELETE FOR BUILDS************************//
	 
//	PlayerPrefs.SetInt("health", 0);
//	PlayerPrefs.SetInt("power", 0);
//	PlayerPrefs.SetInt("income", 0);
//	PlayerPrefs.SetInt("health2", 0);
//	PlayerPrefs.SetInt("range", 0);
//	PlayerPrefs.SetInt("maxIncome", 0);
//	PlayerPrefs.SetInt("titanHvyArmor", 0);
//	PlayerPrefs.SetInt("marineHvyDmg", 0);
//	PlayerPrefs.SetInt("bounty", 0);
//	PlayerPrefs.SetInt("additionalDefense", 0);
	
	// This block represents what the star map looks like if only "Odyssey" has been beaten
//	 PlayerPrefs.SetInt("level1", 0);
//	 PlayerPrefs.SetInt("level2", 0);
//	 PlayerPrefs.SetInt("level3", 0);
//	 PlayerPrefs.SetInt("level4", 0);
//	 PlayerPrefs.SetInt("level5", 0);
//	 PlayerPrefs.SetInt("level6", 0);
//	 PlayerPrefs.SetInt("level7", 0);
//	 PlayerPrefs.SetInt("level8", 0);
	 
	 //Sets all selection circles to not appear
	c1.GetComponent.<Renderer>().enabled = false;
	c2.GetComponent.<Renderer>().enabled = false;
	c3.GetComponent.<Renderer>().enabled = false;
	c4.GetComponent.<Renderer>().enabled = false;
	c5.GetComponent.<Renderer>().enabled = false;
	c6.GetComponent.<Renderer>().enabled = false;
	c7.GetComponent.<Renderer>().enabled = false;
	c8.GetComponent.<Renderer>().enabled = false;
	
	
	//Sets connecting lines to correct colors depending on progress (playerprefs)
		//Start by setting all the grey
	l1.GetComponent.<Renderer>().material = grey;
	l2.GetComponent.<Renderer>().material = grey;
	l3.GetComponent.<Renderer>().material = grey;
	l4.GetComponent.<Renderer>().material = grey;
	l5.GetComponent.<Renderer>().material = grey;
	l6.GetComponent.<Renderer>().material = grey;
	l7.GetComponent.<Renderer>().material = grey;
	l8.GetComponent.<Renderer>().material = grey;
	
	//Next checking player prefs and setting them to green accordingly
	if((PlayerPrefs.GetInt("level1")>0)){
		l1.GetComponent.<Renderer>().material = green;
	}
	if((PlayerPrefs.GetInt("level2")>0)){
		l3.GetComponent.<Renderer>().material = green;
		l2.GetComponent.<Renderer>().material = green;
		
	}
	if((PlayerPrefs.GetInt("level4")>0)){
		l4.GetComponent.<Renderer>().material = green;
		
	}
	if((PlayerPrefs.GetInt("level3")>0)){
		l5.GetComponent.<Renderer>().material = green;
		
	}
	if((PlayerPrefs.GetInt("level6")>0)){
		l6.GetComponent.<Renderer>().material = green;
		
	}
	if((PlayerPrefs.GetInt("level7")>0)){
		l7.GetComponent.<Renderer>().material = green;
		
	}
	if((PlayerPrefs.GetInt("level8")>0)){
		l8.GetComponent.<Renderer>().material = green;
		
	}
	
	
	//Sets intel text to say "select a level" for when the star map is first loaded only
	levelSelected = true;
	textStyle.normal.background = selectLevelText;
	textStyle.active.background = selectLevelText;
	
	//Sets launch button to invisible intially
	launchBtn.normal.background = blankMap;
	launchBtn.active.background = blankMap;
	
	
	//UPGRADE START
	//Uses player prefs to set boolean to know which upgrades have been chosen in previous games
	if((PlayerPrefs.GetInt("health") > 0)){
	u1 = true;
	}
	else{
	u1 = false;
	}
	if((PlayerPrefs.GetInt("power") > 0)){
	u2 = true;
	}
	else{
	u2 = false;
	}
	if((PlayerPrefs.GetInt("income") > 0)){
	u3 = true;
	}
	else{
	u3 = false;
	}
	if((PlayerPrefs.GetInt("health2") > 0)){
	u4 = true;
	}
	else{
	u4 = false;
	}
	if((PlayerPrefs.GetInt("range") > 0)){
	u5 = true;
	}
	else{
	u5 = false;
	}
	if((PlayerPrefs.GetInt("maxIncome") > 0)){
	u6 = true;
	}
	else{
	u6 = false;
	}
	if((PlayerPrefs.GetInt("titanHvyArmor") > 0)){
	u7 = true;
	}
	else{
	u7 = false;
	}
	if((PlayerPrefs.GetInt("marineHvyDmg") > 0)){
	u8 = true;
	}
	else{
	u8 = false;
	}
	if((PlayerPrefs.GetInt("bounty") > 0)){
	u9 = true;
	}
	else{
	u9 = false;
	}
	if((PlayerPrefs.GetInt("additionalDefense") > 0)){
	u10 = true;
	}
	else{
	u10 = false;
	}

}

function Update () {
	rotateSpeed=rotateSpeed+Time.deltaTime*50;
//		//V8 New variables for blinking upg star
//	var newUpgradeTimer:float;
//	var styleNewUpgrades:GUIStyle;
//	var star1:Texture2D;
//	var star2:Texture2D;



	if( allBGsButLoadingOff == true){
		backBtn.normal.background=blankMap;	
		upgradeBtn.normal.background=blankMap;
		styleNewUpgrades.normal.background=blankMap;
	}else{
			//new upgrades
		if(upgradePoints>0){
			newUpgradeTimer=newUpgradeTimer+Time.deltaTime;
			if(newUpgradeTimer>2.0){
				newUpgradeTimer=0;;
			}else{}
			if(newUpgradeTimer>1.8){
				styleNewUpgrades.normal.background=star2;
			}else{
				styleNewUpgrades.normal.background=star1;
			}
		}else{
			styleNewUpgrades.normal.background=blankMap;
		}
	
	}


}





function OnGUI(){



	e = Event.current;
	wide = Screen.width;
	tall = Screen.height;
	launchRect = Rect (  wide-(wide*.195), tall/1.55 , (.15)*wide, (.12)*tall);
	GUI.depth = 0;
	
	

	

	//Main BackPlate
	GUI.Label (Rect (0, 0, wide, tall), "",bgstyle);
	
	//Sets backplate to include or exclude the green border depending on whether or not something has been selected
	//If nothing is selected, it will also erase any text in the main "intel" text label
	if(upgradeTree == false && allBGsButLoadingOff==false){
		if(levelSelected == true && introMessageOn == false){
			bgstyle.normal.background = bgBorder;
			bgstyle.active.background = bgBorder;
		}
		else if(showBorder == true && introMessageOn == false){
			bgstyle.normal.background = bgBorder;
			bgstyle.active.background = bgBorder;
			textStyle.normal.background = selectLevelText;
			textStyle.active.background = selectLevelText;
		}
		else{
			bgstyle.normal.background = bgNoBorder;
			bgstyle.active.background = bgNoBorder;
			textStyle.normal.background = blankMap;
			textStyle.active.background = blankMap;
		}

		
		//This is the main text label for "intel" text
		if(introMessageOn==false){
			GUI.Label (Rect ( ( wide - (wide/2.575) ), (tall/2) -(tall/4), (wide/2.88), (tall/1.8)), "" , textStyle);
		}
		
		
		
		
	
			
		//Launch Button
		
		
		if (GUI.Button (new Rect (  wide-(wide*.195), tall/1.55 , (.15)*wide, (.12)*tall),"", launchBtn )){
		//add load screen here
			if(canlaunch==true){
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
				bgstyle3.normal.background = bgLoading;
		 	
		 	
				Application.LoadLevel(levelChosen);
			}
		//Application.LoadLevel("c_Level1");
			
		}
		//e = Event.current;
	
	if(upgradeTree == false){
		//Makes launch button invisible and unclickable when nothing is selected
		if(levelSelected == false){
			launchBtn.normal.background = blankMap;
			launchBtn.active.background = blankMap;
			levelChosen = null;
			moveLaunch = 100;
		
		}
		else{
		moveLaunch = 1;
		}
	
		//Begin functionality for clicking on planets
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hit : RaycastHit;
		
		if(Input.GetMouseButtonDown(0)){
		
			if(introMessageOn == false){
			if (Physics.Raycast(ray, hit, 5000) && !launchRect.Contains(e.mousePosition)){
				Debug.Log("Hit Detected/ Selected "+ hit.transform.name);
				//%%%Below changes the intel text based on which level has been selected, and makes the appropriate selection circle appear

				if(hit.transform.name.Contains("Odyssey")){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = odysseyText;
						textStyle.active.background = odysseyText;
						c1.GetComponent.<Renderer>().enabled = true;
						c2.GetComponent.<Renderer>().enabled = false;
						c3.GetComponent.<Renderer>().enabled = false;
						c4.GetComponent.<Renderer>().enabled = false;
						c5.GetComponent.<Renderer>().enabled = false;
						c6.GetComponent.<Renderer>().enabled = false;
						c7.GetComponent.<Renderer>().enabled = false;
						c8.GetComponent.<Renderer>().enabled = false;
						
						//All of the below notated levelChosens are to be changed to their corresponding scene names once created
						
						levelChosen = "c_Level4";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
				}
				else if(hit.transform.name.Contains("Foundation")){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = foundationText;
						textStyle.active.background = foundationText;
						c1.GetComponent.<Renderer>().enabled = false;
						c2.GetComponent.<Renderer>().enabled = false;
						c3.GetComponent.<Renderer>().enabled = false;
						c4.GetComponent.<Renderer>().enabled = false;
						c5.GetComponent.<Renderer>().enabled = false;
						c6.GetComponent.<Renderer>().enabled = true;
						c7.GetComponent.<Renderer>().enabled = false;
						c8.GetComponent.<Renderer>().enabled = false;
						
						//Change this one
						levelChosen = "c_Level1";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
				}
									 
				else if(hit.transform.name.Contains("Ascendance") ){
					c1.GetComponent.<Renderer>().enabled = false;
					c2.GetComponent.<Renderer>().enabled = true;
					c3.GetComponent.<Renderer>().enabled = false;
					c4.GetComponent.<Renderer>().enabled = false;
					c5.GetComponent.<Renderer>().enabled = false;
					c6.GetComponent.<Renderer>().enabled = false;
					c7.GetComponent.<Renderer>().enabled = false;
					c8.GetComponent.<Renderer>().enabled = false;
					//NOTE on the below small if statements, it makes sure that "Odyssey" has been beaten in order to display the new intel
					if(PlayerPrefs.GetInt("level1")>0){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = ascendanceText;
						textStyle.active.background = ascendanceText;
						
						//Change this one
						levelChosen = "c_Level5";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
					}
					else{
						canlaunch = false;
						levelSelected = true;
						levelChosen = null;
						launchBtn.normal.background = launchG;
						launchBtn.active.background = launchG;
						textStyle.normal.background = noIntelText;
						textStyle.active.background = noIntelText;
					}
				}
				else if(hit.transform.name.Contains("Approach")){
					c1.GetComponent.<Renderer>().enabled = false;
					c2.GetComponent.<Renderer>().enabled = false;
					c3.GetComponent.<Renderer>().enabled = false;
					c4.GetComponent.<Renderer>().enabled = false;
					c5.GetComponent.<Renderer>().enabled = false;
					c6.GetComponent.<Renderer>().enabled = false;
					c7.GetComponent.<Renderer>().enabled = true;
					c8.GetComponent.<Renderer>().enabled = false;
					if(PlayerPrefs.GetInt("level6")>0){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = approachText;
						textStyle.active.background = approachText;
						
						//Change this one
						levelChosen = "c_Level2";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
					}
					else{
						canlaunch = false;
						levelSelected = true;
						levelChosen = null;
						launchBtn.normal.background = launchG;
						launchBtn.active.background = launchG;
						textStyle.normal.background = noIntelText;
						textStyle.active.background = noIntelText;
					}
				}
				else if(hit.transform.name.Contains("Earth")){
					c1.GetComponent.<Renderer>().enabled = false;
					c2.GetComponent.<Renderer>().enabled = false;
					c3.GetComponent.<Renderer>().enabled = false;
					c4.GetComponent.<Renderer>().enabled = false;
					c5.GetComponent.<Renderer>().enabled = true;
					c6.GetComponent.<Renderer>().enabled = false;
					c7.GetComponent.<Renderer>().enabled = false;
					c8.GetComponent.<Renderer>().enabled = false;
					if(PlayerPrefs.GetInt("level4")>0 ||  PlayerPrefs.GetInt("level8")>0 || PlayerPrefs.GetInt("level3")>0){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = earthText;
						textStyle.active.background = earthText;
						
						//Change this one
						levelChosen = "c_Level8";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
					}
					else{
						canlaunch = false;
						levelSelected = true;
						levelChosen = null;
						launchBtn.normal.background = launchG;
						launchBtn.active.background = launchG;
						textStyle.normal.background = noIntelText;
						textStyle.active.background = noIntelText;
					}
				}
				else if(hit.transform.name.Contains("Framework")){
					c1.GetComponent.<Renderer>().enabled = false;
					c2.GetComponent.<Renderer>().enabled = false;
					c3.GetComponent.<Renderer>().enabled = false;
					c4.GetComponent.<Renderer>().enabled = false;
					c5.GetComponent.<Renderer>().enabled = false;
					c6.GetComponent.<Renderer>().enabled = false;
					c7.GetComponent.<Renderer>().enabled = false;
					c8.GetComponent.<Renderer>().enabled = true;
					if(PlayerPrefs.GetInt("level7")>0){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = frameworkText;
						textStyle.active.background = frameworkText;
						
						//Change this one
						levelChosen = "c_Level3";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
					}
					else{
						canlaunch = false;
						levelSelected = true;
						levelChosen = null;
						launchBtn.normal.background = launchG;
						launchBtn.active.background = launchG;
						textStyle.normal.background = noIntelText;
						textStyle.active.background = noIntelText;
					}
				}
				else if(hit.transform.name.Contains("Threshold")){
					c1.GetComponent.<Renderer>().enabled = false;
					c2.GetComponent.<Renderer>().enabled = false;
					c3.GetComponent.<Renderer>().enabled = false;
					c4.GetComponent.<Renderer>().enabled = true;
					c5.GetComponent.<Renderer>().enabled = false;
					c6.GetComponent.<Renderer>().enabled = false;
					c7.GetComponent.<Renderer>().enabled = false;
					c8.GetComponent.<Renderer>().enabled = false;
					if(PlayerPrefs.GetInt("level2")>0){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = thresholdText;
						textStyle.active.background = thresholdText;
						
						//Change this one
						levelChosen = "c_Level7";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
					}
					else{
						canlaunch = false;
						levelSelected = true;
						levelChosen = null;
						launchBtn.normal.background = launchG;
						launchBtn.active.background = launchG;
						textStyle.normal.background = noIntelText;
						textStyle.active.background = noIntelText;
					}
				}
				else if(hit.transform.name.Contains("Moon")){
					c1.GetComponent.<Renderer>().enabled = false;
					c2.GetComponent.<Renderer>().enabled = false;
					c3.GetComponent.<Renderer>().enabled = true;
					c4.GetComponent.<Renderer>().enabled = false;
					c5.GetComponent.<Renderer>().enabled = false;
					c6.GetComponent.<Renderer>().enabled = false;
					c7.GetComponent.<Renderer>().enabled = false;
					c8.GetComponent.<Renderer>().enabled = false;
					if(PlayerPrefs.GetInt("level2")>0){
						canlaunch = true;
						levelSelected = true;
						textStyle.normal.background = moonText;
						textStyle.active.background = moonText;
						
						//Change this one
						levelChosen = "c_Level6";
						launchBtn.normal.background = launchUP;
						launchBtn.active.background = launchP;
					}
					else{
						canlaunch = false;
						levelSelected = true;
						textStyle.normal.background = noIntelText;
						textStyle.active.background = noIntelText;
						levelChosen = null;
						launchBtn.normal.background = launchG;
						launchBtn.active.background = launchG;
					}
				}
		
		
			}
			
			else {
				
				if(!launchRect.Contains(e.mousePosition)){
				Debug.Log("Nothing Hit/Deselected2");
				levelSelected = false;
				
				c1.GetComponent.<Renderer>().enabled = false;
				c2.GetComponent.<Renderer>().enabled = false;
				c3.GetComponent.<Renderer>().enabled = false;
				c4.GetComponent.<Renderer>().enabled = false;
				c5.GetComponent.<Renderer>().enabled = false;
				c6.GetComponent.<Renderer>().enabled = false;
				c7.GetComponent.<Renderer>().enabled = false;
				c8.GetComponent.<Renderer>().enabled = false;
				showBorder = false;
				}
				else{
				//levelChosen = null;
				Debug.Log("Nothing Hit/Deselected1");
				}
				
				
			}
			//Bracketbelow is paired to the If(IntromessageOn) stuff right above raycast
			}
		
		}
	}
//	else if(upgradeTree == true){
//	bgstyle.normal.background = bgUpgrade;
//	}
	
	

		
		
		
	}
	else if(upgradeTree == true){
	bgstyle.normal.background = bgUpgrade;
		
	}
	
	//Upgrades Button
	
	if(upgradeTree == false){
		
		if (GUI.Button (new Rect (  wide-(wide*.28), tall/25 , (.25)*wide, (.13)*tall),"", upgradeBtn )){
		upgradeTree = true;
		
		}
		
		
		
		var oldMatrix = GUI.matrix;
		GUIUtility.RotateAroundPivot(rotateSpeed, Vector2((wide*.73)+(wide*.015), (tall*.08)+(tall*.0225) ));
		// Rotated GUI Here
		 
		 	//new upgrades star
		GUI.Label(Rect(wide*.73,tall*.08,wide*.03,tall*.045),"",styleNewUpgrades );
		 
		GUI.matrix = oldMatrix;
		// non-Rotated GUI Here
		
		
	}
	else if(upgradeTree == true){
		GUI.Label (Rect ( ( wide - (wide/2.8) ), (tall/1.9) -(tall/4), (wide/3.5), (tall/2.2)), "",upgradeText);
		//UNSPENT UPGRADE POINTS **NEED TO CHANGE FONT SIZE TO PERCENTAGE OR REDO BACKPLATE TO DISCLUDE 
		//UNSPENT POINTS AND MAKE LABELS FOR EACH ONE
		if(upgradePoints == 1){
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "1", styleUnspentPoints);
		}
		else if(upgradePoints == 2){
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "2", styleUnspentPoints);
		}
		else if(upgradePoints == 3){
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "3", styleUnspentPoints);
		}
		else if(upgradePoints == 4){
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "4", styleUnspentPoints);
		}
		else if(upgradePoints == 5){
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "5", styleUnspentPoints);
		}
		else if(upgradePoints == 6){
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "6", styleUnspentPoints);
		}
		else if(upgradePoints == 7){
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "7", styleUnspentPoints);
		}
		else{
		GUI.Label(Rect(wide/1.3, tall/12.5, wide/7, tall/12), "0", styleUnspentPoints);
		}
		//Puts the green outline on the proper selection
		if(upgradeChosen == 1){
		GUI.Label (Rect (wide/16, tall/5.3, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = healthText;
		}
		else if(upgradeChosen == 2){
		GUI.Label (Rect (wide/4.05, tall/5.45, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = powerText;
		}
		else if(upgradeChosen == 3){
		GUI.Label (Rect (wide/2.285, tall/5.45, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = incomeText;
		}
		else if(upgradeChosen == 4){
		GUI.Label (Rect (wide/16, tall/2.615, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = healthText;		
		}
		else if(upgradeChosen == 5){
		GUI.Label (Rect (wide/4.05, tall/2.635, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = rangeText;
		}
		else if(upgradeChosen == 6){
		GUI.Label (Rect (wide/2.279, tall/2.635, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = maxIncomeText;
		}
		else if(upgradeChosen == 7){
		GUI.Label (Rect (wide/16, tall/1.77, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = titanHAText;
		}
		else if(upgradeChosen == 8){
		GUI.Label (Rect (wide/3.99, tall/1.77, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = marineHDText;
		}
		else if(upgradeChosen == 9){
		GUI.Label (Rect (wide/2.28, tall/1.78, wide/11, tall/6.5), "",outlineCircle);
		upgradeText.normal.background = bountyText;
		}
		else if(upgradeChosen == 10){
		GUI.Label (Rect (wide/4.55, tall/1.37 ,wide/6.65 ,tall/4.2 ), "",outlineCircle);
		upgradeText.normal.background = addTurretText;
		}
		else{
		upgradeText.normal.background = selectUpgradeText;
		}
		//Changes button color based on choice
		if(u1 == true){
		healthBtn.normal.background = healthSelected;
		}
		else{
		healthBtn.normal.background = healthGrey;
		}
		if(u2 == true){
		powerBtn.normal.background = powerSelected;
		}
		else{
		powerBtn.normal.background = powerGrey;
		}
		if(u3 == true){
		incomeBtn.normal.background = incomeSelected;
		}
		else{
		incomeBtn.normal.background = incomeGrey;
		}
		if(u4 == true){
		health2Btn.normal.background = healthSelected;
		}
		else{
		health2Btn.normal.background = healthGrey;
		}
		if(u5 == true){
		rangeBtn.normal.background = rangeSelected;
		}
		else{
		rangeBtn.normal.background = rangeGrey;
		}
		if(u6 == true){
		maxIncomeBtn.normal.background = maxIncomeSelected;
		}
		else{
		maxIncomeBtn.normal.background = maxIncomeGrey;
		}
		if(u7 == true){
		titanHvyArmorBtn.normal.background = titanHvyArmorSelected;
		}
		else{
		titanHvyArmorBtn.normal.background = titanHvyArmorGrey;
		}
		if(u8 == true){
		marineHvyDmgBtn.normal.background = marineHvyDmgSelected;
		}
		else{
		marineHvyDmgBtn.normal.background = marineHvyDmgGrey;
		}
		if(u9 == true){
		bountyBtn.normal.background = bountySelected;
		}
		else{
		bountyBtn.normal.background = bountyGrey;
		}
		if(u10 == true){
		additionalDefenseBtn.normal.background = additionalDefenseSelected;
		}
		else{
		additionalDefenseBtn.normal.background = additionalDefenseGrey;
		}
		
		//Tier1 Upgrades
		
			if (GUI.Button (new Rect (wide/14.25, tall/4.91 ,wide/13 ,tall/8 ),"", healthBtn )){
			upgradeChosen = 1;
			allocateBtn.active.background = allocateBtnUsedTexture;
			allocateBtn.normal.background = allocateBtnTexture;
			}
			if (GUI.Button (new Rect (wide/3.93, tall/5.02 ,wide/13 ,tall/8 ),"", powerBtn )){
			upgradeChosen = 2;
			allocateBtn.active.background = allocateBtnUsedTexture;
			allocateBtn.normal.background = allocateBtnTexture;
			}
			if (GUI.Button (new Rect (wide/2.25, tall/5.02 ,wide/13 ,tall/8 ),"", incomeBtn )){
			upgradeChosen = 3;
			allocateBtn.active.background = allocateBtnUsedTexture;
			allocateBtn.normal.background = allocateBtnTexture;
			}
			//Tier2 Upgrades
			if (GUI.Button (new Rect (wide/14.2, tall/2.52 ,wide/13 ,tall/8 ),"", health2Btn )){
			upgradeChosen = 4;
				if(u1 == false){
				allocateBtn.active.background = allocateBtnGreyTexture;
				allocateBtn.normal.background = allocateBtnGreyTexture;
				}
				else{
				allocateBtn.active.background = allocateBtnUsedTexture;
				allocateBtn.normal.background = allocateBtnTexture;
				}
				
				
				
			}
			if (GUI.Button (new Rect (wide/3.93, tall/2.535 ,wide/13 ,tall/8 ),"", rangeBtn )){
			upgradeChosen = 5;
				if(u2 == false){
				allocateBtn.active.background = allocateBtnGreyTexture;
				allocateBtn.normal.background = allocateBtnGreyTexture;
				}
				else{
				allocateBtn.active.background = allocateBtnUsedTexture;
				allocateBtn.normal.background = allocateBtnTexture;
				}
				
			}
			if (GUI.Button (new Rect (wide/2.25, tall/2.535 ,wide/13 ,tall/8 ),"", maxIncomeBtn )){				
			upgradeChosen = 6;
				if(u3 == false){
				allocateBtn.active.background = allocateBtnGreyTexture;
				allocateBtn.normal.background = allocateBtnGreyTexture;
				}
				else{
				allocateBtn.active.background = allocateBtnUsedTexture;
				allocateBtn.normal.background = allocateBtnTexture;
				}
				
			}
			//Tier3 Upgrades
			if (GUI.Button (new Rect (wide/14.25, tall/1.72 ,wide/13 ,tall/8 ),"", titanHvyArmorBtn )){				
			upgradeChosen = 7;
				if(u4 == false){
				allocateBtn.active.background = allocateBtnGreyTexture;
				allocateBtn.normal.background = allocateBtnGreyTexture;
				}
				else{
				allocateBtn.active.background = allocateBtnUsedTexture;
				allocateBtn.normal.background = allocateBtnTexture;
				}
			}
			if (GUI.Button (new Rect (wide/3.88, tall/1.72 ,wide/13 ,tall/8 ),"", marineHvyDmgBtn )){				
			upgradeChosen = 8;
				if(u5 == false){
				allocateBtn.active.background = allocateBtnGreyTexture;
				allocateBtn.normal.background = allocateBtnGreyTexture;
				}
				else{
				allocateBtn.active.background = allocateBtnUsedTexture;
				allocateBtn.normal.background = allocateBtnTexture;
				}
			}
			if (GUI.Button (new Rect (wide/2.25, tall/1.74 ,wide/13 ,tall/8 ),"", bountyBtn )){				
			upgradeChosen = 9;
				if(u6 == false){
				allocateBtn.active.background = allocateBtnGreyTexture;
				allocateBtn.normal.background = allocateBtnGreyTexture;
				}
				else{
				allocateBtn.active.background = allocateBtnUsedTexture;
				allocateBtn.normal.background = allocateBtnTexture;
				}
			}
			//Final Upgrade
			if (GUI.Button (new Rect (wide/4.28, tall/1.338 ,wide/8 ,tall/5.1 ),"", additionalDefenseBtn )){				
			upgradeChosen = 10;
				if(u7 == false && u8 == false && u9 == false){
				allocateBtn.active.background = allocateBtnGreyTexture;
				allocateBtn.normal.background = allocateBtnGreyTexture;
				}
				else{
				allocateBtn.active.background = allocateBtnUsedTexture;
				allocateBtn.normal.background = allocateBtnTexture;
				}	
			}
		//Assign the chosen upgrade
		if(upgradePoints > 0){
			if (GUI.Button (new Rect (  wide/1.5, tall/1.55 , wide/4, (.12)*tall),"", allocateBtn )){
				if(upgradeChosen == 1 && u1 == false){
				PlayerPrefs.SetInt("health", 1);
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
				u1 = true;
				}
				else if(upgradeChosen == 2 && u2 == false){
				PlayerPrefs.SetInt("power", 1);
				//Debug.Log("Power Chosen");
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
				u2 = true;
				}
				else if(upgradeChosen == 3 && u3 == false){
				PlayerPrefs.SetInt("income", 1);
				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
				u3 = true;
				}
				else if(upgradeChosen == 4 && u4 == false){
					if(u1 == true){
					PlayerPrefs.SetInt("health2", 1);
					PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
					u4 = true;
					}
				}
		
				else if(upgradeChosen == 5 && u5 == false){
					if(u2 == true){
					PlayerPrefs.SetInt("range", 1);
					PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
					u5 = true;
					}
				}
				else if(upgradeChosen == 6&& u6 == false){
					if(u3 == true){
					PlayerPrefs.SetInt("maxIncome", 1);
					PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
					u6 = true;
					}
				}
				else if(upgradeChosen == 7 && u7 == false){
					if(u4 == true){
					PlayerPrefs.SetInt("titanHvyArmor", 1);
					PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
					u7 = true;
					}
				}
				else if(upgradeChosen == 8 && u8 == false){
					if(u5 == true){
					PlayerPrefs.SetInt("marineHvyDmg", 1);
					PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
					u8 = true;
					}
				}
				else if(upgradeChosen == 9&& u9 == false){
					if(u6 == true){
					PlayerPrefs.SetInt("bounty", 1);
					PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
					u9 = true;
					}
				}
				else if(upgradeChosen == 10 && u10 == false){
					if(u7 == true || u8 == true || u9 == true){
					PlayerPrefs.SetInt("additionalDefense", 1);
					PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
					upgradePoints = upgradePoints - 1;
					u10 = true;
					}
				}
//				PlayerPrefs.SetInt("upgradePoints", PlayerPrefs.GetInt("upgradePoints") -1);
//				upgradePoints = upgradePoints - 1;	
			}
		}
	}
		
	//Back Button
	if (GUI.Button (new Rect (  wide-(wide*.28), tall-(tall/6) , (.25)*wide, (.13)*tall),"", backBtn )){
		introMessageOn = false;
		if(upgradeTree == true){
		upgradeChosen = 0;
		showBorder = true;
		upgradeTree = false;
		
		
		}
		else{
			allBGsButLoadingOff = true;
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
		bgstyle.normal.background = bgLoading;
		bgstyle.active.background = bgLoading;
		Application.LoadLevel("MainMenu");
		}
		
	}
	
		//Intro Message to be displayed if a new game has started AND button to get rid of it
		//Bonsu Path text blocks will be added here and use similar styles/ and button/textplatelabel placements
	if(PlayerPrefs.GetInt("level1") == 0 && PlayerPrefs.GetInt("level6") == 0 && introMessageOn == true){
		print("INTOR MESSAGE IS UP");
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", styleIntroMessage);
		
		if(GUI.Button (new Rect( (wide/2.34), (tall/1.48) - (tall/7), wide/8, tall/10), "", styleOkButton)){
			
			introMessageOn = false;
			showBorder = true;
			levelSelected = true;
			textStyle.normal.background = selectLevelText;
			textStyle.active.background = selectLevelText;
		
		}
	
	}
	//Path 1 Alien Bonus Label Code
	if(PlayerPrefs.GetFloat("path1Alien") == 1 && PlayerPrefs.GetFloat("path1Shown") !=1){
	
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", stylePath1Alien);
		
		if(Input.GetMouseButtonDown(0)){
			PlayerPrefs.SetFloat("path1Shown",1);
			showBorder = true;
			levelSelected = true;
			textStyle.normal.background = selectLevelText;
			textStyle.active.background = selectLevelText;
			introMessageOn = false;
		}
			
	
	}
		//Path 1 Human Bonus Label Code
	if(PlayerPrefs.GetFloat("path1Human") == 1 && PlayerPrefs.GetFloat("path1Shown") !=1){
	
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", stylePath1Human);
		
		if(Input.GetMouseButtonDown(0)){
			PlayerPrefs.SetFloat("path1Shown",1);
			showBorder = true;
			levelSelected = true;
			textStyle.normal.background = selectLevelText;
			textStyle.active.background = selectLevelText;
			introMessageOn = false;
		}
			
	
	}
			//Path 2 Bonus Label Code
	if(PlayerPrefs.GetFloat("path2") == 1 && PlayerPrefs.GetFloat("path2Shown") !=1){
	
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", stylePath2);
		
		if(Input.GetMouseButtonDown(0)){
			PlayerPrefs.SetFloat("path2Shown",1);
			showBorder = true;
			levelSelected = true;
			textStyle.normal.background = selectLevelText;
			textStyle.active.background = selectLevelText;
			introMessageOn = false;
		}
			
	
	}
	//Path 3 Bonus Label Code
	if(PlayerPrefs.GetFloat("path3") == 1 && PlayerPrefs.GetFloat("path3Shown") !=1){
	
		GUI.Label (new Rect( (wide/5.5), (tall/5), wide/1.6, tall/2.2), "", stylePath3);
		
		if(Input.GetMouseButtonDown(0)){
			PlayerPrefs.SetFloat("path3Shown",1);
			showBorder = true;
			levelSelected = true;
			textStyle.normal.background = selectLevelText;
			textStyle.active.background = selectLevelText;
			introMessageOn = false;
		}
			
	
	}
	
	
	
	GUI.Label (Rect (0, 0, wide, tall), "",bgstyle3);
	
	
	
//END ON GUI	
}