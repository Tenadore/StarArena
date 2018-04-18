#if false
using UnityEngine;

namespace HutongGames.PlayMaker.Actions
{
	[ActionCategory("echoLogin PFX")]
	[Tooltip("Trigger PostFX.")]
	public class EchoTriggerPostEffect : FsmStateAction
	{
		[RequiredField]
        [Tooltip("Render Group Name")]
		public FsmString renderGroupName;
		
		[RequiredField]
		[Tooltip("Effect Name")]
		public FsmString effectName;

		[RequiredField]
		[Tooltip("Effect Time Scale")]
		public FsmFloat effectTimeScale = 1.0f;

		private EchoPFX _fxID = null;

		public override void Awake ()
		{
			if ( _fxID == null )
				_fxID = new EchoPFX ( renderGroupName.Value, effectName.Value );
		}

		public override void Reset()
		{
			renderGroupName = "";
			effectName = "";
		}

		public override void OnEnter()
		{
			_fxID.Start (effectTimeScale.Value);
			Finish();
		}
	}
}
#endif
