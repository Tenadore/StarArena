#pragma strict


var arrowUp : boolean = true;
var upLeft : GameObject;

var singlePlayer : boolean;
var isMultiPlayer : boolean;
function Start () {


	if(GameObject.Find("MultiPlayer")){
	
		isMultiPlayer = true;
	
	}else{
		isMultiPlayer = false;
	}



}

function Update () {

//this.transform.position = Vector3( 0, 7,-30 );
//this.transform.localScale = Vector3(100,100,100);


var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
var hit : RaycastHit;

if(Input.GetMouseButtonDown(0)){

	if (Physics.Raycast(ray, hit, 5000) ){
	
		Debug.Log("RAYCAST RETURNING HIT"+ hit.transform.name);
		if(hit.transform.tag == "arrow3" && arrowUp == true){
			hit.transform.GetComponent.<Animation>().Play("hortovert");
			arrowUp=false;
			if(isMultiPlayer == false){
				Instantiate(upLeft, Vector3(17.893, -2.197629, -33.1669), upLeft.transform.rotation);
				
				
			}
			else if(isMultiPlayer == true){
				Network.Instantiate(upLeft, Vector3(17.893, -2.197629, -33.1669), upLeft.transform.rotation ,0);
				
				
			}
		//Debug.Log("ARROW RETURNING HIT" + hit.transform.name);
		}
		else if(hit.transform.tag == "arrow3" && arrowUp == false){
			hit.transform.GetComponent.<Animation>().Play("verttohor");
			arrowUp=true;
			if(isMultiPlayer == false){
				
				Destroy(GameObject.Find("UpLeftLevel3(Clone)"));
				Destroy(GameObject.Find("UpLeftLevel3"));
			}
			else if(isMultiPlayer == true){
			
				Network.Destroy(GameObject.Find("UpLeftLevel3"));
				Network.Destroy(GameObject.Find("UpLeftLevel3(Clone)"));
			}
		Debug.Log("ARROW RETURNING HIT"+ hit.transform.name);
		}
	}

}
}





