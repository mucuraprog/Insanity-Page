// ─── DATA loaded from data.json at runtime ─────────────────────────────────
let CLASSES = [];

// ─── FALLBACK DATA (used when data.json cannot be fetched) ──────────────────
const _FALLBACK_DATA = [
  {
    id: 'arcanist',
    name: 'Arcanist',
    type: 'Magic',
    typeBadge: 'magic',
    logo: 'icons/classes/FF_Arca_Logo.png',
    accent: '#6ab0f5',
    pve_dps: null,
    max_pve_dmg: null,
    skills: [
      { name: 'Flame Ball',        icon: 'flame_ball',        min: 42204581,   max: 213833987,  avg_dps: 213369740 },
      { name: 'Flame Geyser',      icon: 'flame_geyser',      min: 20210868,   max: 103563087,  avg_dps: 103147025 },
      { name: 'Swordwind',         icon: 'swordwind',         min: 32808801,   max: 166298334,  avg_dps: 165925930 },
      { name: 'Strongwind',        icon: 'strongwind',        min: 32808801,   max: 166298334,  avg_dps: 165925930 },
      { name: 'Ice Missile',       icon: 'ice_missile',       min: 66372555,   max: 336115433,  avg_dps: 335413364 },
      { name: 'Static Ball',       icon: 'static_ball',       min: 46902470,   max: 237601804,  avg_dps: 237091636 },
      { name: 'Stone Spike',       icon: 'stone_spike',       min: 46596333,   max: 236305874,  avg_dps: 235756554 },
      { name: 'Mental Strike',     icon: 'mental_strike',     min: 18224234,   max: 92766632,   avg_dps: 92494238  },
      { name: 'Fire Strike',       icon: 'fire_strike',       min: 48832595,   max: 247816574,  avg_dps: 247212584 },
      { name: 'Wind Cutter',       icon: 'wind_cutter',       min: 38053024,   max: 192729237,  avg_dps: 192322397 },
      { name: 'Waterball',         icon: 'waterball',         min: 8371311,    max: 43102891,   avg_dps: 42896026  },
      { name: 'Water Well',        icon: 'water_well',        min: 77634573,   max: 393798004,  avg_dps: 392868338 },
      { name: 'Lighting Ram',      icon: 'lighting_ram',      min: 54266929,   max: 275360234,  avg_dps: 274694796 },
      { name: 'Lightning Shock',   icon: 'lightning_shock',   min: 54394221,   max: 275360234,  avg_dps: 274800875 },
      { name: 'Rock Crash',        icon: 'rock_crash',        min: 54266929,   max: 275360234,  avg_dps: 274694796 },
      { name: 'Firebird',          icon: 'firebird',          min: 67344750,   max: 339893756,  avg_dps: 339372208 },
      { name: 'Burningfield',      icon: 'burningfield',      min: 24160986,   max: 122498752,  avg_dps: 122218892 },
      { name: 'Lightning Strike',  icon: 'lightning_strike',  min: 74835993,   max: 378133352,  avg_dps: 377482003 },
      { name: 'Electric Shock',    icon: 'electric_shock',    min: 59704832,   max: 301686251,  avg_dps: 301165259 },
      { name: 'Stone Spear',       icon: 'stone_spear',       min: 66618680,   max: 336718092,  avg_dps: 336120698 },
      { name: 'Earthquake',        icon: 'earthquake',        min: 73060271,   max: 369648843,  avg_dps: 368931640 },
      { name: 'Iceshark',          icon: 'iceshark',          min: 107048330,  max: 540763553,  avg_dps: 539854032 },
      { name: 'Poison Cloud',      icon: 'poison_cloud',      min: 70719364,   max: 357000421,  avg_dps: 356440282 },
      { name: 'Void',              icon: 'void',              min: 52362263,   max: 264344828,  avg_dps: 263927854 },
      { name: 'Windfield',         icon: 'windfield',         min: 41770451,   max: 211287675,  avg_dps: 210885989 },
      { name: 'Meteor Shower',     icon: 'meteor_shower',     min: 69604822,   max: 351371451,  avg_dps: 15028852  },
      { name: 'Lightning Storm',   icon: 'lightning_storm',   min: 42223189,   max: 213368016,  avg_dps: 9124606   },
      { name: 'Sandstorm',         icon: 'sandstorm',         min: 37205114,   max: 188149586,  avg_dps: 8045162   },
      { name: 'Blizzard',          icon: 'blizzard',          min: 31760162,   max: 160634359,  avg_dps: 24049315  },
      { name: 'Lunar Cascade',     icon: 'lunar_cascade',     min: 58308433,   max: 294229640,  avg_dps: 110168147 },
      { name: 'Stellar Vortex',    icon: 'stellar_vortex',    min: 47550546,   max: 240009887,  avg_dps: 5621806   },
      { name: 'EVA Storm',         icon: 'eva_storm',         min: 39906581,   max: 201495581,  avg_dps: 201172491 },
      { name: 'Spectral Javelin',  icon: 'spectral_javelin',  min: 147926496,  max: 745915956,  avg_dps: 7374200   },
      { name: 'Astral Moon',       icon: 'astral_moon',       min: 58931217,   max: 297381005,  avg_dps: 296932790 },
    ]
  },
  {
    id: 'crackshooter',
    name: 'Crackshooter',
    type: 'Ranged',
    typeBadge: 'ranged',
    logo: 'icons/classes/FF_Crack_Logo.png',
    accent: '#7ad07a',
    pve_dps: 412793913,
    max_pve_dmg: 238716471,
    skills: [
      { name: 'PvE Melee',          icon: 'melee',             min: 0,          max: 238716471,  avg_dps: 412793913 },
      { name: 'Junk Arrow',         icon: 'junk_arrow',        min: 2700194,    max: 2724885,    avg_dps: 4520989   },
      { name: 'Aimed Shot',         icon: 'aimed_shot',        min: 45569341,   max: 45585932,   avg_dps: 5300679   },
      { name: 'Slow Step',          icon: 'slow_step',         min: 1911471,    max: 1917002,    avg_dps: 3190457   },
      { name: 'Silent Shot',        icon: 'silent_shot',       min: 31164730,   max: 31170261,   avg_dps: 51946864  },
      { name: 'Arrow Rain',         icon: 'arrow_rain',        min: 30364551,   max: 30400106,   avg_dps: 15191164  },
      { name: 'Cross Line',         icon: 'cross_line',        min: 13022527,   max: 13342520,   avg_dps: 15819028  },
      { name: 'Auto Shot',          icon: 'auto_shot',         min: 7902644,    max: 7908175,    avg_dps: 13175946  },
      { name: 'Snatch',             icon: 'snatch',            min: 4083076,    max: 4088409,    avg_dps: 6809707   },
      { name: 'Counterattack',      icon: 'counterattack',     min: 2129738,    max: 2135072,    avg_dps: 83377     },
      { name: 'Deadly Swing',       icon: 'deadly_swing',      min: 3901945,    max: 3907476,    avg_dps: 6507980   },
      { name: 'Ice Arrow',          icon: 'ice_arrow',         min: 44091250,   max: 44111004,   avg_dps: 52921352  },
      { name: 'Flame Arrow',        icon: 'flame_arrow',       min: 36043237,   max: 36068916,   avg_dps: 60094662  },
      { name: 'Piercing Arrow',     icon: 'piercing_arrow',    min: 39512985,   max: 39546564,   avg_dps: 65884275  },
      { name: 'Poison Arrow',       icon: 'poison_arrow',      min: 30218185,   max: 30247813,   avg_dps: 50389339  },
      { name: 'Silent Arrow',       icon: 'silent_arrow',      min: 10644507,   max: 10668211,   avg_dps: 683072    },
      { name: 'Triple Shot',        icon: 'triple_shot',       min: 33133674,   max: 33159351,   avg_dps: 3125716   },
      { name: 'Piercing Formation', icon: 'piercing_formation',min: 7025430,    max: 7088637,    avg_dps: 21171100  },
      { name: 'Celestial Barrage',  icon: 'celestial_barrage', min: 27431877,   max: 27495086,   avg_dps: 41195222  },
      { name: 'Condor Dive',        icon: 'condor_dive',       min: 30902218,   max: 30980438,   avg_dps: 30941328  },
    ]
  },
  {
    id: 'forcemaster',
    name: 'ForceMaster',
    type: 'Melee',
    typeBadge: 'melee',
    logo: 'icons/classes/FF_FM_Logo.png',
    accent: '#e06060',
    pve_dps: 580629156,
    max_pve_dmg: 233543249,
    skills: [
      { name: 'PvE Melee',        icon: 'melee',             min: 0,          max: 233543249,  avg_dps: 580629156 },
      { name: 'Straight Punch',   icon: 'straight_punch',    min: 5433388,    max: 5437150,    avg_dps: 9058962   },
      { name: 'Burst Crack',      icon: 'burst_crack',       min: 6177418,    max: 6180992,    avg_dps: 10298880  },
      { name: 'Power Fist',       icon: 'power_fist',        min: 6998955,    max: 7002530,    avg_dps: 11668137  },
      { name: 'Belial Smashing',  icon: 'belial_smashing',   min: 5584075,    max: 5586709,    avg_dps: 9309172   },
      { name: 'Piercing Serpent', icon: 'piercing_serpent',  min: 45599931,   max: 45611971,   avg_dps: 57007438  },
      { name: 'Blood Fist',       icon: 'blood_fist',        min: 4971543,    max: 4974177,    avg_dps: 318760    },
      { name: 'Sonichand',        icon: 'sonichand',         min: 5612294,    max: 5614928,    avg_dps: 9356205   },
      { name: 'Baraqijal Esna',   icon: 'baraqijal_esna',    min: 6010741,    max: 6011493,    avg_dps: 6011117   },
      { name: 'Bgvur Tialbold',   icon: 'bgvur_tialbold',    min: 5537044,    max: 5547202,    avg_dps: 9975821   },
      { name: 'Asalraalaikum',    icon: 'asalraalaikum',     min: 2116950,    max: 2132752,    avg_dps: 141727    },
      { name: 'Crushing Cascade', icon: 'crushing_cascade',  min: 58871703,   max: 58873396,   avg_dps: 82421569  },
      { name: 'Skybreaker',       icon: 'skybreaker',        min: 44332539,   max: 44334232,   avg_dps: 7917942   },
    ]
  },
  {
    id: 'harlequin',
    name: 'Harlequin',
    type: 'Ranged',
    typeBadge: 'ranged',
    logo: 'icons/classes/FF_Harle_Logo.png',
    accent: '#f0a040',
    pve_dps: 523302809,
    max_pve_dmg: 254799657,
    skills: [
      { name: 'PvE Melee',           icon: 'melee',             min: 0,          max: 254799657,  avg_dps: 523302809 },
      { name: 'Junk Arrow',          icon: 'junk_arrow',        min: 1492694,    max: 1515662,    avg_dps: 2507013   },
      { name: 'Aimed Shot',          icon: 'aimed_shot',        min: 12807969,   max: 12819255,   avg_dps: 1490223   },
      { name: 'Slow Step',           icon: 'slow_step',         min: 4176087,    max: 4179849,    avg_dps: 6963419   },
      { name: 'Silent Shot',         icon: 'silent_shot',       min: 7792026,    max: 7795788,    avg_dps: 12990104  },
      { name: 'Arrow Rain',          icon: 'arrow_rain',        min: 7614229,    max: 7648284,    avg_dps: 3815628   },
      { name: 'Cross Line',          icon: 'cross_line',        min: 50565943,   max: 50885107,   avg_dps: 60870630  },
      { name: 'Auto Shot',           icon: 'auto_shot',         min: 2585415,    max: 2589177,    avg_dps: 4312246   },
      { name: 'Snatch',              icon: 'snatch',            min: 2254174,    max: 2258134,    avg_dps: 3760331   },
      { name: 'Counterattack',       icon: 'counterattack',     min: 5013200,    max: 5017160,    avg_dps: 196093    },
      { name: 'Deadly Swing',        icon: 'deadly_swing',      min: 12974283,   max: 12978243,   avg_dps: 21627537  },
      { name: 'Enchant of Nature',   icon: 'enchant_of_nature', min: 6264711,    max: 6265503,    avg_dps: 6265107   },
      { name: 'Enchant of Iron',     icon: 'enchant_of_iron',   min: 5114770,    max: 5115562,    avg_dps: 5115166   },
      { name: 'Sneak Stab',          icon: 'sneak_stab',        min: 6530022,    max: 6540712,    avg_dps: 10892496  },
      { name: 'Hit of Penya',        icon: 'hit_of_penya',      min: 76196079,   max: 76238846,   avg_dps: 6928167   },
      { name: 'Vital Stab',          icon: 'vital_stab',        min: 66969032,   max: 67002295,   avg_dps: 111645005 },
      { name: 'Void Step',           icon: 'void_step',         min: 11018116,   max: 11019898,   avg_dps: 360321    },
      { name: 'Spiral Vortex',       icon: 'spiral_vortex',     min: 35454358,   max: 35456140,   avg_dps: 106365747 },
      { name: 'Pandemonium',         icon: 'pandemonium',       min: 38261101,   max: 38447214,   avg_dps: 63924874  },
      { name: "Harlequin's Greeting",icon: 'harlequins_greeting',min: 25815289,  max: 26001402,   avg_dps: 4627230   },
    ]
  },
  {
    id: 'mentalist',
    name: 'Mentalist',
    type: 'Magic',
    typeBadge: 'magic',
    logo: 'icons/classes/FF_Menta_Logo.png',
    accent: '#b070e0',
    pve_dps: null,
    max_pve_dmg: null,
    skills: [
      { name: 'Flame Ball',        icon: 'flame_ball',        min: 54418495,   max: 275463796,  avg_dps: 274907407 },
      { name: 'Flame Geyser',      icon: 'flame_geyser',      min: 25172329,   max: 128753224,  avg_dps: 128273859 },
      { name: 'Swordwind',         icon: 'swordwind',         min: 38070017,   max: 192801730,  avg_dps: 192396970 },
      { name: 'Strongwind',        icon: 'strongwind',        min: 38070017,   max: 192801730,  avg_dps: 192396970 },
      { name: 'Ice Missile',       icon: 'ice_missile',       min: 70055841,   max: 354541770,  avg_dps: 353838419 },
      { name: 'Static Ball',       icon: 'static_ball',       min: 54418495,   max: 275463796,  avg_dps: 274907407 },
      { name: 'Stone Spike',       icon: 'stone_spike',       min: 54090827,   max: 274080147,  avg_dps: 273481281 },
      { name: 'Mental Strike',     icon: 'mental_strike',     min: 23280816,   max: 118319761,  avg_dps: 118002840 },
      { name: 'Fire Strike',       icon: 'fire_strike',       min: 63209647,   max: 320457862,  avg_dps: 319729318 },
      { name: 'Wind Cutter',       icon: 'wind_cutter',       min: 44319193,   max: 224297574,  avg_dps: 223851782 },
      { name: 'Waterball',         icon: 'waterball',         min: 10276207,   max: 52776533,   avg_dps: 52545000  },
      { name: 'Water Well',        icon: 'water_well',        min: 82195469,   max: 416618148,  avg_dps: 415686327 },
      { name: 'Lighting Ram',      icon: 'lighting_ram',      min: 63209647,   max: 320457862,  avg_dps: 319729318 },
      { name: 'Lightning Shock',   icon: 'lightning_shock',   min: 63345888,   max: 320457862,  avg_dps: 319842855 },
      { name: 'Rock Crash',        icon: 'rock_crash',        min: 63209647,   max: 320457862,  avg_dps: 319729318 },
      { name: 'Demonology',        icon: 'demonology',        min: 48402822,   max: 244319483,  avg_dps: 243940132 },
      { name: 'Psychic Bomb',      icon: 'psychic_bomb',      min: 45672989,   max: 230561132,  avg_dps: 230199704 },
      { name: 'Psychic Wall',      icon: 'psychic_wall',      min: 18891306,   max: 96009275,   avg_dps: 947929    },
      { name: 'Spirit Bomb',       icon: 'spirit_bomb',       min: 84680375,   max: 427766166,  avg_dps: 427047324 },
      { name: 'Maximum Crisis',    icon: 'maximum_crisis',    min: 37313428,   max: 188983640,  avg_dps: 113148534 },
      { name: 'Psychic Square',    icon: 'psychic_square',    min: 56546948,   max: 285365883,  avg_dps: 15539938  },
      { name: 'Abra Cadabra',      icon: 'abra_cadabra',      min: 31706529,   max: 164315677,  avg_dps: 89101893  },
      { name: 'Shazaam',           icon: 'shazaam',           min: 55911177,   max: 286307103,  avg_dps: 30560092  },
      { name: "Cimetière's Scream",icon: 'cimetieres_scream', min: 130805639,  max: 663072957,  avg_dps: 6549498   },
      { name: 'Aether Grasp',      icon: 'aether_grasp',      min: 90364842,   max: 459285275,  avg_dps: 25916003  },
      { name: "Kriminel's Hand",   icon: 'kriminels_hand',    min: 46438725,   max: 234373229,  avg_dps: 140405977 },
    ]
  },
  {
    id: 'seraph',
    name: 'Seraph',
    type: 'Melee',
    typeBadge: 'melee',
    logo: 'icons/classes/FF_Seraph_Logo.png',
    accent: '#f5d060',
    pve_dps: 368141164,
    max_pve_dmg: 148082484,
    skills: [
      { name: 'PvE Melee',             icon: 'melee',               min: 88808352,  max: 148082484, avg_dps: 368141164 },
      { name: 'Priests Grasp',         icon: 'priests_grasp',       min: 31478835,  max: 133201207, avg_dps: 51462513  },
      { name: 'Power Fist',            icon: 'power_fist',          min: 4259158,   max: 18152026,  avg_dps: 18676360  },
      { name: 'Burst Crack',           icon: 'burst_crack',         min: 3851084,   max: 16439111,  avg_dps: 16908834  },
      { name: 'Straight Punch',        icon: 'straight_punch',      min: 3542231,   max: 15140935,  avg_dps: 15569616  },
      { name: 'Soul of Rhisis',        icon: 'soul_of_rhisis',      min: 9362120,   max: 41191444,  avg_dps: 5055356   },
      { name: 'Merkaba Hanzelrusha',   icon: 'merkaba_hanzelrusha', min: 6574360,   max: 28360570,  avg_dps: 1746746   },
    ]
  },
  {
    id: 'slayer',
    name: 'Slayer',
    type: 'Melee',
    typeBadge: 'melee',
    logo: 'icons/classes/FF_Slayer_Logo.png',
    accent: '#e05050',
    pve_dps: 723781652,
    max_pve_dmg: 267830149,
    skills: [
      { name: 'PvE Melee',       icon: 'melee',             min: 0,          max: 267830149,  avg_dps: 723781652 },
      { name: 'Slash',           icon: 'slash',             min: 17741836,   max: 17746092,   avg_dps: 29573864  },
      { name: 'Keenwheel',       icon: 'keenwheel',         min: 19520402,   max: 19524657,   avg_dps: 32538199  },
      { name: 'Blindside',       icon: 'blindside',         min: 55437847,   max: 55441888,   avg_dps: 92401627  },
      { name: 'Bloody Strike',   icon: 'bloody_strike',     min: 3500976,    max: 3505231,    avg_dps: 5838622   },
      { name: 'Special Hit',     icon: 'special_hit',       min: 4977440,    max: 4981482,    avg_dps: 8299267   },
      { name: 'Guillotine',      icon: 'guillotine',        min: 5006799,    max: 5011054,    avg_dps: 834821250 },
      { name: 'Hit Reflect',     icon: 'hit_reflect',       min: 5291455,    max: 5295496,    avg_dps: 8822635   },
      { name: 'Cross Strike',    icon: 'cross_strike',      min: 42096267,   max: 42139668,   avg_dps: 38289444  },
      { name: 'Armor Penetrate', icon: 'armor_penetrate',   min: 39990496,   max: 39993475,   avg_dps: 3771244   },
      { name: 'Silent Strike',   icon: 'silent_strike',     min: 3837541,    max: 3840519,    avg_dps: 6398511   },
      { name: 'Blade Dance',     icon: 'blade_dance',       min: 43478697,   max: 43481676,   avg_dps: 27175116  },
      { name: 'Spring Attack',   icon: 'spring_attack',     min: 25583692,   max: 25588798,   avg_dps: 5562449   },
      { name: 'Hawk Attack',     icon: 'hawk_attack',       min: 46519704,   max: 46533319,   avg_dps: 4387450   },
      { name: 'Sonic Blade',     icon: 'sonic_blade',       min: 72508882,   max: 72586322,   avg_dps: 20153723  },
      { name: 'Shadow Ricochet', icon: 'shadow_ricochet',   min: 27553092,   max: 27555007,   avg_dps: 25049386  },
      { name: 'Jump Strike',     icon: 'jump_strike',       min: 17692267,   max: 17694182,   avg_dps: 4915177   },
      { name: 'Deadly X',        icon: 'deadly_x',          min: 67812490,   max: 67830362,   avg_dps: 5215467   },
      { name: 'Cross of Blood',  icon: 'cross_of_blood',    min: 79430607,   max: 79460391,   avg_dps: 127112798 },
    ]
  },
  {
    id: 'templar',
    name: 'Templar',
    type: 'Melee',
    typeBadge: 'melee',
    logo: 'icons/classes/FF_Temp_Logo.png',
    accent: '#8090c0',
    pve_dps: 489255273,
    max_pve_dmg: 205803719,
    skills: [
      { name: 'PvE Melee',       icon: 'melee',             min: 0,          max: 205803719,  avg_dps: 489255273 },
      { name: 'Slash',           icon: 'slash',             min: 12294616,   max: 12354891,   avg_dps: 20541666  },
      { name: 'Keenwheel',       icon: 'keenwheel',         min: 13546070,   max: 13606177,   avg_dps: 22627325  },
      { name: 'Blindside',       icon: 'blindside',         min: 38846550,   max: 38906655,   avg_dps: 64795633  },
      { name: 'Bloody Strike',   icon: 'bloody_strike',     min: 2274231,    max: 2334338,    avg_dps: 3840550   },
      { name: 'Special Hit',     icon: 'special_hit',       min: 3317755,    max: 3377862,    avg_dps: 5579792   },
      { name: 'Guillotine',      icon: 'guillotine',        min: 3340989,    max: 3401095,    avg_dps: 561840445 },
      { name: 'Hit Reflect',     icon: 'hit_reflect',       min: 3534945,    max: 3595051,    avg_dps: 5941782   },
      { name: 'Power Swing',     icon: 'power_swing',       min: 44055918,   max: 44099355,   avg_dps: 44077636  },
      { name: 'Earth Divider',   icon: 'earth_divider',     min: 20804098,   max: 20839118,   avg_dps: 34703374  },
      { name: 'Charge',          icon: 'charge',            min: 20332004,   max: 20383860,   avg_dps: 33930565  },
      { name: 'Pain Dealer',     icon: 'pain_dealer',       min: 23038296,   max: 23081734,   avg_dps: 2174559   },
      { name: 'Power Stomp',     icon: 'power_stomp',       min: 32615546,   max: 32658984,   avg_dps: 1582907   },
      { name: 'Hurricane Swing', icon: 'hurricane_swing',   min: 22792147,   max: 22856967,   avg_dps: 54778936  },
      { name: 'Phantom Echo',    icon: 'phantom_echo',      min: 20768236,   max: 20832889,   avg_dps: 3714980   },
      { name: 'Sky Splitter',    icon: 'sky_splitter',      min: 32903617,   max: 33188995,   avg_dps: 3116266   },
      { name: 'Shield Bash',     icon: 'shield_bash',       min: 15430743,   max: 15550113,   avg_dps: 992936    },
      { name: "Dead Man's Lure", icon: 'dead_mans_lure',    min: 61473231,   max: 61578964,   avg_dps: 55933375  },
      { name: 'Maelstrom Strike',icon: 'maelstrom_strike',  min: 25653165,   max: 25733139,   avg_dps: 2422864   },
    ]
  },
];

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────────
function fmt(n) {
  if (!n && n !== 0) return '—';
  return n.toLocaleString('en-US');
}

