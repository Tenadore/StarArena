#pragma strict

function Start () {

}

function Update () {

this.GetComponent.<Renderer>().enabled = Mathf.Repeat (Time.time * 10.0, 1.0) < 0.5;


}