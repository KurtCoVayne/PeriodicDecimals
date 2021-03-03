/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import './App.css';

type PQ = [number, number];
const truncate = (decimalPart: number): number => {
	const str = decimalPart.toString();
	const match = str.match(/^(.+)\1+$/);
	if (match) {
		return parseInt(match[1], 10);
	}
	return decimalPart;
};
const gcd = (a: number, b: number): number => {
	if (b > a) {
		const temp = a;
		a = b;
		b = temp;
	}
	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (b === 0) return a;
		a %= b;
		if (a === 0) return b;
		b %= a;
	}
};

const reduce = (numerator: number, denominator: number): PQ => {
	// eslint-disable-next-line no-plusplus
	const mcd = gcd(numerator, denominator);
	return [numerator / mcd, denominator / mcd];
};
const conversion = (wholePart: number, decimalPart: number): string => {
	const decimalStr = decimalPart.toString();
	const x = wholePart + decimalPart * 10 ** -decimalStr.length;
	const [numerator, denominator] = reduce(
		Math.ceil(x * 10 ** decimalStr.length - x),
		10 ** decimalStr.length - 1,
	);
	return `${numerator}/${denominator}`;
};

function App(): JSX.Element {
	const [numberPart, setNumber] = useState<number | undefined>(undefined);
	const [decimalPart, setDecimal] = useState<number | undefined>(undefined);

	return (
		<div className="h-screen overflow-hidden">
			<div className="py-32 md:my-0">
				<h1 className="text-2xl text-center mb-4 text-red-500">
					Decimales Periodicos a Fracciones.
				</h1>
				<div className="lg:px-20 md:px-10 px-0">
					<div className="grid md:gap-x-4 gap-x-2 px-1 gap-y-10 grid-cols-2 mx-auto">
						<div>
							<h4>Parte Entera</h4>
							<input
								className="number-input"
								placeholder="Numero aquí"
								min={0}
								max={1000000}
								value={numberPart}
								onChange={(e) =>
									setNumber(
										Number.isNaN(e.target.valueAsNumber)
											? undefined
											: e.target.valueAsNumber,
									)
								}
								type="number"
							/>
						</div>
						<div>
							<h4>
								Parte Decimal
								<span className="md:inline-block hidden ">
									{' '}
									(Que se repite)
								</span>
							</h4>
							<input
								className="number-input"
								placeholder="Numero aquí"
								value={decimalPart}
								onChange={(e) =>
									setDecimal(
										Number.isNaN(e.target.valueAsNumber)
											? undefined
											: e.target.valueAsNumber,
									)
								}
								type="number"
							/>
						</div>
						{!(
							typeof numberPart === 'undefined' ||
							typeof decimalPart === 'undefined'
						) && (
							<>
								<h4>
									Vista Previa Numero: {numberPart ?? 0}.
									<span
										style={{
											textDecorationLine: 'overline',
										}}
									>
										{typeof decimalPart === 'undefined'
											? 0
											: truncate(decimalPart)}
									</span>
								</h4>
								<h4>
									Fracción:{' '}
									{conversion(
										numberPart,
										truncate(decimalPart),
									)}
								</h4>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
