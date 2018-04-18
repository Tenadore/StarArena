#pragma strict
static var maxHealthx : float = 800;

function Start () {

}

function Update () {

}

static function BaseHealthRed (healthx : float) {
	
	Debug.Log("Working");
		var orb = GameObject.Find("BaseLife_HBar");
		orb.transform.localScale.x = ((healthx/maxHealthx)*.5);
		if( (healthx / maxHealthx) >=  .67){
		orb.GetComponent.<Renderer>().material.color = Color.green; 
		}
		else if( (healthx / maxHealthx) < .67 && (healthx / maxHealthx) > .33){
		orb.GetComponent.<Renderer>().material.color = Color.yellow; 
		}
		else if( (healthx / maxHealthx) <= .33){
		orb.GetComponent.<Renderer>().material.color = Color.red;
		}
		
}
static function BaseHealthBlue (healthz : float){
		
		var orb2 = GameObject.Find("BaseLife_HBar2");
		orb2.transform.localScale.x = ((healthz/maxHealthx)*.5);
		if( (healthz / maxHealthx) >=  .67){
		orb2.GetComponent.<Renderer>().material.color = Color.green; 
		}
		else if( (healthz / maxHealthx) < .67 && (healthz / maxHealthx) > .33){
		orb2.GetComponent.<Renderer>().material.color = Color.yellow; 
		}
		else if( (healthz / maxHealthx) <= .33){
		orb2.GetComponent.<Renderer>().material.color = Color.red;
		}
	

}

static function BaseHealthBlue2 (healthz : float){
		
		var orb2 = GameObject.Find("BaseLife_HBar3");
		orb2.transform.localScale.x = ((healthz/maxHealthx)*.5);
		if( (healthz / maxHealthx) >=  .67){
		orb2.GetComponent.<Renderer>().material.color = Color.green; 
		}
		else if( (healthz / maxHealthx) < .67 && (healthz / maxHealthx) > .33){
		orb2.GetComponent.<Renderer>().material.color = Color.yellow; 
		}
		else if( (healthz / maxHealthx) <= .33){
		orb2.GetComponent.<Renderer>().material.color = Color.red;
		}
	

}




