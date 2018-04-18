using UnityEngine;
using System.Collections;

public class ShotBrain : MonoBehaviour 
{
	Transform cachedTras;
	Transform targetTras;
	Transform locnarTrans;
	float speed;
	
	//==================================================================================================
	public void Awake()
	{
		locnarTrans = transform.Find ("Locnar");
#if UNITY_3_5
		gameObject.active = false;
		locnarTrans.gameObject.active = false;
#else
		gameObject.SetActive(false);
#endif		
	}
	
	//==================================================================================================
	public void OnTriggerEnter ()
	{
		Vector3 viewpoint = Camera.main.WorldToViewportPoint ( cachedTras.position );
#if UNITY_3_5
		gameObject.active = false;
		locnarTrans.gameObject.active = false;
#else
		gameObject.SetActive(false);
#endif		

		DemoMain.PlaySFX(6);

		DemoMain.StartShieldHit ( 1, 2, viewpoint.x, viewpoint.y );
	}

	//==================================================================================================
	public void Shoot ( Vector3 istartpos, Vector3 idir, Transform itargetTrans, float ispeed )
	{
		
#if UNITY_3_5
		gameObject.active = true;
		locnarTrans.gameObject.active = true;
#else
		gameObject.SetActive(true);
#endif		

		cachedTras = transform;
		cachedTras.position = istartpos;
		cachedTras.rotation = Quaternion.LookRotation ( idir );

		targetTras = itargetTrans;

		speed = ispeed;

	}
	
	//==================================================================================================
	void Update ()
	{
		Quaternion rot;

		cachedTras.Translate ( Vector3.forward * Time.deltaTime * speed );

		rot = Quaternion.LookRotation ( targetTras.position - cachedTras.position );

		cachedTras.rotation = Quaternion.Slerp ( cachedTras.rotation, rot, Time.deltaTime * 0.5f );
		
		locnarTrans.Rotate ( new Vector3 ( Time.deltaTime * 138.2f, Time.deltaTime * 17.8f, Time.deltaTime * 18.0f ) ); 
	}
}
