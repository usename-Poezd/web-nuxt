import {IMorph} from "~/types";

const formatMorphClass = (morph: IMorph): string => {
  if ((morph.trait as any).trait_group) {
    return `morph-${morph.trait.type}-${(morph.trait as any).trait_group.label}`.toLowerCase()
  }

  if (morph.trait.traitGroup) {
    return `morph-${morph.trait.type}-${morph.trait.traitGroup.label}`.toLowerCase()
  }

  return `morph-${morph.trait.type}-${morph.trait.title}`.toLowerCase()
};

const formatMorph = (morph: IMorph): string =>
  morph.trait.title === 'Visual' || morph.trait.title === 'Normal' ?
    morph.gene.title
    : `${morph.trait.title} ${morph.gene.title}`;

export {
  formatMorph,
  formatMorphClass
}
