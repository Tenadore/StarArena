#pragma strict

var humanBaseRed : UnityEngine.GameObject;
var alienBaseRed : UnityEngine.GameObject;
var humanBaseBlue : UnityEngine.GameObject;
var alienBaseBlue : UnityEngine.GameObject;
var baseSpawnServer : GameObject;
var baseSpawnClient : GameObject;
var baseHealthRed : UnityEngine.GameObject;
var baseHealthBlue : UnityEngine.GameObject;
var healthRedSpawn : GameObject;
var healthBlueSpawn : GameObject;
var isLevel1 : boolean;
var isLevel2 : boolean;
var isLevel3 : boolean;
var isLevel4 : boolean;
var isLevel5 : boolean;
var isLevel6 : boolean;
var isLevel7 : boolean;
var isLevel8 : boolean;
var level8RedBase : UnityEngine.GameObject;
var level8RedHealth : UnityEngine.GameObject;

function Start () {


	//DestroyArrayRaces();
	Network.Destroy(GameObject.Find("Alien_Base_Blue"));
	Network.Destroy(GameObject.Find("Alien_Base_Red"));	
	Network.Destroy(GameObject.Find("Human_Base_Blue"));
	Network.Destroy(GameObject.Find("Human_Base_Red"));
	Network.Destroy(GameObject.Find("Alien_Base_Blue(Clone)"));
	Network.Destroy(GameObject.Find("Alien_Base_Red(Clone)"));	
	Network.Destroy(GameObject.Find("Human_Base_Blue(Clone)"));
	Network.Destroy(GameObject.Find("Human_Base_Red(Clone)"));
	Destroy(GameObject.Find("Alien_Base_Blue"));
	Destroy(GameObject.Find("Alien_Base_Red"));	
	Destroy(GameObject.Find("Human_Base_Blue"));
	Destroy(GameObject.Find("Human_Base_Red"));
	Destroy(GameObject.Find("Alien_Base_Blue(Clone)"));
	Destroy(GameObject.Find("Alien_Base_Red(Clone)"));	
	Destroy(GameObject.Find("Human_Base_Blue(Clone)"));
	Destroy(GameObject.Find("Human_Base_Red(Clone)"));

	if(GameObject.Find("LevelOne")){
	isLevel1 = true;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	}if(GameObject.Find("LevelTwo")){
	isLevel1 = false;
	isLevel2 = true;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	}if(GameObject.Find("LevelThree")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = true;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	}if(GameObject.Find("LevelFour")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = true;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	}if(GameObject.Find("LevelFive")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = true;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	}if(GameObject.Find("LevelSix")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = true;
	isLevel7 = false;
	isLevel8 = false;
	}if(GameObject.Find("LevelSeven")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = true;
	isLevel8 = false;
	}if(GameObject.Find("LevelEight")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = true;
	}
	if(Network.connections.Length>0){
		GetComponent.<NetworkView>().RPC("BasePlace", RPCMode.All);
	}
	BasePlaceSingle();
}
// function DestroyArrayRaces(){
	
// 	var races : GameObject[];
//     races =  GameObject.FindGameObjectsWithTag ("race");
 
//     for(var i = 0 ; i < races.length ; i ++){
//         Destroy(races[i]);
//         Network.Destroy(races[i]);
//     }
   
// }
function Update () {

}

