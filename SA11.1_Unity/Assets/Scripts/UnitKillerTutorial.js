#pragma strict


var destroy : float;
function Start () {

	
}

function Update () {

	destroy = Time.deltaTime + destroy;
	

	if(GameObject.Find("RedMarine(Clone)")){
		if(destroy >= 6){
		Destroy(GameObject.Find("RedMarine(Clone)"));
		Destroy(this.gameObject);
		}
	}
	else{
	destroy = 1;
	}

}