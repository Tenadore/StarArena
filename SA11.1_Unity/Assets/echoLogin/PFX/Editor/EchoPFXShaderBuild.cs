using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using System.IO;
using UnityEditor;

public enum ECHOPFXVARTYPE
{
	SINGLE = 0,
	VEC2,
	VEC3,
	VEC4,
	TEXTURE,
	COUNT
};

//-----------------------------------------------------------------------------
public class EchoPFXVarible
{
	public ECHOPFXVARTYPE type;
	public string         varName;
	
	public EchoPFXVarible ( string ivarname, ECHOPFXVARTYPE itype )
	{
		varName = ivarname;
		type 	= itype;
	}
}

//-----------------------------------------------------------------------------
public class EchoPFXShaderEffect
{
	public int 							location;  	// 0 vertex  1 frag
	public List<EchoPFXVarible> 		uniformVars 	= new List<EchoPFXVarible>();
	public List<EchoPFXVarible> 		texCoordVary 	= new List<EchoPFXVarible>();
	public string[,]              		code;
	public int                          partsCount      = 1;
	public bool                         partsCombine    = false;
}

//-----------------------------------------------------------------------------
public class EchoPFXShaderBuild 
{
	private static string _sceneName;
	private static string[] _template;
	private static string _final;
	private static string _finalTC;
	private static EchoPFXShaderEffect[] effects	= new  EchoPFXShaderEffect[(int)ECHOPFXOPTION.COUNT];
	public static List<EchoPFXVarible> 	vertexVars 	= new List<EchoPFXVarible>();
	public static List<EchoPFXVarible> 	fragVars 	= new List<EchoPFXVarible>();
	public static readonly string[] rtBlendModes 	= new string[]
	{
		"Blend Off",
		"Blend One One",
		"Blend One One BlendOp RevSub",
		"Blend DstColor Zero",
		"Blend OneMinusDstColor One",
		"Blend SrcAlpha OneMinusSrcAlpha"
	};
	public static readonly string[] localVarNames 	= new string[(int)ECHOPFXVARTYPE.COUNT]
	{
		"_echoVar1",
		"_echoVar2",
		"_echoVar3",
		"_echoVar4",
		"_echoTexture",
	};
	public static readonly string[] uniformVarNames = new string[(int)ECHOPFXVARTYPE.COUNT]
	{
		"_echoUniformVar1",
		"_echoUniformVar2",
		"_echoUniformVar3",
		"_echoUniformVar4",
		"_echoUniformTex",
	};
	public static readonly string[] optFileNames 	= new string[(int)ECHOPFXOPTION.COUNT]
	{
		"vertex-distort",
		"frag-greyscale",
		"frag-color",
		"frag-colorcorrect",
		"frag-contrast",
		"frag-gamma",
		"frag-posterize",
		"frag-inverse",
		"frag-rgb-separate",
		"frag-ramp",
		"frag-scanlines",
		"frag-blur",
		"frag-texture",
		"frag-custom",
	};
	
	public static readonly string[] precisionNames 	= new string[3]
	{
		"fixed",
		"half",
		"float",
	};
	public static int precisionIndex 				= 0;
	public static List<EchoPFXShaderOption>[] possibleOpts = new List<EchoPFXShaderOption>[4];

	//=========================================================================
	public static string[] LoadTextFileSplit ( string ifname )
	{
 		StreamReader sr 	= new StreamReader( Application.dataPath + "/echoLogin/PFX/Templates/" + ifname );
    	String fileContents = sr.ReadToEnd();
    	sr.Close();
 
    	return ( fileContents.Split("\n"[0]) );
    }

