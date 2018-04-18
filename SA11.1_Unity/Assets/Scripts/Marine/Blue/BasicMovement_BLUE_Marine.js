#pragma strict
var speed : float = 10;
var health : float = 10;
var pwr : float = 4;
var maxHealth : float = 10;
var materials : Material[];

function Start(){
}
function Update () {
	if(health < 1){
		Die();
	}
}
function Applydmg (dmg : float)
{
health = health - dmg;
var orb = this.transform.Find("healthorb");
	if( (health / maxHealth) >= .7){
		orb.GetComponent.<Renderer>().material.color = Color.green; 
	}else if( (health / maxHealth) < .7 && (health / maxHealth) >.3 ){
		orb.GetComponent.<Renderer>().material.color = Color.yellow; 
	}else if( (health/ maxHealth) < .3){
		orb.GetComponent.<Renderer>().material.color = Color.red; 
	}
}
function Die(){
	var orb = this.transform.Find("healthorb");
	orb.GetComponent.<Renderer>().material.color = Color.black;
	this.GetComponent.<Animation>().Play("die",PlayMode.StopAll);
	yield WaitForSeconds (.5);
	transform.Translate (Vector3.up * 10000);
	yield WaitForFixedUpdate();
	Destroy(this.gameObject);
}