function fmtShort(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toString();
}

// ─── RENDER ENGINE ────────────────────────────────────────────────────────────
let currentClass = CLASSES.length ? CLASSES[0].id : 'arcanist';
let sortKey = 'avg_dps';
let sortAsc = false;
let maxDPS = 0;

function _computeMaxDPS() {
  maxDPS = Math.max(0, ...CLASSES.filter(c => c.pve_dps).map(c => c.pve_dps));
}

function buildOverviewGrid() {
  const grid = document.getElementById('overview-grid');
  grid.innerHTML = '';
  CLASSES.forEach(cls => {
    const card = document.createElement('div');
    card.className = 'class-overview-card' + (cls.id === currentClass ? ' selected' : '');
    card.style.setProperty('--card-accent', cls.accent);
    const dpsBar = cls.pve_dps
      ? `<div class="dps-bar-bg"><div class="dps-bar-fill" style="width:${Math.round(cls.pve_dps / maxDPS * 100)}%"></div></div>`
      : '';
    const dpsVal = cls.pve_dps
      ? `<div class="card-dps-value">${fmtShort(cls.pve_dps)}</div>
         <div class="card-dps-sub">Max Hit: ${fmtShort(cls.max_pve_dmg)}</div>`
      : `<div class="card-dps-value" style="color:var(--text-dim);font-size:12px">Skill build only</div>`;
    card.innerHTML = `
      <div class="card-header">
        <img class="card-class-logo" src="${cls.logo}" alt="${cls.name}" onerror="this.style.display='none'">
        <div>
          <div class="card-class-name">${cls.name}</div>
          <span class="type-badge ${cls.typeBadge}">${cls.type}</span>
        </div>
      </div>
      <div class="card-dps-label">PVE DPS</div>
      ${dpsVal}
      ${dpsBar}
    `;
    card.addEventListener('click', () => switchClass(cls.id));
    grid.appendChild(card);
  });
}