	//=========================================================================
	public static EchoPFXShaderEffect ParseEffect ( string ifname, EchoPFXShaderOption ipo )
	{
		EchoPFXShaderEffect ese;
		string[] lines;
		string[] words;
		int index;
		bool flag;
		List <EchoPFXVarible> varList;
		int codePart 	= -1;
		int codeBlock 	= -1;
		int loop;
		
 		StreamReader sr 	= new StreamReader ( Application.dataPath + "/echoLogin/PFX/Templates/" + ifname );
    	String fileContents = sr.ReadToEnd();
    	sr.Close();
		
		ese 				= new EchoPFXShaderEffect();
		ese.location 		= 0;
		ese.partsCount  	= 1;
		ese.partsCombine 	= false;
		
		if ( ifname.Contains ("frag-" ) )
		{
			varList = fragVars;
			ese.location 	= 1;
		}
		else
			varList = vertexVars;
		
		// parse header and get info about effect
		lines = fileContents.Split('\n');
		for ( loop = 0; loop < lines.Length; loop++ )
		{
			words = lines[loop].Split (' ');
			
			if ( words.Length >= 3 && words[0] == "//" )
			{
				for ( index = 0; index < (int)ECHOPFXVARTYPE.COUNT; index++ )
				{
					switch ( words[1] )
					{
					case "_echoVaryingTexcoord":
						ese.texCoordVary.Add ( new EchoPFXVarible ( words[2], (ECHOPFXVARTYPE)index ) );
						break;
						
					case "_echoPartsCount":
						ese.partsCount  = int.Parse ( words[2] );
						break;

					case "_echoPartsCombine":
						if ( words[2] == "true" )
							ese.partsCombine = true;
						else
							ese.partsCombine = false;
						break;

					default:
						if ( words[1] == localVarNames[index] )
						{
							flag = false;
							foreach ( EchoPFXVarible v in varList )
							{
								if ( v.varName == words[2] )
								{
									flag = true;
									break;
								}
							}

							if ( flag )
								break;
							
							varList.Add ( new EchoPFXVarible ( words[2], (ECHOPFXVARTYPE)index ) );
						}
						else if ( words[1] == uniformVarNames[index] )
						{
							ese.uniformVars.Add ( new EchoPFXVarible ( words[2], (ECHOPFXVARTYPE)index ) );
						}
						break;
					}
					
				}
			}
		}
		
		ese.code 			= new string[ese.partsCount,4];
		
		codePart = -1;
		lines = fileContents.Split('\n');
		for ( loop = 0; loop < lines.Length; loop++ )
		{
			words = lines[loop].Split (' ');
	
			if ( words.Length < 1 )
				continue;
	
			if ( words.Length >= 2  )
			{
				for ( index = 0; index < ese.partsCount; index++ )
				{
					if ( words[1] == "ECHO_COMMON_START"+index+":" )
					{
						codePart = 0;
						codeBlock = index;
						break;
					}
	
					if ( words[1] == "ECHO_FADE_START"+index+":" )
					{
						codePart = 1;
						codeBlock = index;
						break;
					}
	
					if ( words[1] == "ECHO_NOFADE_START"+index+":" )
					{
						codePart = 2;
						codeBlock = index;
						break;
					}
					
					if ( words[1] == "ECHO_FRAGMASK_START"+index+":" )
					{
						codePart = 3;
						codeBlock = index;
						break;
					}
				}
	
				if ( words[1] == "ECHO_END:" )
					codePart = -1;
			}
				
			if ( codePart >= 0 && words[0] != "//" )
			{
				ese.code[codeBlock,codePart] += lines[loop] + "\n";
			}
		}

    	return ( ese );
    }
	
	//=========================================================================
	public static void SaveTextFile ( string ifname, string idata )
	{
 		StreamWriter sw 	= new StreamWriter ( Application.dataPath + "/echoLogin/PFX/Resources/" + ifname );
		
		sw.Write ( idata ); 
		
    	sw.Close();

    	return;
    }

	//=========================================================================
	public static string ParseCustomCode ( int iorder, string icode, bool ifadeawlays1, ECHOPFXALPHA ialpha  )
	{
		if ( icode == null || icode == "" )
			return("\n//NOCODE\n");
		
		if ( ialpha == ECHOPFXALPHA.ALPHA_ON )
			icode = icode.Replace ( "_Output", "_echoOutput4" );
		else
			icode = icode.Replace ( "_Output", "_echoOutput3" );
			
		icode = icode.Replace ( "_Texture", "_echoTexture" );
		
		if ( ifadeawlays1 )
			icode = icode.Replace ( "_Fade", "1.0" );
		else
			icode = icode.Replace ( "_Fade", "_echoFadeMain" );
		
		icode = icode.Replace ( "_Params1", "_echoParams1" );
		icode = icode.Replace ( "_Params2", "_echoParams2" );
		icode = icode.Replace ( "_Color", "_echoColorValue" );
		icode = icode.Replace ( "_TC", "_echoTexcoord" );

		if ( ifadeawlays1 )
		{
			if ( ialpha == ECHOPFXALPHA.ALPHA_ON )
				icode += "\n_ioRGB = _echoOutput4;\n";
			else
				icode += "\n_ioRGB = _echoOutput3;\n";
		}
		else
		{
			if ( ialpha == ECHOPFXALPHA.ALPHA_ON )
				icode += "\n_ioRGB = lerp ( _ioRGB, _echoOutput4, _echoFadeMain );\n";
			else
				icode += "\n_ioRGB = lerp ( _ioRGB, _echoOutput3, _echoFadeMain );\n";
		}

		
		return ( icode );
	}
	
