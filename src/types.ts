export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Line {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface RectLayer {
  type: "rect";
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EllipseLayer {
  type: "ellipse";
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArrowLayer {
  type: "arrow";
  color: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface TextLayer {
  type: "text";
  text: string;
  color: string;
  x: number;
  y: number;
}

export type Layer = TextLayer | EllipseLayer | RectLayer | ArrowLayer;
