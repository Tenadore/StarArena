#pragma strict



var speed : float = 10;
var health : float = 10;
var pwr : float = 0;
var range : float = 20;


function Update () {

//	var hit : RaycastHit; 
//	var here = this.transform.position;
//
//
//		if(Physics.SphereCast(here, 10, this.transform.forward, hit, -5))
//	{
//	
//		//Checks if object hit is an enemy
//		if( hit.transform.tag == "blue")
//		
//			{
//			//If hit is an enemy, stop moving and change behavior
//			Debug.DrawLine (this.transform.position, hit.point, Color.white);
//			this.transform.Translate(0,0,0);
//			animation.wrapMode = WrapMode.Once;
//			this.animation.Play("shoot");
//			gameObject.Find(hit.transform.name).SendMessage("Applydmg", pwr);
//			
//			}
//			
//	}
//	else
//	{
//		//Continue running if no enemy is detected
//		//animation.wrapMode = WrapMode.Once;
//		this.animation.Play("run");
//		this.transform.Translate(0,0, -speed*Time.deltaTime);
//	
//	}

//this.animation.Play("run");
//this.transform.Translate(0,0, -speed*Time.deltaTime);



   var objectsInRange : Collider[] = Physics.OverlapSphere(this.transform.position, range);
   
   
   
    for (var col : Collider in objectsInRange)
    {
        //var enemy = col.transform.tag;
        if (col.transform.tag == "blue")
        {
        	Debug.DrawLine (this.transform.position, col.transform.position, Color.red);
//            // linear falloff of effect
//            var proximity : float = (this.transform.position - col.transform.position).magnitude;
//            var effect : float = 1 - (proximity / range);
	
			this.transform.Translate(0,0,0);
			GetComponent.<Animation>().wrapMode = WrapMode.Once;
			this.GetComponent.<Animation>().Play("shoot");
			gameObject.Find(col.transform.name).SendMessage("Applydmg", pwr);
            
        }
        
     
        
    }



	
	
	
	
	
	
	
	if(health <= 0)
	{
	
	Die();
	
	}

	
}





 




















function Applydmg (dmg : float)
{

health = health - dmg;
yield WaitForSeconds (1);

}





function Die(){

this.GetComponent.<Animation>().Play("die",PlayMode.StopAll);
yield WaitForSeconds (.5);
Destroy(this.gameObject);



}






















//	//basic Raycasting determines object's movement
//	if( Physics.Raycast (this.transform.position, this.transform.TransformDirection(Vector3.one), hit, 20))
//	{
//	
//		//Debug.DrawLine (this.transform.position, this.transform.TransformDirection(Vector3.one), Color.red);
//		//Debug.DrawLine (this.transform.position, hit.point, Color.white);
//	
//		if( hit.transform.tag == "blue")
//		
//		{
//		Debug.DrawLine (this.transform.position, hit.point, Color.white);
//		this.transform.Translate(0,0,0);
//		
//		//this.transform.LookAt(hit.transform.localPosition);
//		this.animation.Play("shoot");
//		
//		
//		}
//	
//		this.animation.Play("run");
//		this.transform.Translate(0,0, -speed*Time.deltaTime);
//	
//	
//	}
//
//	else
//	{
//		this.animation.Play("run");
//		this.transform.Translate(0,0, -speed*Time.deltaTime);
//	}