@RPC
function BasePlace(){

	
	
	if(isLevel1 || isLevel4){
		if(Network.isServer && GameObject.Find("HumanServer")){
			Network.Instantiate(humanBaseRed, baseSpawnServer.transform.position, baseSpawnServer.transform.rotation, 0);
			Network.Instantiate(baseHealthRed, healthRedSpawn.transform.position, healthRedSpawn.transform.rotation,0);
		}
		if(Network.isServer && GameObject.Find("AlienServer")){
			Network.Instantiate(alienBaseRed, baseSpawnServer.transform.position, baseSpawnServer.transform.rotation, 0);
			Network.Instantiate(baseHealthRed, healthRedSpawn.transform.position, healthRedSpawn.transform.rotation,0);
		}
		if(Network.isClient && GameObject.Find("HumanClient")){
			Network.Instantiate(humanBaseBlue, baseSpawnClient.transform.position, Quaternion.Euler(0,180,0), 0);
			Network.Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation,0);
		}
		if(Network.isClient && GameObject.Find("AlienClient")){
			Network.Instantiate(alienBaseBlue, baseSpawnClient.transform.position, Quaternion.Euler(0,180,0), 0);
			Network.Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation,0);
		}
	}
	else if(isLevel2 || isLevel5){
		if(Network.isServer && GameObject.Find("HumanServer")){
			Network.Instantiate(humanBaseRed,  Vector3(0,0,-59), baseSpawnServer.transform.rotation, 0);
			Network.Instantiate(baseHealthRed, Vector3(0, 9.5, -66.3), healthRedSpawn.transform.rotation,0);
		}
		if(Network.isServer && GameObject.Find("AlienServer")){
			Network.Instantiate(alienBaseRed, Vector3(0,0,-59), baseSpawnServer.transform.rotation, 0);
			Network.Instantiate(baseHealthRed, Vector3(0, 9.5, -66.3), healthRedSpawn.transform.rotation,0);
		}
		if(Network.isClient && GameObject.Find("HumanClient")){
			Network.Instantiate(humanBaseBlue, baseSpawnClient.transform.position, Quaternion.Euler(0,180,0), 0);
			Network.Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation,0);
		}
		if(Network.isClient && GameObject.Find("AlienClient")){
			Network.Instantiate(alienBaseBlue, baseSpawnClient.transform.position, Quaternion.Euler(0,180,0), 0);
			Network.Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation,0);
		}
	
	}
	else if(isLevel3 || isLevel6 || isLevel7){
		if(Network.isServer && GameObject.Find("HumanServer")){
			Network.Instantiate(humanBaseRed,  Vector3(19.8199,0,-60), baseSpawnServer.transform.rotation, 0);
			Network.Instantiate(baseHealthRed, Vector3(19.8199, 9.5, -68.4), healthRedSpawn.transform.rotation,0);
		}
		if(Network.isServer && GameObject.Find("AlienServer")){
			Network.Instantiate(alienBaseRed, Vector3(19.8199,0,-60), baseSpawnServer.transform.rotation, 0);
			Network.Instantiate(baseHealthRed, Vector3(19.8199, 9.5, -68.4), healthRedSpawn.transform.rotation,0);
		}
		if(Network.isClient && GameObject.Find("HumanClient")){
			Network.Instantiate(humanBaseBlue, Vector3(19.8199,0,baseSpawnClient.transform.position.z), Quaternion.Euler(0,180,0), 0);
			Network.Instantiate(baseHealthBlue, Vector3(19.8199,9.5,50), healthBlueSpawn.transform.rotation,0);
		}
		if(Network.isClient && GameObject.Find("AlienClient")){
			Network.Instantiate(alienBaseBlue, Vector3(19.8199,0,baseSpawnClient.transform.position.z), Quaternion.Euler(0,180,0), 0);
			Network.Instantiate(baseHealthBlue, Vector3(19.8199,9.5,50), healthBlueSpawn.transform.rotation,0);
	}
	
	}
}

