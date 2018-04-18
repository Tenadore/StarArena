// (c) copyright echoLogin LLC 2014. All rights reserved.

using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

[System.Serializable]
public class EchoPFXEffect
{
	public string           		name;
	public bool             		active;
	public List<EchoPFXEffectOption> 		passOpt1	= new List<EchoPFXEffectOption>();
	public List<EchoPFXEffectOption> 		passOpt2	= new List<EchoPFXEffectOption>();
	public List<EchoPFXEffectOption> 		passOpt3	= new List<EchoPFXEffectOption>();
	public List<EchoPFXEffectOption> 		passOpt4	= new List<EchoPFXEffectOption>();
	[System.NonSerialized] 
	public List<EchoPFXEffectOption>[]		passOpt 	= new List<EchoPFXEffectOption>[4];

	// below this does not need to be saved to xml
	public bool[]                  	passActive 	= new bool[4];
	public int                      optionsTotal;
	public int                      optionsOff;
	[System.NonSerialized] 
	private EchoPFXRenderGroup 		_erg;
	[System.NonSerialized] 
	private List<Dictionary<int,EchoPFXEffectOption>> _passDict;


	//=========================================================================
	public EchoPFXEffect()
	{
		active 		= false;
		name 		= "";
				
		passOpt[0] = passOpt1;
		passOpt[1] = passOpt2;
		passOpt[2] = passOpt3;
		passOpt[3] = passOpt4;
	}

	//=========================================================================
	public EchoPFXEffectOption OptionGet ( ECHOPFXOPTION ipo, int ipass, int iid )
	{
		int	key = ( iid << 8 ) + (int)ipo;
		EchoPFXEffectOption epo;

		epo = _passDict[ipass][key];
		
		return ( epo );
	}

	//=========================================================================
	public void LinkPossibleOpts ( List<EchoPFXShaderOption>[] ipos )
	{
		int loop;
		int index;
		EchoPFXEffectOption epo;		
		EchoPFXShaderOption  po;
		
		passOpt[0] = passOpt1;
		passOpt[1] = passOpt2;
		passOpt[2] = passOpt3;
		passOpt[3] = passOpt4;
		
		for ( int pass = 0; pass < 4; pass++ )
		{
			for ( loop = 0; loop < passOpt[pass].Count; loop++ )
			{
				epo = passOpt[pass][loop];
				
				for ( index = 0; index < ipos[pass].Count; index++ )
				{
					po = ipos[pass][index];
					if ( epo.poid < 0 && epo.optType == po.type )
					{
						epo.po 		= po;
						epo.poid	= po.id;
						break;
					}
					
					if ( epo.poid == po.id && epo.optType == po.type )
					{
						epo.po = po;
						break;
					}
				}
			}
		}
	}
	
	//=========================================================================
	public void Start()
	{
		int index;

		optionsOff 		= 0;

		for ( int pass = 0; pass < 4; pass++ )
		{
			for ( index = 0; index < passOpt[pass].Count; index++ )
			{
				passOpt[pass][index].Start();
			}
		}
	}

	//=========================================================================
	public void Start( float iscale )
	{
		int index;

		optionsOff 		= 0;

		for ( int pass = 0; pass < 4; pass++ )
		{
			for ( index = 0; index < passOpt[pass].Count; index++ )
			{
				passOpt[pass][index].Start( iscale );
			}
		}
	}

	//=========================================================================
	public void Stop()
	{
		int index;
		
		for ( int pass = 0; pass < 4; pass++ )
		{
			for ( index = 0; index < passOpt[pass].Count; index++ )
			{
				passOpt[pass][index].Stop();
			}
		}
	}

	//=========================================================================
	public void RemoveOptionOfType ( ECHOPFXOPTION iopt, int ipass, int iid )
	{
		int loop;

		passOpt[0] = passOpt1;
		passOpt[1] = passOpt2;
		passOpt[2] = passOpt3;
		passOpt[3] = passOpt4;

		for ( loop = passOpt[ipass].Count-1; loop >= 0; loop-- )
		{
			if ( passOpt[ipass][loop].optType == iopt && passOpt[ipass][loop].poid == iid )
			{
				passOpt[ipass].Remove ( passOpt[ipass][loop] );
			}
		}
	}

