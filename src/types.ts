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

export interface TextLayer extends Point {
  type: "text";
  text: string;
  color: string;
}

export interface EllipseLayer extends Rect {
  type: "ellipse";
  color: string;
  fill: boolean;
}

export interface RectLayer extends Rect {
  type: "rect";
  color: string;
  fill: boolean;
}

export interface ArrowLayer {
  type: "arrow";
  color: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type Layer = TextLayer | EllipseLayer | RectLayer | ArrowLayer;
