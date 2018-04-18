#pragma strict


var arrowUp : boolean = true;
var upRight : GameObject;
var downRight : GameObject;
var singlePlayer : boolean;
var isMultiPlayer : boolean;
var lvl8UpLeft : UnityEngine.GameObject;
var lvl8DownLeft : UnityEngine.GameObject;
var isLevel2 : boolean;
var isLevel5 : boolean;
var isLevel8 : boolean;

function Start () {

	if(GameObject.Find("LevelTwo")){
	isLevel2 = true;
	isLevel5 = false;
	isLevel8 = false;
		Network.Destroy(GameObject.Find("UpRight(Clone)"));
		Network.Destroy(GameObject.Find("UpRight"));
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
	//GameObject.Find("ArrowUpDown_P1(Clone)").renderer.material.color.a = 0.5;
	


}

function Update () {

	
//this.transform.position = Vector3( 0, 7,-30 );
//this.transform.localScale = Vector3(100,100,100);


var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
var hit : RaycastHit;

if(Input.GetMouseButtonDown(0)){

	if (Physics.Raycast(ray, hit, 5000) ){
		//Debug.Log("RAYCAST RETURNING HIT"+ hit.transform.name);
		if(hit.transform.tag == "arrow2" && arrowUp == true){
			hit.transform.GetComponent.<Animation>().Play("downtoup");
			arrowUp=false;
			if(isMultiPlayer == true){
				Network.Instantiate(upRight, upRight.transform.position, upRight.transform.rotation,0);
				Network.Destroy(GameObject.Find("DownRight(Clone)"));
				Network.Destroy(GameObject.Find("DownRight"));
				
			}
		//Debug.Log("ARROW RETURNING HIT" + hit.transform.name);
		}
		else if(hit.transform.tag == "arrow2" && arrowUp == false){
			hit.transform.GetComponent.<Animation>().Play("uptodown");
			arrowUp=true;
			
			if(isMultiPlayer == true){
				Network.Instantiate(downRight, downRight.transform.position, downRight.transform.rotation, 0);
				Network.Destroy(GameObject.Find("UpRight(Clone)"));
				Network.Destroy(GameObject.Find("UpRight"));
				
			}
		//Debug.Log("ARROW RETURNING HIT"+ hit.transform.name);
		}
	}

}
}





