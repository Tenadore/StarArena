#pragma strict


var distance : float;
var pinchSpeed : float;
var lastDist : Vector2;
var curDist : Vector2;
var distance2 : float = -1.5;
var xPos : boolean;
var yPos : boolean;
var panSpeed : float = 1.65;
var zoomSpeed : float = 1;
var touchDelta : float = 0.0;
var difX : float;
var difY : float;
//var tempLock : boolean = false;
//var delay : float = .1;
//var timeLast : float;
var tempCamSpeed : float = 1;
var panelOut : boolean = false;



//FOV Lerp Vars
var startPosition : Vector3;
var targetPosition : Vector3;
var startRotation : Quaternion;
var targetRotation : Quaternion;

var atDefault : boolean = true;
var lerpTimer : float;

var speed : float = 1;

var lerpingTo : boolean = false;
var lerpingFrom : boolean = false;
var cameraBtnStyle : UnityEngine.GUIStyle;
var cambtn_Top_UP : UnityEngine.Texture2D;
var cambtn_Top_P : UnityEngine.Texture2D;
var cambtn_Btm_UP : UnityEngine.Texture2D;
var cambtn_Btm_P : UnityEngine.Texture2D;

//Vars to be dynamically calculated
var xmax : float;
var xmin : float;
var zmax :float;
var zmin :float;

//Camera Lock variables
var isPanning : boolean = false;
var isZooming : boolean = false;
var lockPan : boolean = false;
var lockZoom : boolean = false;
var lockZoomOut : boolean = false;
var lockZoomIn : boolean = false;
var isZoomingOut : boolean = false;
var isZoomingIn : boolean = false;

var maxY : float;
var minY : float;

function Start () {

	lerpTimer =2;
	startPosition = this.transform.position;
	startRotation = this.transform.rotation;
	
	tempCamSpeed = .75;
	
	cameraBtnStyle.active.background = cambtn_Top_P;
	cameraBtnStyle.normal.background = cambtn_Top_UP;

}



function FixedUpdate(){


	

	//Moves the camera assuming it isn't locked
	//if(lockPan == false){
	   if (Input.GetKey(KeyCode.UpArrow)){
	   	isPanning = true;
	   	Debug.Log("up pressed");
	   	this.transform.Translate(0 , tempCamSpeed  , 0);
	   
	   }
	   if (Input.GetKey(KeyCode.DownArrow)){
	   	isPanning = true;
	   	Debug.Log("up pressed");
	   	this.transform.Translate(0 , -tempCamSpeed  , 0);
	   
	   }
	   if (Input.GetKey(KeyCode.LeftArrow)){
	     isPanning = true;
	   	Debug.Log("up pressed");
	   	this.transform.Translate(-tempCamSpeed  , 0 , 0);
	   
	   }
	   if (Input.GetKey(KeyCode.RightArrow)){
	     isPanning = true;
	   	Debug.Log("up pressed");
	   	this.transform.Translate(tempCamSpeed  , 0 , 0);
	   
	   }
	//  }
	  if(lockZoom == false){
	   if (Input.GetKey(KeyCode.Keypad0)){
	     isZooming = true;
	   	Debug.Log("up pressed");
	   	this.transform.Translate(0  , 0 , -tempCamSpeed);
	   
	   }
	   if (Input.GetKey(KeyCode.Keypad1)){
	     isZooming = true;
	   	Debug.Log("up pressed");
	   	this.transform.Translate(0  , 0 , tempCamSpeed);
	   
	   }
	  }
	  
	   
	   if(!Input.GetKey(KeyCode.UpArrow) &&  !Input.GetKey(KeyCode.DownArrow) && !Input.GetKey(KeyCode.RightArrow) && !Input.GetKey(KeyCode.LeftArrow)){
	   
	   	isPanning = false;
	   
	   }
   	   if(!Input.GetKey(KeyCode.Keypad0) && !Input.GetKey(KeyCode.Keypad1)){
   	   //	isZooming = false;
   	   }
   
	
}