	//=========================================================================
	private int FindPassOptIndex ( int ipass, EchoPFXRenderGroup ierg, ECHOPFXOPTION iopt, int iid )
	{
		switch ( ipass )
		{
		case 0:
			for ( int loop = 0; loop < ierg.possibleOpts1.Count; loop++ )
			{
				if ( ierg.possibleOpts1[loop].type == iopt && ierg.possibleOpts1[loop].id == iid )
				{
					return ( loop );
				}
			}
			break;
			
		case 1:
			for ( int loop = 0; loop < ierg.possibleOpts2.Count; loop++ )
			{
				if ( ierg.possibleOpts2[loop].type == iopt && ierg.possibleOpts2[loop].id == iid )
				{
					return ( loop );
				}
			}
			break;
			
		case 2:
			for ( int loop = 0; loop < ierg.possibleOpts3.Count; loop++ )
			{
				if ( ierg.possibleOpts3[loop].type == iopt && ierg.possibleOpts3[loop].id == iid )
				{
					return ( loop );
				}
			}
			break;
			
		case 3:
			for ( int loop = 0; loop < ierg.possibleOpts4.Count; loop++ )
			{
				if ( ierg.possibleOpts4[loop].type == iopt && ierg.possibleOpts4[loop].id == iid )
				{
					return ( loop );
				}
			}
			break;
		}
		
		return ( -1 );
	}
	
	//=========================================================================
	public int  ValidateOptions ( EchoPFXRenderGroup ierg )
	{
		int total = 0;
		int loop;
		int pass;
		int num;

		_erg = ierg;

		passOpt[0] = passOpt1;
		passOpt[1] = passOpt2;
		passOpt[2] = passOpt3;
		passOpt[3] = passOpt4;

		optionsOff 		= 0;
		optionsTotal 	= passOpt1.Count + passOpt2.Count + passOpt3.Count + passOpt4.Count;

		for ( pass = 0; pass < 4; pass++ )
		{
			for ( loop = 0; loop < passOpt[pass].Count; loop++ )
			{
				passOpt[pass][loop].passOrder =  FindPassOptIndex ( pass, _erg, passOpt[pass][loop].optType, passOpt[pass][loop].poid );
			}

			passOpt[pass].Sort ( delegate ( EchoPFXEffectOption e1, EchoPFXEffectOption e2 ) 
			{
				return ( e1.passOrder.CompareTo ( e2.passOrder ) );
			});
		}

		_passDict = new List <Dictionary<int,EchoPFXEffectOption>>();
		_passDict.Add ( new Dictionary<int,EchoPFXEffectOption>() );
		_passDict.Add ( new Dictionary<int,EchoPFXEffectOption>() );
		_passDict.Add ( new Dictionary<int,EchoPFXEffectOption>() );
		_passDict.Add ( new Dictionary<int,EchoPFXEffectOption>() );
		
		for ( pass = 0; pass < 4; pass++ )
		{
			for ( loop = 0; loop < passOpt[pass].Count; loop++ )
			{
				passOpt[pass][loop].ValidateInput();
				
				num = ( passOpt[pass][loop].poid<<8 ) + (int)passOpt[pass][loop].optType;
				
				_passDict[pass].Add (  num, passOpt[pass][loop] );
			}
		}
		
		if ( passActive == null || passActive.Length < 1 )
		passActive 		= new bool[4];

		passActive[0] 	= false;
		passActive[1] 	= false;
		passActive[2] 	= false;
		passActive[3] 	= false;

		total = 0;
		if ( passOpt[0].Count > 0 )
		{
			passActive[0] 	= true;
			total++;
		}

		if ( passOpt[1].Count > 0 )
		{
			passActive[1] = true;
			total++;
		}

		if ( passOpt[2].Count > 0 )
		{
			passActive[2] = true;
			total++;
		}

		if ( passOpt[3].Count > 0 )
		{
			passActive[3] = true;
			total++;
		}

		return ( total );
	}

	//=========================================================================
	public int EffectPassCount ( int ipass )
	{
		return ( passOpt[ipass].Count );
	}

};

