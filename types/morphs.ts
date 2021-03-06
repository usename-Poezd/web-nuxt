export interface IMorph {
  gene_id: number
  trait_id: number
  kinds: Array<number>
  gene: {
    id: number
    title: string
    type: string
  }
  trait: {
    id: number
    title: string
    type: string
    traitGroup: {
      label: string
      title: string
    }|null
  }
}
