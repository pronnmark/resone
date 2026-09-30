export type Piece = {
  /** path under public/img, without extension, e.g. "oeuvres/ivresse-ecarlate" */
  slug: string;
  title: string;
  detail: string;
  alt: string;
};

export type Style = { label: string; pieces: Piece[] };
