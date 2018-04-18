using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Xml;
using System.IO;

namespace UnityEditor
{

	public class EchoPFXLoadSave
	{
		static XmlDocument xfile;
		static XmlElement 	root;
		private static string  myPath = "";
		
		//============================================================
		public static void SaveAnimCurve ( AnimationCurve icurve, string iname, XmlElement iparent )
		{
			int loop;
			XmlElement 		ele;
			XmlElement 		keyParent;

			ele = xfile.CreateElement(iname);
			iparent.AppendChild ( ele );
			iparent = ele;

			for ( loop = 0; loop < icurve.length; loop++)
			{
				ele = xfile.CreateElement("key");
				iparent.AppendChild ( ele );
				keyParent = ele;
				
				ele = xfile.CreateElement("inTangent");
				ele.InnerText = icurve.keys[loop].inTangent.ToString();
				keyParent.AppendChild ( ele );
				
				ele = xfile.CreateElement("outTangent");
				ele.InnerText = icurve.keys[loop].outTangent.ToString();
				keyParent.AppendChild ( ele );
				
				ele = xfile.CreateElement("time");
				ele.InnerText = icurve.keys[loop].time.ToString();
				keyParent.AppendChild ( ele );

				ele = xfile.CreateElement("value");
				ele.InnerText = icurve.keys[loop].value.ToString();
				keyParent.AppendChild ( ele );
			}
		}
		
		//============================================================
		public static void SaveOption ( EchoPFXEffectOption iepo, XmlElement iparent )
		{
			XmlElement 		ele;

			ele = xfile.CreateElement("Option");
			iparent.AppendChild ( ele );
			iparent = ele;

			ele = xfile.CreateElement("optType");
			ele.InnerText = iepo.optType.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("passOrder");
			ele.InnerText = iepo.passOrder.ToString();
			iparent.AppendChild ( ele );
			
			ele = xfile.CreateElement("startDelay");
			ele.InnerText = iepo.delay.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("attackTime");
			ele.InnerText = iepo.attackTime.ToString();
			iparent.AppendChild ( ele );
			
			SaveAnimCurve ( iepo.attackCurve, "attackCurve", iparent );
			
			ele = xfile.CreateElement("sustainTime");
			ele.InnerText = iepo.sustainTime.ToString();
			iparent.AppendChild ( ele );

			SaveAnimCurve ( iepo.sustainCurve, "sustainCurve", iparent );

			ele = xfile.CreateElement("releaseTime");
			ele.InnerText = iepo.releaseTime.ToString();
			iparent.AppendChild ( ele );

			SaveAnimCurve ( iepo.releaseCurve, "releaseCurve", iparent );

			ele = xfile.CreateElement("sustainHold");
			ele.InnerText = iepo.sustainHold.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("strength");
			ele.InnerText = iepo.strength.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("params1");
			ele.InnerText = iepo.params1.ToString("F4");
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("params2");
			ele.InnerText = iepo.params2.ToString("F4");
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("opt1");
			ele.InnerText = iepo.opt1.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("opt2");
			ele.InnerText = iepo.opt2.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("intVal1");
			ele.InnerText = iepo.intVal1.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("floatVal1");
			ele.InnerText = iepo.floatVal1.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("tex");
			ele.InnerText = AssetDatabase.GetAssetPath ( iepo.tex );
			iparent.AppendChild ( ele );
			
			ele = xfile.CreateElement("texBlend");
			ele.InnerText = iepo.texBlend.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("poid");
			ele.InnerText = iepo.poid.ToString();
			iparent.AppendChild ( ele );
			
			ele = xfile.CreateElement("maskDissolve");
			ele.InnerText = iepo.maskDissolve.ToString();
			iparent.AppendChild ( ele );

			SaveAnimCurve ( iepo.maskDissolveCurve, "maskDissolveCurve", iparent );

			ele = xfile.CreateElement("maskAnimateTime");
			ele.InnerText = iepo.maskAnimateTime.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("rgba");
			ele.InnerText = ((Vector4)iepo.rgba).ToString("F4");
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("rgbaMultiply");
			ele.InnerText = iepo.rgbaMultiply.ToString();
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("texGradient");
			ele.InnerText = AssetDatabase.GetAssetPath ( iepo.texGradient );
			iparent.AppendChild ( ele );

			SaveAnimCurve ( iepo.rgbaCurve, "rgbaCurve", iparent );

			ele = xfile.CreateElement("overlayST");
			ele.InnerText = iepo.overlayST.ToString("F4");
			iparent.AppendChild ( ele );

			ele = xfile.CreateElement("overlayST_Scroll");
			ele.InnerText = iepo.overlayST_Scroll.ToString("F4");
			iparent.AppendChild ( ele );
		}

