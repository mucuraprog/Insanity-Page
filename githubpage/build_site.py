"""
Build script for the Flyff DPS Reference Site.
Converts DDS skill icons to PNG and sets up the site directory.
"""
import os
import shutil
import numpy as np
from PIL import Image


def dds_to_png(src_path, out_path, size=(64, 64)):
    """Open a DDS, remove magenta chroma-key background, resize, save as PNG."""
    img = Image.open(src_path).convert("RGBA")
    data = np.array(img, dtype=np.uint8)
    # Mask pure magenta (R=255, G=0, B=255) → fully transparent
    mask = (data[:, :, 0] == 255) & (data[:, :, 1] == 0) & (data[:, :, 2] == 255)
    data[mask] = [0, 0, 0, 0]
    img = Image.fromarray(data)
    img = img.resize(size, Image.NEAREST)
    img.save(out_path)

_HERE = os.path.dirname(os.path.abspath(__file__))
ICON_SRC = os.path.join(_HERE, "Icon")
SITE_DIR = os.path.join(_HERE, "site")
SKILLS_DIR = os.path.join(SITE_DIR, "icons", "skills")
CLASS_ICONS_DIR = os.path.join(SITE_DIR, "icons", "classes")

os.makedirs(SKILLS_DIR, exist_ok=True)
os.makedirs(CLASS_ICONS_DIR, exist_ok=True)

# Class logo PNGs - copy directly
class_logos = [
    "FF_Arca_Logo.png",
    "FF_Crack_Logo.png",
    "FF_FM_Logo.png",
    "FF_Harle_Logo.png",
    "FF_Menta_Logo.png",
    "FF_Seraph_Logo.png",
    "FF_Slayer_Logo.png",
    "FF_Temp_Logo.png",
]

for logo in class_logos:
    src = os.path.join(ICON_SRC, logo)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(CLASS_ICONS_DIR, logo))
        print(f"Copied class logo: {logo}")

