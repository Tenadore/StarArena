#pragma strict

function Start () {

	if(GameObject.Find("RedMarine(Clone)")){
	Destroy(GameObject.Find("RedMarine(Clone)"));
	Destroy();
	}
	if(GameObject.Find("RedStriker(Clone)")){
	Destroy(GameObject.Find("RedStriker(Clone)"));
	Destroy();
	}

}

function Update () {
		
}

function Destroy(){

	yield WaitForSeconds(1);
	Destroy(this.gameObject);

}