function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  CLASSES.forEach(cls => {
    const item = document.createElement('a');
    item.className = 'nav-item' + (cls.id === currentClass ? ' active' : '');
    item.href = '#';
    item.innerHTML = `
      <img class="nav-logo" src="${cls.logo}" alt="${cls.name}" onerror="this.style.display='none'">
      <span>${cls.name}</span>
      ${cls.pve_dps ? `<span class="nav-dps">${fmtShort(cls.pve_dps)}</span>` : ''}
    `;
    item.addEventListener('click', (e) => { e.preventDefault(); switchClass(cls.id); });
    nav.appendChild(item);
  });
}

function buildClassSection(cls) {
  const heroType = { magic: '🔮 Mage Class', melee: '⚔️ Melee Class', ranged: '🏹 Ranged Class' }[cls.typeBadge];
  const dpsBlock = cls.pve_dps ? `
    <div class="hero-stat">
      <div class="hero-stat-label">Total PvE DPS</div>
      <div class="hero-stat-value" data-tip="Sustained damage per second in PvE">${fmt(cls.pve_dps)}</div>
    </div>
    <div class="hero-stat">
      <div class="hero-stat-label">Max Single Hit</div>
      <div class="hero-stat-value">${fmt(cls.max_pve_dmg)}</div>
    </div>
    <div class="hero-stat">
      <div class="hero-stat-label">vs #1 Class</div>
      <div class="hero-stat-value" style="color:var(--text-dim)">${Math.round(cls.pve_dps / maxDPS * 100)}%</div>
    </div>
  ` : `<div class="hero-stat"><div class="hero-stat-label">Build type</div><div class="hero-stat-value no-data">Skill-only reference</div></div>`;

  return `
    <div class="class-hero">
      <img class="class-hero-bg" src="${cls.logo}" alt="" aria-hidden="true">
      <img class="class-hero-logo" src="${cls.logo}" alt="${cls.name}" onerror="this.style.display='none'">
      <div class="class-hero-info">
        <div class="class-hero-type">${heroType}</div>
        <div class="class-hero-name">${cls.name}</div>
        <div class="hero-stats-row">${dpsBlock}</div>
        ${cls.pve_dps ? `
          <div class="hero-stat-bar-wrap">
            <div class="hero-stat-bar-bg">
              <div class="hero-stat-bar-fill" style="width:${Math.round(cls.pve_dps / maxDPS * 100)}%"></div>
            </div>
            <span style="font-size:10px;color:var(--text-dim)">vs top DPS</span>
          </div>` : ''}
      </div>
    </div>
    ${cls.skills.length ? buildSkillTable(cls) : '<p style="color:var(--text-dim);padding:20px">No individual skill data available for this class.</p>'}
  `;
}

