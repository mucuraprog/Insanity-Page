"""
Build script for the Flyff DPS Reference Site.
Converts DDS skill icons to PNG and sets up the site directory.
"""
import os
import shutil
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFont


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


def _fmt_short(n: int) -> str:
    n = int(n or 0)
    if n >= 1_000_000_000:
        b = n / 1_000_000_000
        return f"{b:.1f}B" if b < 10 else f"{b:.0f}B"
    if n >= 1_000_000:
        return f"{n/1_000_000:.0f}M"
    if n >= 1_000:
        return f"{n/1_000:.0f}k"
    return str(n)


def _derived_class_dps(cls: dict) -> int:
    pve = cls.get("pve_dps")
    if pve:
        return int(pve)
    skills = cls.get("skills") or []
    if not skills:
        return 0
    return int(max((s.get("avg_dps") or 0) for s in skills))


def _load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    # Best-effort. DejaVu is commonly available with Pillow; fall back to default bitmap.
    try:
        name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
        return ImageFont.truetype(name, size)
    except Exception:
        return ImageFont.load_default()


def generate_og_image(site_dir: str, out_name: str = "og.png") -> None:
    data_path = os.path.join(site_dir, "data.json")
    if not os.path.exists(data_path):
        print("No data.json found; skipping og image generation")
        return

    with open(data_path, "r", encoding="utf-8") as f:
        classes = json.load(f)

    rows = []
    for c in classes:
        dps = _derived_class_dps(c)
        if dps <= 0:
            continue
        rows.append(
            {
                "id": c.get("id", ""),
                "name": c.get("name", ""),
                "dps": dps,
                "logo": c.get("logo", ""),
                "accent": c.get("accent", "#c8a84b"),
                "is_skill_only": not bool(c.get("pve_dps")),
            }
        )

    rows.sort(key=lambda r: r["dps"], reverse=True)
    top = rows[:8]
    if not top:
        print("No DPS data found; skipping og image generation")
        return

    # ── Canvas ──────────────────────────────────────────────────────
    W, H = 1200, 630
    bg = (5, 7, 20)
    panel_bg = (11, 18, 48)
    row_bg = (7, 11, 28)
    border = (28, 42, 90)
    gold = (200, 168, 75)
    gold_light = (232, 208, 138)
    white = (232, 238, 248)
    dim = (86, 100, 134)

    img = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(img)

    # Subtle gradient background
    for y in range(H):
        t = y / H
        fill = tuple(int(bg[i] + (panel_bg[i] - bg[i]) * t * 0.5) for i in range(3))
        draw.line([(0, y), (W, y)], fill=fill)

    # ── Fonts ───────────────────────────────────────────────────────
    f_brand = _load_font(22, bold=True)
    f_title = _load_font(38, bold=True)
    f_note  = _load_font(16, bold=False)
    f_rank  = _load_font(20, bold=True)
    f_name  = _load_font(22, bold=True)
    f_dps   = _load_font(22, bold=True)
    f_tag   = _load_font(13, bold=True)
    f_url   = _load_font(14, bold=False)

    # ── Layout constants ────────────────────────────────────────────
    mx = 40                         # horizontal margin
    header_y = 30
    header_h = 90
    list_top = header_y + header_h + 10
    list_bot = H - 36
    n = len(top)
    row_gap = 6
    row_h = min(60, (list_bot - list_top - (n - 1) * row_gap) // n)
    total_list_h = n * row_h + (n - 1) * row_gap
    list_y0 = list_top + (list_bot - list_top - total_list_h) // 2

    max_dps = max(r["dps"] for r in top)

    # ── Header ──────────────────────────────────────────────────────
    # Gold accent line at top
    draw.rectangle([0, 0, W, 3], fill=gold)
    draw.text((mx, header_y), "INSANITY", fill=gold, font=f_brand)
    draw.text((mx, header_y + 28), "Class DPS Overview", fill=white, font=f_title)
    draw.text((mx, header_y + 70), "Dark Oroth (Lv 350)  ·  PVE DPS or best skill", fill=dim, font=f_note)

    # ── Right-aligned URL ───────────────────────────────────────────
    url = "mucuraprog.github.io/Insanity-Page"
    ub = draw.textbbox((0, 0), url, font=f_url)
    draw.text((W - mx - (ub[2] - ub[0]), H - 28), url, fill=dim, font=f_url)

    # ── Column positions ────────────────────────────────────────────
    col_rank = mx + 12              # "#1"
    col_logo = mx + 52              # logo square
    col_name = mx + 112             # class name
    col_dps  = mx + 340             # DPS value
    col_bar  = mx + 520             # bar start
    col_end  = W - mx - 12          # bar end

    # ── Rows ────────────────────────────────────────────────────────
    medal_colors = {
        1: (255, 215, 0),
        2: (192, 192, 192),
        3: (205, 127, 50),
    }

    for idx, r in enumerate(top, start=1):
        ry = list_y0 + (idx - 1) * (row_h + row_gap)
        rx0 = mx
        rx1 = W - mx

        # Row background
        draw.rounded_rectangle([rx0, ry, rx1, ry + row_h], radius=12, fill=row_bg, outline=border, width=1)

        # Left accent bar (class colour)
        try:
            acc = r.get("accent", "#c8a84b").lstrip("#")
            ac = (int(acc[0:2], 16), int(acc[2:4], 16), int(acc[4:6], 16))
        except Exception:
            ac = gold
        draw.rounded_rectangle([rx0, ry, rx0 + 5, ry + row_h], radius=12, fill=ac)

        # Vertically centre everything in the row
        cy = ry + row_h // 2

        # Rank
        rank_col = medal_colors.get(idx, dim)
        rank_text = f"#{idx}"
        rb = draw.textbbox((0, 0), rank_text, font=f_rank)
        draw.text((col_rank, cy - (rb[3] - rb[1]) // 2), rank_text, fill=rank_col, font=f_rank)

        # Logo
        logo_size = min(row_h - 12, 44)
        logo_y = cy - logo_size // 2
        draw.rounded_rectangle(
            [col_logo, logo_y, col_logo + logo_size, logo_y + logo_size],
            radius=10, fill=(10, 16, 37), outline=border, width=1
        )
        logo_rel = (r.get("logo") or "").replace("/", os.sep)
        if logo_rel:
            logo_path = os.path.join(site_dir, logo_rel)
            if os.path.exists(logo_path):
                try:
                    logo_img = Image.open(logo_path).convert("RGBA")
                    logo_img = logo_img.resize((logo_size - 4, logo_size - 4), Image.LANCZOS)
                    # Paste onto RGB via temp RGBA canvas
                    tmp = Image.new("RGBA", img.size, (0, 0, 0, 0))
                    tmp.paste(logo_img, (col_logo + 2, logo_y + 2))
                    img = Image.alpha_composite(img.convert("RGBA"), tmp).convert("RGB")
                    draw = ImageDraw.Draw(img)
                except Exception:
                    pass

        # Class name
        nb = draw.textbbox((0, 0), r["name"], font=f_name)
        draw.text((col_name, cy - (nb[3] - nb[1]) // 2 - 1), r["name"], fill=white, font=f_name)

        # DPS value
        dps_str = _fmt_short(r["dps"])
        if r.get("is_skill_only"):
            dps_str += " skill"
        db = draw.textbbox((0, 0), dps_str, font=f_dps)
        dps_col = gold_light if idx <= 3 else gold
        draw.text((col_dps, cy - (db[3] - db[1]) // 2 - 1), dps_str, fill=dps_col, font=f_dps)

        # Progress bar
        bar_w = col_end - col_bar
        bar_h = 10
        bar_y = cy - bar_h // 2
        draw.rounded_rectangle([col_bar, bar_y, col_end, bar_y + bar_h], radius=5, fill=(5, 7, 20))
        fill_w = max(6, int(bar_w * r["dps"] / max_dps))
        # Gradient-like effect: brighter toward end
        draw.rounded_rectangle([col_bar, bar_y, col_bar + fill_w, bar_y + bar_h], radius=5, fill=gold)
        # Bright tip
        if fill_w > 8:
            draw.rounded_rectangle([col_bar + fill_w - 8, bar_y, col_bar + fill_w, bar_y + bar_h], radius=5, fill=gold_light)

    # ── Bottom bar ──────────────────────────────────────────────────
    draw.rectangle([0, H - 3, W, H], fill=gold)

    out_path = os.path.join(site_dir, out_name)
    img.save(out_path, format="PNG", optimize=True)
    print("Generated OG image:", out_path)

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
    ("priests_grasp",       "Skill_FlorFetters.dds"),
    ("soul_of_rhisis",      "Skill_FlorAbsoluteBarrier.dds"),
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

# Open Graph / Discord preview image
try:
    generate_og_image(SITE_DIR)
except Exception as e:
    print("OG image generation failed:", e)