		//============================================================
		public static void SaveEffect ( EchoPFXEffect iepe, XmlElement iparent )
		{
			XmlElement 		eleParent;
			XmlElement 		eleOpts;
			XmlElement 		ele;
			int 			loop;

			eleParent = xfile.CreateElement("Effect");
			iparent.AppendChild ( eleParent );

			ele = xfile.CreateElement("name");
			ele.InnerText = iepe.name;
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("active");
			ele.InnerText = iepe.active.ToString();
			eleParent.AppendChild ( ele );

			//================
			// pass 1 option defaults
			eleOpts = xfile.CreateElement("OptionsPass1");
			eleParent.AppendChild ( eleOpts );

			// save pass 1 Options
			for ( loop = 0; loop < iepe.passOpt1.Count; loop++)
			{
				SaveOption ( iepe.passOpt1[loop], eleOpts );
			}

			//================
			// pass 2 option defaults
			eleOpts = xfile.CreateElement("OptionsPass2");
			eleParent.AppendChild ( eleOpts );
			
			// save pass 2 Options
			for ( loop = 0; loop < iepe.passOpt2.Count; loop++)
			{
				SaveOption ( iepe.passOpt2[loop], eleOpts );
			}
			
			//================
			// pass 3 option defaults
			eleOpts = xfile.CreateElement("OptionsPass3");
			eleParent.AppendChild ( eleOpts );
			
			// save pass 3 Options
			for ( loop = 0; loop < iepe.passOpt3.Count; loop++)
			{
				SaveOption ( iepe.passOpt3[loop], eleOpts );
			}

			//================
			// pass 4 option defaults
			eleOpts = xfile.CreateElement("OptionsPass4");
			eleParent.AppendChild ( eleOpts );
			
			// save pass 4 Options
			for ( loop = 0; loop < iepe.passOpt4.Count; loop++)
			{
				SaveOption ( iepe.passOpt4[loop], eleOpts );
			}
		}

		//============================================================
		public static void SavePossibleOption ( EchoPFXShaderOption ipo, XmlElement ipar )
		{
			XmlElement 		ele;

			ele = xfile.CreateElement("type");
			ele.InnerText = ipo.type.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("maths");
			ele.InnerText = ipo.maths.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("mathsFlag");
			ele.InnerText = ipo.mathsFlag.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("id");
			ele.InnerText = ipo.id.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("order");
			ele.InnerText = ipo.order.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("customCode");
			if ( ipo.customCode != null )
				ele.InnerText = ipo.customCode;
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("tcOpt");
			ele.InnerText = ipo.tcOpt.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("tcIndex");
			ele.InnerText = ipo.tcIndex.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("alwaysOn");
			ele.InnerText = ipo.alwaysOn.ToString();
			ipar.AppendChild ( ele );
			
			ele = xfile.CreateElement("disabled");
			ele.InnerText = ipo.disabled.ToString();
			ipar.AppendChild ( ele );

			ele = xfile.CreateElement("codeMask");
			ele.InnerText = ipo.codeMask.ToString();
			ipar.AppendChild ( ele );

			ele = xfile.CreateElement("fadeType");
			ele.InnerText = ipo.fadeType.ToString();
			ipar.AppendChild ( ele );

			ele = xfile.CreateElement("fadeMask");
			ele.InnerText = AssetDatabase.GetAssetPath ( ipo.fadeMask );
			ipar.AppendChild ( ele );

			ele = xfile.CreateElement("fadeMaskIndex");
			ele.InnerText = ipo.fadeMaskIndex.ToString();
			ipar.AppendChild ( ele );

			ele = xfile.CreateElement("fadeMaskDissolve");
			ele.InnerText = ipo.fadeMaskDissolve.ToString();
			ipar.AppendChild ( ele );
		}

