#pragma strict

var sound1 : AudioClip;
var sound2 : AudioClip;
var sound3 : AudioClip;
var sound4 : AudioClip;
var sound : int;

function Start () {

	sound = (UnityEngine.Random.Range(1, 5));
	
	if(sound == 1){
		GetComponent.<AudioSource>().clip = sound1;
		GetComponent.<AudioSource>().Play();
	}
	else if(sound == 2){
		GetComponent.<AudioSource>().clip = sound2;
		GetComponent.<AudioSource>().Play();
	}
	else if(sound==3){
		GetComponent.<AudioSource>().clip = sound3;
		GetComponent.<AudioSource>().Play();
	}
	else if(sound==4){
		GetComponent.<AudioSource>().clip = sound4;
		GetComponent.<AudioSource>().Play();
	}
	else{
		GetComponent.<AudioSource>().clip = sound1;
		GetComponent.<AudioSource>().Play();
	}


}

function Update () {

}