	//=========================================================================
	public static string ParseCodePart ( string icode, EchoPFXShaderOption ipo, EchoPFXShaderEffect iese )
	{
		int loop;
		
		switch ( ipo.tcOpt )
		{
		case ECHOPFXTEXCOORD.UNIQUE:
			if ( ipo.tcIndex % 2 == 0 )
				icode = icode.Replace ( "_echoTexcoord", "v.tc" + (ipo.tcIndex/2+1) + ".xy"); 
			else
				icode = icode.Replace ( "_echoTexcoord", "v.tc" + (ipo.tcIndex/2+1) + ".zw" ); 
			break;
			
		case ECHOPFXTEXCOORD.RANDOM:
			icode = icode.Replace ( "_echoTexcoord", "v.tc1.xy + _echoFragTime.zw " ); 
			break;
			
		default:
			icode = icode.Replace ( "_echoTexcoord", "v.tc1.xy" ); 
			break;
		}
		
		// uniforms
		for ( loop = 0; loop < iese.uniformVars.Count; loop++ )
		{
			icode = icode.Replace ( iese.uniformVars[loop].varName, iese.uniformVars[loop].varName + "_" + ipo.order ); 
		}

		// sampler2d
		for ( loop = 0; loop < iese.texCoordVary.Count; loop++ )
		{
			icode = icode.Replace ( iese.texCoordVary[loop].varName, iese.texCoordVary[loop].varName + "_" + ipo.order ); 
		}
		
		icode += "\n";
		
		return ( icode );
	}
	
	//=========================================================================
	public static string ParseShaderCode ( int ipass, EchoPFXRenderGroup ierg, EchoPFXShaderOption ipo )
	{
		EchoPFXShaderEffect ese = effects[(int)ipo.type];
		string[] icode 			= new string[4] { "","","","" };
		string finalCode 		= "";
		int loop;
		int index;
		int blockCount;
		int block;
		
		blockCount 	= ipo.BlockCount();
		block 		= 0;
		
		for ( loop = 0; loop < blockCount; loop++ )
		{
			block = ipo.BlockNext ( block );

			
			if ( ipo.type == ECHOPFXOPTION.CUSTOM_FRAG )
			{
				icode[0] = "";
				icode[1] = ParseCustomCode ( (int)ipo.order, String.Copy ( ipo.customCode ), false, ierg.alphaFlag[ipass] );
				icode[2] = ParseCustomCode ( (int)ipo.order, String.Copy ( ipo.customCode ), true, ierg.alphaFlag[ipass] );
			}
			else
			{
				if ( ese.code[block,0] != null )
					icode[0] = String.Copy ( ese.code[block,0] );
				if ( ese.code[block,1] != null )
					icode[1] = String.Copy ( ese.code[block,1] );
				if ( ese.code[block,2] != null )
					icode[2] = String.Copy ( ese.code[block,2] );
			}

			//SCOTTFIND
			if ( ipo.type != ECHOPFXOPTION.DISTORTION )
			{
				if ( ipo.fadeMaskDissolve && ipo.fadeMask != null )
					icode[3] = "_echoFadeMain *= _echoMaskValD_"+ipo.order+".xyz;\n";
				else
					icode[3] = "_echoFadeMain *= _echoMaskVal_"+ipo.fadeMaskIndex+".xyz;\n";
			}
			else
				icode[3] = "";
			
			for ( index = 0; index < 4; index++ )
			{
				icode[index] = ParseCodePart ( icode[index], ipo, ese );
			}
			

			if ( ipo.fadeMask != null )
				ipo.fadeType = ECHOPFXFADETYPE.DEFAULT;
			
			switch ( ipo.fadeType )
			{
			case ECHOPFXFADETYPE.DEFAULT:
				if ( ipo.alwaysOn == false )
					finalCode += "#ifdef EL_" + ipo.order + "_ON\n";
				
				if ( ipo.fadeMask != null )
				{
					finalCode += icode[0] + icode[3] + icode[1];
				}
				else
					finalCode += icode[0] + icode[1];
	
				if ( ipo.alwaysOn == false )
					finalCode += "#endif\n";
				break;
	
			case ECHOPFXFADETYPE.ALWAYS_1:
				if ( ipo.alwaysOn == false )
					finalCode += "#ifdef EL_" + ipo.order + "_ON\n";
				
				finalCode += icode[0] + icode[2];
	
				if ( ipo.alwaysOn == false )
					finalCode += "#endif\n";
				break;
	
			case ECHOPFXFADETYPE.FASTER_WHEN_1:
				if ( ipo.alwaysOn )
				{
					finalCode += icode[0] + icode[1];
				}
				else
				{
					finalCode += "#ifdef EL_" + ipo.order + "_ON\n";
					finalCode += icode[0] + icode[1];
					finalCode += "#endif\n\n";
		
					finalCode += "#ifdef EL_" + ipo.order + "_FAST\n";
					finalCode += icode[0] + icode[2];
					finalCode += "#endif\n";
				}
				break;
			}
			
			block++;
		}
		
		finalCode += "\n";

		return ( finalCode );
	}