function BasePlaceSingle(){

	
	if(isLevel1 || isLevel4){
		if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("Tutorial") || GameObject.Find("HumanSingle")){
			Instantiate(humanBaseRed, baseSpawnServer.transform.position, baseSpawnServer.transform.rotation);
			Instantiate(baseHealthRed, healthRedSpawn.transform.position, healthRedSpawn.transform.rotation);
		}
		if(GameObject.Find("AlienSingle(Clone)") || GameObject.Find("AlienSingle")){
			Instantiate(alienBaseRed, baseSpawnServer.transform.position, baseSpawnServer.transform.rotation);
			Instantiate(baseHealthRed, healthRedSpawn.transform.position, healthRedSpawn.transform.rotation);
		}
		if(GameObject.Find("HumanAI(Clone)") || GameObject.Find("HumanAI")){
			Instantiate(humanBaseBlue, baseSpawnClient.transform.position, Quaternion.Euler(0,180,0));
			Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation);
		}
		if(GameObject.Find("AlienAI(Clone)") || GameObject.Find("AlienAI")){
			Instantiate(alienBaseBlue, baseSpawnClient.transform.position, Quaternion.Euler(0,180,0));
			Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation);
		}
	}
	else if(isLevel2 || isLevel5){
		if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("Tutorial") || GameObject.Find("HumanSingle")){
			Instantiate(humanBaseRed, Vector3(0,0,-59), baseSpawnServer.transform.rotation);
			Instantiate(baseHealthRed, Vector3(0, 9.5, -66.3), healthRedSpawn.transform.rotation);
		}
		if(GameObject.Find("AlienSingle(Clone)")  || GameObject.Find("AlienSingle")){
			Instantiate(alienBaseRed, Vector3(0,0,-59), baseSpawnServer.transform.rotation);
			Instantiate(baseHealthRed, Vector3(0, 9.5, -66.3), healthRedSpawn.transform.rotation);
		}
		if(GameObject.Find("HumanAI(Clone)") || GameObject.Find("HumanAI")){
			Instantiate(humanBaseBlue, Vector3(0,0,42), Quaternion.Euler(0,180,0));
			Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation);
		}
		if(GameObject.Find("AlienAI(Clone)") || GameObject.Find("AlienAI")){
			Instantiate(alienBaseBlue, Vector3(0,0,42), Quaternion.Euler(0,180,0));
			Instantiate(baseHealthBlue, healthBlueSpawn.transform.position, healthBlueSpawn.transform.rotation);
		}
	}
	else if(isLevel3 || isLevel6 || isLevel7){
		if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("Tutorial") || GameObject.Find("HumanSingle")){
			Instantiate(humanBaseRed, Vector3(19.8199,0,-60), baseSpawnServer.transform.rotation);
			Instantiate(baseHealthRed, Vector3(19.8199, 9.5, -68.4), healthRedSpawn.transform.rotation);
		}
		if(GameObject.Find("AlienSingle(Clone)")  || GameObject.Find("AlienSingle")){
			Instantiate(alienBaseRed, Vector3(19.8199,0,-60), baseSpawnServer.transform.rotation);
			Instantiate(baseHealthRed, Vector3(19.8199, 9.5, -68.4), healthRedSpawn.transform.rotation);
		}
		if(GameObject.Find("HumanAI(Clone)") || GameObject.Find("HumanAI")){
			Instantiate(humanBaseBlue, Vector3(19.8199,0,baseSpawnClient.transform.position.z), Quaternion.Euler(0,180,0));
			Instantiate(baseHealthBlue, Vector3(19.8199,9.5,50), healthBlueSpawn.transform.rotation);
		}
		if(GameObject.Find("AlienAI(Clone)") || GameObject.Find("AlienAI")){
			Instantiate(alienBaseBlue, Vector3(19.8199,0,baseSpawnClient.transform.position.z), Quaternion.Euler(0,180,0));
			Instantiate(baseHealthBlue, Vector3(19.8199,9.5,50), healthBlueSpawn.transform.rotation);
		}
	}
	else if(isLevel8){
		if(GameObject.Find("HumanSingle(Clone)") || GameObject.Find("Tutorial") || GameObject.Find("HumanSingle")){
			Instantiate(level8RedBase, level8RedBase.transform.position, level8RedBase.transform.rotation);
			Instantiate(level8RedHealth, level8RedHealth.transform.position, level8RedHealth.transform.rotation);
		}
		if(GameObject.Find("AlienSingle(Clone)")  || GameObject.Find("AlienSingle")){
			Instantiate(alienBaseRed, level8RedBase.transform.position, level8RedBase.transform.rotation);
			Instantiate(baseHealthRed, level8RedHealth.transform.position, level8RedHealth.transform.rotation);
		}
	}
}