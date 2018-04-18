using UnityEngine;
using System.Collections;

#if UNITY_ANDROID

public class DownloadObbExample : MonoBehaviour {
	public Texture2D background;
	public GUIStyle exitstyle;
	public GUIStyle downloadstyle;
	public GUIStyle messagelabelstyle;
	public GUIStyle backgroundstyle;
	public Texture2D loadingbg;
	public bool loading = false;
	
	void OnGUI()
	{
		float high = Screen.height;
		float wide = Screen.width;
		GUI.Label(new Rect(0,0,wide,high),"", backgroundstyle);
		

		
//		GUI.Label(new Rect(Screen.width/4, Screen.height/(3.3f), Screen.width/(2f), Screen.height/6), "", messagelabelstyle);
//		
//		if (GUI.Button(new Rect(Screen.width/3, Screen.height/2, Screen.width/(3.5f), Screen.height/8), "", downloadstyle)){
//			
//		}
		
		
		
		
		
		
		
		
		if (!GooglePlayDownloader.RunningOnAndroid())
		{
			GUI.Label(new Rect(10, 10, Screen.width-10, 20), "Use GooglePlayDownloader only on Android device!");
			return;
		}
		
		
		
		string expPath = GooglePlayDownloader.GetExpansionFilePath();
		if (expPath == null)
		{
				GUI.Label(new Rect(10, 10, Screen.width-10, 20), "External storage is not available!");
		}
		else
		{
			string mainPath = GooglePlayDownloader.GetMainOBBPath(expPath);
			
			
			//GUI.Label(new Rect(10, 10, Screen.width-10, 20), "Main = ..."  + ( mainPath == null ? " NOT AVAILABLE" :  mainPath.Substring(expPath.Length)));
			if (mainPath == null){
				GUI.Label(new Rect(Screen.width/4, Screen.height/(3.3f), Screen.width/(2f), Screen.height/6), "", messagelabelstyle);
				if (GUI.Button(new Rect(Screen.width/3, Screen.height/2, Screen.width/(3.5f), Screen.height/8), "", downloadstyle)){
					GooglePlayDownloader.FetchOBB();
				}
			}
			else{
				
				LoadMainMenu();
				
//				if (GUI.Button(new Rect(Screen.width/3, Screen.height/2, Screen.width/(3.5f), Screen.height/8), "", exitstyle)){
//					Application.LoadLevel("MainMenu");
//					Application.Quit();	
//				}
//				if (GUI.Button(new Rect(10, 250, 100, 100), "LoadGame")){
//					Application.LoadLevel(1);
//				}
			}
			
		}

	}
	
	
	void LoadMainMenu(){
		if(loading == false){
			backgroundstyle.normal.background = loadingbg;
			loading = true;
			Pause();
			Application.LoadLevel("MainMenu");
				
		}
			
	}
		
	void Pause(){	
		 return;
	}
	
	
	
}






 
//using UnityEngine;
//using System.Collections;
// 
//public class DownloadObbExample : MonoBehaviour
//{
//	private string expPath;
//	private string logtxt;
//	private bool alreadyLogged = false;
//	private string nextScene = "SceneMenu";
//	private bool downloadStarted;
// 
//	public Texture2D background;
//	//public GUISkin mySkin;
// 
//	void log( string t )
//	{
//		logtxt += t + "\n";
//		print("MYLOG " + t);
//	}
//	void OnGUI()
//	{
//		//GUI.skin = mySkin;
//		//GUI.DrawTexture(new Rect(0,0,background.width,background.height),background);
//		GUI.Label(new Rect(0,0,background.width,background.height),background);
// 
//		if (!GooglePlayDownloader.RunningOnAndroid())
//		{
//			GUI.Label(new Rect(10, 10, Screen.width-10, 20), "Use GooglePlayDownloader only on Android device!");
//			return;
//		}
// 
//		expPath = GooglePlayDownloader.GetExpansionFilePath();
//		if (expPath == null)
//		{
//			GUI.Label(new Rect(10, 10, Screen.width-10, 20), "External storage is not available!");
//		}
//		else
//		{
//			string mainPath = GooglePlayDownloader.GetMainOBBPath(expPath);
//			string patchPath = GooglePlayDownloader.GetPatchOBBPath(expPath);
//			if( alreadyLogged == false )
//			{
//				alreadyLogged = true;
//				log( "expPath = "  + expPath );
//				log( "Main = "  + mainPath );
//				log( "Main = " + mainPath.Substring(expPath.Length));
// 
//				if (mainPath != null)
//					StartCoroutine(loadLevel());
// 
//			}
//			//GUI.Label(new Rect(10, 10, Screen.width-10, Screen.height-10), logtxt );
// 
//			if (mainPath == null)
//			{
//				GUI.Label(new Rect(Screen.width-600, Screen.height-230, 430, 60), "The game needs to download 96MB of game content. It's recommanded to use WIFI connection.");
//				if (GUI.Button(new Rect(Screen.width-500, Screen.height-170, 250, 60), "Start Download"))
//				{
//					GooglePlayDownloader.FetchOBB();
//					//StartCoroutine(loadLevel());
//				}
//			}
// 
//		}
// 
//	} 
//	protected IEnumerator loadLevel()
//	{
//		string mainPath;
//		do
//		{
//			yield return new WaitForSeconds(0.5f);
//			mainPath = GooglePlayDownloader.GetMainOBBPath(expPath);
//			log("waiting mainPath "+mainPath);
//		}
//		while( mainPath == null);
// 
//		if( downloadStarted == false )
//		{
//			downloadStarted = true;
// 
//			string uri = "file://" + mainPath;
//			log("downloading " + uri);
//			WWW www = WWW.LoadFromCacheOrDownload(uri , 0);		
// 
//			// Wait for download to complete
//			yield return www;
// 
//			if (www.error != null)
//			{
//				log ("wwww error " + www.error);
//			}
//			else
//			{
//				Application.LoadLevel("MainMenu");
//			}
//		}
//	}
// 
//}
#endif