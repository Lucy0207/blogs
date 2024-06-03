export interface BlogProps {
  price: number;
  carrier: string;
  segments: Array<SegmentObject>;
}

export type StopsArray = string[] | [];

export type SegmentObject = {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: StopsArray;
};
