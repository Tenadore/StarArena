#pragma strict

function Start ()
{
    this.GetComponent.<Animation>().wrapMode = WrapMode.Loop;
    this.GetComponent.<Animation>().Play("run");
    if(this.transform.name.Contains("Titan")){
    	for(var state : AnimationState in GetComponent.<Animation>()){
		state.speed = 0.8;
		}
	}
}

function Update () {

}
