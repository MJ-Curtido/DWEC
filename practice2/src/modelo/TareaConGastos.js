import { PresupuestoSuperadoError } from './errores';
import { Tarea } from './Tarea';

export class TareaConGastos extends Tarea {
	#presupuesto;
	#gastos;

	constructor(titulo, prioridad, limite, presupuesto) {
		super(titulo, prioridad, limite);

		this.presupuesto = presupuesto;
		this.gastos = [];
	}

	get presupuesto() {
		return this.#presupuesto;
	}

	set presupuesto(value) {
		if (Number.isInteger(value) && value > 0) this.#presupuesto = value;
		else throw new RangeError('Presupuesto debe ser un número entero de 1 o más.');
	}

	get gastos() {
		return [...this.#gastos];
	}

	set gastos(value) {
		this.#gastos = value;
	}

	gastar(concepto, importe) {
		if (concepto && typeof concepto !== 'string') throw new RangeError('Concepto inválido.');
		if (this.#gastos.filter((gasto) => gasto.concepto === concepto).length > 0) throw new RangeError('Concepto ya existente.');
		if (Number.isInteger(importe) && importe > 0) throw new RangeError('Importe inválido.');
		const total = this.#gastos.reduce((acc, gasto) => (acc += gasto.importe), 0);
		total += importe;
		if (total > this.presupuesto) throw new PresupuestoSuperadoError(importe, this.presupuesto);

		this.#gastos.push({ concepto, importe });
	}
}