function Update () {
	
	//Makes sure nothing is locked when zooming or panning stops
	if(isPanning == false){
		lockPan = false;	
	}
	if(isZooming == false){
		lockZoom = false;
		lockZoomIn = false;
		lockZoomOut=false;
		isZoomingOut=false;
		isZoomingIn=false;
	}


	//FOV Lerp Functionality
	lerpTimer = lerpTimer + Time.deltaTime;
	
	if((lerpTimer * speed) > 1){
		lerpingTo = false;
		lerpingFrom = false;
	}

	if(lerpingTo == true && (lerpTimer * speed) < 1){
		//print("I SHOULD BE LERPING TO");
		this.transform.position = Vector3.Lerp(startPosition, Vector3(78.0,68.0,0.0) , lerpTimer * speed);
		this.transform.rotation = Quaternion.Lerp(startRotation, Quaternion.Euler(40.0,270.0,0.0) , lerpTimer* speed);
	
	}
	
	if(lerpingFrom == true && (lerpTimer * speed) < 1){
		//print("I SHOULD BE LERPING FROM");
		this.transform.position = Vector3.Lerp(startPosition, Vector3(40.0,104.0,0.0) , lerpTimer* speed);
		this.transform.rotation = Quaternion.Lerp(startRotation, Quaternion.Euler(70.0,270.0,0.0) , lerpTimer * speed);
	
	}
	
	
	
	
	//Dynamically calculates max and min bound for X and Z based on cam position
	////These are just equations I solved by finding a min and max variable for X and Z based on Y's min and max (all of which i found manually), 
	////therefore creating linear equations which i can use to generate dynamic max's and min's
	////It was a lot harder than you probably think 
	////If we are to add more FOVS in the future, a new set of 4 equations will be required for each one
	
	if(atDefault == true){
		maxY = 145;
		minY = 45;
		//Equations for 'default' top down FOV
		xmax = 39.4 + (0.28*this.transform.position.y);
		xmin = -40.25 + (0.45*this.transform.position.y);
		zmax = 69.85 + (-0.33*this.transform.position.y);
		zmin= -101.6 + (0.48*this.transform.position.y);
	}
	else{
		maxY = 71;
		minY = 40;
		//Equations for new perspective FOV
		xmax = 72.90322581 + (0.6774193548*this.transform.position.y);
		xmin =-59.51612903 + (1.612903226*this.transform.position.y);
		zmax = 131.9354839 + (-1.548387097*this.transform.position.y);
		zmin = -131.9354839 + (1.548387097*this.transform.position.y);
	
	}
	
	
	//CameraBounds enforcement (not applied when camera is swapping FOVs or "lerping"), also not applied if panning or zooming is locked
	
	//start keeper stuff
	
		if(lerpingTo==false && lerpingFrom ==false){
			
			if(atDefault==true){
				if(this.transform.position.x > xmax){
					lockPan = true;
					//lockZoom = true;
					this.transform.position.x=xmax;
				}
				if(this.transform.position.x<xmin){
					lockPan = true;
					//lockZoom = true;
					this.transform.position.x = xmin;
				}
				
				
				if(this.transform.position.y>145){
					//lockPan = true;
					lockZoomOut = true;
					this.transform.position.y = 145;
				}
				
				if(this.transform.position.y<45){
					//lockPan = true;
					lockZoomIn = true;
					this.transform.position.y = 45;
				}
				
				
				
				if(this.transform.position.z>zmax){
					lockPan = true;
					//lockZoom = true;
					this.transform.position.z = zmax;
				}
				if(this.transform.position.z<zmin){
					lockPan = true;
					//lockZoom = true;
					this.transform.position.z = zmin;
				}
			
				
					
			}
			else{
				if(this.transform.position.x > xmax){
					this.transform.position.x=xmax;
				}
				if(this.transform.position.x<xmin){
					this.transform.position.x = xmin;
				}
				if(this.transform.position.y>71){
					lockZoomOut = true;
					this.transform.position.y = 71;
					
				}
				if(this.transform.position.y<40){
					lockZoomIn = true;
					this.transform.position.y = 40;
					
				}
				if(this.transform.position.z>zmax){
					this.transform.position.z = zmax;
				}
				if(this.transform.position.z<zmin){
					this.transform.position.z = zmin;
				}			
							
			
			}
		}
	//end keeper stuff





if (Input.touchCount > 1){
	isZooming = true;
}
else{
	isZooming = false;
}
   

 //&& lockZoom == false

if (Input.touchCount > 1 && (Input.GetTouch(0).phase == TouchPhase.Moved || Input.GetTouch(1).phase == TouchPhase.Moved) ) 

	    {
			
	        //Two finger touch does pinch to zoom
	
	        var touch1 = Input.GetTouch(0);
	
	        var touch2 = Input.GetTouch(1);
	
	       // curDist = Vector2.Distance(touch1.position, touch2.position);
	        curDist = Input.GetTouch(0).position - Input.GetTouch(1).position;
	        lastDist = ((Input.GetTouch(0).position - Input.GetTouch(0).deltaPosition) - (Input.GetTouch(1).position - Input.GetTouch(1).deltaPosition));
	        touchDelta = (curDist.magnitude - lastDist.magnitude);
	                   
	            lastDist = curDist;
	            
	            if(((touchDelta/2)*zoomSpeed)>0 && lockZoomIn == false){
	            	lockZoomOut=false;
	            	isZoomingOut = true;
	            	isZoomingIn=false;
	            	this.transform.Translate(0 , 0  , (touchDelta/2)*zoomSpeed);
	            }
	            else if(((touchDelta/2)*zoomSpeed)<0 && lockZoomOut == false){
	            	lockZoomIn=false;
	            	isZoomingOut = false;
	            	isZoomingIn=true;
	            	this.transform.Translate(0 , 0  , (touchDelta/2)*zoomSpeed);
	            }
	            
//	              if(this.transform.position.y >= 40 && this.transform.position.y <= 170 )
//	            {
	            	//**
	            	//this.transform.Translate(0 , 0  , (touchDelta/2)*zoomSpeed);
	            	
	            	
//	            }
//	       	   else if (touchDelta < 0 && this.transform.position.y < 40)
//	            {
//	            	this.transform.position.y = 40.1;
//	            }
//	        	else if ( touchDelta > 0 && this.transform.position.y > 170)
//	            {
//	            	this.transform.position.y = 169.9;
//	            }
	         	        
	      }
 //if statement to turn off isZoomingvar
 	      
 	           
        
        
        //One finger drag to pan
if (Input.touchCount == 1 && (Input.GetTouch(0).phase == TouchPhase.Began))
        {
        var touchBegin = Input.GetTouch(0);
        }
        
        
        
if (Input.touchCount == 1 && (Input.GetTouch(0).phase == TouchPhase.Moved))
        {
        isPanning = true;
        var touchEnd = Input.GetTouch(0);
        
        var difference : Vector2 = touchBegin.deltaPosition - touchEnd.deltaPosition;
        
        var delta : Vector2 = touchEnd.position;
        
        
        //makes sure difference in swipes remains positive for use in camera translation
		if(difference.x < 0)
		{
		difX  = difference.x*-1;
		}
		else
		{
		difX = difference.x;
		}
		
		if(difference.y < 0)
		{
		difY  = difference.y*-1;
		}
		else
		{
		difY = difference.y;
		}
        
        
        
        
	        if (touchEnd.deltaPosition.x > 0)
	        {
	        	xPos = true;
	        	touchEnd = Input.GetTouch(0);
	        }
	        else
	        {
	        	xPos = false; 
	            touchEnd = Input.GetTouch(0);   
	        }
	        
	        if (touchEnd.deltaPosition.y > 0)
	         {
	        	yPos = true;
	        	touchEnd = Input.GetTouch(0);
	        }
	        else
	        {
	        	yPos = false; 
	         	touchEnd = Input.GetTouch(0);       
	        }
        
        
        
        	if (xPos == true)
        	{
        	
        	this.transform.Translate(-difX*panSpeed*Time.deltaTime,0,0);   
        	}
        	else
        	{
        	this.transform.Translate(difX*panSpeed*Time.deltaTime,0,0);
        	}
        
        
        
        	if (yPos == true)
        	{
        	
        	this.transform.Translate(0 , -difY*panSpeed*Time.deltaTime,0);
        	}
        	else
        	{
        	this.transform.Translate(0, difY*panSpeed*Time.deltaTime,0);
        	}
        
        
        
        
        
        
        
        
        
        }
        
 		if (Input.touchCount == 1 && (Input.GetTouch(0).phase == TouchPhase.Ended)){
 			isPanning=false;
 		}       
        


}

function OnGUI(){

	var wide = Screen.width;
	var tall = Screen.height;
	
		//Lerp button
	if(panelOut == false){
		if (GUI.Button (new Rect (wide-(wide/4.5) , tall-(tall/4.5), tall/4.75, tall/4.75),"",cameraBtnStyle))  {
			if((lerpTimer * speed) > 1){
				if(atDefault == false){
					atDefault = true;
					startPosition = this.transform.position;
					startRotation = this.transform.rotation;
					lerpTimer = 0;
					lerpingFrom = true;
					cameraBtnStyle.active.background = cambtn_Top_P;
					cameraBtnStyle.normal.background = cambtn_Top_UP;
				}
				else if(atDefault == true){
					atDefault = false;
					startPosition = this.transform.position;
					startRotation = this.transform.rotation;
					lerpTimer = 0;
					lerpingTo = true;
					cameraBtnStyle.active.background = cambtn_Btm_P;
					cameraBtnStyle.normal.background = cambtn_Btm_UP;
				}
			}
				
		
		}
	}


}

function PanelSwap(){

	if (panelOut==false){
		panelOut=true;
	}
	else if (panelOut == true){
		panelOut=false;
	}

}