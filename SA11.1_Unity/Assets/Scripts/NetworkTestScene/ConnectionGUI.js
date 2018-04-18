
//Variables for Selecting the Server
var refreshing : boolean;
private var hostData:HostData[];
var serverNameField : String = "Name Your Game";
//Variables for amount of players besides Host allowed in game
var maxPlayers : int = 100;
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
//Variables for refresh timer
var updateTimer : float;
//Variables for Choosing race
var raceHumanServer : boolean;
var raceAlienServer : boolean;
var raceHumanClient : boolean;
var raceAlienClient : boolean;
var labelRaceServer : String;
var labelRaceClient : String;
var setClientTrue : boolean = false;
var raceChosen : boolean = false;
var clientReady : boolean = false;
var setClientReady : boolean = false;


function Start(){

}


function Update () {

	//Refresh games every second
	updateTimer = Time.deltaTime + updateTimer;
	if(updateTimer >= 1){
	updateTimer = 0;
	}
	if(updateTimer == 0){
	RefreshHostList();
	Debug.Log("Auto Refresh");
	}		
	//Sets the Screen to fit the Device
	scrnH = Screen.height;
	scrnW = Screen.width;
	btnX = Screen.width;
	btnY = Screen.height;
	btnW = Screen.width;
	btnH = Screen.height;
	
//------------------------Stop refreshing if a game is found ---------------------//
	
	if(refreshing == true){
    	if(MasterServer.PollHostList().Length > 0){
    	refreshing = false;
    	Debug.Log(MasterServer.PollHostList().Length);
   	 	hostData = MasterServer.PollHostList();
    	}
  	}	
  	
//-------------------------------------------------------------------------------//

}


