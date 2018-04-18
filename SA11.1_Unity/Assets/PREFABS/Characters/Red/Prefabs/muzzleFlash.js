#pragma strict

function Start () {

	if(PlayerPrefs.GetInt("high") == 0){
	Destroy(this.gameObject);
	}
}

function Update () {

}