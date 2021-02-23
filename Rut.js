import React from 'react';

/*
Author: @vichoconejeros

How to use this

on the web
<Rut value={rut} onChange={onRutChange} onValid={onRutValido} >
	<input type="text" name="rut" placeholder="Rut" required></input>
</Rut>

on react native
<Rut value={rut} onChangeText={onRutChange} onValid={onRutValido} >
	<TextInput placeholder="Rut"></TextInput>
</Rut>

*/

const Rut = ({value,onChange,onChangeText,onValid,children}) => {
	
	const formato = (rut) => {
		if (!rut | typeof rut !== 'string') return false
		return /^\d{1,2}.\d{3}.\d{3}-[k|K|\d]{1}$/.test(rut)
	}
	
	const digitoVerificador = (rut) => {
		let multiplos = [2,3,4,5,6,7]
		let digitos = rut.split('-')[0].replace(/\./g,'').split('').reverse()
		let digitoVerificador = rut.split('-')[1].toUpperCase()
		let digito = 11 - digitos.reduce((acc,elem,index)=>(acc+Number(elem)*multiplos[index%multiplos.length]),0)%11
		let digimap = [NaN,'1','2','3','4','5','6','7','8','9','K','0']
		return digimap[digito]===digitoVerificador
	}

	 
	const rutValido = (rut) => {
		return formato(rut) && digitoVerificador(rut)
	}
		
	const reformat = (rutViejo,rutNuevo) => {
		let digitos = ['0','1','2','3','4','5','6','7','8','9','K','k']
		let digitoValido = (digito) => digitos.includes(digito)			
		let quitarDV = (digito,index,array) => (index<(array.length-1))?!(['K','k'].includes(digito)):true
		
		if(rutNuevo !==''){
			
			let chars = rutNuevo.split('').filter(digitoValido).filter(quitarDV)
			if(chars.length>9) return rutViejo
			let digito = chars[chars.length-1]
			
			if(digitoValido(digito)){
				[1,5,9].forEach(index => { if(chars.length>index){ chars.splice(chars.length-index,0,(index===1)?'-':'.') }} )			
				return chars.join('').toUpperCase();
			} else {
				return rutViejo;
			}
		}
		return '';
	}	
	
	const onChangeValue = (e) => {
		e.target.value = reformat(value,e.target.value)
		onChange(e)
		if(onValid) onValid(rutValido(e.target.value))
	}
	
	const onChangeTextValue = (rut) => {
		rut = reformat(value,rut)
		onChangeText(rut)
		if(onValid) { onValid(rutValido(rut)) }
	}
	
	if (typeof document !== 'undefined') {
		return React.Children.map(children, (child, i)=> React.cloneElement(child,{value:value,onChange:onChangeValue}))
	} else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
		return React.Children.map(children, (child, i)=> React.cloneElement(child,{value:value,onChangeText:onChangeTextValue}))
	}
}

export default Rut
