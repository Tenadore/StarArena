#pragma strict

var drudgeRed : UnityEngine.GameObject;
var drudgeBlue : UnityEngine.GameObject;

var secondx : float = 0;
var randomZ : int;
var addOrSubtractZ : int;

var levelPlaying : int = 0;
var xAxisRed : float;
var xAxisBlue : float;
var spawnMinX : int;
var spawnMaxX : int;
var unitSpawnPositionZ : float;
var aiUnitSpawnPositionZ : float;


var isLevel1 : boolean;
var isLevel2 : boolean;
var isLevel3 : boolean;
var isLevel4 : boolean;
var isLevel5 : boolean;
var isLevel6 : boolean;
var isLevel7 : boolean;
var isLevel8 : boolean;
var multiPlayer : boolean;

function Start () {
if(GameObject.Find("LevelOne")){
	isLevel1 = true;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	}else if(GameObject.Find("LevelTwo")){
	isLevel1 = false;
	isLevel2 = true;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	}else if(GameObject.Find("LevelThree")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = true;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = 13.8;
	spawnMaxX = 26;
	unitSpawnPositionZ = -53.7;
	aiUnitSpawnPositionZ = 35.6;
	}else if(GameObject.Find("LevelFour")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = true;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	}else if(GameObject.Find("LevelFive")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = true;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = -5;
	spawnMaxX = 5;
	}else if(GameObject.Find("LevelSix")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = true;
	isLevel7 = false;
	isLevel8 = false;
	spawnMinX = 13.8;
	spawnMaxX = 26;
	unitSpawnPositionZ = -53.7;
	aiUnitSpawnPositionZ = 35.6;
	}else if(GameObject.Find("LevelSeven")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = true;
	isLevel8 = false;
	spawnMinX = 13.8;
	spawnMaxX = 26;
	}else if(GameObject.Find("LevelEight")){
	isLevel1 = false;
	isLevel2 = false;
	isLevel3 = false;
	isLevel4 = false;
	isLevel5 = false;
	isLevel6 = false;
	isLevel7 = false;
	isLevel8 = true;
	spawnMinX = 5;
	spawnMaxX = 8.5;
	}
	secondx = 0;
	
	if(isLevel1 || isLevel4){
	unitSpawnPositionZ = -36.5;
	aiUnitSpawnPositionZ = 36.5;
	}
	else if(isLevel2 || isLevel5 ){
	unitSpawnPositionZ = -52;
	aiUnitSpawnPositionZ = 35.5;
	}
	else if(isLevel7){
	unitSpawnPositionZ = -55;
	aiUnitSpawnPositionZ = 32.5;
	}
	
		if(!GameObject.Find("SinglePlayer")){			
			if(this.transform.tag == "red"){
			xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
			Network.Instantiate(drudgeRed, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation,0);
			}else if(this.transform.tag == "blue"){
			xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
			Network.Instantiate(drudgeBlue, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation,0);
			}
		multiPlayer = true;
		}else{
			if(this.transform.tag == "red"){
			xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
			Instantiate(drudgeRed, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation);
			}else if(this.transform.tag == "blue"){
			xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
			Instantiate(drudgeBlue, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation);
			}
		multiPlayer = false;
		}
				
				
	
	
}

function Update () {

	secondx = Time.deltaTime + secondx;
	if(secondx >= 3){
		if(multiPlayer == true){
			if(this.transform.tag == "red"){
				xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
				Instantiate(drudgeRed, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation);
			}
			else if(this.transform.tag == "blue"){
				if(isLevel1 == true){					
				xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
				Instantiate(drudgeBlue, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation);
				}
			}	
		}else if(multiPlayer == false){
			if(this.transform.tag == "red"){
				xAxisRed = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
				Instantiate(drudgeRed, Vector3(xAxisRed, 0, unitSpawnPositionZ), transform.rotation);
			}
			else if(this.transform.tag == "blue"){
				if(isLevel1 == true){					
				xAxisBlue = UnityEngine.Random.Range(spawnMinX, spawnMaxX);
				Instantiate(drudgeBlue, Vector3(xAxisBlue, 0, aiUnitSpawnPositionZ), transform.rotation);
				}
			}
	
		}
	secondx = 0;	
	}
	

}