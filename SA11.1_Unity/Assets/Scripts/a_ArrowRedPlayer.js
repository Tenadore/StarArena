#pragma strict


var arrowUp : boolean = true;
var upLeft : GameObject;
var downLeft : GameObject;
var singlePlayer : boolean;
var isMultiPlayer : boolean;
var lvl8UpLeft : UnityEngine.GameObject;
var lvl8DownLeft : UnityEngine.GameObject;
var isLevel2 : boolean;
var isLevel5 : boolean;
var isLevel8 : boolean;
var arrow : UnityEngine.GameObject;
var isTutorial : boolean;
var upTutorial : GameObject;

function Start () {

	if(GameObject.Find("LevelTwo")){
	isLevel2 = true;
	isLevel5 = false;
	isLevel8 = false;
	}else if(GameObject.Find("LevelFive")){
	isLevel2 = false;
	isLevel5 = true;
	isLevel8 = false;
	}else if(GameObject.Find("LevelEight")){
	isLevel2 = false;
	isLevel5 = false;
	isLevel8 = true;
	}
	if(GameObject.Find("MultiPlayer")){
	
		isMultiPlayer = true;
	
	}else{
		isMultiPlayer = false;
	}
	if(GameObject.Find("Tutorial")){
		isTutorial = true;
	}
	else{
		isTutorial = false;
	}
	//GameObject.Find("ArrowUpDown_P1(Clone)").renderer.material.color.a = 0.5;
	


}

function Update () {

	
//this.transform.position = Vector3( 0, 7,-30 );
//this.transform.localScale = Vector3(100,100,100);


var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
var hit : RaycastHit;

if(Input.GetMouseButtonDown(0)){

	if (Physics.Raycast(ray, hit, 5000) ){
//		Debug.Log("RAYCAST RETURNING HIT"+ hit.transform.name);
		if(hit.transform.tag == "arrow" && arrowUp == true){
			hit.transform.GetComponent.<Animation>().Play("downtoup");
			arrowUp=false;
			if(isMultiPlayer == false && isTutorial == false){
				if(isLevel2 || isLevel5){
					
				Instantiate(upLeft, upLeft.transform.position, upLeft.transform.rotation);
				Destroy(GameObject.Find("DownLeft(Clone)"));
				Destroy(GameObject.Find("DownLeft"));
					
				}else if(isLevel8){
				Instantiate(lvl8UpLeft, lvl8UpLeft.transform.position, lvl8UpLeft.transform.rotation);
				Destroy(GameObject.Find("Lvl8DownLeft(Clone)"));
				Destroy(GameObject.Find("Lvl8DownLeft"));
				}
				
			}
			else if(isMultiPlayer == true && isTutorial == false){
				Network.Instantiate(upLeft, upLeft.transform.position, upLeft.transform.rotation,0);
				Network.Destroy(GameObject.Find("DownLeft(Clone)"));
				Network.Destroy(GameObject.Find("DownLeft"));
				
			}
			else if(isMultiPlayer == false && isTutorial == true){
				Instantiate(upTutorial, upTutorial.transform.position, upTutorial.transform.rotation);
			}
		//Debug.Log("ARROW RETURNING HIT" + hit.transform.name);
		}
		else if(hit.transform.tag == "arrow" && arrowUp == false){
			hit.transform.GetComponent.<Animation>().Play("uptodown");
			arrowUp=true;
			if(isMultiPlayer == false && isTutorial == false){
				if(isLevel2 || isLevel5){
				Instantiate(downLeft, downLeft.transform.position, downLeft.transform.rotation);
				Destroy(GameObject.Find("UpLeft(Clone)"));
				Destroy(GameObject.Find("UpLeft"));
				}else if(isLevel8){
				Instantiate(lvl8DownLeft, lvl8DownLeft.transform.position, lvl8DownLeft.transform.rotation);
				Destroy(GameObject.Find("Lvl8UpLeft(Clone)"));
				Destroy(GameObject.Find("Lvl8UpLeft"));
				}
				
			}
			else if(isMultiPlayer == true && isTutorial == false){
				Network.Instantiate(downLeft, downLeft.transform.position, downLeft.transform.rotation, 0);
				Network.Destroy(GameObject.Find("UpLeft(Clone)"));
				Network.Destroy(GameObject.Find("UpLeft"));
				
			}
			else if(isMultiPlayer == false && isTutorial == true){
				Destroy(GameObject.Find("Up(Clone)"));
				Destroy(GameObject.Find("Up"));
			}
		//Debug.Log("ARROW RETURNING HIT"+ hit.transform.name);
		}
	}

}
}







