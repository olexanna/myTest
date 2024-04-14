import React, { useReducer, useState, useEffect, useMemo } from "react";
import "@styles/main.scss"
import "@styles/fonts.scss"

import "./style.scss"

const FindMissingNumbers = ( array ) => {

	let result = [];

	//Проверяем что точно получаем массив и он не пустой
	if( !array || !Array.isArray( array ) || !array.length )
		return result;

	let table = {};
	let min = Infinity;
	let max = -Infinity;

	//Находим минимальное и максимальное значение массива
	//Игнорируем все значения которые не являются цыфрами
	//Записываем все числа которые мы нашли в таблицу
	for( const item of array ){

		if( typeof item != "number" )
			continue;

		const value = item;
		table[ value ] = true;

		if( value > max )
			max = value;
		if( value < min )
			min = value;

	};

	//Итерируем значения от минимальной до максимальной найденной цифры
	//Если цифра была ранее найдена в исходном массиве, то мы ее пропускаем
	for( let n = min; n < max; n++ ){

		if( table[ n ] )
			continue;

		result.push( n );
	};

	return result;
};

export const App = () => {

	let [ input, setInput ] = useState( "7, 9, 11, 12" );

	let computed = useMemo(() => {
		let s = (input || "").split( "," );
		let result = [];

		for( const item of s ){

			if( !item )
				continue;

			result.push( parseInt( item ) || 0 );
		};

		return result;
	}, [ input ]);

	return (
		<article className={"app"}>

			<input value={ input } onChange={( e ) => setInput( e.target.value ) }/>

			<div>Array: {
				computed.map(( item, index ) => {
					return (
						<p key={ index }>{ item }</p>
					)
				})
			}</div>

			<div>Missing numbers: {
				FindMissingNumbers( computed ).map(( item, index ) => {
					return (
						<p key={ index }>{ item }</p>
					)
				})
			}</div>

		</article>
	);
};