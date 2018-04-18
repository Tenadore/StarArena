#pragma strict


//Variables for .5 second delay
var delay : float = .5;
var nextfire : float;
var timer : boolean = false;
//Variables for unit
var speed : float = 10;
var health : float = 10;
var pwr : float = 4;
var range : float = 8;
var other : Collider;
var enemy : boolean = false;
var timeofhit : float;
var timeofwin : float;
var counter : float = 0;
var blood : GameObject;
var maxHealth : float = 10;
var allChildren : Transform;
var dead : boolean = false;
//Variables for sound
var shoot : AudioClip;
var hasPlayed: boolean = false; 
var death1 : AudioClip;
//Variables for score
var guiManager : GameObject;
var pointsOnDeath : int = 50;
//Variables for money bonus
var deathBonus : int = 5;


function Start()


{
	nextfire = Time.time + delay;

	var allChildren = gameObject.GetComponentsInChildren(Transform);
			for (var child : Transform in allChildren) 
			{
    		//Do whatever with child transform here
    			if (child.name == "muzzleflash") 
    				{
    				child.GetComponent.<Renderer>().enabled = false;
       				}
       		}
}


function Update ()


{
	timer = false;
	//Run FindClosestEnemy Function
	FindClosestEnemy();
	
	//Shows raycast that allows units to move around other units
	Debug.DrawLine(this.transform.position, (this.transform.position + Vector3(0,0,-3)), Color.red);
	//Creates a Raycast
	var hit: RaycastHit;
		if (Physics.Raycast (this.transform.position, transform.TransformDirection(Vector3(0,0,-1)), hit, 3) )
			{
	        Debug.Log ("There is something in front of the object!");	        
	        if (this.transform.position.x < -.1)
	        	{
	        	this.transform.rotation = Quaternion.Euler(0, -125, 0);
	        	}
	        else if ( this.transform.position.x > .1)
	        	{
	        	this.transform.rotation = Quaternion.Euler(0, 125, 0);
	          	}
	        }
	if (health < .1 && dead == false)
		{
		dead = true;
		GetComponent.<AudioSource>().Stop();
		//Runs the Die Function
		Die();
		this.transform.tag = "dead";
		}
	if((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) <= range && dead == false)
   		{
   		enemy = true;
   		if (hasPlayed == false)
	   		{ 
	   		GetComponent.<AudioSource>().clip = shoot;
	   		GetComponent.<AudioSource>().Play();
	   		hasPlayed = true;
			} 
    	this.transform.Translate(0,0,0);
		GetComponent.<Animation>().wrapMode = WrapMode.Once;
		this.GetComponent.<Animation>().Play("shoot", PlayMode.StopAll);
		//Animates muzzle flash 
		var allChildren = gameObject.GetComponentsInChildren(Transform);
		for (var child : Transform in allChildren)
			{
    		// Do something with child transform here
    		if (child.name == "muzzleflash") 
    			{
    			child.GetComponent.<Renderer>().enabled = Mathf.Repeat (Time.time * 10.0, 1.0) < 0.5;
    			}
    		//Looks at target
    		this.transform.LookAt(2*this.transform.position - FindClosestEnemy().transform.position);
    		}
    	}
    	else if((Vector3.Distance(FindClosestEnemy().transform.position , this.transform.position)) > range && dead == false)
    	{
    	hasPlayed = false;
    	GetComponent.<AudioSource>().Stop();
    	var allChildren2= gameObject.GetComponentsInChildren(Transform);
		for (var child : Transform in allChildren2)
			{
    		//Do something with child transform here
    		if (child.name == "muzzleflash") 
    			{
    			child.GetComponent.<Renderer>().enabled = false;
    			}
    		}
    		enemy = false;
    		this.GetComponent.<Animation>().Play("run");
			this.transform.Translate(0,0, -speed*Time.deltaTime);
    		this.transform.rotation = Quaternion.Euler(0, 0, 0);	
    	}
		if (Time.time > nextfire)
			{
    		nextfire = Time.time + delay;
    		timer = true;
			}
		if(timer == true && enemy==true)
			{
			//Needs to be changed to GetComponent
			FindClosestEnemy().SendMessage("Applydmg", pwr);
			}
}


//Find the name of the closest enemy
function FindClosestEnemy () : GameObject 


{
	//Find all game objects with tag Enemy
    var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("red"); 
    var closest : GameObject; 
    var distance = Mathf.Infinity; 
    var position = transform.position; 
    //Iterate through them and find the closest one
    for (var go : GameObject in gos) 
    	{ 
        var curDistance = Vector3.Distance(go.transform.position , this.transform.position); 
        if (curDistance < distance) 
        	{ 
            closest = go; 
            distance = curDistance; 
        	} 
    	} 
    return closest;
}	


function Applydmg (dmg : float)


{
	health = health - dmg;
	//Change Health Orb Color
	var orb = this.transform.Find("healthorb");
	if( (health / maxHealth) >= .7)
		{
		orb.GetComponent.<Renderer>().material.color = Color.green; 
		}
	else if( (health / maxHealth) < .7 && (health / maxHealth) >.3)
		{
		orb.GetComponent.<Renderer>().material.color = Color.yellow; 
		}
	else if( (health/ maxHealth) < .3)
		{
		orb.GetComponent.<Renderer>().material.color = Color.red; 
		}
}


//Everything that occurs when the unit dies
function Die()


{
	GetComponent.<AudioSource>().clip = death1;
	GetComponent.<AudioSource>().Play();
	//Gets components from other scripts
	guiManager.GetComponent(GameGUI_Manager);
	GameGUI_Manager.ScoreBlue(pointsOnDeath);  
	GameGUI_Manager.BlueBonus(deathBonus);
	var allChildren = gameObject.GetComponentsInChildren(Transform);
	for (var child : Transform in allChildren)
		{
    		//Do something with child transform here
    		if (child.name == "muzzleflash") 
    			{
    			child.GetComponent.<Renderer>().enabled = false;
    			}
    	}
    	Instantiate(blood, this.transform.position, this.transform.rotation);
		Network.Instantiate(blood, this.transform.position, this.transform.rotation,1);
		var orb = this.transform.Find("healthorb");
		orb.GetComponent.<Renderer>().material.color = Color.black;
		this.GetComponent.<Animation>().Play("die",PlayMode.StopAll);
		yield WaitForSeconds (.5);
		transform.Translate (Vector3.up * 10000);
		yield WaitForFixedUpdate();
		Destroy(this.gameObject);
}