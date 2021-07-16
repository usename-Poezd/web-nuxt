export interface ISeoOption {
  title: string,
  description: string,
  keywords: string,

  openGraph: {
    title: string,
    description: string,
  },

  twitter: {
    title: string
  }
}
