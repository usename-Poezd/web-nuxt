import {IMorph} from "~/types";

const formatMorphClass = (morph: IMorph): string =>
  morph.trait.trait_group ?
    `morph-${morph.trait.type}-${morph.trait.trait_group.label}`.toLowerCase()
    : `morph-${morph.trait.type}-${morph.trait.title}`.toLowerCase();

const formatMorph = (morph: IMorph): string =>
  morph.trait.title === 'Visual' || morph.trait.title === 'Normal' ?
    morph.gene.title
    : `${morph.trait.title} ${morph.gene.title}`;

export {
  formatMorph,
  formatMorphClass
}