# Skill icon DDS-to-PNG conversions
# Format: (output_name, source_dds_filename)
skill_icons = [
    # === MAGE / ARCANIST / MENTALIST ===
    ("flame_ball",          "Skill_MagFireBoomer.dds"),
    ("flame_geyser",        "Skill_MagFireHotair.dds"),
    ("swordwind",           "Skill_MagWindSwordw.dds"),
    ("strongwind",          "Skill_MagWindStrong.dds"),
    ("ice_missile",         "skill_MagWatIcemis.DDS"),
    ("static_ball",         "skill_MagEleLgtbal.DDS"),
    ("stone_spike",         "skill_MagEarSpikes.DDS"),
    ("mental_strike",       "skill_MagMagMental.DDS"),
    ("fire_strike",         "skill_MagFirestrike.DDS"),
    ("wind_cutter",         "skill_MagWindcutter.DDS"),
    ("waterball",           "skill_MagWaterball.DDS"),
    ("water_well",          "skill_MagSpringwater.DDS"),
    ("lighting_ram",        "skill_MagLightpalm.DDS"),
    ("lightning_shock",     "skill_MagLightshock.DDS"),
    ("rock_crash",          "skill_MagRockcrash.DDS"),
    # Elementor / Arcanist advanced
    ("firebird",            "skill_EleFirFirbrd.dds"),
    ("burningfield",        "skill_EleFirBunfil.dds"),
    ("lightning_strike",    "skill_EleEleThunst.dds"),
    ("electric_shock",      "skill_EleEleEleshk.dds"),
    ("stone_spear",         "skill_EleEarStnspr.dds"),
    ("earthquake",          "skill_EleEarEarsqk.dds"),
    ("iceshark",            "skill_EleWatIceshk.dds"),
    ("poison_cloud",        "skill_EleWatPoicld.dds"),
    ("void",                "skill_EleWinVoid.dds"),
    ("windfield",           "skill_EleWinWinfil.dds"),
    ("meteor_shower",       "skill_EleMulMeteos.dds"),
    ("lightning_storm",     "skill_EleMulLgtstm.dds"),
    ("sandstorm",           "skill_EleMulSanstm.dds"),
    ("blizzard",            "skill_EleMulAvalan.dds"),
    ("lunar_cascade",       "Skill_ElelLunarFlare.dds"),
    ("stellar_vortex",      "Skill_ElelStellarBurst.dds"),
    ("eva_storm",           "Skill_ElelCosmicElement.dds"),
    ("spectral_javelin",    "Skill_ElelFinalSpear.dds"),
    ("astral_moon",         "Skill_ElelThunderbolts.dds"),
    # Psykeeper / Mentalist
    ("demonology",          "skill_PsyDnolgy.dds"),
    ("psychic_bomb",        "skill_PsyPsyBomb.dds"),
    ("psychic_wall",        "skill_PsyPsyWall.dds"),
    ("spirit_bomb",         "skill_PsySpirits.dds"),
    ("maximum_crisis",      "skill_PsyMaxCrisis.dds"),
    ("psychic_square",      "skill_PsyPsySquare.dds"),
    ("abra_cadabra",        "Skill_MentAbracara.dds"),
    ("shazaam",             "Skill_MentShazaam.dds"),
    ("cimetieres_scream",   "Skill_MentDarknessScream.dds"),
    ("aether_grasp",        "skill_PsyCrucioSpell.dds"),
    ("kriminels_hand",      "Skill_PsyCursemind.dds"),
    # === RANGER / CRACKSHOOTER ===
    ("junk_arrow",          "skill_AcrBowJunkbo.dds"),
    ("aimed_shot",          "skill_AcrBowAimeds.dds"),
    ("slow_step",           "skill_AcrYoySlowst.dds"),
    ("silent_shot",         "skill_AcrBowSilent.dds"),
    ("arrow_rain",          "skill_AcrBowrain.dds"),
    ("cross_line",          "skill_AcrYoyCross.dds"),
    ("auto_shot",           "skill_AcrBowAuto.dds"),
    ("snatch",              "skill_AcrYoySnitch.dds"),
    ("counterattack",       "skill_AcrYoyCounte.dds"),
    ("deadly_swing",        "skill_AcrYoyDeadly.dds"),
    ("ice_arrow",           "Skill_RagBowIcearr.dds"),
    ("flame_arrow",         "Skill_RagBowFlamea.dds"),
    ("piercing_arrow",      "Skill_RagBowPierci.dds"),
    ("poison_arrow",        "Skill_RagBowPoison.dds"),
    ("silent_arrow",        "Skill_RagBowSltaro.dds"),
    ("triple_shot",         "Skill_RagBowTriple.dds"),
    ("piercing_formation",  "Skill_CracksLongAOE.dds"),
    ("celestial_barrage",   "Skill_CracksSGTarget.dds"),
    ("condor_dive",         "Skill_CracksRangeStrike.dds"),
    # Harlequin yoyo
    ("enchant_of_nature",   "Skill_RagSupNature.dds"),
    ("enchant_of_iron",     "Skill_RagSupFastsh.dds"),
    ("sneak_stab",          "skill_JstYoyBackst.dds"),
    ("hit_of_penya",        "Skill_JstYoyPenya.dds"),
    ("vital_stab",          "Skill_JstSupVatals.dds"),
    ("void_step",           "Skill_WndlBackStep.dds"),
    ("spiral_vortex",       "Skill_WndlSpinWing.dds"),
    ("pandemonium",         "Skill_WndlMadHurricane.dds"),
    ("harlequins_greeting", "Skill_JstYoyomaster.dds"),
    # === SERAPH / RINGMASTER ===
    ("priests_grasp",       "Skill_FlorDivineStrike.dds"),
    ("soul_of_rhisis",      "skill_RinSupSpirit.dds"),
    ("merkaba_hanzelrusha", "skill_RinSupAnzelr.dds"),
    # === FORCEMASTER / KNUCKLE ===
    ("straight_punch",      "Skill_VagOneCleanh.dds"),
    ("burst_crack",         "Skill_AssKnuBurstC.DDS"),
    ("power_fist",          "skill_AssKnuPowerf.DDS"),
    ("belial_smashing",     "skill_BilBelialSmeshing.DDS"),
    ("piercing_serpent",    "skill_BilPiercingSerpent.DDS"),
    ("blood_fist",          "skill_BilBloodFist.DDS"),
    ("sonichand",           "skill_BilSonicHand.DDS"),
    ("baraqijal_esna",      "skill_BilBaraqijalEsna.DDS"),
    ("bgvur_tialbold",      "skill_BilGvurTialbold.DDS"),
    ("asalraalaikum",       "skill_BilAsalraAlaikum.DDS"),
    ("crushing_cascade",    "skill_ForcemSuperman.dds"),
    ("skybreaker",          "skill_ForcemUppercut.dds"),
    # === SLAYER / BLADEMASTER ===
    ("slash",               "Skill_MerOneSplmas.dds"),
    ("keenwheel",           "Skill_MerOneKeenwh.dds"),
    ("blindside",           "Skill_MerOneBlinds.dds"),
    ("bloody_strike",       "skill_MerOneBloody.DDS"),
    ("special_hit",         "skill_MerOneSpHit.DDS"),
    ("guillotine",          "skill_MerOneGuillo.DDS"),
    ("hit_reflect",         "skill_MerOneReflex.DDS"),
    ("cross_strike",        "skill_BldDblCross.dds"),
    ("armor_penetrate",     "skill_BldDblArmpen.dds"),
    ("silent_strike",       "skill_BldDswSilent.dds"),
    ("blade_dance",         "skill_BldDswBlddan.dds"),
    ("spring_attack",       "skill_BldDaxSpring.dds"),
    ("hawk_attack",         "skill_BldDaxHawatt.dds"),
    ("sonic_blade",         "skill_BldDblSonbld.dds"),
    ("shadow_ricochet",     "Skill_StormbLineHit.dds"),
    ("jump_strike",         "Skill_StormbJumpHit.dds"),
    ("deadly_x",            "Skill_StormbStormBlaste.dds"),
    ("cross_of_blood",      "Skill_StormbCrossofBlood.dds"),
    # === TEMPLAR / KNIGHT ===
    ("power_swing",         "skill_KntTwoPwswng.dds"),
    ("earth_divider",       "skill_KntTswEthdvd.dds"),
    ("charge",              "skill_KntTswCharge.dds"),
    ("pain_dealer",         "skill_KntTaxPaidea.dds"),
    ("power_stomp",         "skill_KntTaxPwstum.dds"),
    ("hurricane_swing",     "Skill_LordkHuriStrike.dds"),
    ("phantom_echo",        "Skill_LordkStabStrike.dds"),
    ("sky_splitter",        "Skill_LordkAngryIncrease.dds"),
    ("shield_bash",         "Skill_LordkShildStrike.dds"),
    ("dead_mans_lure",      "Skill_LordkScopeStrike.dds"),
    ("maelstrom_strike",    "Skill_LordkGrandRage.dds"),
    # Generic
    ("melee",               "Skill_VagOneCleanh.dds"),
    ("default",             "Skill_default.dds"),
]

converted = 0
skipped = 0
for out_name, src_dds in skill_icons:
    src_path = os.path.join(ICON_SRC, src_dds)
    out_path = os.path.join(SKILLS_DIR, f"{out_name}.png")
    if os.path.exists(src_path):
        try:
            dds_to_png(src_path, out_path)
            converted += 1
        except Exception as e:
            print(f"  ERROR converting {src_dds}: {e}")
            skipped += 1
    else:
        # Case-insensitive search
        found = False
        for f in os.listdir(ICON_SRC):
            if f.lower() == src_dds.lower():
                try:
                    dds_to_png(os.path.join(ICON_SRC, f), out_path)
                    converted += 1
                    found = True
                    break
                except Exception as e:
                    print(f"  ERROR converting {f}: {e}")
                    skipped += 1
                    found = True
                    break
        if not found:
            print(f"  MISSING: {src_dds}")
            skipped += 1

print(f"\nDone! Converted: {converted}, Skipped/Missing: {skipped}")
print("Icons ready in:", SKILLS_DIR)