		//============================================================
		public static void SaveRenderGroup ( EchoPFXRenderGroup ierg, XmlElement iparent )
		{
			XmlElement 			eleParent;
			XmlElement 			ele;
			XmlElement 			eleOpts;
			XmlElement 			opar;
			EchoPFXShaderOption po;
			int 				loop;

			eleParent = xfile.CreateElement("RenderGroup");
			iparent.AppendChild ( eleParent );

			ele = xfile.CreateElement("name");
			ele.InnerText = ierg.name;
			eleParent.AppendChild ( ele );

			//ele = xfile.CreateElement("id");
			//ele.InnerText = ierg.id.ToString();
			//eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("passCount");
			ele.InnerText = ierg.passCount.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("active");
			ele.InnerText = ierg.active.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("renderOrder");
			ele.InnerText = ierg.renderOrder.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("meshCellWidth");
			ele.InnerText = ierg.meshCellWidth.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("meshCellHeight");
			ele.InnerText = ierg.meshCellHeight.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtAdjustSize");
			ele.InnerText = ierg.rtAdjustSize.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtAdjustWidth");
			ele.InnerText = ierg.rtAdjustWidth.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtAdjustHeight");
			ele.InnerText = ierg.rtAdjustHeight.ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtFilterMode1");
			ele.InnerText = ierg.rtFilterMode[0].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtFilterMode2");
			ele.InnerText = ierg.rtFilterMode[1].ToString();
			eleParent.AppendChild ( ele );
			
			ele = xfile.CreateElement("rtFilterMode3");
			ele.InnerText = ierg.rtFilterMode[2].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtFilterMode4");
			ele.InnerText = ierg.rtFilterMode[3].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtBlendMode1");
			ele.InnerText = ierg.rtBlendMode[0].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtBlendMode2");
			ele.InnerText = ierg.rtBlendMode[1].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtBlendMode3");
			ele.InnerText = ierg.rtBlendMode[2].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtBlendMode4");
			ele.InnerText = ierg.rtBlendMode[3].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtWrapMode1");
			ele.InnerText = ierg.rtWrapMode[0].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("rtWrapMode2");
			ele.InnerText = ierg.rtWrapMode[1].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("precision1");
			ele.InnerText = ierg.precision[0].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("precision2");
			ele.InnerText = ierg.precision[1].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("precision3");
			ele.InnerText = ierg.precision[2].ToString();
			eleParent.AppendChild ( ele );

			ele = xfile.CreateElement("precision4");
			ele.InnerText = ierg.precision[3].ToString();
			eleParent.AppendChild ( ele );

			// possible options pass 1
			eleOpts = xfile.CreateElement("PossibleOpts1");
			eleParent.AppendChild ( eleOpts );

			for ( loop = 0; loop < ierg.possibleOpts1.Count; loop++ )
			{
				po = ierg.possibleOpts1[loop];

				// parent
				opar = xfile.CreateElement("Option");
				eleOpts.AppendChild ( opar );

				SavePossibleOption ( po, opar );
			}

			// possible options pass 2
			eleOpts = xfile.CreateElement("PossibleOpts2");
			eleParent.AppendChild ( eleOpts );
			
			for ( loop = 0; loop < ierg.possibleOpts2.Count; loop++ )
			{
				po = ierg.possibleOpts2[loop];
				
				// parent
				opar = xfile.CreateElement("Option");
				eleOpts.AppendChild ( opar );

				SavePossibleOption ( po, opar );
			}
			
			// possible options pass 3
			eleOpts = xfile.CreateElement("PossibleOpts3");
			eleParent.AppendChild ( eleOpts );
			
			for ( loop = 0; loop < ierg.possibleOpts3.Count; loop++ )
			{
				po = ierg.possibleOpts3[loop];
				
				// parent
				opar = xfile.CreateElement("Option");
				eleOpts.AppendChild ( opar );
				
				SavePossibleOption ( po, opar );
			}

			// possible options pass 4
			eleOpts = xfile.CreateElement("PossibleOpts4");
			eleParent.AppendChild ( eleOpts );
			
			for ( loop = 0; loop < ierg.possibleOpts4.Count; loop++ )
			{
				po = ierg.possibleOpts4[loop];
				
				// parent
				opar = xfile.CreateElement("Option");
				eleOpts.AppendChild ( opar );
				
				SavePossibleOption ( po, opar );
			}

			// save effects
			eleOpts = xfile.CreateElement("Effects");
			eleParent.AppendChild ( eleOpts );

			for ( loop = 0; loop < ierg.epeList.Count; loop++ )
			{
				SaveEffect ( ierg.epeList[loop], eleOpts );
			}
		}