	//=========================================================================
	public static void WriteOption ( int ipass, EchoPFXRenderGroup ierg, EchoPFXShaderOption ipo, int iloc )
	{
		if ( effects[(int)ipo.type].location != iloc )
			return;
		
		_final += ParseShaderCode ( ipass, ierg, ipo );
	}

	//=========================================================================
	public static void WriteUniforms ( EchoPFXShaderEffect iese, EchoPFXShaderOption ipo )
	{
		string precision;
		string stName;
		string vname;
		int loop;
		
		//if ( ipo.fadeMask != null && ipo == )
		//{
		//	_final += "sampler2D _echoMaskTex_"+ ipo.order + ";\n";
		//}
		
		if ( iese.location == 1 )
			precision = precisionNames[precisionIndex];
		else
		{
			precision = "float";
			if ( ipo.fadeMask != null )
			{
				if ( ipo.tcIndex % 2 == 0 && ipo.tcOpt == ECHOPFXTEXCOORD.UNIQUE )
					vname  = ".xy";
				else
					vname  = ".zw";

				_finalTC += "v.tc" + (ipo.tcIndex/2+1) + vname + " = half2(0,0);\n"; 
			}
		}

		for ( loop = 0; loop < iese.uniformVars.Count; loop++ )
		{
			switch ( iese.uniformVars[loop].type )
			{
			case ECHOPFXVARTYPE.SINGLE:
				_final += precision + " " + iese.uniformVars[loop].varName + "_"+ ipo.order + ";";
				break;
				
			case ECHOPFXVARTYPE.VEC2:
				_final += precision + "2 " + iese.uniformVars[loop].varName + "_"+ ipo.order + ";";
				break;
				
			case ECHOPFXVARTYPE.VEC3:
				_final += precision + "3 " + iese.uniformVars[loop].varName + "_"+ ipo.order + ";";
				break;
				
			case ECHOPFXVARTYPE.VEC4:
				_final += precision + "4 " + iese.uniformVars[loop].varName + "_"+ ipo.order + ";";
				break;
				
			case ECHOPFXVARTYPE.TEXTURE:
				_final += "sampler2D " + iese.uniformVars[loop].varName + "_"+ ipo.order + ";\n";
				stName = iese.uniformVars[loop].varName + "_"+ ipo.order + "_TO";
				_final += "float4 " + stName +";";
				
				if ( ipo.tcOpt == ECHOPFXTEXCOORD.UNIQUE )
				{
					if ( ipo.tcIndex % 2 == 0 )
						vname  = ".xy";
					else
						vname  = ".zw";

					_finalTC += "v.tc" + (ipo.tcIndex/2+1) + vname + " = ( ad.texcoord.xy * " + stName + ".xy ) + " + stName + ".zw;\n"; 
				}
				break;
			}
			
			_final += "\n";
		}
	}
	
