export interface Pokemon {
    id:                       number;
    name:                     string;
    base_experience:          number;
    height:                   number;
    is_default:               boolean;
    order:                    number;
    weight:                   number;
    abilities:                Ability[];
    past_abilities:           PastAbility[];
    forms:                    Species[];
    game_indices:             GameIndex[];
    held_items:               any[];
    location_area_encounters: string;
    moves:                    Move[];
    species:                  Species;
    sprites:                  Sprites;
    cries:                    Cries;
    stats:                    Stat[];
    past_stats:               PastStat[];
    types:                    Type[];
    past_types:               any[];
}

export interface Ability {
    is_hidden: boolean;
    slot:      number;
    ability:   Species | null;
}

export interface Species {
    name: string;
    url:  string;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface GameIndex {
    game_index: number;
    version:    Species;
}

export interface Move {
    move:                  Species;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    version_group:     Species;
    move_learn_method: Species;
    order:             number | null;
}

export interface PastAbility {
    generation: Species;
    abilities:  Ability[];
}

export interface PastStat {
    generation: Species;
    stats:      Stat[];
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
}

export interface GenerationViii {
    "sword-shield":                    Sprites;
    "legends-arceus":                  Sprites;
    "brilliant-diamond-shining-pearl": Sprites;
}

export interface GenerationVii {
    icons:                           DreamWorld;
    "ultra-sun-ultra-moon":          Sprites;
    "lets-go-pikachu-lets-go-eevee": Sprites;
}

export interface GenerationVi {
    "x-y":                       Sprites;
    icons:                       DreamWorld;
    "omega-ruby-alpha-sapphire": Sprites;
}

export interface GenerationV {
    icons:         GenerationVIcons;
    "black-white": Sprites;
}

export interface GenerationIx {
    champions:        Sprites;
    "legends-za":     Sprites;
    "scarlet-violet": Sprites;
}

export interface GenerationIv {
    icons:                  AnimatedClass;
    platinum:               Sprites;
    "diamond-pearl":        Sprites;
    "heartgold-soulsilver": Sprites;
}

export interface SpritesVersions {
    "generation-i":    FluffyGenerationI;
    "generation-v":    GenerationV;
    "generation-ii":   FluffyGenerationIi;
    "generation-iv":   GenerationIv;
    "generation-ix":   GenerationIx;
    "generation-vi":   GenerationVi;
    "generation-iii":  GenerationIii;
    "generation-vii":  GenerationVii;
    "generation-viii": GenerationViii;
}

export interface Other {
    home:               HomeClass;
    showdown:           Sprites;
    dream_world:        DreamWorld;
    "official-artwork": OfficialArtwork;
}

export interface Sprites {
    other?:             Other;
    versions?:          SpritesVersions;
    back_shiny:         null | string;
    back_female:        null;
    front_shiny:        null | string;
    back_default:       null | string;
    front_female:       null;
    front_default:      null | string;
    back_shiny_female:  null;
    front_shiny_female: null;
    animated?:          SpritesAnimated;
    icons?:             HomeClass;
}

export interface DreamWorld {
    front_female:  null;
    front_default: string;
}

export interface GenerationVIcons {
    animated:      AnimatedClass;
    front_default: string;
}

export interface AnimatedClass {
    front_default: null | string;
}

export interface FluffyGenerationI {
    yellow:            RedBlue;
    "red-blue":        RedBlue;
    "red-green-japan": RedGreenJapan;
}

export interface RedBlue {
    back_gray:              string;
    front_gray:             string;
    back_default:           string;
    front_default:          string;
    back_transparent:       string;
    front_transparent:      string;
    back_transparent_gray:  string;
    front_transparent_gray: string;
    back_gbc?:              string;
    front_gbc?:             string;
}

export interface RedGreenJapan {
    back_gray:     string;
    front_gray:    string;
    back_default:  string;
    front_default: string;
}

export interface FluffyGenerationIi {
    gold:    Crystal;
    silver:  Crystal;
    crystal: Crystal;
}

export interface Crystal {
    animated?:               CrystalAnimated;
    back_shiny:              string;
    front_shiny:             string;
    back_default:            string;
    front_default:           string;
    back_transparent:        string;
    front_transparent:       string;
    back_shiny_transparent:  string;
    front_shiny_transparent: string;
}

export interface CrystalAnimated {
    front_shiny:   null | string;
    front_default: null | string;
}

export interface GenerationIii {
    icons:               AnimatedClass;
    emerald:             Emerald;
    "ruby-sapphire":     Emerald;
    "firered-leafgreen": Emerald;
}

export interface Emerald {
    animated?:     Emerald;
    back_shiny:    string;
    front_shiny:   string;
    back_default:  string;
    front_default: string;
}

export interface HomeClass {
    front_shiny?:        null | string;
    front_default:       null | string;
    front_female?:       null;
    front_shiny_female?: null;
}

export interface OfficialArtwork {
    versions:      OfficialArtworkVersions;
    front_shiny:   string;
    front_default: string;
}

export interface OfficialArtworkVersions {
    "generation-i":  PurpleGenerationI;
    "generation-ii": PurpleGenerationIi;
}

export interface PurpleGenerationI {
    "red-and-blue":  AnimatedClass;
    "red-and-green": AnimatedClass;
}

export interface PurpleGenerationIi {
    "gold-and-silver": AnimatedClass;
}

export interface SpritesAnimated {
    front_shiny:        string;
    front_female:       null;
    front_default:      string;
    front_shiny_female: null;
    back_shiny?:        string;
    back_female?:       null;
    back_default?:      string;
    back_shiny_female?: null;
}

export interface Type {
    slot: number;
    type: Species;
}
