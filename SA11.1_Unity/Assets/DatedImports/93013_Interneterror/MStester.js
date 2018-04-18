#pragma strict

function Start () {
MasterServer.ipAddress = "98.254.77.170";
MasterServer.port = 23466;
Network.natFacilitatorIP = "98.254.77.170";
Network.natFacilitatorPort = 50005;
Network.Connect("98.254.77.170",23466);
}

function Update () {

}

function OnFailedToConnectToMasterServer(info :	NetworkConnectionError) {
		print("Could not connect to master server: "+ info);
		//failedToConnectMS = true;	
		//We can also use this function to automatically attempt reconnects to ko's master server upon failures
	
	}