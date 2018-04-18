#pragma strict
var delayTime:float;
var repeatTimes:float;

function Start () {
	//audio.Play();
	
	
	
	for(var i:int=0;i<repeatTimes;i++){
		yield WaitForSeconds(delayTime);
		GetComponent.<AudioSource>().Play();
	}
	
	yield WaitForSeconds(delayTime);
	
	Destroy(this.gameObject);
	
}

function Update () {

}