		//============================================================
		public static void Save ( EchoPFXManager iepfxm, string ifname = null )
		{
			EchoPFXRenderGroup erg;
			StreamWriter sw;
			string fileName;
			
			if ( ifname == null )
				fileName = EditorUtility.SaveFilePanel ( "Save PostFX setup", myPath, "echoPOSTFXSettings", "xml" );
			else
				fileName =ifname;
				
			if ( fileName == null || fileName == "" )
				return;

			xfile = new XmlDocument();
	
			xfile.AppendChild ( xfile.CreateXmlDeclaration ( "1.0", null, null ) );

			root = xfile.CreateElement("PostFX");
			root.SetAttribute ( "FPS", iepfxm.frameRate.ToString() );
			xfile.AppendChild ( root );

			for ( int loop = 0; loop < iepfxm.ergList.Count; loop++ )
			{
				erg = iepfxm.ergList[loop];
				SaveRenderGroup ( erg, root );

			}

			sw = new StreamWriter ( fileName );
			xfile.Save ( sw );
			sw.Close();
		}

		//============================================================
		private static int NodeParseInt ( XmlNode inode, string iname )
		{
			string value = null;
			
			if ( inode[iname] != null )
				value = inode[iname].InnerText;

			if ( value == null || value == "" )
				return(0);
			
			return ( int.Parse ( value ) );
		}

		//============================================================
		private static float NodeParseFloat ( XmlNode inode, string iname )
		{
			string value = null;

			if ( inode[iname] != null )
				value = inode[iname].InnerText;
			
			if ( value == null || value == "" )
				return(0.0f);

			value = value.Trim();

			if ( value == "Infinity" )
				return(float.PositiveInfinity);

			if ( value == "-Infinity" )
				return(float.NegativeInfinity);

			return ( float.Parse ( value ) );
		}

		//============================================================
		private static bool NodeParseBool ( XmlNode inode, string iname )
		{
			string value = null;
			
			if ( inode[iname] != null )
				value = inode[iname].InnerText;

			if ( value == null || value == "" )
				return ( false );
			
			return ( bool.Parse ( value ) );
		}

		//============================================================
		private static int NodeParseEnum ( XmlNode inode, string iname, System.Type ienumType, int idefault )
		{
			string value = null;
			
			if ( inode[iname] != null )
				value = inode[iname].InnerText;
			
			if ( value == null || value == "" )
				return ( idefault );
			
			return ( (int)System.Enum.Parse ( ienumType, value ) );
		}

		//============================================================
		private static int NodeParseEnum ( XmlNode inode, System.Type ienumType, int idefault )
		{
			string value = null;
			
			if ( inode != null )
				value = inode.InnerText;

			if ( value == null || value == "" )
				return ( idefault );
			
			return ( (int)System.Enum.Parse ( ienumType, value ) );
		}

		//============================================================
		private static Texture2D NodeParseTex2D ( XmlNode inode, string iname )
		{
			string value = null;
			Texture2D tex2D;
			
			if ( inode[iname] != null )
				value = inode[iname].InnerText;
			
			if ( value == null || value == "" )
				return ( null );

			tex2D = AssetDatabase.LoadAssetAtPath(value, typeof(Texture2D)) as Texture2D;

			return ( tex2D );
		}


		//============================================================
		private static string NodeParseString ( XmlNode inode )
		{
			string value = null;
			
			if ( inode != null )
				value = inode.InnerText;

			if ( value == null || value == "" )
				return ( "" );
			
			return ( value );
		}