	//=========================================================================
	public static void BuildRenderGroupShaders ( EchoPFXRenderGroup ierg )
	{
		List<EchoPFXMask> 	maskList;
		int 				loop;
		int 				pass;
		int 				index;
		string 				line;
		string 				groupName;
		string 				passName;
		bool 				flag;
		int     			n;
		
		groupName = "group"+ierg.renderOrder+"_";
		
		for ( pass = 0; pass < 4; pass++ )
		{
			passName = "pass"+(pass+1);
			precisionIndex = (int)ierg.precision[pass];
			
			vertexVars.Clear();
			fragVars.Clear();
			
			for ( index = 0; index < (int)ECHOPFXOPTION.COUNT; index++ )
			{
				flag = false;
				for ( n = 0; n < possibleOpts[pass].Count; n++ )
				{
					if ( (int)possibleOpts[pass][n].type == index )
					{
						flag = true;
						break;
					}
				}
				
				if ( flag )
					effects[index] = ParseEffect ( "echoLogin-postfx-" + optFileNames[index] + ".cginc", possibleOpts[pass][n] );
			}

			// create mask list so like masks are not read more than once time per pixel SCOTTFIND
//			for ( n = 0; n < possibleOpts[pass].Count; n++ )
//			{
			//	AddMask ( possibleOpts[pass][n].fadeMask, (int)possibleOpts[pass][n].order, possibleOpts[pass][n].alwaysOn  );
			//}

			_final = "";
			
			for ( index = 0; index < _template.Length; index++ )
			{
				line = _template[index].Trim();
				
				switch ( line )
				{
				case "ECHO_SHADER_NAME:":
					_final += "Shader \"Hidden/echoLogin/PFX/echologin_postfx_" + _sceneName + "_" + groupName + passName + "\"" + "\n";
					break;
	
				case "ECHO_BLEND_MODE:":
					_final += rtBlendModes[(int)ierg.rtBlendMode[pass]] + "\n";
					break;
							
				case "ECHO_KEYWORDS:":
					for ( loop = 0; loop < possibleOpts[pass].Count; loop++ )
					{
						if ( possibleOpts[pass][loop].alwaysOn == false )
						{
							_final += "#pragma multi_compile ";
							_final += "EL_" + possibleOpts[pass][loop].order + "_ON ";
							_final += "EL_" + possibleOpts[pass][loop].order + "_OFF";
							
							if ( possibleOpts[pass][loop].fadeType == ECHOPFXFADETYPE.FASTER_WHEN_1 )
								_final += " EL_" + possibleOpts[pass][loop].order + "_FAST";
							
							_final += "\n";
						}
					}
					break;
					
				// here i must calc the total number of texcoords used	
				case "ECHO_DEFINES:":
					_final += "#define ECHOVAR1 " + ierg.precision[pass].ToString().ToLower()  +"\n";
					_final += "#define ECHOVAR2 " + ierg.precision[pass].ToString().ToLower()  +"2\n";
					_final += "#define ECHOVAR3 " + ierg.precision[pass].ToString().ToLower()  +"3\n";
					_final += "#define ECHOVAR4 " + ierg.precision[pass].ToString().ToLower()  +"4\n";
					break;

				case "ECHO_UNIFORMS_INSERT:":
					maskList = ierg.GetMaskList ( pass );
					
					for ( loop = 0; loop < maskList.Count; loop++ )
					{
						for ( n = 0; n < maskList[loop].orderList.Count; n++ )
						{
							if ( maskList[loop].orderList[n].dissolve )
								_final += "ECHOVAR1 _echoMaskMix_"+maskList[loop].orderList[n].order+";\n";
						}
					}
					
					_finalTC = "";
					for ( loop = 0; loop < maskList.Count; loop++ )
					{
						_final += "sampler2D _echoMaskTex_" + loop +";\n";
					}

					for ( loop = 0; loop < possibleOpts[pass].Count; loop++ )
					{
						WriteUniforms ( effects[(int) possibleOpts[pass][loop].type], possibleOpts[pass][loop] );
					}
					break;
					

				case "ECHO_VARYING_INSERT:":
					int texCoord = 1;
					
					for ( loop = 0; loop < ierg.texCoordCount[pass]; loop+=2 )
					{
						if ( ierg.texCoordCount[pass] - loop > 1 )
							_final += "half4 tc"+texCoord+" : TEXCOORD"+texCoord+";\n";
						else
							_final += "half2 tc"+texCoord+" : TEXCOORD"+texCoord+";\n";
						
						texCoord++;
					}
					break;
					
				case "ECHO_VERTEX_INSERT:":
					_final += _finalTC;

					for ( loop = 0; loop < vertexVars.Count; loop++ )
					{
						switch ( vertexVars[loop].type )
						{
						case ECHOPFXVARTYPE.SINGLE:
							_final += "float " + vertexVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.VEC2:
							_final += "float2 " + vertexVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.VEC3:
							_final += "float3 " + vertexVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.VEC4:
							_final += "float4 " + vertexVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.TEXTURE:
							_final += "sampler2D " + vertexVars[loop].varName+";\n";
							break;
						}
					}
					
					for ( loop = 0; loop < possibleOpts[pass].Count; loop++ )
					{
						WriteOption ( pass, ierg, possibleOpts[pass][loop], 0 );	
					}
					
					break;
					
				case "ECHO_FRAGTCMOD_INSERT:":
					EchoPFXShaderOption po;
					String vname;
					
					maskList = ierg.GetMaskList ( pass );
					
					for ( loop = 0; loop < maskList.Count; loop++ )
					{
		
						if ( maskList[loop].countDissolve > 0 )
						{
							_final += "ECHOVAR4 _echoMaskDissolveVal;\n";
							break;
						}
					}

					for ( loop = 0; loop < maskList.Count; loop++ )
					{
						if ( maskList[loop].alwaysOn == false )
						{
							_final += "#if defined(";
							for ( n = 0; n < maskList[loop].orderList.Count; n++ )
							{
								_final += "EL_" + maskList[loop].orderList[n].order + "_ON) ";
								
								if ( n != maskList[loop].orderList.Count-1 )
									_final += "|| defined( ";
							}
							
							_final += "\n";
						}
						
						if ( maskList[loop].countDissolve > 0 )
						{
							for ( n = 0; n < possibleOpts[pass].Count; n++ )
							{
								po = possibleOpts[pass][loop];
								
								if ( po.fadeMaskIndex == loop )
									break;
							}
						}
						
						if ( maskList[loop].countDissolve > 0 && maskList[loop].countNormal > 0 )
						{
							_final += "_echoMaskDissolveVal = tex2D ( _echoMaskTex_"+loop+", v.tc1.xy );\n";
							_final += "ECHOVAR3 _echoMaskVal_"+loop+" = _echoMaskDissolveVal.xyz;\n";
							
							for ( n = 0; n < maskList[loop].orderList.Count; n++ )
							{
								if ( !maskList[loop].alwaysOn )
									_final +=  "#ifdef EL_" + maskList[loop].orderList[n].order + "_ON\n";
								
								if ( maskList[loop].orderList[n].dissolve )
									_final += "ECHOVAR3 _echoMaskValD_"+maskList[loop].orderList[n].order + " = _echoMaskDissolveVal.xyz * clamp ( _echoMaskDissolveVal.w - _echoMaskMix_"+maskList[loop].orderList[n].order+", 0, 1 );\n";
								
								if ( !maskList[loop].alwaysOn )
									_final += "#endif\n";
							}
						}
						else if (  maskList[loop].countDissolve > 0 )
						{
							_final += "_echoMaskDissolveVal = tex2D ( _echoMaskTex_"+loop+", v.tc1.xy );\n";
							for ( n = 0; n < maskList[loop].orderList.Count; n++ )
							{
								if ( !maskList[loop].alwaysOn )
									_final +=  "#ifdef EL_" + maskList[loop].orderList[n].order + "_ON\n";

								_final += "ECHOVAR3 _echoMaskValD_"+maskList[loop].orderList[n].order+" = _echoMaskDissolveVal.xyz * clamp ( _echoMaskDissolveVal.w - _echoMaskMix_"+maskList[loop].orderList[n].order+", 0, 1 );\n";

								if ( !maskList[loop].alwaysOn )
									_final += "#endif\n";
							}
						}
						else
						{
							_final += "ECHOVAR3 _echoMaskVal_"+ loop + " = tex2D ( _echoMaskTex_"+loop+", v.tc1.xy ).xyz;\n";
						}
						
						if ( maskList[loop].alwaysOn == false )
							_final += "#endif\n\n";

					}
					
					_final +="\n";

					for ( loop = 0; loop < possibleOpts[pass].Count; loop++ )
					{
						po = possibleOpts[pass][loop];
						if ( po.type == ECHOPFXOPTION.DISTORTION )
						{
							if ( po.tcOpt == ECHOPFXTEXCOORD.UNIQUE && po.fadeMask != null )
							{
								vname = "v.tc" + (po.tcIndex/2+1);
								if ( po.tcIndex % 2 == 0 )
									vname += ".xy";
								else
									vname += ".zw";
								
								if ( po.alwaysOn == false )
									_final += "#ifdef EL_" + po.order + "_ON\n";

								if ( po.fadeMaskDissolve )
									_final += "_echoTC += lerp ( half2(0,0)," + vname + ", _echoMaskValD_"+po.order+".xy);\n";
								else
									_final += "_echoTC += lerp ( half2(0,0)," + vname + ", _echoMaskVal_"+po.order+".xy);\n";

								if ( po.alwaysOn == false )
									_final += "#endif\n";
							}
						}
					}
					break;
					
				case "ECHO_READ_SCREEN:":
					if ( ierg.alphaFlag[pass] == ECHOPFXALPHA.ALPHA_ON )
						_final+= "ECHOVAR4 _ioRGB = tex2D ( _echoScreen, _echoTC );\n";
					else
						_final+= "ECHOVAR3 _ioRGB = tex2D ( _echoScreen, _echoTC ).xyz;\n";
					break;
					
				case "ECHO_RETURN_VAL:":
					if ( ierg.alphaFlag[pass] == ECHOPFXALPHA.ALPHA_ON )
						_final+= "return _ioRGB;\n";
					else
						_final+= "return ECHOVAR4 ( _ioRGB, 1 );\n";
					break;

				case "ECHO_FRAG_INSERT:":
					
					for ( loop = 0; loop < fragVars.Count; loop++ )
					{
						switch ( fragVars[loop].type )
						{
						case ECHOPFXVARTYPE.SINGLE:
							_final +=  precisionNames[precisionIndex] + " " + fragVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.VEC2:
							_final +=  precisionNames[precisionIndex] + "2 " + fragVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.VEC3:
							_final +=  precisionNames[precisionIndex] + "3 " + fragVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.VEC4:
							_final +=  precisionNames[precisionIndex] + "4 " + fragVars[loop].varName +";\n";
							break;
							
						case ECHOPFXVARTYPE.TEXTURE:
							_final += "sampler2D " + fragVars[loop].varName+";\n";
							break;
						}
					}
					
					for ( loop = 0; loop < possibleOpts[pass].Count; loop++ )
					{
						WriteOption ( pass, ierg, possibleOpts[pass][loop], 1 );	
					}
					break;
	
				default:
					_final += line +"\n";
					break;
				}
			}
			
			SaveTextFile ( "echoLogin-postfx-" + _sceneName +"-" + groupName + passName +".shader", _final );
		}
	}
	
