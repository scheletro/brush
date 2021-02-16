import { BrushDefaultType } from '../constants';

import Pen from './pen';

class Brush {
    static Type = BrushDefaultType;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    brush!: string;
    _brush!: Function;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;

        this._initial();
    }

    _initial() {
        if (this.canvas) {
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);

            this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        }
    }

    setBrush(brush: string) {
        this.brush = brush;
    }

    onMouseDown(event: MouseEvent) {
        const { canvas, context } = this;
        canvas.addEventListener('mousemove', this.onMouseMove);
        canvas.addEventListener('mouseup', this.onMouseUp);

        const { clientX, clientY } = event;
        context.moveTo(clientX, clientY);

        console.warn(context.moveTo);
    }

    onMouseMove(event: MouseEvent) {
        const { clientX, clientY } = event;
        this.draw(clientX, clientY);
    }

    onMouseUp() {
        const { canvas } = this;
        canvas.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mouseup', this.onMouseUp);
    }

    draw(x: number, y: number) {
        if (!this._brush) {
            const _brush = this.brush || '';
            // @ts-ignore
            const func = Pen[_brush] || Pen[BrushDefaultType.SIMPLE];

            this._brush = func;
        }

        const { context } = this;

        this._brush(context, {
            x,
            y
        });
    }
}

export default Brush;