		//============================================================
		public static Vector4 NodeParseVector4 (  XmlNode inode, string iname )
		{
			string[] d;
			Vector4 v4 		= new Vector4(0,0,0,0);
			string value 	= null;


			if ( inode[iname] != null )
				value = inode[iname].InnerText;
			
			if ( value == null || value == "" )
				value = "0,0,0,0";

			value = value.Replace ('(',' ' );
			value = value.Replace (')',' ' );

			d = value.Split (","[0]);

			v4.x = float.Parse( d[0] );
			v4.y = float.Parse( d[1] );
			v4.z = float.Parse( d[2] );
			v4.w = float.Parse( d[3] );
			
			return ( v4 );
		}
		
		
		//============================================================
		public static AnimationCurve LoadAnimCurve ( XmlNode inode, string iname, int istagetype )
		{
			int loop;
			XmlNode onode;
			XmlNode pnode;
			AnimationCurve   ac;
			Keyframe[] keys;
	
			onode = inode[iname];
			
			if ( onode == null )
			{
				switch ( istagetype )
				{
				case 0:
					return ( AnimationCurve.Linear ( 0, 0, 1, 1 ) );
				case 1:
					return ( AnimationCurve.Linear ( 0, 1, 1, 1 ) );
				case 2:
					return ( AnimationCurve.Linear ( 0, 1, 1, 0 ) );
				}
			}

			keys = new Keyframe[onode.ChildNodes.Count];
			
			for ( loop = 0; loop < keys.Length; loop++)
			{
				pnode = onode.ChildNodes[loop];
				
				keys[loop].inTangent = NodeParseFloat ( pnode, "inTangent" );
				keys[loop].outTangent = NodeParseFloat ( pnode, "outTangent" );
				keys[loop].time = NodeParseFloat ( pnode, "time" );
				keys[loop].value = NodeParseFloat ( pnode, "value" );
			}
			
			ac = new AnimationCurve ( keys );
			
			return ( ac );
		}

		//============================================================
		private static EchoPFXEffectOption LoadOption ( XmlNode inode )
		{
			ECHOPFXOPTION opt = ( ECHOPFXOPTION )NodeParseEnum ( inode, "optType", typeof ( ECHOPFXOPTION ), (int)ECHOPFXOPTION.GREYSCALE );
			EchoPFXEffectOption epo = new EchoPFXEffectOption ( opt,0 );

			epo.passOrder 		= NodeParseInt ( inode, "passOrder" );

			epo.delay 			= NodeParseFloat ( inode, "startDelay" );
			epo.attackTime 		= NodeParseFloat ( inode, "attackTime" );
			epo.attackCurve 	= LoadAnimCurve ( inode, "attackCurve", 0 );
			epo.sustainTime 	= NodeParseFloat ( inode, "sustainTime" );
			epo.sustainCurve 	= LoadAnimCurve ( inode, "sustainCurve", 1 );
			epo.releaseTime 	= NodeParseFloat ( inode, "releaseTime" );
			epo.releaseCurve 	= LoadAnimCurve ( inode, "releaseCurve", 2 );
			epo.sustainHold 	= NodeParseBool ( inode, "sustainHold" );
			epo.strength 		= NodeParseFloat ( inode, "strength" );
			epo.params1      	= NodeParseVector4 ( inode, "params1" );
			epo.params2      	= NodeParseVector4 ( inode, "params2" );
			epo.opt1 			= NodeParseBool ( inode, "opt1" );
			epo.opt2 			= NodeParseBool ( inode, "opt2" );
			epo.intVal1 		= NodeParseInt ( inode, "intVal1" );
			epo.floatVal1 		= NodeParseFloat ( inode, "floatVal1" );
			epo.tex 			= NodeParseTex2D ( inode, "tex" );
			epo.texGradient		= NodeParseTex2D ( inode, "texGradient" );
			epo.texBlend        = ( ECHOPFXBLEND )NodeParseEnum ( inode, "texBlend", typeof ( ECHOPFXBLEND ), (int)ECHOPFXBLEND.NORMAL );
			epo.poid 			= NodeParseInt ( inode, "poid" );
		
			epo.maskDissolve		= NodeParseFloat ( inode, "maskDissolve" );
			epo.maskDissolveCurve 	= LoadAnimCurve ( inode, "maskDissolveCurve", 2 );
			epo.maskAnimateTime		= NodeParseBool ( inode, "maskAnimateTime" );

			epo.rgba    		= (Color)NodeParseVector4 ( inode, "rgba" );
			epo.rgbaMultiply 	= NodeParseFloat ( inode, "rgbaMultiply" );
			epo.rgbaCurve 		= LoadAnimCurve ( inode, "rgbaCurve", 2 );

			epo.overlayST     	= NodeParseVector4 ( inode, "overlayST" );
			epo.overlayST_Scroll= NodeParseVector4 ( inode, "overlayST_Scroll" );

			return ( epo );
		}