	//=========================================================================
	public static void BuildShaders ( List<EchoPFXRenderGroup> iergList )
	{
		string maskName;

		string[] temp = System.IO.Path.GetFileName ( EditorApplication.currentScene ).Split('.');
		_sceneName = temp[0];

		if ( _sceneName == null || _sceneName == "" )
		{
			if ( EditorUtility.DisplayDialog("Scene name not found !", "Try to compile again.", "Ok", null ) )
			{
				return;
			}
		}

		maskName = "echoLogin-postfx-"+_sceneName+"-*.shader";

		foreach(FileInfo f in new DirectoryInfo(Application.dataPath + "/echoLogin/PFX/Resources/").GetFiles(maskName))
		{
			f.Delete();
		}

		_template 			= LoadTextFileSplit ( "echoLogin-postfx-template.txt" );

		for ( int loop = 0; loop < iergList.Count; loop++ )
		{
			iergList[loop].ValidateOptions();
			
			possibleOpts[0] = iergList[loop].possibleOpts1;
			possibleOpts[1] = iergList[loop].possibleOpts2;
			possibleOpts[2] = iergList[loop].possibleOpts3;
			possibleOpts[3] = iergList[loop].possibleOpts4;

			BuildRenderGroupShaders ( iergList[loop] ); 
		}
		
		Resources.UnloadUnusedAssets();
		
		AssetDatabase.Refresh();
	}
}