function OnGUI (){

	//Labels to tell you what level and race you have chosen
	GUI.Label(Rect(15, 170, 100, 30), labelLevel);
	GUI.Label(Rect(15, 170, 100, 30), labelRaceClient);
	GUI.Label(Rect(125, 170, 100, 30), labelRaceServer);
	
	
	//Show the Host Game and Refresh Buttons
	if(!Network.isClient && !Network.isServer && setClientTrue == false){
        if(GUI.Button(Rect(10, 10, 100, 30), "Host Server")){
        Debug.Log("Host Server");
        StartServer();
        }
        if(GUI.Button(Rect(10, 50, 100, 30), "Join Game")){
        Debug.Log("Joining");
        setClientTrue = true;
        } 
        

        serverNameField = GUI.TextField (Rect (10, 120, 250, 25), serverNameField, 25);
   	} 
   	//Displays list of servers. Connects to the chosen one
	 if(setClientTrue == true){
	        if(hostData  && MasterServer.PollHostList().Length != 0){
	        	for(var i:int = 0; i<hostData.length; i++){
	            	if(GUI.Button(Rect(300, scrnH / 2 * (btnH * i), 250, 20), hostData[i].gameName + " | " + hostData[i].connectedPlayers + "/" + hostData[i].playerLimit)){
	              	Network.Connect(hostData[i]);
	              	setClientTrue = false;
					}
	             }
	        }
	        if(GUI.Button(Rect(10, 10, 100, 30), "Refresh")){
	        RefreshHostList();
	        }
	 }         
    //Puts you back to the main menu
    if(GUI.Button(Rect(10, scrnH / 1.05, 200, 30), "Main Menu")){
    Debug.Log("Main Menu");
    Application.LoadLevel(0);
    Network.Disconnect();
    }
    //Allows Host to Choose race and select level.
	if(Network.isServer){
		if(GUI.Button(Rect(10, 10, 100, 30), "Level 1")){
		Debug.Log("Loading Level 1");
		levelChosen = "Level1";
		labelLevel = "LEVEL 1";
		}
		if(GUI.Button(Rect(10, 50, 100, 30), "Level 2")){
		Debug.Log("Loading Level 2");
		levelChosen = "Level2";
		labelLevel = "LEVEL 2";
		}
		if(GUI.Button(Rect(10, 90, 100, 30), "Level 3")){
		Debug.Log("Loading Level 3");
		levelChosen = "Level 3";
		labelLevel = "LEVEL 3";
		}
		if(GUI.Button(Rect(120, 10, 100, 30), "Humans")){
		Debug.Log("You are the Humans");
		labelRaceServer = "HUMANS";
		raceHumanServer = true;
		raceAlienServer = false;
		}
		if(GUI.Button(Rect(120, 50, 100, 30), "Aliens")){
		Debug.Log("You are the Aliens");
		labelRaceServer = "ALIENS";
		raceAlienServer = true;
		raceHumanServer = false;
		}		
		if(setClientReady == false){
	    GUI.Label(Rect(10, 250, 150, 30), "Waiting for Players");
	    }
	    if(Network.connections.Length > 0){
	    GUI.Label(Rect(10, 200, 150, 30), "Player Connected");
	    }
		//Start the game
		if(setClientReady == true){
			if(GUI.Button(Rect(10, 250, 150, 30), "Start Game")){
				if(Network.connections.Length > 0){
					if(raceChosen == true){
					GetComponent.<NetworkView>().RPC("LoadLevel", RPCMode.AllBuffered, levelChosen , 0);
					}
				}
	    	}
	    }
	    
	    	
    }
    	//Allows client to select race
	    if(Network.isClient){
	    	if(GUI.Button(Rect(10, 10, 100, 30), "Humans")){
			Debug.Log("You are the Humans");
			labelRaceClient = "HUMANS";
			raceHumanClient = true;
			raceAlienClient = false;
			GetComponent.<NetworkView>().RPC("ChooseRace", RPCMode.All);
			}
			if(GUI.Button(Rect(10, 50, 100, 30), "Aliens")){
			Debug.Log("You are the Aliens");
			labelRaceClient = "ALIENS";
			raceAlienClient = true;
			raceHumanClient = false;
			GetComponent.<NetworkView>().RPC("ChooseRace", RPCMode.All);
			}
			clientReady = GUI.Toggle (Rect (200,20,130,20), clientReady, "Ready");
				if(clientReady == true){
				GetComponent.<NetworkView>().RPC("Ready", RPCMode.All);
				}
				if(clientReady == false){
				GetComponent.<NetworkView>().RPC("NotReady", RPCMode.All);
				}
	    }
        
}

@RPC
function Ready(){


	setClientReady = true;
	
	
}

@RPC
function NotReady(){

	setClientReady = false;
	
}

@RPC
function LoadLevel (levelx : String, x : int){

	//Allow choosen race to load into the next scene
	DontDestroyOnLoad(GameObject.Find("MultiPlayer"));
	if(Network.isServer && raceHumanServer == true){
	DontDestroyOnLoad(GameObject.Find("HumanServer"));
	}
	if(Network.isServer && raceAlienServer == true){
	DontDestroyOnLoad(GameObject.Find("AlienServer"));
	}
	if(Network.isClient && raceHumanClient == true){
	DontDestroyOnLoad(GameObject.Find("HumanClient"));
	}
	if(Network.isClient && raceAlienClient == true){
	DontDestroyOnLoad(GameObject.Find("AlienClient"));
	}	
	//Load the level
	Application.LoadLevel(levelx);
}

@RPC
function ChooseRace(){


	raceChosen = true;
	
}


//Host the Server so clients can join
function StartServer (){
		
        Network.InitializeServer(maxPlayers, 25001, !Network.HavePublicAddress);
        MasterServer.RegisterHost("Star_Arena", serverNameField);    
}
    
//Refresh games when refresh button is clicked    
function RefreshHostList (){

        MasterServer.RequestHostList("Star_Arena");
        refreshing = true;
}

//Remove player if disconnected
function OnPlayerDisconnected(player: NetworkPlayer){

        Debug.Log("Clean up after player " +  player);
        Network.RemoveRPCs(player);
        Network.DestroyPlayerObjects(player);

}