		//============================================================
		private static EchoPFXEffect LoadEffect ( XmlNode inode )
		{
			EchoPFXEffect epe = new EchoPFXEffect();
			XmlNode onode;
			int loop;

			epe.name = inode["name"].InnerText;
			epe.active = NodeParseBool ( inode, "active" );

			onode = inode["OptionsPass1"];
			epe.passOpt1.Clear();

			if ( onode != null )
			{
				for ( loop = 0; loop < onode.ChildNodes.Count; loop++ )
				{
					epe.passOpt1.Add ( LoadOption(onode.ChildNodes[loop]) );
				}
			}

			onode = inode["OptionsPass2"];
			epe.passOpt2.Clear();
			
			if ( onode != null )
			{
				for ( loop = 0; loop < onode.ChildNodes.Count; loop++ )
				{
					epe.passOpt2.Add ( LoadOption(onode.ChildNodes[loop]) );
				}
			}

			onode = inode["OptionsPass3"];
			epe.passOpt3.Clear();
			
			if ( onode != null )
			{
				for ( loop = 0; loop < onode.ChildNodes.Count; loop++ )
				{
					epe.passOpt3.Add ( LoadOption(onode.ChildNodes[loop]) );
				}
			}
			
			onode = inode["OptionsPass4"];
			epe.passOpt4.Clear();
			
			if ( onode != null )
			{
				for ( loop = 0; loop < onode.ChildNodes.Count; loop++ )
				{
					epe.passOpt4.Add ( LoadOption(onode.ChildNodes[loop]) );
				}
			}

			return ( epe );
		}

		//============================================================
		public static void LoadPossibleOption ( List<EchoPFXShaderOption> ipoList, XmlNode inode )
		{
			int loop;
			ECHOPFXOPTION fxo;
			EchoPFXShaderOption po = null;

			ipoList.Clear();

			for ( loop = 0; loop < inode.ChildNodes.Count; loop ++ )
			{
				fxo  = (ECHOPFXOPTION)NodeParseEnum ( inode.ChildNodes[loop]["type"], typeof ( ECHOPFXOPTION ),(int)ECHOPFXOPTION.COUNT );
				if ( fxo != ECHOPFXOPTION.COUNT )
				{
					po 					= new EchoPFXShaderOption( fxo, loop );
					po.customCode 		= NodeParseString ( inode.ChildNodes[loop]["code"] );
					po.type         	= fxo;
					po.maths        	= (ECHOPFXMATHS)NodeParseEnum ( inode.ChildNodes[loop]["maths"], typeof ( ECHOPFXMATHS ), (int)ECHOPFXMATHS.AVERAGE );
					po.mathsFlag    	= NodeParseBool ( inode.ChildNodes[loop], "mathsFlag" );
					po.id           	= NodeParseInt ( inode.ChildNodes[loop], "id" );
					po.order        	= NodeParseFloat ( inode.ChildNodes[loop], "order" );
					po.tcOpt     		= (ECHOPFXTEXCOORD)NodeParseEnum ( inode.ChildNodes[loop], "tcOpt", typeof ( ECHOPFXTEXCOORD ), (int)ECHOPFXTEXCOORD.DEFAULT );
					po.tcIndex      	= NodeParseInt ( inode.ChildNodes[loop], "tcIndex" );
					po.alwaysOn     	= NodeParseBool ( inode.ChildNodes[loop], "alwaysOn" );
					po.disabled     	= NodeParseBool ( inode.ChildNodes[loop], "disabled" );
					po.codeMask     	= NodeParseInt ( inode.ChildNodes[loop], "codeMask" );
					po.fadeType     	= (ECHOPFXFADETYPE)NodeParseEnum ( inode.ChildNodes[loop], "fadeType", typeof ( ECHOPFXFADETYPE ), (int)ECHOPFXFADETYPE.DEFAULT );
					po.fadeMask   		= NodeParseTex2D ( inode.ChildNodes[loop], "fadeMask" );
					po.fadeMaskIndex 	= NodeParseInt ( inode.ChildNodes[loop], "fadeMaskIndex" );
					po.fadeMaskDissolve = NodeParseBool ( inode.ChildNodes[loop], "fadeMaskDissolve" );
					
					if ( po.fadeMask = null )
						po.fadeMaskDissolve = false;

					ipoList.Add ( po );
				}
			}
		}