function buildSkillTable(cls) {
  const sorted = [...cls.skills].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    return sortAsc ? av - bv : bv - av;
  });
  const maxAvg = Math.max(...cls.skills.map(s => s.avg_dps));

  const rows = sorted.map((sk, idx) => {
    const rank = idx + 1;
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `<span style="color:var(--text-dim);font-size:11px">#${rank}</span>`;
    const barPct = Math.round(sk.avg_dps / maxAvg * 100);
    const iconPath = `icons/skills/${sk.icon}.png`;
    return `
      <tr class="rank-${rank}" data-name="${sk.name.toLowerCase()}">
        <td style="width:32px;text-align:center">${medal}</td>
        <td>
          <div class="skill-cell">
            <img class="skill-icon" src="${iconPath}" alt="${sk.name}"
                 onerror="this.parentNode.innerHTML='<div class=\\'skill-icon-fallback\\'>⚡</div>${sk.name}'">
            <span class="skill-name">${sk.name}</span>
          </div>
        </td>
        <td class="hit-cell">
          ${sk.min === 0
            ? `<span class="hit-max" style="color:var(--text-dim);font-size:11px">Max:</span> <span class="hit-max">${fmt(sk.max)}</span>`
            : `<span class="hit-min">${fmt(sk.min)}</span><span class="hit-sep">→</span><span class="hit-max">${fmt(sk.max)}</span>`}
        </td>
        <td class="dps-cell">
          <div class="dps-value">${fmt(sk.avg_dps)}</div>
          <div class="dps-bar-row">
            <div class="dps-mini-bar-bg">
              <div class="dps-mini-bar-fill" style="width:${barPct}%;background:linear-gradient(90deg,${cls.accent}88,${cls.accent})"></div>
            </div>
            <span class="dps-rank">${barPct}%</span>
          </div>
        </td>
      </tr>`;
  }).join('');

  return `
    <div class="skills-panel">
      <div class="skills-panel-header">
        <span class="skills-panel-title">Skill Performance — ${cls.name}</span>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <div class="sort-controls">
            <span style="font-size:10px;color:var(--text-dim);letter-spacing:1px">SORT:</span>
            <button class="sort-btn ${sortKey==='avg_dps'?'active':''}" onclick="setSort('avg_dps',this)">AVG DPS</button>
            <button class="sort-btn ${sortKey==='max'?'active':''}" onclick="setSort('max',this)">MAX HIT</button>
            <button class="sort-btn ${sortKey==='min'?'active':''}" onclick="setSort('min',this)">MIN HIT</button>
          </div>
          <div class="search-wrap">
            <input class="skills-search" id="skill-search-${cls.id}" placeholder="Search skill…" oninput="filterSkills(this)">
          </div>
        </div>
      </div>
      <div class="skills-table-wrap">
        <table id="skill-table-${cls.id}">
          <thead>
            <tr>
              <th></th>
              <th onclick="setSort('name')">Skill</th>
              <th onclick="setSort('max')">Hit Range</th>
              <th onclick="setSort('avg_dps')">AVG DPS</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function filterSkills(input) {
  const q = input.value.toLowerCase();
  const rows = input.closest('.skills-panel').querySelectorAll('tbody tr');
  rows.forEach(row => {
    row.classList.toggle('hidden', !row.dataset.name.includes(q));
  });
}

function setSort(key) {
  if (sortKey === key) sortAsc = !sortAsc;
  else { sortKey = key; sortAsc = false; }
  renderCurrentClass();
}

function switchClass(id) {
  currentClass = id;
  renderAll();
  document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentClass() {
  const cls = CLASSES.find(c => c.id === currentClass);
  const section = document.getElementById(`section-${currentClass}`);
  if (section) section.innerHTML = buildClassSection(cls);
}

function renderAll() {
  buildOverviewGrid();
  buildSidebar();

  CLASSES.forEach(cls => {
    let section = document.getElementById(`section-${cls.id}`);
    if (!section) {
      section = document.createElement('section');
      section.id = `section-${cls.id}`;
      section.className = 'class-section';
      document.getElementById('sections-container').appendChild(section);
    }
    section.classList.toggle('active', cls.id === currentClass);
    if (cls.id === currentClass) {
      section.innerHTML = buildClassSection(cls);
    }
  });
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.4 - 0.1,
    o: Math.random(),
    do: (Math.random() - 0.5) * 0.005,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.o += p.do;
      if (p.o > 0.7) p.do = -Math.abs(p.do);
      if (p.o < 0.05) p.do = Math.abs(p.do);
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,168,75,${p.o.toFixed(2)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  draw();
  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });
}

// ─── BOOT ─────────────────────────────────────────────────────────────────────
async function boot() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    CLASSES = await res.json();
  } catch (e) {
    console.warn('Could not load data.json, using built-in fallback data:', e);
    CLASSES = _FALLBACK_DATA;
  }
  _computeMaxDPS();
  currentClass = CLASSES.length ? CLASSES[0].id : 'arcanist';
  renderAll();
  initParticles();
}

document.addEventListener('DOMContentLoaded', boot);
