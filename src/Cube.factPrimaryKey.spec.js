import Cube from "./Cube.js";
import {isEqualObjects} from "../spec/helpers/helpers.js";
import {NotFoundFactId} from "./errors.js";

export default () => {
	let cube, factTable, options, dimensionHierarchies;

	beforeEach(() => {
		dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'direction',
					keyProps: ['direction']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'date',
							keyProps: ['date']
						},
					}
				]
			}
		];
	});

	it('default of factPrimaryKey property must have "id" value', () => {
		factTable = [
			{ id: 1, direction: 'left', date: '01' },
			{ id: 2, direction: 'right', date: '02' },
		];
		cube = Cube.create(dimensionHierarchies, factTable, options);
		expect(cube.factPrimaryKey === 'id').toBe(true);
	});

	it('should throw error if not found id param', () => {
		expect(() => {
			factTable = [
				{ direction: 'left', date: '01' },
				{ direction: 'right', date: '02' },
			];
			cube = Cube.create(dimensionHierarchies, factTable);
		}).toThrow();
	});

	it('should throw special error if not found id param', () => {
		let err;
		factTable = [
			{ direction: 'left', date: '01' },
			{ direction: 'right', date: '02' },
		];
		try {
			cube = Cube.create(dimensionHierarchies, factTable);
		} catch (error) {
			err = error
		}
		expect(err instanceof NotFoundFactId).toBe(true)
	});

	it('fact table can have custom factPrimaryKey', () => {
		factTable = [
			{ factId: 1, direction: 'left', date: '01' },
			{ factId: 2, direction: 'right', date: '02' },
		];
		options = {
			factPrimaryKey: 'factId'
		};
		cube = Cube.create(dimensionHierarchies, factTable, options);
		expect(cube.getCells()[0]["factId"]).toBeDefined();
		isEqualObjects(cube.getFacts(), factTable);
	});
};