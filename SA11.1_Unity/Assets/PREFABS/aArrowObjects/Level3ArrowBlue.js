
var singlePlayer : boolean;
var arrowUp : boolean = true;
var upRight : GameObject;

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
		//Debug.Log("RAYCAST RETURNING HIT"+ hit.transform.name);
		if(hit.transform.tag == "arrow4" && arrowUp == false){
			hit.transform.GetComponent.<Animation>().Play("verttohor");
			arrowUp=true;
			
			
			if(isMultiPlayer == true){
				if(!GameObject.Find("UpRightLevel3(Clone)") && !GameObject.Find("UpRightLevel3")){
				Network.Instantiate(upRight, upRight.transform.position, upRight.transform.rotation, 0);
				}
			}
		//Debug.Log("ARROW RETURNING HIT" + hit.transform.name);
		}
		else if(hit.transform.tag == "arrow4" && arrowUp == true){
			hit.transform.GetComponent.<Animation>().Play("hortovert");
			arrowUp=false;
		
			
			if(isMultiPlayer == true){
			Network.Destroy(GameObject.Find("UpRightLevel3"));
			Network.Destroy(GameObject.Find("UpRightLevel3(Clone)"));
			
			
			
			}
		//Debug.Log("ARROW RETURNING HIT"+ hit.transform.name);
		}
	}

}
}