		//============================================================
		private static EchoPFXRenderGroup LoadRenderGroup ( XmlNode inode )
		{
			EchoPFXRenderGroup erg = new EchoPFXRenderGroup();
			XmlNode node;
			int loop;

			node = inode.FirstChild;

			erg.name 				= inode["name"].InnerText;
			//erg.id 					= NodeParseInt ( inode, "id" );
			erg.passCount 			= NodeParseInt ( inode, "passCount" );
			erg.active      		= NodeParseBool ( inode, "active" );
			erg.renderOrder    		= NodeParseFloat ( inode,"renderOrder" );
			erg.meshCellWidth    	= NodeParseInt ( inode,"meshCellWidth" );
			erg.meshCellHeight    	= NodeParseInt ( inode,"meshCellHeight" );
			erg.rtAdjustSize    	= (ECHORTADJUST)NodeParseEnum ( inode, "rtAdjustSize", typeof ( ECHORTADJUST ), (int)ECHORTADJUST.DEVICE_SIZE );
			erg.rtAdjustWidth   	= NodeParseInt ( inode,"rtAdjustWidth" );
			erg.rtAdjustHeight    	= NodeParseInt ( inode,"rtAdjustHeight" );

			erg.rtFilterMode        = new FilterMode[4];
			erg.rtFilterMode[0]    	= ( FilterMode )NodeParseEnum ( inode, "rtFilterMode1", typeof ( FilterMode ),(int)FilterMode.Point );
			erg.rtFilterMode[1]    	= ( FilterMode )NodeParseEnum ( inode, "rtFilterMode2", typeof ( FilterMode ),(int)FilterMode.Point );
			erg.rtFilterMode[2]    	= ( FilterMode )NodeParseEnum ( inode, "rtFilterMode3", typeof ( FilterMode ),(int)FilterMode.Point );
			erg.rtFilterMode[3]    	= ( FilterMode )NodeParseEnum ( inode, "rtFilterMode4", typeof ( FilterMode ),(int)FilterMode.Point );

			erg.rtBlendMode      	= new ECHOPFXBLEND[4];
			erg.rtBlendMode[0]    	= ( ECHOPFXBLEND )NodeParseEnum ( inode, "rtBlendMode1", typeof ( ECHOPFXBLEND ),(int)ECHOPFXBLEND.NORMAL );
			erg.rtBlendMode[1]    	= ( ECHOPFXBLEND )NodeParseEnum ( inode, "rtBlendMode2", typeof ( ECHOPFXBLEND ),(int)ECHOPFXBLEND.NORMAL );
			erg.rtBlendMode[2]    	= ( ECHOPFXBLEND )NodeParseEnum ( inode, "rtBlendMode3", typeof ( ECHOPFXBLEND ),(int)ECHOPFXBLEND.NORMAL );
			erg.rtBlendMode[3]    	= ( ECHOPFXBLEND )NodeParseEnum ( inode, "rtBlendMode4", typeof ( ECHOPFXBLEND ),(int)ECHOPFXBLEND.NORMAL );

			erg.rtWrapMode      	= new TextureWrapMode[2];
			erg.rtWrapMode[0]    	= (TextureWrapMode)NodeParseEnum ( inode, "rtWrapMode1", typeof ( TextureWrapMode ),(int)TextureWrapMode.Clamp );
			erg.rtWrapMode[1]    	= (TextureWrapMode)NodeParseEnum ( inode, "rtWrapMode2", typeof ( TextureWrapMode ),(int)TextureWrapMode.Clamp );

			erg.precision      		= new ECHOPRECISION[4];
			erg.precision[0]    	= (ECHOPRECISION)NodeParseEnum ( inode, "precision1", typeof ( ECHOPRECISION ),(int)ECHOPRECISION.FIXED );
			erg.precision[1]    	= (ECHOPRECISION)NodeParseEnum ( inode, "precision2", typeof ( ECHOPRECISION ),(int)ECHOPRECISION.FIXED );
			erg.precision[2]    	= (ECHOPRECISION)NodeParseEnum ( inode, "precision3", typeof ( ECHOPRECISION ),(int)ECHOPRECISION.FIXED );
			erg.precision[3]    	= (ECHOPRECISION)NodeParseEnum ( inode, "precision4", typeof ( ECHOPRECISION ),(int)ECHOPRECISION.FIXED );

			node = inode["PossibleOpts1"];
			LoadPossibleOption ( erg.possibleOpts1, node );

			node = inode["PossibleOpts2"];
			LoadPossibleOption ( erg.possibleOpts2, node );

			node = inode["PossibleOpts3"];
			LoadPossibleOption ( erg.possibleOpts3, node );

			node = inode["PossibleOpts4"];
			LoadPossibleOption ( erg.possibleOpts4, node );


			node = inode["Effects"];
			erg.epeList.Clear();
			for ( loop = 0; loop < node.ChildNodes.Count; loop ++ )
			{
				erg.epeList.Add ( LoadEffect ( node.ChildNodes[loop] ) );
			}
	
			return ( erg );
		}

		//============================================================
		public static EchoPFXRenderGroup Load ( EchoPFXManager iepfxm, string ifname = null )
		{
			XmlNode lroot;
			string fileName;
			StreamReader sr;
			List<Camera>[] cameras;
			bool camflag  = false;			
			int camcount = 0;
			
			if ( !iepfxm.autoIncludeCameras )
			{
				for ( int loop = 0; loop < iepfxm.ergList.Count; loop++ )
				{
					if ( iepfxm.ergList[loop].cameraList.Count > 0 )
						camcount++;
				}
				
				if ( camcount > 0 )
				{
					if ( EditorUtility.DisplayDialog("Try to preserve cameras ?", " That are attached to RenderGroups", "Yes", "No" ) )
					{
						camflag = true;
					}
				}
			}

			
			if ( ifname == null )
				fileName = EditorUtility.OpenFilePanel ( "Open PostFX setup", myPath, "xml" );
			else
				fileName = ifname;

			if ( fileName == null || fileName == "" )
				return ( null );

			sr = new StreamReader(fileName);

			xfile = new XmlDocument();
			xfile.LoadXml(sr.ReadToEnd());
			sr.Close();

			lroot = xfile["PostFX"];

			iepfxm.frameRate 			= int.Parse ( lroot.Attributes["FPS"].Value );
			
			// save camera lists if auto include thing is not checked
			
			cameras = new List<Camera>[iepfxm.ergList.Count];
			if ( camflag )
			{
				
				for ( int loop = 0; loop < iepfxm.ergList.Count; loop++ )
				{
					cameras[loop] = iepfxm.ergList[loop].cameraList;
				}
			}
			
			// Render Groups
			iepfxm.ergList.Clear();

			for ( int loop = 0; loop < lroot.ChildNodes.Count; loop++ )
			{
				iepfxm.ergList.Add ( LoadRenderGroup ( lroot.ChildNodes[loop] ) );
				
				if ( camflag )
				{
					iepfxm.ergList[loop].cameraList = cameras[loop];
				}
			}

			if ( iepfxm.ergList.Count > 0 )
			{
				for ( int loop = 0; loop < iepfxm.ergList.Count; loop++ )
					iepfxm.ergList[loop].ValidateOptions();
				
				return ( iepfxm.ergList[0] );
			}

			iepfxm.SortRenderGroups();

			return ( null );
		}
	}
}
